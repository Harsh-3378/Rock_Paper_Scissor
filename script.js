
const gameContainer = document.querySelector(".container");
const userResult = document.querySelector(".user_result img");
const cpuResult = document.querySelector(".cpu_result img");
const result = document.querySelector(".result");
const optionImg = document.querySelectorAll(".option_image");
const remaingChance = document.querySelector(".chances");
const userScore = document.querySelector("#user_sc");
const cpuSocre = document.querySelector("#cpu_sc");

let chance = 5;
let userPoint = 0;
let cpuPoint = 0;

const resetGame = () => {
    chance = 5;
    userPoint = 0;
    cpuPoint = 0;
    userScore.textContent = userPoint;
    cpuSocre.textContent = cpuPoint;
    remaingChance.textContent = chance;
    result.textContent = "Let's Play";
    userResult.src = cpuResult.src = "./rock.png";
}

optionImg.forEach((image, index)=>{
    image.addEventListener("click", (e)=>{

        image.classList.add("active");

        userResult.src = cpuResult.src = "./rock.png";
        result.textContent = "Wait...";

        //IF THE CURRENT INDEX DOESN'T MATHC THE CLICKED INDEX
        //REMOVE THE "ACTIVE" CLASS FROM THE OTHER OPTION IMAGES
        optionImg.forEach((image2, index2)=>{
            index != index2 && image2.classList.remove("active");
        });

        gameContainer.classList.add("start");

       let time = setTimeout(()=>{

        gameContainer.classList.remove("start");
        let imageSrc = e.target.querySelector("img").src;
        userResult.src = imageSrc;

        //generate a random number between 0 and 2
        let randomNumber = Math.floor(Math.random() * 3);

        //crate an array of cpu image option

        let cpuImages = ["./rock.png","./paper.png","./scissor.png"];
        cpuResult.src = cpuImages[randomNumber];

        let cpuValue = ["R","P","S"][randomNumber];
        let userValue = ["R","P","S"][index];

        let outcomes = {
            RR:"Draw",
            RP:"CPU",
            RS:"USER",
            PP:"DRAW",
            PR:"USER",
            PS:"CPU",
            SS:"DRAW",
            SR:"CPU",
            SP:"USER",
        }

        let outComeValue = outcomes[userValue + cpuValue];
        result.textContent = userValue === cpuValue ? "Draw Point!" : `${outComeValue}'s Point!!`;

        if(chance != 0){
            if(outComeValue == "USER"){
                userPoint+=1;
                userScore.textContent = userPoint;
                chance-=1;
            }
            else if(outComeValue == "CPU"){
                cpuPoint+=1;
                cpuSocre.textContent = cpuPoint;
                chance-=1;
            }
            else{
                chance-=1;
            }
            remaingChance.textContent = chance;
        }
        else{
            if(userPoint>cpuPoint){
                result.textContent = "User Won!!";
                start();
                stop();
                setTimeout(resetGame,5000);
                return;
            }
            else if(cpuPoint>userPoint){
                result.textContent = "Cpu Won!!";
                setTimeout(resetGame,5000);
                return;
            }
            else{
                result.textContent = "Match Draw!!";
                setTimeout(resetGame,5000);
                return;
            }
        }

       },1500);

    });
});

const start = () =>{
    setTimeout(function(){
        confetti.start();
    },1000);
}

const stop = () =>{
    setTimeout(function(){
        confetti.stop();
    },5000)
}

