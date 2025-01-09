import * as THREE from "three";
import EventEmitter from "./Utils/EventEmitter";
import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Camera from "./Camera";
import Renderer from "./Renderer";
import World from "./World/World";
import Debug from "./Utils/Debug";
import Resources from "./Utils/Resources";
import sources from "./sources";

let instance = null;
export default class Experience {
	constructor(canvas) {
		if (instance) {
			return instance;
		}
		instance = this;
		window.experience = this;
		this.canvas = canvas;
		this.debug = new Debug();
		this.scene = new THREE.Scene();
		this.resouces = new Resources(sources);

		this.sizes = new Sizes();
		this.time = new Time();

		this.world = new World();
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

	updateHandler() {
		this.camera.updateHandler();
		this.renderer.updateHandler();
	}
}
