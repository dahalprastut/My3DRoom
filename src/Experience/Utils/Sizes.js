import EventEmitter from "./EventEmitter";
export default class Sizes extends EventEmitter {
	constructor() {
		super();
		this.initialize();

		window.addEventListener("resize", () => {
			this.initialize();
			this.trigger("resized");
		});
	}

	initialize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.pixelRatio = Math.min(window.devicePixelRatio, 2);
	}
}
