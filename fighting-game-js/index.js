const canvas = document.querySelector('canvas');
const canvasContext = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

canvasContext.fillRect(0, 0, canvas.width, canvas.height);

const gravity = 0.7;

class Sprite {
    constructor({position, velocity, color = 'red', offset}) {
        this.position  = position;
        this.velocity = velocity;
        this.width = 50;
        this.height = 150;
        this.lastKey;
        this.color = color;
        this.attackBox = {
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            offset,
            width: 100,
            height: 50,
        }
        this.isAttacking
    }

    draw() {
        canvasContext.fillStyle = this.color;
        canvasContext.fillRect(this.position.x, this.position.y, 50, this.height, this.width);
        // attack box 
        if(this.isAttacking) {
            canvasContext.fillStyle = "blue";
            canvasContext.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height,
            )
        }
    }

    update() {
        this.draw();
        this.attackBox.position.x = this.position.x + this.attackBox.offset.x
        this.attackBox.position.y = this.position.y
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        if(this.position.y + this.height + this.velocity.y >= canvas.height) {
            this.velocity.y = 0;
        }
         else this.velocity.y += gravity;
    }

    attack() {
        this.isAttacking = true;
        setTimeout(() => {
            this.isAttacking = false;
        }, 100);
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
    },
    offset: {
        x: 0,
        y: 0
    } 

})

const enemy = new Sprite({
    color: 'green',
    position: {
        x:700,
        y:100
    },
    velocity: {
        x:0,
        y:0
    },
    offset: {
        x: -50,
        y: 0
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

function hitBox({rectangle1, rectangle2}) {
    return (
        rectangle1.attackBox.position.x + rectangle1.attackBox.width >= rectangle2.position.x &&
        rectangle1.attackBox.position.x <= rectangle2.position.x + rectangle2.width &&
        rectangle1.attackBox.position.y + rectangle1.attackBox.height >= rectangle2.position.y &&
        rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height   
    )
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
        player.velocity.x = -3;
    } else if(keys.d.pressed && player.lastKey === 'd'){
        player.velocity.x = 3;
    }
    // enemy movement 
    if(keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
        enemy.velocity.x = -3;
    } else if(keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight'){
        enemy.velocity.x = 3;
    }

    // collapse 
    if ( hitBox({rectangle1: player, 
        rectangle2: enemy
        }) && player.isAttacking ) 
        {
        player.isAttacking = false;
        document.querySelector("#enemy-health").style.width = '20%';
        console.log("pain")
    }

    if ( hitBox({rectangle1: enemy, 
        rectangle2: player
        }) && enemy.isAttacking ) 
        {
        enemy.isAttacking = false;
        console.log("pain to player")
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
        case 'w': 
            player.velocity.y = -10;
            break;
        case ' ':
            player.attack()
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
            case 'ArrowUp': 
                enemy.velocity.y = -10;
                break;
            case 'ArrowDown': 
                enemy.attack();
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