import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideBrowserGlobalErrorListeners } from '@angular/core';
import { AppComponent } from './app/app.component';
registerLocaleData(localeRu);
bootstrapApplication(AppComponent, { providers: [provideBrowserGlobalErrorListeners()] }).catch(console.error);
