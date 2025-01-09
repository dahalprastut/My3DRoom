import * as THREE from "three";
import Experience from "../../Experience";
import constants from "../../constants";

export default class Galaxy {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.debug = this.experience.debug;
		this.instantiate();
		this.generateGalaxy();
		this.addDebugGUI();
	}

	instantiate() {
		this.count = 168000;

		this.radius = 5.03;
		this.spinFactor = 0.92;
		this.randomness = 0.408;
		this.power = 3;
		this.innerColor = new THREE.Color("#ff477e");
		this.outsideColor = new THREE.Color("#ffd505");
	}

	generateGalaxy() {
		this.particlePosition = new Float32Array(this.count * 3);
		this.particleColor = new Float32Array(this.count * 3);
		if (this.pointsGeometry) {
			this.destroyGalaxy();
		}
		this.calculateGalaxy();
		this.makeGalaxy();
	}

	calculateGalaxy() {
		for (let i = 0; i < this.count; i++) {
			const j = i * 3;

			const randomRadius = Math.random() * this.radius; // Random is the amplitude for the circle so it has randomness in the circles raidus.
			const spinAngle = randomRadius * this.spinFactor;
			const branches = 3;
			const randomX = Math.pow(Math.random(), this.power) * (Math.random() > 0.5 ? -1 : 1) * this.randomness;
			const randomY = Math.pow(Math.random(), this.power) * (Math.random() > 0.5 ? -1 : 1) * this.randomness;
			const randomZ = Math.pow(Math.random(), this.power) * (Math.random() > 0.5 ? -1 : 1) * this.randomness;
			const branchAngle = ((i % branches) / branches) * Math.PI * 2;

			this.particlePosition[j + 0] =
				constants.galaxyXPosition + randomX + Math.sin(branchAngle + spinAngle) * randomRadius;
			this.particlePosition[j + 1] =
				constants.galaxyYPosition + randomY + Math.cos(branchAngle + spinAngle) * randomRadius;
			this.particlePosition[j + 2] = randomZ + 0.2 - constants.galaxyDepthPosition;
			const mixColor = this.outsideColor.clone();
			mixColor.lerp(this.innerColor, randomRadius / this.radius);
			this.particleColor[j + 0] = mixColor.r;
			this.particleColor[j + 1] = mixColor.g;
			this.particleColor[j + 2] = mixColor.b;
		}
	}

	makeGalaxy() {
		const positionAttribute = new THREE.BufferAttribute(this.particlePosition, 3);
		const colorAttribute = new THREE.BufferAttribute(this.particleColor, 3);
		this.pointsGeometry = new THREE.BufferGeometry();
		this.pointsGeometry.setAttribute("position", positionAttribute);
		this.pointsGeometry.setAttribute("color", colorAttribute);
		this.pointsMaterial = new THREE.PointsMaterial({
			size: 0.01,
			sizeAttenuation: true,
			vertexColors: true,
			depthWrite: false,
			blending: THREE.AdditiveBlending,
		});

		this.points = new THREE.Points(this.pointsGeometry, this.pointsMaterial);
		this.scene.add(this.points);
	}

	destroyGalaxy() {
		this.pointsGeometry.dispose();
		this.pointsMaterial.dispose();
		this.scene.remove(this.points);
	}

	addDebugGUI() {
		const galaxyFolder = this.debug.gui.addFolder("Galaxy");
		galaxyFolder
			.add(this, "count")
			.min(10000)
			.max(400000)
			.step(100)
			.name("Particles Count")
			.onFinishChange(() => {
				this.generateGalaxy();
			});
		galaxyFolder
			.add(this, "radius")
			.min(0)
			.max(10)
			.step(0.01)
			.name("Radius")
			.onFinishChange(() => {
				this.generateGalaxy();
			});
		galaxyFolder
			.add(this, "spinFactor")
			.min(0)
			.max(10)
			.step(0.01)
			.name("Spin Factor")
			.onFinishChange(() => {
				this.generateGalaxy();
			});
		galaxyFolder
			.add(this, "randomness")
			.min(0)
			.max(10)
			.step(0.001)
			.name("Randomness")
			.onChange(() => {
				this.generateGalaxy();
			});
		galaxyFolder
			.add(this, "power")
			.min(0)
			.max(10)
			.step(0.001)
			.name("Power")
			.onFinishChange(() => {
				this.generateGalaxy();
			});
		galaxyFolder
			.addColor(this, "innerColor")
			.name("Inner Color")
			.onFinishChange(() => {
				this.generateGalaxy();
			});
		galaxyFolder
			.addColor(this, "outsideColor")
			.name("Outer Color")
			.onFinishChange(() => {
				this.generateGalaxy();
			});
		galaxyFolder
			.add(constants, "galaxyDepthPosition")
			.min(-10)
			.max(10)
			.step(0.001)
			.name("Galaxy Depth")
			.onFinishChange(() => {
				this.generateGalaxy();
			});
		galaxyFolder
			.add(constants, "galaxyXPosition")
			.min(-10)
			.max(10)
			.step(0.001)
			.name("Galaxy X ")
			.onFinishChange(() => {
				this.generateGalaxy();
			});
		galaxyFolder
			.add(constants, "galaxyYPosition")
			.min(-10)
			.max(10)
			.step(0.001)
			.name("Galaxy Y")
			.onFinishChange(() => {
				this.generateGalaxy();
			});
	}
}
