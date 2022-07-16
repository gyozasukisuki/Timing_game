const canvas = document.getElementById("GameCanvas");
const ctx = canvas.getContext('2d');

// mousedown event
canvas.addEventListener('mousedown',() =>{
    if(!bar_state){
        console.log(bar_num);
        scoreOnDisplay.score = bar_num;
        bar_state = 1;
    }
});


const rect_x_one = canvas.width/4; 
const rect_y_one = canvas.height/4;

function drawFrame(){
    ctx.beginPath();   // パスの初期化
    ctx.strokeStyle = "blue"; // 線色をセット
    ctx.lineWidth = 1;   // 線幅をセット
    ctx.rect(rect_x_one+0.5 , rect_y_one+0.5, 30.5 , 80.5); // 矩形の座標をパスにセット
    ctx.stroke();  // パスの情報をもとに線を描画
}

const textOfLetsClick = () =>{
    let str = "Let\'s click to stop bar!";
    ctx.fillStyle = "black";
    ctx.font = "bold 13px serif";
    ctx.textAlign = "center";
    ctx.fillText(str,canvas.width/5*3.5, canvas.height/2);
}

const scoreOnDisplay = {
    str:"Your clear rate is...",
    score:0,
    clearRate:0,
    rateCalculator:(score, clearRate) => {
        clearRate = Math.round((score/81) * 100);
        return clearRate;
    },
    main:function(){
        this.clearRate = this.rateCalculator(this.score,this.clearRate);
        ctx.fillStyle = "black";
        ctx.font = "bold 13px serif";
        ctx.textAlign = "center";
        ctx.fillText(this.str, canvas.width/5*3.5, canvas.height/2-13);
        ctx.fillText(`${String(this.clearRate)}%`, canvas.width/5*3.5, canvas.height/2+13);
    }
}

let rect_to = 1
let downOrUp = 0; //down -> 0 up -> 1

let y; // max(highst) -> 38 min(lowst) -> 119 => range is 81;
let cy; // y as const;
let ya;

let bar_num; // bar_num = Math.abs(y - 38 - 81); this value return 0 to 81; (lowst is 0, highst is 81);
let bar_state = 0; // if this value is 0, bar is moving. At bar is stopping, this value change to 1.

setInterval( function () {
	ctx.save() ;
	ctx.beginPath();
    ctx.clearRect( 0, 0, canvas.width, canvas.height ) ;
    ctx.fillStyle = "skyblue";
    y = rect_y_one+0.5+1;

    if(!bar_state){

        if(downOrUp == 0){
            y += rect_to;
            if(y <= (80.5-1.5)*1.5){
                ya = (80.5-1.5)*1.5-y;
                ctx.fillRect(rect_x_one+0.5+0.5, y, 30.5-1.5, ya);
                cy = y;
                //console.log("down");
                rect_to++;
            }else{
                downOrUp = 1;
            }
        }else if(downOrUp == 1){
            y += rect_to;
            if(y >= rect_y_one+0.5+1){
                ya = (80.5-1.5)*1.5-y;
                ctx.fillRect(rect_x_one+0.5+0.5, y, 30.5-1.5, ya);
                cy = y;
                //console.log("up");
                rect_to--;
            }else{
                downOrUp = 0;
            }
        }
        textOfLetsClick();
    }else if(bar_state){
        ctx.fillRect(rect_x_one+0.5+0.5, cy, 30.5-1.5, ya);
        scoreOnDisplay.main();
    }
    
    // if(y > 100)console.log(y);
    // if(y < 50)console.log(y);
    bar_num = Math.abs(y - 38 - 81);
    // console.log(bar_num);
    drawFrame();
	ctx.restore() ;
}, 25 ) ;
