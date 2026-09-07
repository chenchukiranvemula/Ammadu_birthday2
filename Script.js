/* =====================================================
   HAPPY BIRTHDAY WEBSITE
   CLEAN V3
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
const cakeBtn = document.getElementById("cakeBtn");
const restartBtn = document.getElementById("restart");


/* =====================================================
   CHAPTER SYSTEM
===================================================== */

let currentChapter = 0;

function showChapter(index){

    if(index < 0){
        index = 0;
    }

    if(index >= chapters.length){
        index = chapters.length - 1;
    }

    chapters.forEach(chapter => {
        chapter.classList.remove("active");
    });

    currentChapter = index;

    chapters[currentChapter].classList.add("active");

    if(currentChapter !== 8){

        if(chapterSong && !chapterSong.paused){

            chapterSong.pause();

            chapterSong.currentTime = 0;

        }

        if(bgMusic && bgMusic.paused){

            bgMusic.play().catch(() => {});

        }

        if(musicBtn){

            musicBtn.innerHTML =
                "▶ Play The Song ❤️";

        }

        if(vinyl){

            vinyl.classList.remove("spin");

        }

    }

    if(currentChapter === 9){

        startCelebration();

    }else{

        stopCelebration();

    }

}


/* =====================================================
   INITIAL LOAD
===================================================== */

window.addEventListener("load", () => {

    if(welcome){

        welcome.style.display = "flex";

    }

    if(website){

        website.style.display = "none";

    }

});


/* =====================================================
   START JOURNEY
===================================================== */

if(startBtn){

    startBtn.addEventListener("click", () => {

        welcome.style.display = "none";

        website.style.display = "block";

        showChapter(0);

        if(bgMusic){

            bgMusic.play().catch(() => {});

        }

        startHearts();

    });

}


/* =====================================================
   NEXT BUTTONS
===================================================== */

nextBtns.forEach(btn => {

    btn.addEventListener("click", () => {

        if(currentChapter < chapters.length - 1){

            showChapter(currentChapter + 1);

        }

    });

});


/* =====================================================
   PREMIUM GIFT SYSTEM
===================================================== */

const gifts =
    document.querySelectorAll(".gift");

const giftMessage =
    document.getElementById("giftMessage");


gifts.forEach(gift => {

    gift.addEventListener("click", () => {

        gift.classList.add("open");

        const message =
            gift.dataset.message || "";

        if(giftMessage){

            giftMessage.textContent = "";

            let i = 0;

            function typeGift(){

                if(i < message.length){

                    giftMessage.textContent +=
                        message.charAt(i);

                    i++;

                    setTimeout(
                        typeGift,
                        35
                    );

                }

            }

            typeGift();

        }


        /* Floating hearts */

        for(let j = 0; j < 20; j++){

            setTimeout(() => {

                const heart =
                    document.createElement("div");

                heart.textContent =
                    Math.random() > .5
                        ? "❤️"
                        : "✨";

                const rect =
                    gift.getBoundingClientRect();

                heart.style.position =
                    "fixed";

                heart.style.left =
                    (rect.left + rect.width / 2)
                    + "px";

                heart.style.top =
                    (rect.top + rect.height / 2)
                    + "px";

                heart.style.fontSize =
                    (20 + Math.random() * 15)
                    + "px";

                heart.style.pointerEvents =
                    "none";

                heart.style.zIndex =
                    "99999";

                document.body.appendChild(heart);

                heart.animate(

                    [
                        {
                            transform:
                                "translate(0,0) scale(.5)",

                            opacity:1
                        },

                        {
                            transform:
                                `translate(
                                    ${Math.random()*200-100}px,
                                    -250px
                                )
                                scale(1.8)`,

                            opacity:0
                        }
                    ],

                    {
                        duration:1800,
                        easing:"ease-out"
                    }

                );

                setTimeout(() => {

                    heart.remove();

                },1800);

            },j * 80);

        }

    });

});


/* =====================================================
   CHAPTER 7 — CANDLE BLOW
===================================================== */

let cakeBlown = false;

if(cakeBtn){

    cakeBtn.addEventListener("click", () => {

        if(cakeBlown){

            return;

        }

        cakeBlown = true;

        cakeBtn.disabled = true;

        cakeBtn.textContent =
            "✨ Wish Made ❤️";


        const candles =
            document.querySelectorAll(".candle");


        candles.forEach((candle,index) => {

            setTimeout(() => {

                candle.classList.add("blown");

                createSmoke(candle);

            },index * 120);

        });


        createCakeWind();


        const cakeMessage =
            document.getElementById("cakeMessage");

        if(cakeMessage){

            cakeMessage.textContent =
                "✨ Your wish is on its way... ❤️";

        }

    });

}


/* =====================================================
   CAKE WIND
===================================================== */

function createCakeWind(){

    for(let i = 0; i < 18; i++){

        setTimeout(() => {

            const wind =
                document.createElement("div");

            wind.textContent =
                "〰️";

            wind.style.position =
                "fixed";

            wind.style.left =
                (35 + Math.random()*30)
                + "vw";

            wind.style.top =
                (42 + Math.random()*10)
                + "vh";

            wind.style.fontSize =
                (15 + Math.random()*15)
                + "px";

            wind.style.pointerEvents =
                "none";

            wind.style.zIndex =
                "99999";

            document.body.appendChild(wind);

            wind.animate(

                [
                    {
                        transform:
                            "translateX(-20px) scale(.5)",

                        opacity:0
                    },

                    {
                        transform:
                            "translateX(80px) scale(1)",

                        opacity:.8
                    },

                    {
                        transform:
                            "translateX(160px) scale(.5)",

                        opacity:0
                    }
                ],

                {
                    duration:700,
                    easing:"ease-out"
                }

            );

            setTimeout(() => {

                wind.remove();

            },700);

        },i * 45);

    }

}


/* =====================================================
   SMOKE
===================================================== */

function createSmoke(candle){

    const rect =
        candle.getBoundingClientRect();

    const smoke =
        document.createElement("div");

    smoke.className =
        "smoke";

    smoke.textContent =
        "☁️";

    smoke.style.left =
        (rect.left + rect.width / 2)
        + "px";

    smoke.style.top =
        (rect.top - 5)
        + "px";

    document.body.appendChild(smoke);

    setTimeout(() => {

        smoke.remove();

    },2000);

}


/* =====================================================
   MUSIC
===================================================== */

const vinyl =
    document.getElementById("vinyl");


if(musicBtn){

    musicBtn.addEventListener("click", () => {

        if(!chapterSong){

            return;

        }


        if(chapterSong.paused){

            if(bgMusic){

                bgMusic.pause();

            }

            chapterSong.currentTime = 0;

            chapterSong.play().catch(() => {});


            if(vinyl){

                vinyl.classList.add("spin");

            }

            musicBtn.innerHTML =
                "⏸ Pause Song";


            startMusicEffects();

        }else{

            chapterSong.pause();

            chapterSong.currentTime = 0;

            if(bgMusic){

                bgMusic.play().catch(() => {});

            }

            if(vinyl){

                vinyl.classList.remove("spin");

            }

            musicBtn.innerHTML =
                "▶ Play The Song ❤️";

        }

    });

}


if(chapterSong){

    chapterSong.addEventListener("ended", () => {

        if(vinyl){

            vinyl.classList.remove("spin");

        }

        if(bgMusic){

            bgMusic.play().catch(() => {});

        }

        if(musicBtn){

            musicBtn.innerHTML =
                "▶ Play The Song ❤️";

        }

    });

}


/* =====================================================
   MUSIC EFFECTS
===================================================== */

function startMusicEffects(){

    for(let i = 0; i < 50; i++){

        setTimeout(() => {

            if(!chapterSong ||
               chapterSong.paused){

                return;

            }

            const note =
                document.createElement("div");

            note.textContent =
                Math.random() > .5
                    ? "🎵"
                    : "🎶";

            note.style.position =
                "fixed";

            note.style.left =
                Math.random()*100
                + "vw";

            note.style.top =
                "100vh";

            note.style.fontSize =
                (20 + Math.random()*20)
                + "px";

            note.style.pointerEvents =
                "none";

            note.style.zIndex =
                "9999";

            document.body.appendChild(note);

            note.animate(

                [
                    {
                        transform:
                            "translateY(0)",

                        opacity:1
                    },

                    {
                        transform:
                            "translateY(-100vh)",

                        opacity:0
                    }
                ],

                {
                    duration:4000
                }

            );

            setTimeout(() => {

                note.remove();

            },4000);

        },i * 150);

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

    fullLetter =
        letterText.innerText.trim();

    letterText.innerHTML = "";

}


let letterStarted = false;


function typeLetter(){

    if(letterStarted){

        return;

    }

    letterStarted = true;

    let i = 0;


    function type(){

        if(i < fullLetter.length){

            letterText.innerHTML =
                fullLetter.substring(0,i+1) +
                '<span class="cursor">|</span>';

            i++;

            createHeart();

            setTimeout(
                type,
                30
            );

        }else{

            letterText.innerHTML =
                fullLetter +
                '<span class="cursor">|</span>';

        }

    }

    type();

}


if(envelope){

    envelope.addEventListener("click", () => {

        envelope.style.transform =
            "scale(0)";

        envelope.style.opacity =
            "0";


        setTimeout(() => {

            envelope.parentElement.style.display =
                "none";

            letterBox.style.display =
                "block";


            setTimeout(() => {

                letterBox.classList.add("show");

                typeLetter();

            },200);

        },500);

    });

}


/* =====================================================
   LETTER HEARTS
===================================================== */

function createHeart(){

    const heart =
        document.createElement("div");

    heart.textContent =
        "❤️";

    heart.className =
        "typingHeart";

    heart.style.left =
        (40 + Math.random()*20)
        + "vw";

    document.body.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    },2500);

}


/* =====================================================
   FLOATING HEARTS
===================================================== */

let heartInterval = null;


function startHearts(){

    if(heartInterval){

        clearInterval(heartInterval);

    }


    heartInterval =
        setInterval(() => {

            const heart =
                document.createElement("div");

            heart.className =
                "heart";

            heart.textContent =
                "❤️";

            heart.style.left =
                Math.random()*100
                + "vw";

            heart.style.fontSize =
                (18 + Math.random()*25)
                + "px";

            document.body.appendChild(heart);

            setTimeout(() => {

                heart.remove();

            },6000);

        },700);

}


/* =====================================================
   BACKGROUND STARS
===================================================== */

setInterval(() => {

    const star =
        document.createElement("div");

    star.className =
        "star";

    star.style.left =
        Math.random()*100
        + "vw";

    star.style.top =
        Math.random()*100
        + "vh";

    document.body.appendChild(star);

    setTimeout(() => {

        star.remove();

    },3000);

},250);


/* =====================================================
   BACKGROUND PETALS
===================================================== */

setInterval(() => {

    const petal =
        document.createElement("div");

    petal.className =
        "petal";

    petal.textContent =
        "🌸";

    petal.style.left =
        Math.random()*100
        + "vw";

    petal.style.fontSize =
        (18 + Math.random()*18)
        + "px";

    document.body.appendChild(petal);

    setTimeout(() => {

        petal.remove();

    },10000);

},1000);


/* =====================================================
   FLOATING LOVE MESSAGE
===================================================== */

setInterval(() => {

    const love =
        document.createElement("div");

    love.textContent =
        "❤️ I Love You ❤️ KODIGUDDU";

    love.style.position =
        "fixed";

    love.style.left =
        Math.random()*80
        + "vw";

    love.style.bottom =
        "-40px";

    love.style.color =
        "#ffd6ec";

    love.style.fontWeight =
        "bold";

    love.style.pointerEvents =
        "none";

    love.style.zIndex =
        "1";

    document.body.appendChild(love);

    love.animate(

        [
            {
                transform:
                    "translateY(0)",

                opacity:1
            },

            {
                transform:
                    "translateY(-120vh)",

                opacity:0
            }
        ],

        {
            duration:6000
        }

    );

    setTimeout(() => {

        love.remove();

    },6000);

},8000);


/* =====================================================
   TOUCH EFFECT
===================================================== */

document.addEventListener("click", (e) => {

    if(
        e.target.closest("#photoViewer") ||
        e.target.closest("#lockScreen")
    ){

        return;

    }

    createTouchEffect(e);

});


function createTouchEffect(e){

    if(!e){

        return;

    }

    const x =
        e.clientX;

    const y =
        e.clientY;


    for(let i = 0; i < 7; i++){

        const bubble =
            document.createElement("div");

        bubble.className =
            "bubble";

        bubble.style.left =
            x + "px";

        bubble.style.top =
            y + "px";

        bubble.style.setProperty(
            "--x",
            (Math.random()*160 - 80) + "px"
        );

        bubble.style.setProperty(
            "--y",
            (Math.random()*160 - 80) + "px"
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
   CARD HEART EFFECT
===================================================== */

document
.querySelectorAll(".card,.timeBox,.gift")
.forEach(box => {

    box.addEventListener("click", () => {

        for(let i = 0; i < 8; i++){

            const heart =
                document.createElement("div");

            heart.textContent =
                Math.random() > .5
                    ? "❤️"
                    : "✨";

            heart.style.position =
                "fixed";

            const rect =
                box.getBoundingClientRect();

            heart.style.left =
                (rect.left + rect.width / 2)
                + "px";

            heart.style.top =
                (rect.top + rect.height / 2)
                + "px";

            heart.style.pointerEvents =
                "none";

            heart.style.fontSize =
                "22px";

            heart.style.zIndex =
                "9999";

            document.body.appendChild(heart);

            heart.animate(

                [
                    {
                        transform:
                            "translate(0,0) scale(.5)",

                        opacity:1
                    },

                    {
                        transform:
                            `translate(
                                ${Math.random()*160-80}px,
                                ${Math.random()*160-80}px
                            )
                            scale(1.8)`,

                        opacity:0
                    }
                ],

                {
                    duration:900
                }

            );

            setTimeout(() => {

                heart.remove();

            },900);

        }

    });

});


/* =====================================================
   CHAPTER 5
   PREMIUM 200 PHOTO GALLERY
===================================================== */

const galleryGrid =
    document.getElementById("galleryGrid");

const photoViewer =
    document.getElementById("photoViewer");

const viewerImage =
    document.getElementById("viewerImage");

const viewerCaption =
    document.getElementById("viewerCaption");

const closeViewer =
    document.getElementById("closeViewer");

const prevPhoto =
    document.getElementById("prevPhoto");

const nextPhoto =
    document.getElementById("nextPhoto");


/*
   Your original custom photos.
*/

const galleryPhotos = [

    {
        src:"Madhu1.jpg",
        caption:"ur my heart ❤️"
    },

    {
        src:"Madhu2.jpg",
        caption:"ur smile makes my day brighter ❤️"
    },

    {
        src:"Madhu3.jpg",
        caption:"ur my favorite ❤️"
    },

    {
        src:"Madhu4.jpg",
        caption:"gorgeous..😍🥰"
    },

    {
        src:"Madhu5.jpg",
        caption:"Forever favorite..🩷"
    },

    {
        src:"Madhu6.jpg",
        caption:"beautiful..💗"
    },

    {
        src:"Madhu8.jpg",
        caption:"P@ndhi..😁"
    },

    {
        src:"Madhu7.jpg",
        caption:"❤️cutie pie"
    },

    {
        src:"Madhu9.jpg",
        caption:"So kissable..😘"
    }

];


/*
   Automatically supports photos
   from Madhu10.jpg to Madhu200.jpg.
*/

for(let i = 10; i <= 200; i++){

    galleryPhotos.push({

        src:
            `Madhu${i}.jpg`,

        caption:
            `Beautiful memory ${i} ❤️`

    });

}


/* =====================================================
   BUILD GALLERY
===================================================== */

function buildGallery(){

    if(!galleryGrid){

        return;

    }

    galleryGrid.innerHTML = "";


    galleryPhotos.forEach(
        (photo,index) => {

            const card =
                document.createElement("div");

            card.className =
                "memoryPhoto";

            card.innerHTML = `

                <img
                    src="${photo.src}"
                    alt="Memory"
                    loading="lazy"
                    decoding="async"
                >

                <div class="memoryCaption">
                    ${photo.caption}
                </div>

            `;


            const image =
                card.querySelector("img");


            /*
               Missing files are automatically
               removed instead of showing
               broken image icons.
            */

            image.onerror = () => {

                card.remove();

            };


            card.addEventListener(
                "click",
                () => {

                    openPhoto(index);

                }
            );


            galleryGrid.appendChild(card);

        }
    );

}


buildGallery();


/* =====================================================
   PHOTO VIEWER
===================================================== */

let currentPhotoIndex = 0;


function openPhoto(index){

    if(!galleryPhotos[index]){

        return;

    }

    currentPhotoIndex =
        index;

    updateViewer();

    photoViewer.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


function updateViewer(){

    const photo =
        galleryPhotos[currentPhotoIndex];

    if(!photo){

        return;

    }

    viewerImage.src =
        photo.src;

    viewerImage.alt =
        "Memory";

    viewerCaption.textContent =
        photo.caption;

}


function closePhotoViewer(){

    photoViewer.classList.remove("show");

    document.body.style.overflow =
        "";

    setTimeout(() => {

        if(!photoViewer.classList.contains("show")){

            viewerImage.src =
                "";

        }

    },300);

}


if(closeViewer){

    closeViewer.addEventListener(
        "click",
        closePhotoViewer
    );

}


/* =====================================================
   NEXT / PREVIOUS
===================================================== */

function showNextPhoto(){

    currentPhotoIndex++;

    if(
        currentPhotoIndex >=
        galleryPhotos.length
    ){

        currentPhotoIndex = 0;

    }

    updateViewer();

}


function showPreviousPhoto(){

    currentPhotoIndex--;

    if(currentPhotoIndex < 0){

        currentPhotoIndex =
            galleryPhotos.length - 1;

    }

    updateViewer();

}


if(nextPhoto){

    nextPhoto.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

            showNextPhoto();

        }
    );

}


if(prevPhoto){

    prevPhoto.addEventListener(
        "click",
        (e) => {

            e.stopPropagation();

            showPreviousPhoto();

        }
    );

}


/* =====================================================
   TAP OUTSIDE = CLOSE
===================================================== */

if(photoViewer){

    photoViewer.addEventListener(
        "click",
        (e) => {

            if(
                e.target ===
                photoViewer
            ){

                closePhotoViewer();

            }

        }
    );

}


/* =====================================================
   KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    (e) => {

        if(
            !photoViewer ||
            !photoViewer.classList.contains("show")
        ){

            return;

        }

        if(e.key === "Escape"){

            closePhotoViewer();

        }

        if(e.key === "ArrowRight"){

            showNextPhoto();

        }

        if(e.key === "ArrowLeft"){

            showPreviousPhoto();

        }

    }
);


/* =====================================================
   MOBILE SWIPE
===================================================== */

let touchStartX = 0;
let touchStartY = 0;

let touchEndX = 0;
let touchEndY = 0;


if(photoViewer){

    photoViewer.addEventListener(
        "touchstart",
        (e) => {

            const touch =
                e.changedTouches[0];

            touchStartX =
                touch.clientX;

            touchStartY =
                touch.clientY;

        },
        {
            passive:true
        }
    );


    photoViewer.addEventListener(
        "touchend",
        (e) => {

            const touch =
                e.changedTouches[0];

            touchEndX =
                touch.clientX;

            touchEndY =
                touch.clientY;

            handlePhotoSwipe();

        },
        {
            passive:true
        }
    );

}


function handlePhotoSwipe(){

    const deltaX =
        touchEndX - touchStartX;

    const deltaY =
        touchEndY - touchStartY;

    const absX =
        Math.abs(deltaX);

    const absY =
        Math.abs(deltaY);


    /* Horizontal */

    if(
        absX > 60 &&
        absX > absY
    ){

        if(deltaX < 0){

            showNextPhoto();

        }else{

            showPreviousPhoto();

        }

        return;

    }


    /* Vertical = close */

    if(
        absY > 90 &&
        absY > absX
    ){

        closePhotoViewer();

    }

}


/* =====================================================
   CHAPTER 10 — FIREWORKS
===================================================== */

const fireworksCanvas =
    document.getElementById(
        "fireworksCanvas"
    );

const fireworkCtx =
    fireworksCanvas
        ? fireworksCanvas.getContext("2d")
        : null;


let fireworksAnimation = null;

let fireworksRunning = false;

let fireworks = [];

let particles = [];


function resizeFireworksCanvas(){

    if(!fireworksCanvas){

        return;

    }

    const rect =
        fireworksCanvas.parentElement
            .getBoundingClientRect();

    const dpr =
        window.devicePixelRatio || 1;

    fireworksCanvas.width =
        rect.width * dpr;

    fireworksCanvas.height =
        rect.height * dpr;

    fireworksCanvas.style.width =
        rect.width + "px";

    fireworksCanvas.style.height =
        rect.height + "px";

    if(fireworkCtx){

        fireworkCtx.setTransform(
            dpr,
            0,
            0,
            dpr,
            0,
            0
        );

    }

}


window.addEventListener(
    "resize",
    resizeFireworksCanvas
);


/* =====================================================
   CREATE FIREWORK
===================================================== */

function createFirework(){

    if(!fireworksCanvas){

        return;

    }

    const rect =
        fireworksCanvas
            .getBoundingClientRect();

    const x =
        60 +
        Math.random() *
        Math.max(
            1,
            rect.width - 120
        );

    const targetY =
        50 +
        Math.random() *
        Math.max(
            1,
            rect.height * .55
        );

    fireworks.push({

        x:x,

        y:rect.height + 10,

        targetY:targetY,

        speed:
            6 + Math.random()*3,

        radius:2

    });

}


/* =====================================================
   EXPLODE
===================================================== */

function explodeFirework(firework){

    const amount =
        55 + Math.floor(
            Math.random()*35
        );


    for(let i = 0; i < amount; i++){

        const angle =
            Math.random() *
            Math.PI *
            2;

        const speed =
            1.5 +
            Math.random()*5;


        particles.push({

            x:firework.x,

            y:firework.y,

            vx:
                Math.cos(angle) *
                speed,

            vy:
                Math.sin(angle) *
                speed,

            life:
                70 +
                Math.random()*30,

            maxLife:
                100,

            size:
                1.5 +
                Math.random()*2.5

        });

    }

}


/* =====================================================
   FIREWORK ANIMATION
===================================================== */

function animateFireworks(){

    if(
        !fireworksRunning ||
        !fireworkCtx ||
        !fireworksCanvas
    ){

        return;

    }


    const rect =
        fireworksCanvas
            .getBoundingClientRect();


    fireworkCtx.clearRect(
        0,
        0,
        rect.width,
        rect.height
    );


    /* Rockets */

    fireworks.forEach(
        (firework,index) => {

            firework.y -=
                firework.speed;


            fireworkCtx.beginPath();

            fireworkCtx.arc(
                firework.x,
                firework.y,
                firework.radius,
                0,
                Math.PI * 2
            );

            fireworkCtx.fillStyle =
                "rgba(255,255,255,.95)";

            fireworkCtx.shadowBlur =
                15;

            fireworkCtx.shadowColor =
                "#ff69b4";

            fireworkCtx.fill();

            fireworkCtx.shadowBlur =
                0;


            if(
                firework.y <=
                firework.targetY
            ){

                explodeFirework(
                    firework
                );

                fireworks.splice(
                    index,
                    1
                );

            }

        }
    );


    /* Particles */

    particles.forEach(
        (particle,index) => {

            particle.x +=
                particle.vx;

            particle.y +=
                particle.vy;

            particle.vy +=
                .045;

            particle.vx *=
                .985;

            particle.vy *=
                .985;

            particle.life -=
                1;


            const alpha =
                Math.max(
                    0,
                    particle.life /
                    particle.maxLife
                );


            fireworkCtx.beginPath();

            fireworkCtx.arc(
                particle.x,
                particle.y,
                particle.size,
                0,
                Math.PI * 2
            );

            fireworkCtx.fillStyle =
                `rgba(
                    255,
                    ${100 + Math.random()*155},
                    ${180 + Math.random()*75},
                    ${alpha}
                )`;

            fireworkCtx.shadowBlur =
                10;

            fireworkCtx.shadowColor =
                "#ff1493";

            fireworkCtx.fill();

            fireworkCtx.shadowBlur =
                0;


            if(
                particle.life <= 0
            ){

                particles.splice(
                    index,
                    1
                );

            }

        }
    );


    fireworksAnimation =
        requestAnimationFrame(
            animateFireworks
        );

}


/* =====================================================
   START FIREWORKS
===================================================== */

function startFireworks(){

    if(!fireworksCanvas){

        return;

    }

    resizeFireworksCanvas();

    fireworksRunning =
        true;


    if(fireworksAnimation){

        cancelAnimationFrame(
            fireworksAnimation
        );

    }


    animateFireworks();


    /* Launch continuously */

    if(!window.fireworkLauncher){

        window.fireworkLauncher =
            setInterval(() => {

                if(fireworksRunning){

                    createFirework();

                }

            },650);

    }

}


/* =====================================================
   STOP FIREWORKS
===================================================== */

function stopFireworks(){

    fireworksRunning =
        false;

    fireworks = [];

    particles = [];

    if(fireworksAnimation){

        cancelAnimationFrame(
            fireworksAnimation
        );

        fireworksAnimation =
            null;

    }

    if(fireworkCtx &&
       fireworksCanvas){

        const rect =
            fireworksCanvas
                .getBoundingClientRect();

        fireworkCtx.clearRect(
            0,
            0,
            rect.width,
            rect.height
        );

    }

}


/* =====================================================
   CHAPTER 10 CELEBRATION
===================================================== */

let celebrationInterval =
    null;


function startCelebration(){

    stopCelebration();


    const icons = [
        "🎈",
        "🎊",
        "🎉",
        "✨",
        "❤️",
        "🌸",
        "💖"
    ];


    celebrationInterval =
        setInterval(() => {

            const item =
                document.createElement("div");

            item.className =
                "partyItem";

            item.textContent =
                icons[
                    Math.floor(
                        Math.random() *
                        icons.length
                    )
                ];

            item.style.left =
                Math.random()*100
                + "vw";

            item.style.fontSize =
                (20 + Math.random()*30)
                + "px";

            document.body.appendChild(item);


            setTimeout(() => {

                item.remove();

            },4000);

        },180);


    startFireworks();


    /* Immediate fireworks */

    for(let i = 0; i < 5; i++){

        setTimeout(() => {

            createFirework();

        },i * 300);

    }

}


function stopCelebration(){

    if(celebrationInterval){

        clearInterval(
            celebrationInterval
        );

        celebrationInterval =
            null;

    }


    document
        .querySelectorAll(".partyItem")
        .forEach(item => {

            item.remove();

        });


    stopFireworks();

}


/* =====================================================
   RESTART
===================================================== */

if(restartBtn){

    restartBtn.addEventListener(
        "click",
        () => {

            location.reload();

        }
    );

}


/* =====================================================
   LOVE LOCK
===================================================== */

const dayPicker =
    document.getElementById(
        "dayPicker"
    );

const monthPicker =
    document.getElementById(
        "monthPicker"
    );

const yearPicker =
    document.getElementById(
        "yearPicker"
    );

const unlockBtn =
    document.getElementById(
        "unlockBtn"
    );

const chanceCount =
    document.getElementById(
        "chanceCount"
    );

const roseArea =
    document.getElementById(
        "roseArea"
    );

const timerArea =
    document.getElementById(
        "timerArea"
    );

const lockScreen =
    document.getElementById(
        "lockScreen"
    );


/* Correct date */

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
   DATE OPTIONS
===================================================== */

if(dayPicker){

    for(let i = 1; i <= 31; i++){

        const option =
            document.createElement(
                "option"
            );

        option.value =
            i;

        option.textContent =
            i;

        dayPicker.appendChild(
            option
        );

    }

}


if(monthPicker){

    months.forEach(
        (month,index) => {

            const option =
                document.createElement(
                    "option"
                );

            option.value =
                index + 1;

            option.textContent =
                month;

            monthPicker.appendChild(
                option
            );

        }
    );

}


if(yearPicker){

    for(
        let year = 2000;
        year <= 2050;
        year++
    ){

        const option =
            document.createElement(
                "option"
            );

        option.value =
            year;

        option.textContent =
            year;

        yearPicker.appendChild(
            option
        );

    }

}


/* =====================================================
   DEFAULT SELECTED DATE
===================================================== */

if(dayPicker){

    dayPicker.value =
        PASSWORD.day;

}

if(monthPicker){

    monthPicker.value =
        PASSWORD.month;

}

if(yearPicker){

    yearPicker.value =
        PASSWORD.year;

}


/* =====================================================
   ATTEMPTS
===================================================== */

let attempts = 5;

let locked = false;

let lockTimer = null;


if(unlockBtn){

    unlockBtn.addEventListener(
        "click",
        () => {

            if(locked){

                return;

            }


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

        }
    );

}


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

        "🌸 Close your eyes... Remember any special date 💖",

        "❤️ Love always remembers... Try again.",

        "🌷 One last chance... Think about our proposal.",

        "🥀 Too many wrong memories..."

    ];


    const messageIndex =
        Math.min(
            messages.length - 1,
            Math.max(
                0,
                5 - attempts - 1
            )
        );


    roseArea.textContent =
        messages[messageIndex];


    const container =
        document.querySelector(
            ".lockContainer"
        );


    if(container){

        container.animate(

            [
                {
                    transform:
                        "translateX(-12px)"
                },

                {
                    transform:
                        "translateX(12px)"
                },

                {
                    transform:
                        "translateX(-8px)"
                },

                {
                    transform:
                        "translateX(8px)"
                },

                {
                    transform:
                        "translateX(0)"
                }

            ],

            {
                duration:450
            }

        );

    }


    if(attempts <= 0){

        startTimer();

    }

}


/* =====================================================
   LOCK TIMER
===================================================== */

function startTimer(){

    if(locked){

        return;

    }

    locked = true;

    unlockBtn.disabled =
        true;


    let timeLeft =
        60;


    timerArea.textContent =
        "Try again in " +
        timeLeft +
        " seconds";


    lockTimer =
        setInterval(() => {

            timeLeft--;

            timerArea.textContent =
                "Try again in " +
                timeLeft +
                " seconds";


            if(timeLeft <= 0){

                clearInterval(
                    lockTimer
                );

                attempts =
                    5;

                chanceCount.textContent =
                    attempts;

                unlockBtn.disabled =
                    false;

                timerArea.textContent =
                    "";

                roseArea.textContent =
                    "";

                locked =
                    false;

            }

        },1000);

}


/* =====================================================
   UNLOCK
===================================================== */

function unlockLove(){

    locked = true;

    unlockBtn.disabled =
        true;


    playHeartUnlock();


    const rose =
        document.createElement("div");

    rose.className =
        "unlockRose";

    rose.textContent =
        "🌹";

    document.body.appendChild(
        rose
    );


    const text =
        document.createElement("div");

    text.className =
        "unlockText";

    text.innerHTML = `
        🌹<br>
        16 September 2024 ❤️<br>
        Our Proposal day
    `;

    document.body.appendChild(
        text
    );


    /* Petals */

    for(let i = 0; i < 120; i++){

        setTimeout(() => {

            const petal =
                document.createElement(
                    "div"
                );

            petal.className =
                "petal";

            petal.textContent =
                Math.random() > .5
                    ? "🌸"
                    : "❤️";

            petal.style.left =
                Math.random()*100
                + "vw";

            petal.style.animationDuration =
                (4 + Math.random()*4)
                + "s";

            document.body.appendChild(
                petal
            );


            setTimeout(() => {

                petal.remove();

            },8000);

        },i * 40);

    }


    /* Sparkles */

    for(let i = 0; i < 80; i++){

        setTimeout(() => {

            const sparkle =
                document.createElement(
                    "div"
                );

            sparkle.textContent =
                "✨";

            sparkle.style.position =
                "fixed";

            sparkle.style.left =
                Math.random()*100
                + "vw";

            sparkle.style.top =
                Math.random()*100
                + "vh";

            sparkle.style.fontSize =
                "18px";

            sparkle.style.zIndex =
                "1000000";

            sparkle.style.pointerEvents =
                "none";

            document.body.appendChild(
                sparkle
            );


            sparkle.animate(

                [
                    {
                        transform:
                            "scale(.2)",

                        opacity:1
                    },

                    {
                        transform:
                            "scale(2)",

                        opacity:0
                    }
                ],

                {
                    duration:1500
                }

            );


            setTimeout(() => {

                sparkle.remove();

            },1500);

        },i * 25);

    }


    /* Hide lock */

    setTimeout(() => {

        lockScreen.style.transition =
            "opacity 2s ease";

        lockScreen.style.opacity =
            "0";


        setTimeout(() => {

            lockScreen.style.display =
                "none";

            lockScreen.style.opacity =
                "";

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
   HEART UNLOCK
===================================================== */

function playHeartUnlock(){

    const lock =
        document.createElement(
            "div"
        );

    lock.className =
        "heartLock";

    lock.textContent =
        "💖";

    document.body.appendChild(
        lock
    );


    setTimeout(() => {

        const key =
            document.createElement(
                "div"
            );

        key.className =
            "magicKey";

        key.textContent =
            "🗝️";

        document.body.appendChild(
            key
        );


        setTimeout(() => {

            const flash =
                document.createElement(
                    "div"
                );

            flash.className =
                "unlockFlash";

            document.body.appendChild(
                flash
            );


            setTimeout(() => {

                flash.remove();

                key.remove();

                lock.remove();

            },900);

        },2800);

    },800);

}


/* =====================================================
   LOCK BACKGROUND HEARTS
===================================================== */

setInterval(() => {

    if(
        !lockScreen ||
        lockScreen.style.display === "none"
    ){

        return;

    }


    const heart =
        document.createElement(
            "div"
        );

    heart.style.position =
        "fixed";

    heart.style.top =
        "-50px";

    heart.style.left =
        Math.random()*100
        + "vw";

    heart.style.fontSize =
        (15 + Math.random()*18)
        + "px";

    heart.style.pointerEvents =
        "none";

    heart.style.zIndex =
        "2";

    heart.textContent =
        Math.random() > .5
            ? "❤️"
            : "💖";


    document.body.appendChild(
        heart
    );


    heart.animate(

        [
            {
                transform:
                    "translateY(-50px) rotate(0)",

                opacity:1
            },

            {
                transform:
                    "translateY(120vh) rotate(720deg)",

                opacity:0
            }
        ],

        {
            duration:
                6000 + Math.random()*5000
        }

    );


    setTimeout(() => {

        heart.remove();

    },11000);

},700);


/* =====================================================
   SELECT GLOW
===================================================== */

document
.querySelectorAll(
    "#dayPicker,#monthPicker,#yearPicker"
)
.forEach(select => {

    select.addEventListener(
        "change",
        () => {

            select.classList.add(
                "selectedGlow"
            );


            setTimeout(() => {

                select.classList.remove(
                    "selectedGlow"
                );

            },500);

        }
    );

});


/* =====================================================
   VIBRATION
===================================================== */

function vibratePhone(){

    if(
        navigator.vibrate
    ){

        navigator.vibrate(
            [100,80,100]
        );

    }

                              }
