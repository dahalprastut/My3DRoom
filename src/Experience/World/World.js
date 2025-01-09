import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";
import WallFront from "./WallFront/WallFront";
import WallLeft from "./WallLeft/WallLeft";
import Galaxy from "./Window/Galaxy";

export default class World {
	constructor() {
		this.experience = new Experience();
		this.resources = this.experience.resouces;
		this.galaxy = new Galaxy();
		this.wallFront = new WallFront();
		this.wallLeft = new WallLeft();
		this.resources.on("ready", () => {
			this.environment = new Environment();
		});
	}
}
