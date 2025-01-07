import * as THREE from "three";
import EventEmitter from "./Utils/EventEmitter";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
export default class Experience extends EventEmitter {
	constructor(canvas) {
		super();
		window.experience = this;
		this.canvas = canvas;
		this.sizes = new Sizes();
		this.time = new Time();

		this.scene = new THREE.Scene();
		this.sizes.on("resized", () => {
			this.resizeHandler();
		});

		this.time.on("updated", () => {
			this.updateHandler();
		});
	}

	resizeHandler() {
		console.log("resized");
	}

	updateHandler() {}
}
