let count = +localStorage.getItem("count") || 0;
let clickPower = +localStorage.getItem("clickPower") || 1;

let auto = +localStorage.getItem("auto") || 0;
let autoStrong = +localStorage.getItem("autoStrong") || 0;
let autoUltra = +localStorage.getItem("autoUltra") || 0;

let level = +localStorage.getItem("level") || 0;
let nextNeed = +localStorage.getItem("nextNeed") || 100;

let lastLogin = localStorage.getItem("lastLogin") || 0;
let loginDays = +localStorage.getItem("loginDays") || 0;

const counter = document.getElementById("counter");
const robux = document.getElementById("robux");
const levelText = document.getElementById("levelText");
const levelFill = document.getElementById("levelFill");
const achievements = document.getElementById("achievements");

function save(){
localStorage.setItem("count",count);
localStorage.setItem("clickPower",clickPower);
localStorage.setItem("auto",auto);
localStorage.setItem("autoStrong",autoStrong);
localStorage.setItem("autoUltra",autoUltra);
localStorage.setItem("level",level);
localStorage.setItem("nextNeed",nextNeed);
localStorage.setItem("lastLogin",lastLogin);
localStorage.setItem("loginDays",loginDays);
}

function update(){
counter.textContent=count;
levelText.textContent=`Уровень ${level} · ${count}/${nextNeed}`;
levelFill.style.width=Math.min(count/nextNeed*100,100)+"%";

let ach=[];
if(loginDays>=1) ach.push("🎉 Первый вход");
if(loginDays>=3) ach.push("🔥 3 дня подряд");
if(loginDays>=7) ach.push("👑 Неделя в игре");
achievements.innerHTML="🏆 Ачивки:<br>"+(ach.join("<br>")||"Нет");
}

robux.onclick=()=>{
count+=clickPower;
if(count>=nextNeed) levelUp();
save();update();
};

function levelUp(){
level++;
count-=nextNeed;
nextNeed=Math.floor(nextNeed*1.5);
document.getElementById("levelUpText").textContent=`Уровень ${level}`;
document.getElementById("levelUpScreen").classList.remove("hidden");
setTimeout(()=>document.getElementById("levelUpScreen").classList.add("hidden"),2000);
}

setInterval(()=>{
let total=auto+autoStrong*5+autoUltra*25;
if(total>0){
count+=total;
if(count>=nextNeed) levelUp();
save();update();
}
},1000);

/* магазин */
upgrade1.onclick=()=>{if(count>=50){count-=50;clickPower+=1;save();update();}};
upgrade2.onclick=()=>{if(count>=200){count-=200;clickPower+=5;save();update();}};
ultraClick.onclick=()=>{if(count>=2000){count-=2000;clickPower+=25;save();update();}};

auto.onclick=()=>{if(count>=300){count-=300;auto++;save();update();}};
autoPower.onclick=()=>{if(count>=900){count-=900;autoStrong++;save();update();}};
ultraAuto.onclick=()=>{if(count>=4000){count-=4000;autoUltra++;save();update();}};

/* ачивки за вход */
const today=Math.floor(Date.now()/86400000);
if(today!=lastLogin){
loginDays++;
lastLogin=today;
save();
}

update();
