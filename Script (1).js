/* ==================================================
   PREMIUM BIRTHDAY BOOK WEBSITE V4
   SCRIPT.JS

   PART 1
   3.1A - BOOK INITIALIZATION
   3.1B - COVER OPENING
   3.1C - PASSWORD SYSTEM
   3.1D - LOADING SCREEN
================================================== */


/* ==============================
   3.1A
   GLOBAL VARIABLES
============================== */


const App = {

    password : "03062025",

    currentPage : 0,

    bookOpened : false,

    unlocked : false,

    loadingFinished : false

};



const book =
document.querySelector(".book");

const cover =
document.querySelector(".book-cover");

const passwordScreen =
document.getElementById("passwordScreen");

const unlockBtn =
document.getElementById("unlockBtn");

const passwordInput =
document.getElementById("passwordInput");

const errorMsg =
document.getElementById("errorMsg");



/* ==============================
   3.1B
   BOOK OPENING
============================== */


function openBook(){


    if(App.bookOpened) return;


    App.bookOpened = true;


    if(book){

        book.classList.add("open");

    }


    console.log(
    "📖 Book opening..."
    );


}



window.addEventListener("load",()=>{


    setTimeout(()=>{

        openBook();

    },1000);


});





/* ==============================
   3.1C
   PASSWORD SYSTEM
============================== */



if(unlockBtn){


unlockBtn.addEventListener("click",()=>{


    let entered =
    passwordInput.value.trim();



    if(entered === App.password){


        App.unlocked=true;


        console.log(
        "🔓 Password Correct"
        );



        passwordSuccess();



    }

    else{


        if(errorMsg){

            errorMsg.innerHTML =
            "Wrong Password ❤️";

        }



        if(passwordInput){

            passwordInput.value="";

        }



        shakePasswordBox();



    }


});


}





function shakePasswordBox(){


    const box =
    document.querySelector(".password-box");



    if(box){


        box.animate(

        [

        {
        transform:"translateX(-15px)"
        },

        {
        transform:"translateX(15px)"
        },

        {
        transform:"translateX(-15px)"
        },

        {
        transform:"translateX(0)"
        }

        ],

        {

        duration:500

        });


    }


}





function passwordSuccess(){


    if(passwordScreen){


        passwordScreen.classList.add(
        "page-close"
        );



        setTimeout(()=>{


            passwordScreen.style.display="none";


            showLoading();



        },1200);


    }


}







/* ==============================
   3.1D
   LOADING SCREEN
============================== */



const loadingScreen =
document.getElementById("loadingScreen");


const loadingText =
document.getElementById("loadingText");


const loadingBar =
document.getElementById("loadingFill");




const loadingMessages=[


"Opening your memories ❤️",


"Preparing your special story 📖",


"Turning the pages of love ✨",


"Almost ready... 💕",


"Welcome to our little world ❤️"


];






function showLoading(){


    if(!loadingScreen) return;



    loadingScreen.style.display="flex";



    let progress=0;

    let message=0;



    const timer =
    setInterval(()=>{


        progress++;



        if(loadingBar){

            loadingBar.style.width =
            progress+"%";

        }



        if(progress % 20 === 0){


            message++;


            if(
            loadingMessages[message]
            ){

                loadingText.innerHTML =
                loadingMessages[message];

            }


        }



        if(progress>=100){


            clearInterval(timer);


            App.loadingFinished=true;


            finishLoading();



        }



    },70);



}





function finishLoading(){


    setTimeout(()=>{


        if(loadingScreen){


            loadingScreen.style.display="none";


        }



        const welcome =
        document.getElementById("welcome");



        if(welcome){


            welcome.style.display="flex";


            welcome.classList.add(
            "page-open"
            );


        }



    },700);


}





console.log(
"❤️ V4 Script Part 1 Loaded"
);
/* ==================================================
   PREMIUM BIRTHDAY BOOK WEBSITE V4

   PART 2

   3.2A - WELCOME PAGE
   3.2B - START JOURNEY
   3.2C - CHAPTER SYSTEM
   3.2D - PAGE TURN ANIMATION

================================================== */



/* ==============================
   3.2A
   WELCOME PAGE
============================== */


const startBtn =
document.getElementById("startBtn");


const welcome =
document.getElementById("welcome");


const website =
document.getElementById("website");



if(startBtn){


    startBtn.addEventListener("click",()=>{


        if(welcome){


            welcome.classList.add(
            "page-close"
            );


        }



        setTimeout(()=>{


            if(welcome){

                welcome.style.display="none";

            }



            if(website){

                website.style.display="block";

            }



            openChapter(0);



        },1000);



    });


}






/* ==============================
   3.2B
   CHAPTER COLLECTION
============================== */



const chapters =
document.querySelectorAll(".chapter");


const nextButtons =
document.querySelectorAll(".nextBtn");


const prevButtons =
document.querySelectorAll(".prevBtn");



const progress =
document.getElementById("progress");





/* ==============================
   3.2C
   CHAPTER SYSTEM
============================== */


function hideChapters(){


    chapters.forEach(chapter=>{


        chapter.style.display="none";

        chapter.classList.remove(
        "active"
        );


    });


}





function openChapter(number){


    if(chapters.length===0)
    return;



    if(number<0){

        number=0;

    }



    if(number>=chapters.length){


        openFinalPage();

        return;


    }




    hideChapters();



    App.currentPage=number;



    const page =
    chapters[number];



    page.style.display="flex";



    setTimeout(()=>{


        page.classList.add(
        "active"
        );


    },100);



    updateChapterProgress();



}







function updateChapterProgress(){


    if(progress){


        progress.innerHTML =


        "Chapter "

        +(App.currentPage+1)

        +" / "

        +chapters.length;



    }


}





/* ==============================
   3.2D
   PAGE TURN ANIMATION
============================== */



function nextPage(){



    const current =
    chapters[App.currentPage];



    if(App.currentPage >= chapters.length-1){


        openFinalPage();

        return;


    }




    const next =
    chapters[App.currentPage+1];




    if(current){


        current.classList.add(
        "turn-left"
        );


    }




    setTimeout(()=>{


        openChapter(
        App.currentPage+1
        );


    },800);



}





function previousPage(){



    if(App.currentPage<=0)
    return;



    const current =
    chapters[App.currentPage];



    if(current){


        current.classList.add(
        "turn-right"
        );


    }



    setTimeout(()=>{


        openChapter(
        App.currentPage-1
        );


    },800);



}





/* Buttons */


nextButtons.forEach(button=>{


    button.addEventListener(
    "click",
    nextPage
    );


});



prevButtons.forEach(button=>{


    button.addEventListener(
    "click",
    previousPage
    );


});






/* Keyboard page turn */


document.addEventListener(
"keydown",
(e)=>{


    if(e.key==="ArrowRight"){


        nextPage();


    }



    if(e.key==="ArrowLeft"){


        previousPage();


    }



});







console.log(
"📖 V4 Script Part 2 Loaded"
);
/* ==================================================
   PREMIUM BIRTHDAY BOOK WEBSITE V4

   PART 3

   3.3A - MUSIC SYSTEM
   3.3B - CHAPTER 9 SONG
   3.3C - ROMANTIC EFFECTS

================================================== */



/* ==============================
   3.3A
   BACKGROUND MUSIC
============================== */


const bgMusic =
document.getElementById("bgMusic");



function playBackgroundMusic(){


    if(bgMusic){


        bgMusic.volume=0.5;


        bgMusic.play()
        .catch(()=>{});


    }


}





function pauseBackgroundMusic(){


    if(bgMusic){

        bgMusic.pause();

    }


}





/* Start music after user interaction */

document.addEventListener(
"click",
()=>{


    if(App.unlocked){

        playBackgroundMusic();

    }


},
{
once:true
});






/* ==============================
   3.3B
   CHAPTER 9 SPECIAL SONG
============================== */


const chapter9Song =
document.getElementById("chapter9Song");


const musicBtn =
document.getElementById("musicBtn");



let specialSongPlaying=false;




if(musicBtn && chapter9Song){



musicBtn.addEventListener(
"click",
()=>{


    if(!specialSongPlaying){



        pauseBackgroundMusic();



        chapter9Song.play()
        .catch(()=>{});



        musicBtn.innerHTML =
        "⏸ Pause Song";



        specialSongPlaying=true;



    }

    else{


        chapter9Song.pause();



        playBackgroundMusic();



        musicBtn.innerHTML =
        "▶ Play Song";



        specialSongPlaying=false;



    }



});



}





/* ==============================
   3.3C
   FLOATING HEARTS
============================== */



function createHeart(){



    const heart =
    document.createElement("div");



    heart.className =
    "floatingHeart";



    heart.innerHTML =
    ["❤️","💕","💖","💗"]
    [
    Math.floor(
    Math.random()*4
    )
    ];



    heart.style.left =
    Math.random()*100+"vw";



    heart.style.bottom =
    "-30px";



    document.body.appendChild(
    heart
    );



    setTimeout(()=>{


        heart.remove();


    },6000);



}



setInterval(
createHeart,
1200
);








/* Sparkles on click */


document.addEventListener(
"click",
(e)=>{


    for(let i=0;i<6;i++){


        const sparkle =
        document.createElement("div");



        sparkle.className =
        "sparkle";



        sparkle.style.left =
        e.clientX+
        Math.random()*40-
        20+
        "px";



        sparkle.style.top =
        e.clientY+
        Math.random()*40-
        20+
        "px";



        document.body.appendChild(
        sparkle
        );



        setTimeout(()=>{


            sparkle.remove();


        },1500);



    }


});







/* Falling Roses */


function createRose(){



    const rose =
    document.createElement("div");



    rose.innerHTML="🌹";



    rose.style.position="fixed";

    rose.style.top="-40px";

    rose.style.left=
    Math.random()*100+"vw";

    rose.style.fontSize="25px";

    rose.style.zIndex="9999";

    rose.style.pointerEvents="none";



    document.body.appendChild(
    rose
    );



    rose.animate(

    [

    {
    transform:
    "translateY(0) rotate(0deg)"
    },

    {

    transform:
    "translateY(110vh) rotate(720deg)"

    }

    ],

    {

    duration:7000

    });



    setTimeout(()=>{


        rose.remove();


    },7000);



}





setInterval(
createRose,
2500
);





console.log(
"✨ V4 Script Part 3 Loaded"
);
/* ==================================================
   PREMIUM BIRTHDAY BOOK WEBSITE V4

   PART 4

   3.4 - FINAL EFFECTS
   3.5 - ENDING PAGE + REPLAY

================================================== */



/* ==============================
   3.4A
   FIREWORKS
============================== */


function createFirework(){


    const firework =
    document.createElement("div");


    firework.innerHTML =
    ["🎆","✨","🎇","💥"]
    [
    Math.floor(
    Math.random()*4
    )
    ];



    firework.style.position="fixed";

    firework.style.left =
    Math.random()*100+"vw";

    firework.style.top =
    Math.random()*70+"vh";

    firework.style.fontSize="40px";

    firework.style.zIndex="99999";

    firework.style.pointerEvents="none";



    document.body.appendChild(
    firework
    );



    firework.animate(

    [

    {
    transform:"scale(.2)",
    opacity:0
    },

    {
    transform:"scale(2)",
    opacity:1
    },

    {
    transform:"scale(3)",
    opacity:0
    }

    ],

    {

    duration:1500

    });



    setTimeout(()=>{

        firework.remove();

    },1500);


}





function startFireworks(){


    for(let i=0;i<25;i++){


        setTimeout(()=>{


            createFirework();


        },i*150);


    }


}





/* ==============================
   3.5A
   FINAL PAGE
============================== */


function openFinalPage(){



    const finalPage =
    document.getElementById("finalPage");



    if(!finalPage){


        console.log(
        "Final page missing"
        );

        return;


    }



    chapters.forEach(page=>{


        page.style.display="none";

        page.classList.remove(
        "active"
        );


    });



    finalPage.style.display="flex";



    setTimeout(()=>{


        finalPage.classList.add(
        "active"
        );



        startFireworks();



        closeBookAnimation();



    },300);



}







/* ==============================
   3.5B
   CLOSE BOOK
============================== */


function closeBookAnimation(){


    const book =
    document.querySelector(".book");



    if(book){


        setTimeout(()=>{


            book.classList.add(
            "close"
            );


        },2000);



    }


}







/* ==============================
   3.5C
   REPLAY SYSTEM
============================== */


const replay =
document.getElementById("restart");



if(replay){


replay.addEventListener(
"click",
()=>{



    location.reload();



});


}






/* ==============================
   3.5D
   FINAL MESSAGE
============================== */


const finalText =
document.getElementById("finalMessage");



if(finalText){


    const message =

    "I LOVE YOU KODIGUDDU ❤️";



    finalText.innerHTML="";



    let index=0;



    function typeFinal(){



        if(index < message.length){



            finalText.innerHTML +=
            message.charAt(index);



            index++;


            setTimeout(
            typeFinal,
            120
            );


        }


    }



    typeFinal();



}





console.log(
"❤️ V4 Script Part 4 Loaded Successfully"
);
// ==============================
// FINAL BUTTON CONNECTION
// ==============================

const finishBtn =
document.getElementById("finishBtn");


if(finishBtn){

    finishBtn.addEventListener("click",()=>{

        openFinalPage();

    });

}
