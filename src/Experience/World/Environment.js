import * as THREE from "three";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import Experience from "../Experience";
import constants from "../constants";

export default class Environment {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.addEnvMap();
		this.addAmbientLight();
		this.addBulb();
	}

	addAmbientLight() {
		// Some code later
		this.ambientLight = new THREE.AmbientLight(constants.AmbientLightColor, 2);
		this.scene.add(this.ambientLight);
	}

	addBulb() {
		this.directionalLight = new THREE.DirectionalLight("#fff", 2);
		this.directionalLight.position.set(2, 5, 1);
		this.scene.add(this.directionalLight);
		// Some code later
	}

	addEnvMap() {
		this.rgbeLoader = new RGBELoader();
		this.rgbeLoader.load("./../../static/environmentmap/2k.hdr", (env) => {
			env.mapping = THREE.EquirectangularReflectionMapping;
			this.scene.environment = env;
		});
	}
}
