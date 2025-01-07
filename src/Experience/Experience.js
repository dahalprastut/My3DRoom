import * as THREE from "three";
import EventEmitter from "./Utils/EventEmitter";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";

let instance = null;
export default class Experience extends EventEmitter {
	constructor(canvas) {
		super();
		if (instance) {
			return instance;
		}
		instance = this;
		window.experience = this;
		this.canvas = canvas;
		this.scene = new THREE.Scene();

		this.sizes = new Sizes();
		this.time = new Time();
		this.camera = new Camera();

		this.renderer = new Renderer();

		this.sizes.on("resized", () => {
			this.resizeHandler();
		});

		this.time.on("updated", () => {
			this.updateHandler();
		});
	}

	resizeHandler() {
		this.camera.resizeHandler();
		this.renderer.resizeHandler();
	}

	updateHandler() {}
}
