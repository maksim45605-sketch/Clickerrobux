let count = Number(localStorage.getItem("count")) || 0;
let clickPower = Number(localStorage.getItem("clickPower")) || 1;

const counter = document.getElementById("counter");
const robux = document.getElementById("robux");
const clickSound = document.getElementById("clickSound");

const upgrade1 = document.getElementById("upgrade1");
const upgrade2 = document.getElementById("upgrade2");

function updateUI() {
  counter.textContent = count + " 💰";
}

updateUI();

robux.addEventListener("click", () => {
  count += clickPower;
  clickSound.currentTime = 0;
  clickSound.play();

  localStorage.setItem("count", count);
  updateUI();

  robux.classList.remove("pop");
  void robux.offsetWidth;
  robux.classList.add("pop");
});

upgrade1.addEventListener("click", () => {
  if (count >= 50) {
    count -= 50;
    clickPower += 1;
    save();
  }
});

upgrade2.addEventListener("click", () => {
  if (count >= 200) {
    count -= 200;
    clickPower += 5;
    save();
  }
});

function save() {
  localStorage.setItem("count", count);
  localStorage.setItem("clickPower", clickPower);
  updateUI();
}
