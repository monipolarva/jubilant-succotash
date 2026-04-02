const tasks = [
  { id: 1, title: "Завтрак", duration: 1, priority: 2 },
  { id: 2, title: "Учёба", duration: 4, priority: 5 },
  { id: 3, title: "Прогулка", duration: 2, priority: 3 },
  { id: 4, title: "Игры", duration: 3, priority: 1 },
  { id: 5, title: "Работа", duration: 6, priority: 5 }
];

const selectedIds = [1, 2, 3, 5];

// Функции обработки (строгое соответствие ТЗ)
function extractTasks(data, ids) {
  return data.filter(item => ids.includes(item.id));
}

function countHours(list) {
  return list.reduce((total, item) => total + item.duration, 0);
}

function arrangeByPriority(list) {
  return [...list].sort((a, b) => b.priority - a.priority);
}

function pickImportant(list) {
  return list.filter(item => item.priority >= 4);
}

function verifySchedule(hours) {
  return hours <= 12 ? "допустимо" : "перегружено";
}

// Выполнение расчётов
const chosen = extractTasks(tasks, selectedIds);
const sum = countHours(chosen);
const sortedView = arrangeByPriority(chosen).map(t => ({ title: t.title, priority: t.priority }));
const importantView = pickImportant(chosen).map(t => ({ title: t.title, priority: t.priority }));
const resultStatus = verifySchedule(sum);

// Вывод в консоль (формат из задания)
console.log("Выбранные задачи:");
console.log(chosen);
console.log(`Общая длительность: ${sum} часов`);
console.log("Отсортированные задачи:");
console.log(sortedView);
console.log("Задачи с высоким приоритетом:");
console.log(importantView);
console.log(`Статус расписания: ${resultStatus}`);

// Генерация интерфейса
const grid = document.getElementById('grid');
const resultBox = document.getElementById('result');

chosen.forEach(task => {
  const card = document.createElement('div');
  card.className = 'item-card';
  const width = (task.duration / 12) * 100;
  card.innerHTML = `
    <span class="dot ${task.priority >= 4 ? 'active' : ''}"></span>
    <div class="item-title">${task.title}</div>
    <div class="item-meta">${task.duration} ч.</div>
    <div class="bar-track"><div class="bar-fill" style="width:${width}%"></div></div>
  `;
  grid.appendChild(card);
});

resultBox.textContent = `Статус: ${resultStatus} (${sum}/12 ч.)`;
resultBox.className = `status-box ${resultStatus === 'допустимо' ? 'status-ok' : 'status-warn'}`;