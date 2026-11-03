let boxes=document.querySelectorAll(".box");
let resetGameBtn=document.querySelector("#reset-btn");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");
let turnMsg=document.querySelector("h3");
let move=document.querySelector("h4");
let h1=document.querySelector("h1");

let turnO=true;


const winPaterns=[
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

const resetGame = () => {
    turnO=true;
    enableBoxes();
    msgContainer.classList.add("hide")

}

boxes.forEach( (box) => {
    box.addEventListener("click", () => {
        count++;
        if(turnO){
            box.innerText="O"
            turnO=false
        }else{
            box.innerText="X"
            turnO=true
        }
        box.disabled=true; 
        checkWinner();
        turn();
        suggestion();
        drawGame();
    })
})


let count=0;

let enableBoxes = () => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText ="";
        turnMsg.innerText="";
        move.innerText="";
        count=0;
    }
}

let disableBoxes = () => {
    for(let box of boxes){
        box.disabled=true;
    }
}

const showWinner = (winner) => {
    msg.innerText=`CONGRATULATION FOR PLAYER ${winner} ! YOU WIN`;
    msgContainer.classList.remove("hide")
    disableBoxes();
}

let checkWinner = () => {
    for(let pattern of winPaterns){
        let pos1Val =boxes[pattern[0]].innerText
        let pos2Val =boxes[pattern[1]].innerText
        let pos3Val =boxes[pattern[2]].innerText
        if( pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if( pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                console.log(pos1Val);
                
            }
        }
    };
}
newGameBtn.addEventListener("click", resetGame);
resetGameBtn.addEventListener("click", resetGame);


let turn = () => {
    if(turnO){
        turnMsg.innerText="IT'S PLAYER 0 TURN ";
    }else{
        turnMsg.innerText="IT'S PLAYER X TURN ";
    }
}


let comp = () => {
    let options=["eXCELlENT 👏", "G00D jOB 🔥", "W0W ! 🤩", "N1CE MOvE 😀", "iN CREDEBLE", "WHAT 🤨!"," BAD👎"];
    let idx=Math.floor(Math.random () *7)
    return options[idx];
}

let colors = () => {
    let options=["rgb(206, 182, 47)","rgb(23, 211, 23)","rgb(153, 151, 151)","chocolate","rgb(84, 134, 135)","darkorange"];
    let idx=Math.floor(Math.random()*6);
    return options[idx]
}

let rotate = () => {
    let options=["rotate(25deg)", "rotate(80deg)", "rotate(280deg)", "rotate(189deg)", "skew(50deg)", "skew(315deg)"];
    let idx=Math.floor(Math.random()*6);
    return options[idx];
}


let suggestion = () => {
    move.innerText=comp();
    move.style.color=colors();
    move.style.transform = rotate();
};


let drawGame = () => {
    if(count === 9){
        resetGameBtn.innerText="THE GAME IS DRAW. PRESS TO START AGAIN"
    }else{
        resetGameBtn.innerText="RESET GAME"
    }
}