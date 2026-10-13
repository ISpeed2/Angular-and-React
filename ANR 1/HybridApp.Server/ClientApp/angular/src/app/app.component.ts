import { CommonModule } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Component, OnInit, inject } from '@angular/core'
import { FormsModule } from '@angular/forms'

interface Session { isAuthenticated: boolean; name: string | null }
interface DashboardItem { title: string; description: string; status: string }
interface Dashboard { user: string; generatedAt: string; items: DashboardItem[] }

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  private readonly http = inject(HttpClient)
  session: Session | null = null
  dashboard: Dashboard | null = null
  name = ''
  error = ''

  ngOnInit(): void { this.loadSession() }

  loadSession(): void {
    this.http.get<Session>('/api/auth/session').subscribe({
      next: session => {
        this.session = session
        if (session.isAuthenticated) {
          this.http.get<Dashboard>('/api/dashboard').subscribe(data => this.dashboard = data)
        } else {
          this.dashboard = null
        }
      },
      error: () => this.error = 'Не удалось связаться с API',
    })
  }

  login(): void {
    this.error = ''
    this.http.post<Session>('/api/auth/login', { name: this.name }).subscribe({
      next: () => this.loadSession(),
      error: response => this.error = response.error?.message ?? 'Не удалось войти',
    })
  }

  logout(): void {
    this.http.post('/api/auth/logout', {}).subscribe(() => this.loadSession())
  }
}
