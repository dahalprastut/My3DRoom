import { Timer } from "three/addons/misc/Timer.js";
import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter {
	constructor() {
		super();
		this.timer = new Timer();
		this.deltaTime = this.timer.getDelta();
		this.elapsedTime = this.timer.getElapsed();
		this.tick();
	}

	tick() {
		this.deltaTime = this.timer.getDelta();
		this.elapsedTime = this.timer.getElapsed();
		this.timer.update();
		this.trigger("updated");
		window.requestAnimationFrame(() => {
			this.tick();
		});
	}
}
