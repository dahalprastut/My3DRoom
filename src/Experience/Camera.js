import * as THREE from "three";
import Experience from "./Experience";
export default class Camera {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.sizes = this.experience.sizes;
		this.instance = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
		this.instance.position.set(2, 3, 5);
		this.scene.add(this.instance);
	}

	resizeHandler() {
		this.instance.aspect = this.sizes.width / this.sizes.height;
		this.instance.updateProjectionMatrix();
	}
}
