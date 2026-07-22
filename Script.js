// ================================
// HAPPY BIRTHDAY WEBSITE SCRIPT
// (No Password Version)
// ================================

// Elements
const welcome = document.getElementById("welcome");
const website = document.getElementById("website");
const startBtn = document.getElementById("startBtn");

const chapters = document.querySelectorAll(".chapter");
const nextBtns = document.querySelectorAll(".nextBtn");

const bgMusic = document.getElementById("bgMusic");
const chapterSong = document.getElementById("chapter9Song");

const musicBtn = document.getElementById("musicBtn");
const cakeBtn = document.getElementById("cakeBtn");
const restartBtn = document.getElementById("restart");

// Show Welcome Screen
window.onload = () => {
    welcome.style.display = "flex";
    website.style.display = "none";
};

// ================================
// START JOURNEY
// ================================

let currentChapter = 0;

startBtn.addEventListener("click", () => {

    welcome.style.display = "none";
    website.style.display = "block";

    chapters.forEach(c => c.classList.remove("active"));

    currentChapter = 0;
    chapters[currentChapter].classList.add("active");

    bgMusic.play().catch(() => {});

    startHearts();

});

// ================================
// NEXT BUTTONS
// ================================

nextBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        // Leaving Chapter 9 (special song)
        if(currentChapter === 8){
            chapterSong.pause();
            chapterSong.currentTime = 0;
            bgMusic.play().catch(() => {});
            musicBtn.innerHTML = "▶ Play Our Song";
        }

        chapters[currentChapter].classList.remove("active");

        currentChapter++;

        if(currentChapter >= chapters.length){
            currentChapter = chapters.length - 1;
        }

        chapters[currentChapter].classList.add("active");
        

        // Entering Chapter 8
        if(currentChapter === 7){
            setTimeout(startLetterTyping,500);
        }

        // Entering Chapter 10
        if(currentChapter === 9){
            startCelebration();
        }
        // Leaving Chapter 10
if (currentChapter === 9) {
    stopCelebration();
}

    });

});
// ================================
// GIFTS
// ================================

const giftMessage = document.getElementById("giftMessage");

document.querySelectorAll(".gift").forEach(gift => {

    gift.addEventListener("click", () => {

        giftMessage.innerHTML = gift.dataset.message;

        gift.style.transform = "scale(1.15) rotate(10deg)";

        setTimeout(() => {

            gift.style.transform = "";

        },400);

    });

});

// ================================
// CAKE
// ================================

if(cakeBtn){

cakeBtn.addEventListener("click",()=>{

    alert("🎂 Happy Birthday Ammadu ❤️");

    createFireworks();

});

}

// ================================
// MUSIC
// ================================

if (musicBtn) {

    musicBtn.addEventListener("click", () => {

        if (chapterSong.paused) {

            // Pause background music
            bgMusic.pause();

            // Play Chapter 9 song
            chapterSong.currentTime = 0;
            chapterSong.play();

            musicBtn.innerHTML = "⏸ Pause Song";

        } else {

            // Stop Chapter 9 song
            chapterSong.pause();
            chapterSong.currentTime = 0;

            // Resume background music
            bgMusic.play().catch(() => {});

            musicBtn.innerHTML = "▶ Play Our Song";
        }

    });

}

// ======================================
// PREMIUM LOVE LETTER
// ======================================

const envelope = document.getElementById("openLetter");
const letterBox = document.getElementById("letterBox");
const letterText = document.getElementById("letterText");

const fullLetter = letterText.innerText;

letterText.innerHTML = "";

function typeLetter(){

    let i = 0;

    function type(){

        if(i < fullLetter.length){

            letterText.innerHTML =
                fullLetter.substring(0,i+1) +
                '<span class="cursor">|</span>';

            i++;

            createHeart();

            setTimeout(type,35);

        }else{

            letterText.innerHTML =
                fullLetter +
                '<span class="cursor">|</span>';

        }

    }

    type();

}

if(envelope){

    envelope.addEventListener("click",()=>{

        envelope.style.transform="scale(0)";
        envelope.style.opacity="0";

        setTimeout(()=>{

            envelope.parentElement.style.display="none";

            letterBox.style.display="block";

            setTimeout(()=>{

                letterBox.classList.add("show");

                typeLetter();

            },200);

        },500);

    });

}


// Floating hearts while typing

function createHeart(){

    const heart=document.createElement("div");

    heart.innerHTML="❤️";

    heart.className="typingHeart";

    heart.style.left=(40+Math.random()*20)+"vw";

    document.body.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },2500);

}
// ================================
// FLOATING HEARTS
// ================================

function startHearts(){

setInterval(()=>{

const heart=document.createElement("div");

heart.className="heart";

heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(18+Math.random()*25)+"px";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},6000);

},500);

}

// ================================
// FIREWORKS
// ================================

function createFireworks(){

const area=document.getElementById("fireworks");

for(let i=0;i<70;i++){

const spark=document.createElement("div");

spark.className="sparkle";

spark.style.left=Math.random()*100+"%";

spark.style.top=Math.random()*100+"%";

area.appendChild(spark);

setTimeout(()=>{

spark.remove();

},2000);

}

}

// ================================
// RESTART
// ================================

if(restartBtn){

restartBtn.addEventListener("click",()=>{

location.reload();

});

           }
// ================================
// TOUCH EFFECTS (Bubbles + Hearts)
// ================================

document.addEventListener("click", createTouchEffect);
document.addEventListener("touchstart", (e) => {
    createTouchEffect(e.touches[0]);
});

function createTouchEffect(e){

    const x = e.clientX;
    const y = e.clientY;

    for(let i=0;i<10;i++){

        const bubble=document.createElement("div");
        bubble.className="bubble";
        bubble.style.left=x+"px";
        bubble.style.top=y+"px";

        bubble.style.setProperty("--x",(Math.random()*200-100)+"px");
        bubble.style.setProperty("--y",(Math.random()*200-100)+"px");

        bubble.innerHTML=Math.random()>0.5?"❤️":"✨";

        document.body.appendChild(bubble);

        setTimeout(()=>{
            bubble.remove();
        },1500);

    }

}
// ================================
// CHAPTER 10 CELEBRATION
// ================================

let celebrationInterval;

function startCelebration() {

    const icons = ["🎈","🎊","🎉","✨","❤️","🌸"];

    celebrationInterval = setInterval(() => {

        const item = document.createElement("div");

        item.className = "partyItem";

        item.innerHTML = icons[Math.floor(Math.random() * icons.length)];

        item.style.left = Math.random() * 100 + "vw";
        item.style.fontSize = (20 + Math.random() * 30) + "px";

        document.body.appendChild(item);

        setTimeout(() => {
            item.remove();
        }, 4000);

    }, 120);

    createFireworks();
}

function stopCelebration() {
    clearInterval(celebrationInterval);

    document.querySelectorAll(".partyItem").forEach(e => e.remove());
}
// ================================
// PREMIUM BACKGROUND EFFECTS
// ================================

createStars();
createPetals();

function createStars(){

setInterval(()=>{

const star=document.createElement("div");

star.className="star";

star.style.left=Math.random()*100+"vw";
star.style.top=Math.random()*100+"vh";

document.body.appendChild(star);

setTimeout(()=>{
star.remove();
},3000);

},200);

}

function createPetals(){

setInterval(()=>{

const petal=document.createElement("div");

petal.className="petal";

petal.innerHTML="🌸";

petal.style.left=Math.random()*100+"vw";
petal.style.fontSize=(18+Math.random()*18)+"px";

document.body.appendChild(petal);

setTimeout(()=>{
petal.remove();
},10000);

},800);

}

// Floating "I Love You"
setInterval(()=>{

const love=document.createElement("div");

love.innerHTML="❤️ I Love You ❤️";

love.style.position="fixed";
love.style.left=Math.random()*80+"vw";
love.style.bottom="-40px";
love.style.color="#ffd6ec";
love.style.fontWeight="bold";
love.style.pointerEvents="none";
love.style.zIndex="999";

love.animate([
{transform:"translateY(0)",opacity:1},
{transform:"translateY(-120vh)",opacity:0}
],{
duration:6000
});

document.body.appendChild(love);

setTimeout(()=>{
love.remove();
},6000);

},7000);
// ==============================
// CARD HEART EFFECT
// ==============================

document.querySelectorAll(".card,.timeBox,.gift,.photo").forEach(box=>{

box.addEventListener("click",()=>{

for(let i=0;i<8;i++){

const heart=document.createElement("div");

heart.innerHTML=Math.random()>0.5?"❤️":"✨";

heart.style.position="fixed";

const rect=box.getBoundingClientRect();

heart.style.left=(rect.left+rect.width/2)+"px";
heart.style.top=(rect.top+rect.height/2)+"px";

heart.style.pointerEvents="none";
heart.style.fontSize="22px";
heart.style.zIndex="9999";

heart.animate([
{
transform:"translate(0,0) scale(.5)",
opacity:1
},
{
transform:`translate(${Math.random()*160-80}px,${Math.random()*160-80}px) scale(1.8)`,
opacity:0
}
],{
duration:900
});

document.body.appendChild(heart);

setTimeout(()=>{
heart.remove();
},900);

}

});

});
//========================================
// LOVE LOCK SYSTEM
//========================================

const SECRET_DAY = 16;
const SECRET_MONTH = 9;
const SECRET_YEAR = 2024;

let attempts = 5;
let locked = false;

const lockScreen = document.getElementById("lockScreen");
const unlockBtn = document.getElementById("unlockBtn");

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const chance = document.getElementById("chance");
const roseMessage = document.getElementById("roseMessage");
const lockMessage = document.getElementById("lockMessage");

const roseTexts = [

"🌹<br><b>Remember My Proposal  ❤️</b>",

"🌸<br><b>Think about our sweetest memory 💕</b>",

"🌺<br><b>You are getting closer ❤️</b>",

"🌷<br><b>One more chance... Believe in your heart 💖</b>",

"🥀<br><b>Too many wrong memories 💔</b>"

];

unlockBtn.addEventListener("click",()=>{

if(locked) return;

const d = Number(dayInput.value);
const m = Number(monthInput.value);
const y = Number(yearInput.value);

if(d===SECRET_DAY && m===SECRET_MONTH && y===SECRET_YEAR){

unlockSuccess();

}else{

wrongPassword();

}

});

function wrongPassword(){

attempts--;

chance.innerHTML=attempts;

roseMessage.innerHTML=roseTexts[Math.max(0,5-attempts-1)];

lockCardShake();

createRoseExplosion();

if(attempts<=0){

startLockTimer();

}

}

function unlockSuccess(){

roseMessage.innerHTML=
"🌹<br><h2>Our First Kiss Day ❤️</h2>";

createHeartExplosion();

setTimeout(()=>{

lockScreen.style.transition="1.2s";

lockScreen.style.opacity="0";

setTimeout(()=>{

lockScreen.style.display="none";

},1200);

},2500);

}

function lockCardShake(){

document.querySelector(".lockCard").animate([

{transform:"translateX(-10px)"},

{transform:"translateX(10px)"},

{transform:"translateX(-8px)"},

{transform:"translateX(8px)"},

{transform:"translateX(0)"}

],{

duration:450

});

}

function createHeartExplosion(){

for(let i=0;i<60;i++){

const heart=document.createElement("div");

heart.innerHTML=Math.random()>0.5?"❤️":"🌸";

heart.className="partyItem";

heart.style.left=Math.random()*100+"vw";

heart.style.top=Math.random()*100+"vh";

heart.style.fontSize=(20+Math.random()*25)+"px";

document.body.appendChild(heart);

setTimeout(()=>heart.remove(),3500);

}

}

function createRoseExplosion(){

const rose=document.createElement("div");

rose.innerHTML="🌹";

rose.style.position="fixed";

rose.style.left="50%";

rose.style.top="65%";

rose.style.transform="translate(-50%,-50%) scale(.2)";

rose.style.fontSize="40px";

rose.style.zIndex="999999";

rose.style.transition="1s";

document.body.appendChild(rose);

setTimeout(()=>{

rose.style.transform="translate(-50%,-50%) scale(5)";

rose.style.opacity="0";

},50);

setTimeout(()=>rose.remove(),1000);

}

function startLockTimer(){

locked=true;

let sec=60;

unlockBtn.disabled=true;

const timer=document.createElement("div");

timer.className="lockTimer";

lockMessage.appendChild(timer);

const x=setInterval(()=>{

timer.innerHTML=
"⏳ Try Again in <br><b>"+sec+"s</b>";

sec--;

if(sec<0){

clearInterval(x);

locked=false;

attempts=5;

chance.innerHTML=5;

unlockBtn.disabled=false;

timer.remove();

roseMessage.innerHTML="";

dayInput.value="";
monthInput.value="";
yearInput.value="";

}

},1000);

}
