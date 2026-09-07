/* =====================================================
   PREMIUM BIRTHDAY WEBSITE
   COMPLETE CLEAN SCRIPT
===================================================== */


/* =====================================================
   ELEMENTS
===================================================== */

const welcome = document.getElementById("welcome");
const website = document.getElementById("website");
const startBtn = document.getElementById("startBtn");

const chapters = document.querySelectorAll(".chapter");
const nextBtns = document.querySelectorAll(".nextBtn");

const bgMusic = document.getElementById("bgMusic");
const chapterSong = document.getElementById("chapter9Song");

const musicBtn = document.getElementById("musicBtn");
const vinyl = document.getElementById("vinyl");

const cakeBtn = document.getElementById("cakeBtn");
const cakeMessage = document.getElementById("cakeMessage");

const restartBtn = document.getElementById("restart");

let currentChapter = 0;


/* =====================================================
   INITIAL STATE
===================================================== */

window.addEventListener("load", () => {

    welcome.style.display = "flex";
    website.style.display = "none";

    chapters.forEach(chapter => {
        chapter.classList.remove("active");
    });

    createStars();

});


/* =====================================================
   START JOURNEY
===================================================== */

startBtn.addEventListener("click", () => {

    welcome.style.display = "none";
    website.style.display = "block";

    currentChapter = 0;

    chapters.forEach(chapter => {
        chapter.classList.remove("active");
    });

    chapters[currentChapter].classList.add("active");

    bgMusic.play().catch(() => {});

    startHearts();

});


/* =====================================================
   CHAPTER NAVIGATION
===================================================== */

nextBtns.forEach(button => {

    button.addEventListener("click", () => {

        /* Chapter 9 song */
        if(currentChapter === 8){

            stopChapterSong();

        }

        if(currentChapter < chapters.length - 1){

            chapters[currentChapter].classList.remove("active");

            currentChapter++;

            chapters[currentChapter].classList.add("active");

        }

        /* Chapter 10 */
        if(currentChapter === 9){

            startCelebration();

        }else{

            stopCelebration();

        }

        /* Scroll gallery to top when entering it */
        if(currentChapter === 4){

            const galleryChapter = chapters[currentChapter];

            galleryChapter.scrollTop = 0;

        }

    });

});


/* =====================================================
   AUTOMATIC GALLERY
===================================================== */

/*
    Add files like:

    Madhu1.jpg
    Madhu2.jpg
    Madhu3.jpg
    ...
    Madhu100.jpg

    The gallery automatically creates them.

    Change this number if you want more.
*/

const TOTAL_PHOTOS = 150;

const gallery = document.getElementById("gallery");

const quotes = [

    "ur my heart ❤️",

    "ur smile makes my day brighter ❤️",

    "ur my favorite ❤️",

    "gorgeous..😍🥰",

    "Forever favorite..🩷",

    "beautiful..💗",

    "P@ndhi..😁",

    "❤️ cutie pie",

    "So kissable. 😘",

    "You make every moment beautiful ❤️",

    "A beautiful memory 🌸",

    "Always special 💗",

    "My favorite person ❤️",

    "That smile... 🥰",

    "Pure happiness ✨",

    "A memory worth keeping ❤️",

    "Beautiful as always 🌹",

    "One of my favorite moments 💖",

    "Forever memorable ❤️",

    "Simply gorgeous ✨"

];


/*
    Creates the photo element.
*/

function createGallery(){

    if(!gallery) return;

    gallery.innerHTML = "";

    for(let i = 1; i <= TOTAL_PHOTOS; i++){

        const photo = document.createElement("div");

        photo.className = "photo";

        photo.style.animationDelay =
            Math.min(i * 0.025, 1.2) + "s";

        const image = document.createElement("img");

        image.src = `Madhu${i}.jpg`;

        image.alt = "Memory";

        image.loading = i <= 6 ? "eager" : "lazy";

        image.decoding = "async";

        /*
            If an image doesn't exist,
            automatically remove its card.
        */

        image.addEventListener("error", () => {

            photo.remove();

        });

        /*
            Caption automatically appears
            below the photo.
        */

        const quote = document.createElement("p");

        quote.className = "photoQuote";

        quote.textContent =
            quotes[(i - 1) % quotes.length];

        photo.appendChild(image);
        photo.appendChild(quote);

        gallery.appendChild(photo);

        /*
            Fullscreen viewer
        */

        photo.addEventListener("click", () => {

            openPhoto(image.src);

        });

    }

}

createGallery();


/* =====================================================
   PHOTO VIEWER
===================================================== */

const photoViewer = document.getElementById("photoViewer");
const viewerImage = document.getElementById("viewerImage");
const closeViewer = document.getElementById("closeViewer");

function openPhoto(src){

    if(!photoViewer || !viewerImage) return;

    viewerImage.src = src;

    photoViewer.classList.add("show");

    document.body.style.overflow = "hidden";

}

function closePhoto(){

    if(!photoViewer) return;

    photoViewer.classList.remove("show");

    document.body.style.overflow = "";

    setTimeout(() => {

        viewerImage.src = "";

    },300);

}

closeViewer.addEventListener("click", (event) => {

    event.stopPropagation();

    closePhoto();

});


/*
    Tap outside the image to close.
*/

photoViewer.addEventListener("click", (event) => {

    if(event.target === photoViewer){

        closePhoto();

    }

});


/*
    Prevent tapping the image from closing it.
*/

viewerImage.addEventListener("click", event => {

    event.stopPropagation();

});


/*
    ESC closes viewer.
*/

document.addEventListener("keydown", event => {

    if(event.key === "Escape"){

        closePhoto();

    }

});


/* =====================================================
   GIFT SYSTEM
===================================================== */

const gifts = document.querySelectorAll(".gift");
const giftMessage = document.getElementById("giftMessage");

gifts.forEach(gift => {

    gift.addEventListener("click", () => {

        gifts.forEach(g => {

            if(g !== gift){

                g.classList.remove("open");

            }

        });

        gift.classList.add("open");

        const message = gift.dataset.message;

        typeGiftMessage(message);

        createGiftParticles(gift);

    });

});


let giftTypingTimer;

function typeGiftMessage(message){

    clearTimeout(giftTypingTimer);

    giftMessage.textContent = "";

    let index = 0;

    function type(){

        if(index < message.length){

            giftMessage.textContent +=
                message.charAt(index);

            index++;

            giftTypingTimer =
                setTimeout(type,35);

        }

    }

    type();

}


function createGiftParticles(gift){

    const rect = gift.getBoundingClientRect();

    for(let i = 0; i < 18; i++){

        setTimeout(() => {

            const particle =
                document.createElement("div");

            particle.textContent =
                Math.random() > .5 ? "❤️" : "✨";

            particle.style.position = "fixed";

            particle.style.left =
                rect.left + rect.width / 2 + "px";

            particle.style.top =
                rect.top + rect.height / 2 + "px";

            particle.style.fontSize =
                18 + Math.random() * 18 + "px";

            particle.style.pointerEvents = "none";

            particle.style.zIndex = "99999";

            document.body.appendChild(particle);

            particle.animate([

                {
                    transform:"translate(0,0) scale(.4)",
                    opacity:1
                },

                {
                    transform:
                        `translate(
                            ${Math.random()*180-90}px,
                            ${-100-Math.random()*150}px
                        ) scale(1.5)`,
                    opacity:0
                }

            ],{

                duration:1500,
                easing:"ease-out"

            });

            setTimeout(() => {

                particle.remove();

            },1500);

        },i * 60);

    }

}


/* =====================================================
   CHAPTER 7 — REAL CANDLE BLOW
===================================================== */

let cakeBlown = false;

if(cakeBtn){

    cakeBtn.addEventListener("click", () => {

        if(cakeBlown) return;

        cakeBlown = true;

        const candles =
            document.querySelectorAll(".candle");

        /*
            Slight delay between candles
            for a natural blow-out effect.
        */

        candles.forEach((candle, index) => {

            setTimeout(() => {

                candle.classList.add("blown");

                createSmokeParticle(candle);

            },index * 180);

        });

        /*
            Cake glow effect
        */

        document.querySelector(".realCake")
            ?.animate([

                {
                    filter:"brightness(1)"
                },

                {
                    filter:"brightness(1.5)"
                },

                {
                    filter:"brightness(1)"
                }

            ],{

                duration:1000

            });

        cakeMessage.innerHTML =
            "✨ Wish made... Happy Birthday Ammadu ❤️ ✨";

        createCakeCelebration();

    });

}


function createSmokeParticle(candle){

    const rect =
        candle.getBoundingClientRect();

    for(let i = 0; i < 3; i++){

        const smoke =
            document.createElement("div");

        smoke.textContent = "☁️";

        smoke.style.position = "fixed";

        smoke.style.left =
            rect.left + rect.width / 2 + "px";

        smoke.style.top =
            rect.top - 15 + "px";

        smoke.style.fontSize = "18px";

        smoke.style.pointerEvents = "none";

        smoke.style.zIndex = "9999";

        document.body.appendChild(smoke);

        smoke.animate([

            {
                transform:"translate(0,0) scale(.5)",
                opacity:.6
            },

            {
                transform:
                    `translate(
                        ${Math.random()*30-15}px,
                        -${50+Math.random()*40}px
                    ) scale(1.5)`,
                opacity:0
            }

        ],{

            duration:2000,
            easing:"ease-out"

        });

        setTimeout(() => {

            smoke.remove();

        },2000);

    }

}


function createCakeCelebration(){

    const symbols =
        ["✨","❤️","🌸","💖","🎉"];

    for(let i = 0; i < 30; i++){

        setTimeout(() => {

            const item =
                document.createElement("div");

            item.textContent =
                symbols[
                    Math.floor(
                        Math.random()*symbols.length
                    )
                ];

            item.style.position = "fixed";

            item.style.left =
                Math.random()*100 + "vw";

            item.style.top =
                "65vh";

            item.style.fontSize =
                18 + Math.random()*20 + "px";

            item.style.pointerEvents = "none";

            item.style.zIndex = "9999";

            document.body.appendChild(item);

            item.animate([

                {
                    transform:"translateY(0) scale(.5)",
                    opacity:1
                },

                {
                    transform:
                        `translateY(
                            -${150+Math.random()*250}px
                        ) scale(1.5)`,
                    opacity:0
                }

            ],{

                duration:1800,
                easing:"ease-out"

            });

            setTimeout(() => {

                item.remove();

            },1800);

        },i*40);

    }

}


/* =====================================================
   MUSIC
===================================================== */

if(musicBtn){

    musicBtn.addEventListener("click", () => {

        if(chapterSong.paused){

            bgMusic.pause();

            chapterSong.currentTime = 0;

            chapterSong.play().catch(() => {});

            vinyl?.classList.add("spin");

            musicBtn.textContent =
                "⏸ Pause Song";

            startMusicEffects();

        }else{

            stopChapterSong();

        }

    });

}


function stopChapterSong(){

    if(!chapterSong) return;

    chapterSong.pause();

    chapterSong.currentTime = 0;

    bgMusic.play().catch(() => {});

    vinyl?.classList.remove("spin");

    if(musicBtn){

        musicBtn.textContent =
            "▶ Play The Song ❤️";

    }

}


chapterSong?.addEventListener("ended", () => {

    vinyl?.classList.remove("spin");

    bgMusic.play().catch(() => {});

    if(musicBtn){

        musicBtn.textContent =
            "▶ Play The Song ❤️";

    }

});


function startMusicEffects(){

    for(let i = 0; i < 30; i++){

        setTimeout(() => {

            const note =
                document.createElement("div");

            note.textContent =
                Math.random() > .5
                    ? "🎵"
                    : "🎶";

            note.style.position = "fixed";

            note.style.left =
                Math.random()*100 + "vw";

            note.style.top =
                "100vh";

            note.style.fontSize =
                18 + Math.random()*20 + "px";

            note.style.pointerEvents = "none";

            note.style.zIndex = "9999";

            document.body.appendChild(note);

            note.animate([

                {
                    transform:"translateY(0)",
                    opacity:1
                },

                {
                    transform:"translateY(-110vh)",
                    opacity:0
                }

            ],{

                duration:4000,
                easing:"linear"

            });

            setTimeout(() => {

                note.remove();

            },4000);

        },i*160);

    }

}


/* =====================================================
   LOVE LETTER
===================================================== */

const envelope =
    document.getElementById("openLetter");

const letterBox =
    document.getElementById("letterBox");

const letterText =
    document.getElementById("letterText");

let fullLetter = "";

if(letterText){

    fullLetter = letterText.innerText.trim();

    letterText.innerHTML = "";

}


let letterOpened = false;

envelope?.addEventListener("click", () => {

    if(letterOpened) return;

    letterOpened = true;

    envelope.style.transform =
        "scale(0) rotateX(90deg)";

    envelope.style.opacity = "0";

    setTimeout(() => {

        envelope.parentElement.style.display =
            "none";

        letterBox.style.display =
            "block";

        typeLetter();

    },500);

});


function typeLetter(){

    if(!letterText) return;

    let index = 0;

    function type(){

        if(index < fullLetter.length){

            letterText.innerHTML =
                escapeHTML(
                    fullLetter.substring(0,index+1)
                ) +
                '<span class="cursor">|</span>';

            index++;

            if(index % 8 === 0){

                createTypingHeart();

            }

            setTimeout(type,28);

        }else{

            letterText.innerHTML =
                escapeHTML(fullLetter) +
                '<span class="cursor">|</span>';

        }

    }

    type();

}


function escapeHTML(text){

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


function createTypingHeart(){

    const heart =
        document.createElement("div");

    heart.textContent = "❤️";

    heart.className = "typingHeart";

    heart.style.left =
        40 + Math.random()*20 + "vw";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    },2500);

}


/* =====================================================
   FLOATING HEARTS
===================================================== */

let heartInterval;

function startHearts(){

    clearInterval(heartInterval);

    heartInterval =
        setInterval(() => {

            if(
                document.getElementById("lockScreen") &&
                document.getElementById("lockScreen").style.display !== "none"
            ){

                return;

            }

            const heart =
                document.createElement("div");

            heart.className = "heart";

            heart.textContent =
                Math.random() > .5
                    ? "❤️"
                    : "💖";

            heart.style.left =
                Math.random()*100 + "vw";

            heart.style.fontSize =
                18 + Math.random()*24 + "px";

            document.body.appendChild(heart);

            setTimeout(() => {

                heart.remove();

            },6000);

        },700);

}


/* =====================================================
   STARS
===================================================== */

function createStars(){

    setInterval(() => {

        const lock =
            document.getElementById("lockScreen");

        /*
            Don't overload the page.
        */

        if(document.querySelectorAll(".star").length > 45){

            return;

        }

        const star =
            document.createElement("div");

        star.className = "star";

        star.style.left =
            Math.random()*100 + "vw";

        star.style.top =
            Math.random()*100 + "vh";

        document.body.appendChild(star);

        setTimeout(() => {

            star.remove();

        },3000);

    },300);

}


/* =====================================================
   PETALS
===================================================== */

setInterval(() => {

    const petal =
        document.createElement("div");

    petal.className = "petal";

    petal.textContent =
        Math.random() > .5
            ? "🌸"
            : "🌹";

    petal.style.left =
        Math.random()*100 + "vw";

    petal.style.fontSize =
        16 + Math.random()*18 + "px";

    const duration =
        7 + Math.random()*5;

    petal.style.animationDuration =
        duration + "s";

    document.body.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    },duration*1000);

},1000);


/* =====================================================
   TOUCH EFFECT
===================================================== */

let lastTouchTime = 0;

document.addEventListener("click", event => {

    /*
        Don't create effects while clicking
        the fullscreen photo viewer.
    */

    if(event.target.closest("#photoViewer")) return;

    createTouchEffect(event);

});


document.addEventListener("touchstart", event => {

    const now = Date.now();

    if(now - lastTouchTime < 250) return;

    lastTouchTime = now;

    if(event.touches[0]){

        createTouchEffect(event.touches[0]);

    }

},{passive:true});


function createTouchEffect(event){

    const x = event.clientX;
    const y = event.clientY;

    if(
        typeof x !== "number" ||
        typeof y !== "number"
    ){

        return;

    }

    for(let i = 0; i < 5; i++){

        const bubble =
            document.createElement("div");

        bubble.className = "bubble";

        bubble.style.left =
            x + "px";

        bubble.style.top =
            y + "px";

        bubble.style.setProperty(
            "--x",
            Math.random()*120-60 + "px"
        );

        bubble.style.setProperty(
            "--y",
            Math.random()*120-60 + "px"
        );

        bubble.textContent =
            Math.random() > .5
                ? "❤️"
                : "✨";

        document.body.appendChild(bubble);

        setTimeout(() => {

            bubble.remove();

        },1500);

    }

}


/* =====================================================
   CHAPTER 10 CELEBRATION
===================================================== */

let celebrationInterval = null;
let fireworksInterval = null;


function startCelebration(){

    stopCelebration();

    const icons =
        ["🎈","🎊","🎉","✨","❤️","🌸","💖"];

    celebrationInterval =
        setInterval(() => {

            const item =
                document.createElement("div");

            item.className =
                "partyItem";

            item.textContent =
                icons[
                    Math.floor(
                        Math.random()*icons.length
                    )
                ];

            item.style.left =
                Math.random()*100 + "vw";

            item.style.fontSize =
                20 + Math.random()*25 + "px";

            item.style.animationDuration =
                3 + Math.random()*2 + "s";

            document.body.appendChild(item);

            setTimeout(() => {

                item.remove();

            },5000);

        },180);


    /*
        Multiple fireworks.
    */

    launchFirework();

    fireworksInterval =
        setInterval(() => {

            launchFirework();

        },900);

}


function stopCelebration(){

    if(celebrationInterval){

        clearInterval(celebrationInterval);

        celebrationInterval = null;

    }

    if(fireworksInterval){

        clearInterval(fireworksInterval);

        fireworksInterval = null;

    }

    document
        .querySelectorAll(".partyItem")
        .forEach(item => item.remove());

    document
        .querySelectorAll(".fireworkParticle,.fireworkCore")
        .forEach(item => item.remove());

}


/* =====================================================
   ADVANCED FIREWORK
===================================================== */

function launchFirework(){

    const area =
        document.getElementById("fireworks");

    if(!area) return;

    const rect =
        area.getBoundingClientRect();

    /*
        Keep explosions away from
        extreme edges.
    */

    const x =
        12 + Math.random()*76;

    const y =
        15 + Math.random()*55;

    const core =
        document.createElement("div");

    core.className =
        "fireworkCore";

    core.style.left =
        x + "%";

    core.style.top =
        y + "%";

    area.appendChild(core);

    setTimeout(() => {

        core.remove();

    },600);


    const particleCount = 45;

    for(let i = 0; i < particleCount; i++){

        const particle =
            document.createElement("div");

        particle.className =
            "fireworkParticle";

        particle.style.left =
            x + "%";

        particle.style.top =
            y + "%";

        /*
            Random explosion direction.
        */

        const angle =
            (Math.PI*2*i)/particleCount
            + (Math.random()-.5)*.2;

        const distance =
            70 + Math.random()*130;

        const dx =
            Math.cos(angle)*distance;

        const dy =
            Math.sin(angle)*distance;

        particle.style.setProperty(
            "--dx",
            dx + "px"
        );

        particle.style.setProperty(
            "--dy",
            dy + "px"
        );

        particle.style.setProperty(
            "--duration",
            (700+Math.random()*700) + "ms"
        );

        /*
            Use text color rather than
            fixed CSS color.
        */

        const hue =
            Math.floor(Math.random()*360);

        particle.style.color =
            `hsl(${hue},100%,70%)`;

        particle.style.background =
            `hsl(${hue},100%,70%)`;

        area.appendChild(particle);

        setTimeout(() => {

            particle.remove();

        },1500);

    }

}


/* =====================================================
   RESTART
===================================================== */

restartBtn?.addEventListener("click", () => {

    location.reload();

});


/* =====================================================
   LOVE LOCK
===================================================== */

const dayPicker =
    document.getElementById("dayPicker");

const monthPicker =
    document.getElementById("monthPicker");

const yearPicker =
    document.getElementById("yearPicker");

const unlockBtn =
    document.getElementById("unlockBtn");

const chanceCount =
    document.getElementById("chanceCount");

const roseArea =
    document.getElementById("roseArea");

const timerArea =
    document.getElementById("timerArea");

const lockScreen =
    document.getElementById("lockScreen");


const PASSWORD = {
    day:16,
    month:9,
    year:2024
};


const months = [

    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"

];


/* =====================================================
   DATE SELECTORS
===================================================== */

for(let i = 1; i <= 31; i++){

    const option =
        document.createElement("option");

    option.value = i;
    option.textContent = i;

    dayPicker.appendChild(option);

}


months.forEach((month,index) => {

    const option =
        document.createElement("option");

    option.value = index + 1;

    option.textContent = month;

    monthPicker.appendChild(option);

});


for(let year = 1900; year <= 2100; year++){

    const option =
        document.createElement("option");

    option.value = year;

    option.textContent = year;

    yearPicker.appendChild(option);

}


/*
    Set the correct date as default.
*/

dayPicker.value =
    PASSWORD.day;

monthPicker.value =
    PASSWORD.month;

yearPicker.value =
    PASSWORD.year;


/* =====================================================
   UNLOCK
===================================================== */

let attempts = 5;
let timerRunning = false;


unlockBtn.addEventListener("click", () => {

    if(timerRunning) return;

    const day =
        Number(dayPicker.value);

    const month =
        Number(monthPicker.value);

    const year =
        Number(yearPicker.value);


    if(
        day === PASSWORD.day &&
        month === PASSWORD.month &&
        year === PASSWORD.year
    ){

        unlockLove();

    }else{

        wrongDate();

    }

});


/* =====================================================
   WRONG DATE
===================================================== */

function wrongDate(){

    vibratePhone();

    attempts--;

    chanceCount.textContent =
        attempts;


    const messages = [

        "🌹 Not this memory...",

        "🌸 Close your eyes... Remember our special date 💖",

        "❤️ Love always remembers... Try again.",

        "🌷 Think about our proposal day...",

        "🥀 Too many wrong memories..."

    ];


    const messageIndex =
        Math.min(
            messages.length-1,
            5-attempts-1
        );

    roseArea.textContent =
        messages[messageIndex];


    const container =
        document.querySelector(".lockContainer");


    container.animate([

        {transform:"translateX(-12px)"},

        {transform:"translateX(12px)"},

        {transform:"translateX(-8px)"},

        {transform:"translateX(8px)"},

        {transform:"translateX(0)"}

    ],{

        duration:450

    });


    if(attempts <= 0){

        startTimer();

    }

}


/* =====================================================
   TIMER
===================================================== */

function startTimer(){

    timerRunning = true;

    unlockBtn.disabled = true;

    let timeLeft = 60;

    timerArea.textContent =
        "Try again in " +
        timeLeft +
        " seconds";


    const timer =
        setInterval(() => {

            timeLeft--;

            timerArea.textContent =
                "Try again in " +
                timeLeft +
                " seconds";


            if(timeLeft <= 0){

                clearInterval(timer);

                attempts = 5;

                chanceCount.textContent =
                    attempts;

                unlockBtn.disabled = false;

                timerRunning = false;

                timerArea.textContent = "";

                roseArea.textContent = "";

            }

        },1000);

}


/* =====================================================
   UNLOCK LOVE
===================================================== */

function unlockLove(){

    unlockBtn.disabled = true;

    playHeartUnlock();


    const rose =
        document.createElement("div");

    rose.className =
        "unlockRose";

    rose.textContent =
        "🌹";

    document.body.appendChild(rose);


    const text =
        document.createElement("div");

    text.className =
        "unlockText";

    text.innerHTML =
        `
        🌹<br>
        16 September 2024 ❤️<br>
        Our Proposal Day
        `;

    document.body.appendChild(text);


    /*
        Petal shower
    */

    for(let i = 0; i < 80; i++){

        setTimeout(() => {

            const petal =
                document.createElement("div");

            petal.className =
                "petal";

            petal.textContent =
                Math.random() > .5
                    ? "🌸"
                    : "❤️";

            petal.style.left =
                Math.random()*100 + "vw";

            petal.style.animationDuration =
                4 + Math.random()*4 + "s";

            document.body.appendChild(petal);

            setTimeout(() => {

                petal.remove();

            },8000);

        },i*45);

    }


    /*
        Sparkles
    */

    for(let i = 0; i < 60; i++){

        setTimeout(() => {

            const sparkle =
                document.createElement("div");

            sparkle.textContent = "✨";

            sparkle.style.position =
                "fixed";

            sparkle.style.left =
                Math.random()*100 + "vw";

            sparkle.style.top =
                Math.random()*100 + "vh";

            sparkle.style.fontSize =
                15 + Math.random()*20 + "px";

            sparkle.style.zIndex =
                "1000001";

            sparkle.style.pointerEvents =
                "none";

            document.body.appendChild(sparkle);

            sparkle.animate([

                {
                    transform:"scale(.2)",
                    opacity:1
                },

                {
                    transform:"scale(2)",
                    opacity:0
                }

            ],{

                duration:1200

            });

            setTimeout(() => {

                sparkle.remove();

            },1200);

        },i*30);

    }


    /*
        Reveal welcome screen.
    */

    setTimeout(() => {

        lockScreen.style.transition =
            "opacity 2s ease";

        lockScreen.style.opacity =
            "0";


        setTimeout(() => {

            lockScreen.style.display =
                "none";

            welcome.style.display =
                "flex";

            website.style.display =
                "none";

            rose.remove();
            text.remove();

        },2000);

    },5500);

}


/* =====================================================
   HEART LOCK ANIMATION
===================================================== */

function playHeartUnlock(){

    const lock =
        document.createElement("div");

    lock.className =
        "heartLock";

    lock.textContent =
        "💖";

    document.body.appendChild(lock);


    setTimeout(() => {

        const key =
            document.createElement("div");

        key.className =
            "magicKey";

        key.textContent =
            "🗝️";

        document.body.appendChild(key);


        setTimeout(() => {

            const flash =
                document.createElement("div");

            flash.className =
                "unlockFlash";

            document.body.appendChild(flash);


            setTimeout(() => {

                flash.remove();
                key.remove();
                lock.remove();

            },900);

        },2800);

    },800);

}


/* =====================================================
   PICKER GLOW
===================================================== */

[
    dayPicker,
    monthPicker,
    yearPicker
].forEach(select => {

    select.addEventListener("change", () => {

        select.classList.add(
            "selectedGlow"
        );

        setTimeout(() => {

            select.classList.remove(
                "selectedGlow"
            );

        },500);

    });

});


/* =====================================================
   VIBRATION
===================================================== */

function vibratePhone(){

    if(
        "vibrate" in navigator
    ){

        navigator.vibrate([
            100,
            80,
            100
        ]);

    }

}


/* =====================================================
   MOBILE SAFETY
===================================================== */

window.addEventListener("resize", () => {

    /*
        Prevent accidental horizontal
        scrolling after orientation changes.
    */

    document.documentElement
        .scrollLeft = 0;

    document.body
        .scrollLeft = 0;

});


/* =====================================================
   PREVENT BROKEN IMAGE DRAG
===================================================== */

document.addEventListener("dragstart", event => {

    if(event.target.tagName === "IMG"){

        event.preventDefault();

    }

});
