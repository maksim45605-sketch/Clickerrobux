let count = +localStorage.getItem("count") || 0;
let clickPower = +localStorage.getItem("clickPower") || 1;
let autoPower = +localStorage.getItem("autoPower") || 0;
let level = +localStorage.getItem("level") || 0;
let nextLevelNeed = +localStorage.getItem("nextNeed") || 100;

const counter = document.getElementById("counter");
const robux = document.getElementById("robux");
const levelText = document.getElementById("levelText");
const levelFill = document.getElementById("levelFill");
const clickSound = document.getElementById("clickSound");

const levelUpScreen = document.getElementById("levelUpScreen");
const levelUpText = document.getElementById("levelUpText");

function save(){
  localStorage.setItem("count",count);
  localStorage.setItem("clickPower",clickPower);
  localStorage.setItem("autoPower",autoPower);
  localStorage.setItem("level",level);
  localStorage.setItem("nextNeed",nextLevelNeed);
}

function updateUI(){
  counter.textContent = count;

  const progress = Math.min(count / nextLevelNeed * 100, 100);
  levelText.textContent = `Уровень ${level} · ${count} / ${nextLevelNeed} R$`;
  levelFill.style.width = progress + "%";
}

function levelUp(){
  level++;
  count -= nextLevelNeed;
  nextLevelNeed = Math.floor(nextLevelNeed * 1.5);

  document.body.classList.add("level-up");
  setTimeout(()=>document.body.classList.remove("level-up"),400);

  levelUpText.textContent = `Уровень ${level}`;
  levelUpScreen.classList.remove("hidden");

  setTimeout(()=>levelUpScreen.classList.add("hidden"),2000);
}

robux.onclick = e => {
  count += clickPower;
  clickSound.currentTime = 0;
  clickSound.play();

  if(count >= nextLevelNeed){
    levelUp();
  }

  save();
  updateUI();
};

setInterval(()=>{
  if(autoPower>0){
    count += autoPower;
    if(count >= nextLevelNeed){
      levelUp();
    }
    save();
    updateUI();
  }
},1000);

/* 🛒 магазин */
upgrade1.onclick=()=>{ if(count>=50){count-=50;clickPower++;save();updateUI();}};
upgrade2.onclick=()=>{ if(count>=200){count-=200;clickPower+=5;save();updateUI();}};
auto.onclick=()=>{ if(count>=300){count-=300;autoPower++;save();updateUI();}};

/* 🏆 уровни */
function openLevels(){
  const screen=document.getElementById("levelsScreen");
  const list=document.getElementById("levelsList");
  list.innerHTML="";
  let need=100;
  for(let i=0;i<=level+3;i++){
    list.innerHTML+=`<div>${i<=level?"✅":"⬜"} Уровень ${i} — ${need} R$</div>`;
    need=Math.floor(need*1.5);
  }
  screen.classList.remove("hidden");
}

function closeLevels(){
  document.getElementById("levelsScreen").classList.add("hidden");
}

updateUI();
