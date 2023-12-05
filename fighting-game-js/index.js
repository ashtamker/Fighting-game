const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
    constructor({position, velocity}) {
        this.position  = position;
        this.velocity = velocity;
        this.height = 150;
        this.lastKey;
        this.attackBox = {
            position: this.position,
            width: 100,
            height: 50,
        }
    }

    draw() {
        canvasContext.fillStyle = 'red';
        canvasContext.fillRect(this.position.x, this.position.y, 50, this.height);
    }

    update() {
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }
        else this.velocity.y += gravity;
    }
}

const player = new Sprite({
    position: {
        x:0,
        y:0
    },
    velocity: {
        x:0,
        y:0
    } 
})

const enemy = new Sprite({
    position: {
        x:700,
        y:100
    },
    velocity: {
        x:0,
        y:0
    } 
})

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    canvasContext.fillStyle = 'black';
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    player.update();
    enemy.update();

    player.velocity.x = 0;
    enemy.velocity.x = 0;   

    // player movement
    if(keys.a.pressed && player.lastKey === 'a') {
        player.velocity.x = -1;
    } else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 1;
    }
    // enemy movement 
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -1;
    } else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 1;
    }
}

player.draw();
enemy.draw();
animate();

window.addEventListener('keydown', (event)=> {
    switch (event.key) {
        case 'd':
            keys.d.pressed = true
            player.lastKey = 'd'
            break;
        case 'a':
            keys.a.pressed = true
            player.lastKey = 'a'
            break;
        // case 's':
        //     player.velocity.y = -1
        //     break;
        case 'w': 
            player.velocity.y = -10;
            break;

            // enemy keys
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                enemy.lastKey = 'ArrowRight'
                break;
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                enemy.lastKey = 'ArrowLeft'
                break;
            // case 's':
            //     player.velocity.y = -1
            //     break;
            case 'ArrowUp': 
                enemy.velocity.y = -10;
                break;
        default:
            break;
    }
})

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'd':
            keys.d.pressed = false
            break;
        case 'a':
            keys.a.pressed = false
            break;
        // case 's':
        //     player.velocity.y = 0
        //     break;
        case 'w':
            keys.w.pressed = false
            break;
            default:
                break;
    }
        // enemy keys
        switch (event.key) {
            case 'ArrowRight':
                keys.ArrowRight.pressed = false
                break;
                case 'ArrowLeft':
                    keys.ArrowLeft.pressed = false
                    break;
        }
        
       
      
       

       
    
})