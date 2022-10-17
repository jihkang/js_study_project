
function get_random_color() {
	return ("#" +
		Math.floor((parseInt(Math.random() * 255, 16))) +
		Math.floor((parseInt(Math.random() * 255, 16))) +
		Math.floor((parseInt(Math.random() * 255, 16))));
}

class Obj{
	constructor(stageWidth, stageHeight) {
		this.x = Math.random() * stageWidth;
		this.y = Math.random() * stageHeight * 0.5 + 0.2 * stageHeight;
		this.stageWidth = stageWidth;
		this.stageHeight = stageHeight;
		this.speed = (Math.random() * 5) < 2 ? 2.5 : (Math.random() * 5);
		this.flag = false;
		this.width = parseInt(stageWidth / 10 * Math.random()) < 50 ? 50 : parseInt(100 * Math.random())
		this.height = parseInt(40 * Math.random()) < 20 ? 20 : parseInt(40 * Math.random());
		this.color = get_random_color();
		this.id = setInterval(() => this.moveLeft(), 100);
	}

	isSelected(pos) {
		console.log(pos[0], pos[1]);
		if (pos[0] >= this.x - this.width / 2 && pos[0] < this.x + this.width / 2 &&
			pos[1] >= this.y - this.height / 2 && pos[1] < this.y + this.height / 2)
			this.flag = true;
		else
			this.flag = false;
		console.log(this.flag);
	}

	moveLeft() {
		if (this.flag != true)
			this.x -= this.speed;
	}

	check() {
		if (this.x < this.stageWidth / 10)
			return (true);
		return (false);
	}

	remove() {
		clearInterval(this.id);
	}

	draw(ctx) {
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.closePath();
	}
}

class App {
	constructor() {
		this.objs = [];
		this.canvas = document.createElement("canvas");
		this.ctx = this.canvas.getContext('2d');
		document.body.appendChild(this.canvas);
		this.pixelRatio = window.devicePixelRatio > 1 ? 2.0 : 1.0;
		document.addEventListener("pointermove", this.move.bind(this));
		this.resize();
		this.addObj();
		setInterval(() => this.remove(), 100);
		requestAnimationFrame(this.draw.bind(this));
	}

	move(e) {
		console.log(e.clientX);
		this.objs.forEach((obj) => {
			obj.isSelected([e.clientX, e.clientY])
		})
	}

	resize() {
		this.stageWidth = document.body.clientWidth;
		this.stageHeight = document.body.clientHeight;

		this.canvas.width = this.stageWidth * this.pixelRatio;
		this.canvas.height = this.stageHeight * this.pixelRatio;
		this.ctx.scale(this.pixelRatio, this.pixelRatio);
	}

	addObj() {
		for(let i = this.objs.length; i < 10; i++)
		{
			this.objs.push(
				new Obj(this.stageWidth, this.stageHeight)
			);
		}
	}

	remove() {
		const len = this.objs.length;

		this.objs = this.objs.filter((obj) => {
			if (obj.check()) {
				obj.remove();
				return false;
			}
			return true;
		});
		if (len != this.objs.length) {
			this.addObj();
		}
	}

	draw() {
		requestAnimationFrame(this.draw.bind(this));
		this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
		this.ctx.fillStyle = "#ff0000";
		this.objs.forEach((obj) => obj.draw(this.ctx));
	}
}

new App();

console.log(get_random_color());
