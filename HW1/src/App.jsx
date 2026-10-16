import Header from './components/Header';
import Footer from './components/Footer';
import StatCard from './components/StatCard';
import StudentList from './components/StudentList';
import { students } from './data/students';

export default function App() {
  const total = students.length;
  const avgGpa = total ? (students.reduce((sum, student) => sum + student.gpa, 0) / total).toFixed(2) : '—';
  const youngest = total ? `${Math.min(...students.map((student) => student.age))} лет` : '—';
  const cities = new Set(students.map((student) => student.city)).size;

  return (
    <div className="page">
      <Header />
      <main>
        <section className="stats" aria-label="Статистика студентов">
          <StatCard label="Всего студентов" value={total} icon="🎓" color="#e0f2fe" />
          <StatCard label="Средний балл" value={avgGpa} icon="⭐" color="#dcfce7" />
          <StatCard label="Младший возраст" value={youngest} icon="🌱" color="#fef3c7" />
          <StatCard label="Городов" value={cities} icon="🏙️" color="#fce7f3" />
        </section>
        <h2>Список студентов</h2>
        <p className="section-note">По имени, от А до Я</p>
        <StudentList students={students} sortBy="name" />
      </main>
      <Footer />
    </div>
  );
}
