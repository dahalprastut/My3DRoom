import * as THREE from "three";
import constants from "./../../constants";
import Experience from "../../Experience";

export default class WallLeft {
	constructor() {
		this.experience = new Experience();
		this.debug = this.experience.debug;
		this.scene = this.experience.scene;
		this.wall = new THREE.Mesh(
			new THREE.PlaneGeometry(constants.wallWidth, constants.wallLength),
			new THREE.MeshBasicMaterial({
				color: constants.wallColor,
			})
		);
		this.wall.rotation.y = Math.PI * 0.5;
		this.wall.position.x = -constants.wallWidth / 2;
		this.wall.position.z = constants.wallWidth / 2;
		this.scene.add(this.wall);
		this.addDebugGUI();
	}

	addDebugGUI() {
		if (this.debug.active) {
			this.debugFolder = this.debug.gui.addFolder("Wall");
			this.debugFolder.addColor(constants, "wallColor").onChange((e) => {
				this.wall.material.color.set(e);
				this.experience.world.wallFront.wall.material.color.set(e);
			});
		}
	}
}
