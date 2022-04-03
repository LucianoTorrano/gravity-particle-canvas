const canvas = document.querySelector('canvas');

//variables
const pi = Math.PI;
const gravity = 2;
const frictionY = .92;
const frictionX = .6;
const maxBalls = 100;
const colorArray = [
    '#0B2B40',
    '#30A5BF',
    '#185359',
    '#F2BE22',
    '#A6874E'    
];


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

window.addEventListener('resize', ()=>{
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener('click', ()=>{
    init();
})

// Ball constructor

function Ball(x,y,radius,dx,dy,color){
    x;
    y;
    dx;
    dy;
    color;
    radius;
    this.draw = function(){
        c.beginPath();
        c.arc(x,y,radius,0,pi*2,false);
        c.strokeStyle = 'white';
        c.stroke();
        c.fillStyle =color;
        c.fill();
    }
    this.update = function(){
        if(y + radius + dy> canvas.height){
            dy = -dy * frictionY;
        }else {
            dy+=gravity;
        }
        if(x+radius+dx > canvas.width ||
            x-radius < 0){
            dx=-dx *frictionX;
        }

        x+=dx;
        y+=dy;
        this.draw();
    }
}

// implementation
let ballArray;
function init(){
    ballArray = [];
    for(let i = 0; i< maxBalls ; i++){
        let radius = (Math.random()+1) * 20;
        let x = Math.random() * (innerWidth - radius * 2);
        let dx = (Math.random() -0.5) * 8;
        let y = Math.random() * (innerHeight - radius * 2);
        let dy = Math.random() * 2;
        let color = colorArray[Math.floor(Math.random() * colorArray.length)];
        ballArray.push(new Ball(x,y,radius,dx,dy,color));
    }
}

// Loop animation
function animate(){
    requestAnimationFrame(animate);
    c.clearRect(0,0,canvas.width,canvas.height);

    for(let i = 0; i < maxBalls ; i++){
        ballArray[i].update();
    }
}
// Calling functions
init();
animate();