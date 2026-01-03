let count = Number(localStorage.getItem("count")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;
let autoPower = Number(localStorage.getItem("autoPower")) || 0;

let achievements = JSON.parse(localStorage.getItem("achievements")) || {};

const counter = document.getElementById("counter");
const levelEl = document.getElementById("level");
const robux = document.getElementById("robux");
const clickSound = document.getElementById("clickSound");
const achievementsEl = document.getElementById("achievements");
const statsEl = document.getElementById("stats");

function save() {
  localStorage.setItem("count", count);
  localStorage.setItem("clickPower", clickPower);
  localStorage.setItem("autoPower", autoPower);
  localStorage.setItem("achievements", JSON.stringify(achievements));
}

function updateUI() {
  counter.textContent = count;
  levelEl.textContent = "Уровень " + Math.floor(count / 100);
  achievementsEl.innerHTML = Object.keys(achievements).length
    ? Object.keys(achievements).join("<br>")
    : "Нет достижений";
}

updateUI();

/* 💥 частицы */
function spawnParticles(x, y) {
  for (let i = 0; i < 8; i++) {
    const p = document.createElement("div");
    p.className = "particle";
    p.style.left = x + "px";
    p.style.top = y + "px";
    p.style.setProperty("--x", `${(Math.random() - 0.5) * 120}px`);
    p.style.setProperty("--y", `${(Math.random() - 0.5) * 120}px`);
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 800);
  }
}

/* 🏆 toast */
function showAchievement(text) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `🏆 <b>${text}</b>`;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

/* 🏆 проверка ачивок */
function checkAchievements() {
  const list = [
    { id: "100", value: 100, text: "Первые 100 Robux" },
    { id: "500", value: 500, text: "500 Robux!" },
    { id: "1000", value: 1000, text: "Тысяча Robux 💎" }
  ];

  list.forEach(a => {
    if (count >= a.value && !achievements[a.text]) {
      achievements[a.text] = true;
      showAchievement(a.text);
      save();
    }
  });
}

/* 🖱 клик */
robux.addEventListener("click", e => {
  count += clickPower;
  clickSound.currentTime = 0;
  clickSound.play();

  spawnParticles(e.clientX, e.clientY);
  checkAchievements();
  save();
  updateUI();
});

/* ⏱ автоклик */
setInterval(() => {
  if (autoPower > 0) {
    count += autoPower;
    checkAchievements();
    save();
    updateUI();
  }
}, 1000);

/* 🛒 магазин */
document.getElementById("upgrade1").onclick = () => {
  if (count >= 50) {
    count -= 50;
    clickPower += 1;
    save();
    updateUI();
  }
};

document.getElementById("upgrade2").onclick = () => {
  if (count >= 200) {
    count -= 200;
    clickPower += 5;
    save();
    updateUI();
  }
};

document.getElementById("auto").onclick = () => {
  if (count >= 300) {
    count -= 300;
    autoPower += 1;
    save();
    updateUI();
  }
};
