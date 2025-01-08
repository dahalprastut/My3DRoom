import * as THREE from "three";
import constants from "../../constants";
import Experience from "../../Experience";

export default class Window {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.debug = this.experience.debug;

		this.nightSky();
		this.windowGlass();
		this.addDebugGUI();
	}

	nightSky() {
		this.sky = new THREE.Mesh(
			new THREE.PlaneGeometry(constants.windowWidth, constants.windowLength),
			new THREE.MeshBasicMaterial({
				color: constants.nightSkyColor,
			})
		);
		this.sky.position.x = -2;
		this.sky.position.y = 1;
		this.sky.position.z = 0.1;
		this.scene.add(this.sky);
	}

	windowGlass() {
		this.glass = new THREE.Mesh(
			new THREE.PlaneGeometry(constants.windowWidth, constants.windowLength),
			new THREE.MeshPhysicalMaterial({
				metalness: 0,
				roughness: 0,
			})
		);
		this.glass.position.x = -2;
		this.glass.position.y = 1;
		this.glass.position.z = 0.12;
		this.glass.material.thickness = 0.046;
		this.glass.material.transmission = 1;
		this.scene.add(this.glass);
	}
	addDebugGUI() {
		if (this.debug.active) {
			this.windowFolder = this.debug.gui.addFolder("Window");
			this.windowFolder
				.addColor(constants, "nightSkyColor")
				.name("skyColor")
				.onChange((e) => {
					this.sky.material.color.set(e);
				});
			this.windowFolder.add(this.glass.material, "metalness").min(0).max(10).step(0.001);
			this.windowFolder.add(this.glass.material, "roughness").min(0).max(10).step(0.001);
			this.windowFolder.add(this.glass.material, "thickness").min(0).max(1).step(0.001);
			this.windowFolder.add(this.glass.material, "transmission").min(0).max(1).step(0.001);
		}
	}
}
