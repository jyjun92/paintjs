const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range= document.getElementById("jsRange");
const mode= document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const cursor = document.body.style.cursor;

const INITIAL_COLOR = ""
const CANVAS_SIZE = 600;

canvas.width = CANVAS_SIZE;
canvas.height= CANVAS_SIZE;

ctx.fillStyle = "White";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;


let painting=false;
let filling=false;

function startPainting(){
    painting=true;
}

function stopPainting(){
    painting=false; 
}

function onMouseMove(event){
    document.body.style.cursor = "pointer";
    const x = event.offsetX
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y); 
    } else {
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function onMouseDown(event){
    painting = true;
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleRightClick(event){
    console.log(event);
    event.preventDefault();
}

function handleSaveClick(event){
    const image = canvas.toDataURL();
    console.log(image);
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS";
    link.click();
   }

function changeCursorBack(event){
    document.body.style.cursor = "default";
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick);
    canvas.addEventListener("mouseleave", changeCursorBack);
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle=color;

}

function handleRangeChange(event){
    console.log(event.target.value);
    const range = event.target.value; 
    ctx.lineWidth=range;
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText =  "Fill";
    } else{
        filling = true;
        mode.innerText="Paint";
    }
}
Array.from(colors).forEach(potato => 
    potato.addEventListener("click", handleColorClick));


    if(range){
        range.addEventListener("input", handleRangeChange);
    }

    if(mode){
        mode.addEventListener("click", handleModeClick);
    }

    if(saveBtn){
        saveBtn.addEventListener("click", handleSaveClick);
    }

   