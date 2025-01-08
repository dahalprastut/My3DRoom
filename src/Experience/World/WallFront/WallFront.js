import * as THREE from "three";
import constant from "./../../constants";
import Experience from "../../Experience";

export default class WallFront {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.debug = this.experience.debug;
		this.wall = new THREE.Mesh(
			new THREE.PlaneGeometry(constant.wallWidth, constant.wallLength),
			new THREE.MeshBasicMaterial({
				color: constant.wallColor,
			})
		);
		this.scene.add(this.wall);
	}
}
