import * as THREE from "three";
import { CSG } from "three-csg-ts";
import constants from "./../../constants";
import Experience from "../../Experience";

export default class WallFront {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.debug = this.experience.debug;
		this.setCSGWall();

		this.windowGlass();
		this.windowBase();

		this.addDebugGUI();
	}

	setCSGWall() {
		this.wall = new THREE.Mesh(
			new THREE.BoxGeometry(constants.wallWidth, constants.wallLength, constants.wallDepth),
			new THREE.MeshStandardMaterial({
				color: constants.wallColor,
			})
		);

		this.window = new THREE.Mesh(
			new THREE.BoxGeometry(constants.windowWidth, constants.windowLength),
			new THREE.MeshStandardMaterial({
				color: constants.nightSkyColor,
			})
		);

		this.window.position.x = -2;
		this.window.position.y = 1;
		this.window.position.z = 0;
		// Make sure the .matrix of each mesh is current
		this.wall.updateMatrix();
		this.window.updateMatrix();
		const wallWithWindow = CSG.subtract(this.wall, this.window);
		this.scene.add(wallWithWindow);
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
		this.glass.material.thickness = 0.146;
		this.glass.material.transmission = 1;
		this.scene.add(this.glass);
	}

	windowBase() {
		this.base = new THREE.Mesh(
			new THREE.BoxGeometry(constants.windowWidth, 0.4, 0.6),
			new THREE.MeshStandardMaterial({
				color: constants.wallColor,
			})
		);
		// this.base.position.y = -constants.windowLength / 2;
		this.base.position.x = this.window.position.x;
		this.base.position.y = -0.7;
		this.base.position.z = 0.5;
		this.scene.add(this.base);
	}

	addDebugGUI() {
		if (this.debug.active) {
			this.windowFolder = this.debug.gui.addFolder("Window");

			this.windowFolder.add(this.glass.material, "metalness").min(0).max(10).step(0.001);
			this.windowFolder.add(this.glass.material, "roughness").min(0).max(10).step(0.001);
			this.windowFolder.add(this.glass.material, "thickness").min(0).max(1).step(0.001);
			this.windowFolder.add(this.glass.material, "transmission").min(0).max(1).step(0.001);
		}
	}
}
