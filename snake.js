const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const pop_up = document.querySelector('div.pop-up');

let last_key = 'd';
let end_game = false;
let frame;

fitToContainer(canvas);

function fitToContainer(canvas){
	
  canvas.style.width ='100%';
  canvas.style.height='100%';
  canvas.width  = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

}

const tail = [];

class TailElement {
	constructor(x, y, velocity, direction) {
		this.x = x;
		this.y = y;
		this.velocity = velocity;
		this.direction = direction;
		
		if(tail.length > 0) {
			switch (direction) {
				
				case 'w':
					this.y = tail[tail.length-1].y + 10;
					this.x = tail[tail.length-1].x;
					this.velocity.x = 0;
					this.velocity.y = -2;
					break;
				case 'a':
					this.y = tail[tail.length-1].y;
					this.x = tail[tail.length-1].x  + 10;
					this.velocity.x = -2;
					this.velocity.y = 0;
					break;
				case 's':
					this.y = tail[tail.length-1].y - 10;
					this.x = tail[tail.length-1].x;
					this.velocity.x = 0;
					this.velocity.y = 2;
					break;
				case 'd':
					this.y = tail[tail.length-1].y;
					this.x = tail[tail.length-1].x - 10;
					this.velocity.x = 2;
					this.velocity.y = 0;
					break;
			}
		}
	}
	
	drawTailElement() {
		ctx.beginPath();
		ctx.fillStyle = '#fcba03';
		ctx.fillRect(this.x, this.y, 10, 10);
		ctx.stroke();
	}
	
	update() {
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
		
		if((this.x + 10) > canvas.width) {
			this.x = 1;
		}
		if((this.y + 10) > canvas.height) {
			this.y = 1;
		}
		if(this.x < 1) {
			this.x = canvas.width - 10;
		}
		if(this.y < 1) {
			this.y = canvas.height - 10;
		}
	}
}

class Snake {
	
	constructor(x, y, width, height, velocity) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.velocity = velocity;
		tail.push(new TailElement(this.x, this.y, this.velocity, 'd')); 
	}
	
	drawSnake() {
		ctx.beginPath();
		ctx.fillStyle = '#fcba03';
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.stroke();
	}
	
	update() {
		this.x = this.x + this.velocity.x;
		this.y = this.y + this.velocity.y;
		
		if((this.x + 10) > canvas.width) {
			this.x = 1;
		}
		if((this.y + 10) > canvas.height) {
			this.y = 1;
		}
		if(this.x < 1) {
			this.x = canvas.width - 10;
		}
		if(this.y < 1) {
			this.y = canvas.height - 10;
		}
	}

}

const snake = new Snake(canvas.width / 2, canvas.height / 2, 10, 10, {x: 2, y: 0});
snake.drawSnake();

class Food {
	
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	
	drawFood() {
		ctx.beginPath();
		ctx.fillStyle = '#c71c10';
		ctx.fillRect(this.x, this.y, 10, 10);
		ctx.stroke();
	}
	
	update() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
	}
}

const food = new Food(Math.random() * canvas.width, Math.random() * canvas.height);
food.drawFood();

function animate() {
	
	frame = requestAnimationFrame(animate);
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	food.drawFood();
	tail.forEach(updateFunc);
	
	if (end_game == true) {
		cancelAnimationFrame(frame);
		pop_up.style.display = 'block';
	}
	
	if((tail[0].x < food.x + 10 && tail[0].x > food.x - 10) && (tail[0].y < food.y + 10 && tail[0].y > food.y - 10)) {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		tail.push(new TailElement(50, 50, {x: 2, y: 0}, tail[tail.length-1].direction));
		console.log(tail);
		food.update();
	}
	
}

function updateFunc(tailE, index) {
	
	tailE.drawTailElement();
	
	if(index != 0) {
		if(tailE.direction != tail[index-1].direction) {
			
			switch (tail[index-1].direction) {
			
				case 'w':
					if((tailE.x > (tail[index-1].x - 2)) && (tailE.x < (tail[index-1].x + 2))) {
						tailE.x = tail[index-1].x;
						tailE.y = tail[index-1].y + 10;
						tailE.velocity.x = 0;
						tailE.velocity.y = -2;
						tailE.direction = tail[index-1].direction;
					}				
					break;
				case 'a':
					if((tailE.y > (tail[index-1].y - 2)) && (tailE.y < (tail[index-1].y + 2))) {
						tailE.x = tail[index-1].x + 10;
						tailE.y = tail[index-1].y;
						tailE.velocity.x = -2;
						tailE.velocity.y = 0;
						tailE.direction = tail[index-1].direction;
					}
					break;
				case 's':
					if((tailE.x > (tail[index-1].x - 2)) && (tailE.x < (tail[index-1].x + 2))) {
						tailE.x = tail[index-1].x;
						tailE.y = tail[index-1].y - 10;
						tailE.velocity.x = 0;
						tailE.velocity.y = 2;
						tailE.direction = tail[index-1].direction;
					}
					break;
				case 'd':
					if((tailE.y > (tail[index-1].y - 2)) && (tailE.y < (tail[index-1].y + 2))) {
						tailE.x = tail[index-1].x - 10;
						tailE.y = tail[index-1].y;
						tailE.velocity.x = 2;
						tailE.velocity.y = 0;
						tailE.direction = tail[index-1].direction;
					}
					break;
			
			}
		}
	}
	
	tailE.update();
	
	if (index > 1) {
		
		if((tail[0].x < tailE.x + 3 && tail[0].x > tailE.x - 3) && (tail[0].y < tailE.y + 3 && tail[0].y > tailE.y - 3)) {
			end_game = true;
		}
	}
}


animate();


document.addEventListener('keydown', (event) => {
	
	switch(event.keyCode) {
		
		case 87:
			if(last_key != 's') {
				tail[0].velocity.x = 0;
				tail[0].velocity.y = -2;
				tail[0].direction = 'w';
			}
			last_key = 'w';
			break;
		case 65:
			if(last_key != 'd') {
				tail[0].velocity.x = -2;
				tail[0].velocity.y = 0;
				tail[0].direction = 'a';
			}
			last_key = 'a';
			break;
		case 83:
			if(last_key != 'w') {
				tail[0].velocity.x = 0;
				tail[0].velocity.y = 2;
				tail[0].direction = 's';
			}
			last_key = 's';
			break;
		case 68:
			if(last_key != 'a') {
				tail[0].velocity.x = 2;
				tail[0].velocity.y = 0;
				tail[0].direction = 'd';
			}
			last_key = 'd';
			break;
		default:
			break;
	}	
});