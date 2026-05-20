# City Drive — GTA Style

## Запуск

Открой `index.html` в браузере. Для PWA запусти через локальный сервер:

```
npx serve .
```

Или любой другой статический сервер.

## Структура

```
city-drive/
├── index.html          — Игра (единственный файл с всей логикой)
├── manifest.json       — PWA манифест
├── sw.js               — Service Worker (офлайн-кэш)
├── assets/
│   ├── tiles/          — Тайлы (генерируются автоматически, папка для кастомных)
│   ├── image/          — Спрайты машин (генерируются автоматически, папка для кастомных)
│   └── voice/          — Озвучка катсцен
│       ├── cs01_narration_prison.mp3
│       ├── cs02_narration_accused.mp3
│       ├── cs03_narration_free.mp3
│       ├── cs04_viktor_recognize.mp3
│       ├── cs05_viktor_cops.mp3
│       ├── cs06_viktor_city.mp3
│       ├── cs07_viktor_car.mp3
│       ├── cs08_viktor_earn.mp3
│       └── cs09_narration_revenge.mp3
```

## Управление

- **WASD / Стрелки** — Вождение
- **Пробел** — Тормоз / Дрифт
- **E** — Пропустить диалог миссии
- **Тач** — Мобильные кнопки

## Озвучка

Положи файлы из списка выше в `assets/voice/`. Формат: MP3 или OGG.
Когда файлы на месте — движок катсцены автоматически их подхватит.
