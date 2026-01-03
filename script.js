// 🔐 уникальный ID
let userId = localStorage.getItem("userId");
if (!userId) {
  userId = "user_" + Math.random().toString(36).slice(2);
  localStorage.setItem("userId", userId);
}

// 💾 данные
let count = Number(localStorage.getItem("count")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let autoPower = Number(localStorage.getItem("autoPower")) || 0;
let theme = localStorage.getItem("theme") || "dark";

const counter = document.getElementById("counter");
const robux = document.getElementById("robux");
const clickSound = document.getElementById("clickSound");

const levelEl = document.getElementById("level");
const achievementsEl = document.getElementById("achievements");

function updateUI() {
  counter.textContent = count + " 💰";
  levelEl.textContent = "Уровень: " + Math.floor(count / 100);
  checkAchievements();
}

function save() {
  localStorage.setItem("count", count);
  localStorage.setItem("clickPower", clickPower);
  localStorage.setItem("autoPower", autoPower);
  localStorage.setItem("theme", theme);
}

// 🖱 клик
robux.onclick = () => {
  count += clickPower;
  clickSound.currentTime = 0;
  clickSound.play();
  save();
  updateUI();
};

// ⏱ автокликер
setInterval(() => {
  count += autoPower;
  save();
  updateUI();
}, 1000);

// 🏆 достижения
function checkAchievements() {
  let text = "";
  if (count >= 100) text += "🥉 100 кликов<br>";
  if (count >= 500) text += "🥈 500 кликов<br>";
  if (count >= 1000) text += "🥇 1000 кликов<br>";
  achievementsEl.innerHTML = text || "Нет достижений";
}

// 🌈 темы
function setTheme(t) {
  document.body.className = t;
  theme = t;
  save();
}

document.getElementById("dark").onclick = () => setTheme("dark");
document.getElementById("light").onclick = () => setTheme("light");
document.getElementById("neon").onclick = () => setTheme("neon");

// 🛒 магазин
document.getElementById("auto").onclick = () => {
  if (count >= 300) {
    count -= 300;
    autoPower += 1;
    save();
    updateUI();
  }
};

document.body.className = theme;
updateUI();
