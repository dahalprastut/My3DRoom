import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import EventEmitter from "./EventEmitter";
export default class Resources extends EventEmitter {
	constructor(sources) {
		super();
		this.sources = sources;
		this.loaded = 0;
		this.toLoad = this.sources.length;
		this.items = {};
		this.setLoaders();
		this.startLoading();
	}

	setLoaders() {
		this.loaders = {};
		this.loaders.gltfLoader = new GLTFLoader();
		this.loaders.textureLoader = new THREE.TextureLoader();
		this.loaders.cubeTextureLoader = new THREE.CubeTextureLoader();
	}

	startLoading() {
		for (const source of this.sources) {
			if (source.type === "cubeTexture") {
				this.loaders.cubeTextureLoader.load(source.paths, (file) => {
					this.sourceLoaded(source, file);
				});
			} else if (source.type === "texture") {
				this.loaders.textureLoader.load(source.paths, (file) => {
					this.sourceLoaded(source, file);
				});
			} else if (source.type === "gltfModel") {
				this.loaders.gltfLoader.load(source.paths, (file) => {
					this.sourceLoaded(source, file);
				});
			}
		}
	}

	sourceLoaded(source, file) {
		this.items[source.name] = file;
		this.loaded = this.loaded + 1;

		if (this.toLoad === this.loaded) {
			this.trigger("ready");
		}
	}
}
