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

        chapters[currentChapter].classList.remove("active");

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

            // Play special song from the beginning
            chapterSong.currentTime = 0;
            chapterSong.play();

            musicBtn.innerHTML = "⏸ Pause Our Song";

        } else {

            // Pause special song
            chapterSong.pause();

            // Resume background music
            bgMusic.play();

            musicBtn.innerHTML = "▶ Play Our Song";

        }

    });

    // When the special song ends, resume background music automatically
    chapterSong.addEventListener("ended", () => {
        bgMusic.play();
        musicBtn.innerHTML = "▶ Play Our Song";
    });

}

// ================================
// PREMIUM TYPEWRITER LETTER
// ================================

const letter = document.getElementById("letterText");

if (letter) {

    const text = letter.innerText;
    letter.innerHTML = '<span id="typed"></span><span class="cursor">|</span>';

    const typed = document.getElementById("typed");

    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            typed.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 35);
        }
    }

    setTimeout(typeWriter, 700);
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
