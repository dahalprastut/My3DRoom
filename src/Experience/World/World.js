import * as THREE from "three";
import Experience from "../Experience";
import Environment from "./Environment";
import WallFront from "./WallFront/WallFront";
import WallLeft from "./WallLeft/WallLeft";
import Window from "./Window/Window";

export default class World {
	constructor() {
		this.wallFront = new WallFront();
		this.wallLeft = new WallLeft();
		this.window = new Window();
		this.environment = new Environment();
	}
}
