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

        // When leaving Chapter 9
        if (currentChapter === 8) {   // Chapter 9 (0-based index)
            chapterSong.pause();
            chapterSong.currentTime = 0;

            bgMusic.play().catch(() => {});
            musicBtn.innerHTML = "▶ Play Our Song";
        }

        chapters[currentChapter].classList.remove("active");
        // Start typing when Chapter 8 opens
if(currentChapter === 7){
    setTimeout(startLetterTyping,500);
}

        currentChapter++;

        if (currentChapter >= chapters.length)
            currentChapter = chapters.length - 1;

        chapters[currentChapter].classList.add("active");

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

// ================================
// PREMIUM CHAPTER 8 TYPEWRITER
// ================================

const originalLetter = document.getElementById("letterText")?.innerHTML;

function startLetterTyping(){

    const letter = document.getElementById("letterText");

    if(!letter || !originalLetter) return;

    letter.innerHTML = "";

    let i = 0;

    function type(){

        if(i < originalLetter.length){

            letter.innerHTML += originalLetter.charAt(i) + '<span class="cursor">|</span>';

            i++;

            setTimeout(type,30);

        }else{

            letter.innerHTML = originalLetter + '<span class="cursor">|</span>';

        }

    }

    type();

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
