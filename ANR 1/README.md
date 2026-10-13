# Hybrid Hub

ASP.NET Core 10 приложение с двумя независимыми клиентами — React и Angular — и общей cookie-сессией.

## Требования

- .NET SDK 10
- Node.js LTS и npm

## Разработка

В первом терминале:

```bash
cd HybridApp.Server
dotnet run --launch-profile https
```

Во втором терминале для React:

```bash
cd HybridApp.Server/ClientApp/react
npm install
npm run dev
```

Или во втором терминале для Angular:

```bash
cd HybridApp.Server/ClientApp/angular
npm install
npm start
```

API работает на `https://localhost:7000`. React dev server — на `http://localhost:5173`, Angular — на `http://localhost:4200`.

## Публикация

```bash
cd HybridApp.Server
dotnet publish -c Release
```

MSBuild установит и соберёт оба клиента, затем положит React в `wwwroot/react`, а Angular — в `wwwroot/angular` каталога публикации.
