var canvasWidth = document.getElementById("snakeCanvas").offsetWidth;
var canvasHeight = document.getElementById("snakeCanvas").offsetHeight;
console.log(canvasWidth, canvasHeight);
const height = 10;
const width = 10;
var squareHeight = canvasHeight/height;

function draw(snake, apple) {
    const canvas = document.getElementById("snakeCanvas");
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        //board render:
        var style=0;
        for(c=0;c<height;c++){
            for(r=0;r<width;r++){
                if(style%2==0){
                    ctx.fillStyle = "#242424";
                } else{
                    ctx.fillStyle = "#4a4949";
                }
                ctx.fillRect((c*squareHeight), (r*squareHeight), squareHeight+100, squareHeight);
                style++;
            }
            style++;
        }

        //draw apple
        ctx.fillStyle = "#ff2e2e";
        ctx.fillRect(apple[0]*squareHeight, apple[1]*squareHeight, squareHeight, squareHeight);

        //draw snake body
        for(i=1;i<snake.length;i++){
            ctx.fillStyle = "#58f549";
            ctx.fillRect(snake[i][0]*squareHeight, snake[i][1]*squareHeight, squareHeight, squareHeight);
        }
        //draw snake head
        ctx.fillStyle = "#2b8f45";
        ctx.fillRect(snake[0][0]*squareHeight, snake[0][1]*squareHeight, squareHeight, squareHeight);
    }
}

var direction=1; //0=up, 1=down, 2=left, 3=right
var game=true;
var snake=[[1,1], [1,0], [1,-1]]
var apple=[1,1]
var animation=[1, 1, 1, 3, 3, 3, 3, 3, 3, 1, 1, 1, 2, 2, 2, 0, 0, 0, 0, 0, 0, 2, 2, 2];
var ctr=0;
var appleEat=false;
var speed=140; //inverse scale - lower number = faster speed

window.addEventListener("load", draw(snake, apple));
var start=Date.now();

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

//main game loop
function loop(){
    var now = Date.now();

    direction=animation[ctr%animation.length];
    if((now-start)>=speed){
        if(direction==1){
            snake.unshift([snake[0][0], snake[0][1]+1]);
        }
        else if(direction==0){
            snake.unshift([snake[0][0], snake[0][1]-1]);
        }
        else if(direction==2){
            snake.unshift([snake[0][0]-1, snake[0][1]]);
        }
        else if(direction==3){
            snake.unshift([snake[0][0]+1, snake[0][1]]);
        }

        //snake wrapping
        if(snake[0][0]>canvasWidth/squareHeight){
            snake[0][0]=0;
        }
        else if(snake[0][0]<0){
            snake[0][0]=canvasWidth/squareHeight;
        }
        else if(snake[0][1]>canvasWidth/squareHeight){
            snake[0][1]=0;
        }
        else if(snake[0][1]<0){
            snake[0][1]=canvasWidth/squareHeight;
        }

        snake.pop();

        draw(snake, apple);
        start=Date.now();
        direction=animation[ctr%animation.length];
        console.log(animation[ctr%animation.length]);
        ctr++;
    }
    window.requestAnimationFrame(loop);
}


window.requestAnimationFrame(loop)