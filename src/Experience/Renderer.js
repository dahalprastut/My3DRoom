import * as THREE from "three";
import Experience from "./Experience";

export default class Renderer {
	constructor() {
		this.experience = new Experience();
		this.canvas = this.experience.canvas;
		this.scene = this.experience.scene;
		this.camera = this.experience.camera;
		this.sizes = this.experience.sizes;
		this.instance = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);
		this.instance.render(this.scene, this.camera.instance);
	}
	resizeHandler() {
		this.instance.setSize(this.sizes.width, this.sizes.height);
		this.instance.setPixelRatio(this.sizes.pixelRatio);
	}

	updateHandler() {
		this.instance.render(this.scene, this.camera.instance);
	}
}
