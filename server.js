"use strict";
const express = require("express");
const path = require("path");
const compression = require("compression");

// Конфигурация
const port = process.env.PORT || 3000;
const app_folder = path.join(__dirname); // абсолютный путь к папке
const options = {
  dotfiles: "ignore",
  etag: false,
  extensions: ["html", "js", "css", "scss"],
  index: false,
  maxAge: "1y",
  redirect: true,
};

// Создаем приложение
const app = express();
app.use(compression());
app.use(express.static(app_folder, options));

// Все запросы направляем на index.html (для Angular SPA)
app.get("/*", function (req, res) {
  res.sendFile(path.join(app_folder, "index.html"));
});

// Эндпоинт для получения задач
app.get("/getTasks", (req, res) => {
  res.status(200).json([
    { id: 1, name: "Commit changes", isComplete: false, userName: "Alice", date: new Date(2024, 2, 14) },
    { id: 2, name: "Do my homework", isComplete: false, userName: "Alice", date: new Date(2025, 2, 15) },
    { id: 3, name: "Prepare presentation", isComplete: false, userName: "Alice", date: new Date(2024, 4, 5) },
    { id: 4, name: "Send email", isComplete: false, userName: "Alice", date: new Date(2024, 5, 15) },
    { id: 5, name: "Buy products", isComplete: false, userName: "Charlie", date: new Date(2024, 6, 25) },
    { id: 6, name: "Lunch with Mom", isComplete: true, userName: "Anna", date: new Date(2024, 5, 17) },
    { id: 7, name: "Start learning Angular", isComplete: false, userName: "Anna", date: new Date(2024, 2, 15) },
    { id: 9, name: "Feed my dog", isComplete: false, userName: "Bob", date: new Date(2024, 2, 15) },
  ]);
});

// Слушаем порт
app.listen(port, () => {
  console.log(`Node Express server listening on http://localhost:${port}`);
});