import 'aframe';
import { Entity, Scene } from 'aframe';
import 'aframe-extras';
import 'aframe-orbit-controls';
import 'aframe-event-set-component';

import { ObjectMapper, Omit } from '../types/utils';
import { ShortcutTools, EventTools, CameraTools, ViewportTools, HistoryTools } from './';
import Components from '../constants/components';
import Systems from '../constants/systems';
import Primitives from '../constants/primitives';
import '../lib/GLTFExporter';

export interface ICameras {
	perspective?: THREE.PerspectiveCamera;
	original?: Entity;
	ortho?: THREE.OrthographicCamera;
}

export interface IScene extends Omit<Scene, 'camera'> {
	camera?: ICamera;
}

export interface ICamera extends THREE.Camera {
	el?: Entity;
}

export interface IInsepctorOptions {
	id?: string;
	target?: HTMLElement;
	playerCamera?: boolean;
	ar?: boolean;
	orbitControls?: boolean;
	sceneStr?: string;
	assetsStr?: string;
	entitiesStr?: string;
}

const defaultInspectorOptions: IInsepctorOptions = {
	playerCamera: false,
	orbitControls: true,
};

Systems.forEach(System => System());
Components.forEach(Comp => Comp());
Primitives.forEach(Prim => Prim());

class InspectorTools {
	sceneEl?: IScene;
	scene: THREE.Object3D;
	camera?: ICamera;
	container?: HTMLElement;
	currentCameraEl?: Entity;
	cameras?: ICameras;
	sceneHelpers?: THREE.Scene;
	helpers?: ObjectMapper;
	cursor?: Entity;
	modules?: ObjectMapper;
	history?: HistoryTools;
	isFirstOpen?: boolean;
	opened?: boolean;
	exporters?: ObjectMapper;
	on?: any;
	inspectorActive?: boolean;
	cameraHelper?: THREE.CameraHelper;
	selectedEntity?: Entity;
	selected?: THREE.Object3D;
	entityToCopy?: Entity;
	shortcutTools?: ShortcutTools;
	cameraTools?: CameraTools;
	viewportTools?: ViewportTools;
	selectedAsset?: Entity;
	options: IInsepctorOptions;
	targetEl: HTMLElement;

	constructor(options: IInsepctorOptions = {}) {
		this.exporters = { gltf: new AFRAME.THREE.GLTFExporter() };
		this.history = new HistoryTools();
		this.isFirstOpen = true;
		this.modules = {};
		this.on = EventTools.on;
		this.opened = false;
		const mergedOptions = Object.assign({}, defaultInspectorOptions, options);
		this.options = mergedOptions;
		const { id, target } = mergedOptions;
		let sceneParentElement = document.body;
		if (id) {
			const targetEl = document.getElementById(id);
			if (targetEl) {
				sceneParentElement = targetEl;
			}
		}
		if (target) {
			sceneParentElement = target;
		}
		this.targetEl = sceneParentElement;
		this.initScene(sceneParentElement, mergedOptions);
		this.init();
	}

	/**
	 * @description Initial Inspector
	 * @returns
	 */
	init = () => {
		if (!AFRAME.scenes.length) {
			setTimeout(() => {
				this.init();
			}, 100);
			return;
		}
		this.sceneEl = AFRAME.scenes[0];
		if (!this.sceneEl.hasLoaded) {
			setTimeout(() => {
				this.init();
			}, 100);
			return;
		}
		if (!this.sceneEl.camera) {
			this.sceneEl.addEventListener(
				'camera-set-active',
				() => {
					this.init();
				},
				{ once: true },
			);
			return;
		}
		// Remove scene default inspector
		this.sceneEl.removeAttribute('inspector');
		this.sceneEl.removeAttribute('keyboard-shortcuts');
		EventTools.emit('sceneloaded', this.sceneEl);
		EventTools.emit('entityselect', this.sceneEl);
		this.scene = this.sceneEl.object3D;
		this.container = this.sceneEl.querySelector('.a-canvas');
		this.initCamera();
		this.initShortcut();
		this.initViewport();
		this.initEvents();
		this.initARScript();
	};

	/**
	 * @description Initial Scene
	 * @param {HTMLElement} inspectorEl
	 * @param {boolean} playCamera
	 */
	initScene = (inspectorEl: HTMLElement, options: IInsepctorOptions) => {
		const { playerCamera, orbitControls, sceneStr, assetsStr, entitiesStr } = options;
		if (sceneStr) {
			this.loadScene(inspectorEl, sceneStr);
			inspectorEl.querySelector('a-scene');
			return;
		}
		const scene = document.createElement('a-scene') as IScene;
		const assets = document.createElement('a-assets');
		assets.id = 'assets';
		scene.appendChild(assets);
		this.loadAssets(scene, assetsStr);
		if (playerCamera) {
			this.loadPlayerCamera(scene);
		} else if (orbitControls) {
			this.loadOrbitControls(scene);
		}
		scene.querySelector('a-assets').addEventListener('loaded', () => {
			console.debug('a-assets loaded');
			this.loadEntities(scene, entitiesStr);
		});
		inspectorEl.appendChild(scene);
		scene.id = 'scene';
		scene.title = 'Scene';
		scene.style.position = 'fixed';
		scene.style.top = '0';
		scene.style.left = '0';
	};

	initCamera = () => {
		this.cameraTools = new CameraTools(this);
	};

	initViewport = () => {
		const scene = this.sceneEl.object3D;
		this.helpers = {};
		this.sceneHelpers = new AFRAME.THREE.Scene();
		this.sceneHelpers.userData.source = 'INPSECTOR';
		this.sceneHelpers.visible = true;
		this.inspectorActive = false;
		this.viewportTools = new ViewportTools(this);
		EventTools.emit('windowresize');
		scene.add(this.sceneHelpers);
		scene.traverse(node => {
			this.addHelper(node);
		});
		scene.add(this.sceneHelpers);
		this.open();
	};

	initShortcut = () => {
		this.shortcutTools = new ShortcutTools(this);
	};

	initEvents = () => {
		window.addEventListener('keydown', evt => {
			// Alt + Ctrl + i: Shorcut to toggle the inspector
			const shortcutPressed = evt.keyCode === 73 && evt.ctrlKey && evt.altKey;
			if (shortcutPressed) {
				this.toggle();
			}
		});
		EventTools.on('entityselect', (entity: Entity) => {
			this.selectEntity(entity, false);
		});
		EventTools.on('inspectortoggle', (active?: boolean) => {
			this.inspectorActive = active;
			this.sceneHelpers.visible = this.inspectorActive;
		});
		EventTools.on('entitycreate', (entity: Entity) => {
			this.selectEntity(entity);
		});
		EventTools.on('assetcreate', (asset: Entity) => {
			this.selectAsset(asset);
		});
		EventTools.on('assetselect', (asset: Entity) => {
			this.selectAsset(asset, false);
		});
		document.addEventListener('child-detached', event => {
			const entity = event.detail.el;
			this.removeObject(entity.object3D);
		});
	};

	initARScript = () => {
		const arScript = document.head.querySelector('#ar-script');
		if (arScript) {
			return;
		}
		const script = document.createElement('script') as any;
		script.src = './vendor/ar.js/aframe/build/aframe-ar.min.js';
		script.async = true;
		script.id = 'ar-script';
		document.head.appendChild(script);
	};

	loadScene = (inspectorEl: HTMLElement, fragment: string) => {
		return inspectorEl.appendChild(document.createRange().createContextualFragment(fragment.trim()));
	};

	loadEntities = (scene: IScene, fragment: string = '') => {
		return scene.appendChild(document.createRange().createContextualFragment(fragment.trim()));
	};

	loadAssets = (scene: IScene, fragment: string = '') => {
		return scene
			.querySelector('a-assets')
			.appendChild(document.createRange().createContextualFragment(fragment.trim()));
	};

	loadPlayerCamera = (scene: IScene, fragment?: string) => {
		const playerCamera = document.createRange().createContextualFragment(
			fragment
				? fragment.trim()
				: `
            <!-- Camera. -->
            <a-entity position="0 1.6 8" aframe-injected>
                <a-entity id="camera" camera look-controls wasd-controls>
                    <!-- Cursor. -->
                    <a-entity id="cursor" position="0 0 -2"
                                geometry="primitive: ring; radiusOuter: 0.016; radiusInner: 0.01"
                                material="color: #ff9; shader: flat; transparent: true; opacity: 0.5"
                                scale="2 2 2" raycaster>
                    </a-entity>
                </a-entity>
            </a-entity>
            `.trim(),
		);
		return scene.appendChild(playerCamera);
	};

	loadOrbitControls = (scene: IScene, fragment?: string) => {
		const orbitControls = document.createRange().createContextualFragment(
			fragment
				? fragment.trim()
				: `
            <!-- Orbit Controls. -->
            <a-entity
                camera
                look-controls="enabled: false"
                orbit-controls="target: 0 0 0; minDistance: 0.5; maxDistance: 180; initialPosition: 0 5 10"
            />
            `.trim(),
		);
		return scene.appendChild(orbitControls);
	};

	removeObject = (object3D: THREE.Object3D) => {
		// Remove just the helper as the object will be deleted by A-Frame
		this.removeHelpers(object3D);
		EventTools.emit('objectremove', object3D);
	};

	addHelper = (object: THREE.Object3D) => {
		const geometry = new AFRAME.THREE.SphereBufferGeometry(2, 4, 2);
		const material = new AFRAME.THREE.MeshBasicMaterial({
			color: 0xff0000,
			visible: false,
		});

		let helper;
		if (object instanceof AFRAME.THREE.Camera) {
			this.cameraHelper = helper = new AFRAME.THREE.CameraHelper(object, 0.1);
		} else if (object instanceof AFRAME.THREE.PointLight) {
			helper = new AFRAME.THREE.PointLightHelper(object, 1);
		} else if (object instanceof AFRAME.THREE.DirectionalLight) {
			helper = new AFRAME.THREE.DirectionalLightHelper(object, 1);
		} else if (object instanceof AFRAME.THREE.SpotLight) {
			helper = new AFRAME.THREE.SpotLightHelper(object, 1);
		} else if (object instanceof AFRAME.THREE.HemisphereLight) {
			helper = new AFRAME.THREE.HemisphereLightHelper(object, 1);
		} else if (object instanceof AFRAME.THREE.SkinnedMesh) {
			helper = new AFRAME.THREE.SkeletonHelper(object);
		} else {
			// no helper for this object type
			return;
		}
		helper.visible = false;
		this.sceneHelpers.add(helper);
		this.helpers[object.uuid] = helper;
		helper.update();
	};

	removeHelpers = (object3D: THREE.Object3D) => {
		object3D.traverse(node => {
			const helper = this.helpers[node.uuid];
			if (helper) {
				this.sceneHelpers.remove(helper);
				delete this.helpers[node.uuid];
				EventTools.emit('helperremove', this.helpers[node.uuid]);
			}
		});
	};

	/**
	 * @description Select the entity
	 * @param {Entity} entity
	 * @param {boolean} [emit]
	 * @returns
	 */
	selectEntity = (entity: Entity, emit?: boolean) => {
		this.selectedEntity = entity;
		if (entity) {
			this.select(entity.object3D);
		} else {
			this.select(null);
		}
		if (entity && emit === undefined) {
			EventTools.emit('entityselect', entity);
		}
		// Update helper visibilities.
		Object.keys(this.helpers).forEach(id => {
			this.helpers[id].visible = false;
		});
		if (entity === this.sceneEl) {
			return;
		}
		if (entity) {
			entity.object3D.traverse(node => {
				if (this.helpers[node.uuid]) {
					this.helpers[node.uuid].visible = true;
				}
			});
		}
	};

	/**
	 * @description Select the entity by id
	 * @param {number} id
	 * @returns
	 */
	selectEntityById = (id: number) => {
		if (id === this.camera.id) {
			this.select(this.camera);
			return;
		}
		this.select(this.scene.getObjectById(id, true));
	};

	/**
	 * @description Select the entity by Object3D
	 * @param {THREE.Object3D} object3D
	 * @returns
	 */
	select = (object3D: THREE.Object3D) => {
		if (this.selected === object3D) {
			return;
		}
		this.selected = object3D;
		EventTools.emit('objectselect', object3D);
	};

	/**
	 * @description Deselect entity
	 */
	deselect = () => {
		this.select(null);
	};

	/**
	 * @description Select the asset
	 * @param {Entity} asset
	 * @param {boolean} [emit=true]
	 */
	selectAsset = (asset: Entity, emit: boolean = true) => {
		this.selectedAsset = asset;
		if (emit) {
			EventTools.emit('entityselect');
			EventTools.emit('assetselect', asset);
		}
	};

	/**
	 * @description Open or close inspector
	 */
	toggle = () => {
		if (this.opened) {
			this.close();
		} else {
			this.open();
		}
	};

	/**
	 * @description Open the editor UI
	 * @param {Entity} [focusEl]
	 */
	open = (focusEl?: Entity) => {
		this.opened = true;
		EventTools.emit('inspectortoggle', true);

		if (this.sceneEl.hasAttribute('embedded')) {
			// Remove embedded styles, but keep track of it.
			this.sceneEl.removeAttribute('embedded');
			this.sceneEl.setAttribute('aframe-inspector-removed-embedded');
		}

		document.body.classList.add('aframe-inspector-opened');
		this.sceneEl.resize();
		this.sceneEl.pause();
		this.sceneEl.exitVR();

		this.shortcutTools.enable();

		// Trick scene to run the cursor tick.
		this.sceneEl.isPlaying = true;
		this.cursor.play();

		if (!focusEl && this.isFirstOpen && AFRAME.utils.getUrlParameter('inspector')) {
			// Focus entity with URL parameter on first open.
			focusEl = document.getElementById(AFRAME.utils.getUrlParameter('inspector')) as Entity;
		}
		if (focusEl) {
			this.selectEntity(focusEl);
			EventTools.emit('objectfocus', focusEl.object3D);
		}
		this.isFirstOpen = false;
	};

	/**
	 * @description Closes the editor and gives the control back to the scene
	 */
	close = () => {
		this.opened = false;
		EventTools.emit('inspectortoggle', false);
		// Untrick scene when we enabled this to run the cursor tick.
		this.sceneEl.isPlaying = false;
		this.sceneEl.play();
		this.cursor.pause();
		if (this.sceneEl.hasAttribute('aframe-inspector-removed-embedded')) {
			this.sceneEl.setAttribute('embedded', '');
			this.sceneEl.removeAttribute('aframe-inspector-removed-embedded');
		}
		document.body.classList.remove('aframe-inspector-opened');
		this.sceneEl.resize();
		this.shortcutTools.disable();
	};

	reload = (options: IInsepctorOptions) => {
		// const arScript = document.head.querySelector('#ar-script');
		// if (arScript) {
		//     document.head.removeChild(arScript);
		// Object.keys(AFRAME.components).forEach(componentName => {
		//     if (componentName.includes('arjs')) {
		//         delete AFRAME.components[componentName];
		//     }
		// });
		// console.log(window.customElements.get('a-anchor'));
		// delete AFRAME.primitives.primitives['a-anchor'];
		// delete AFRAME.primitives.primitives['a-marker'];
		// delete AFRAME.primitives.primitives['a-marker-camera'];
		// delete AFRAME.primitives.primitives['a-camera-static'];
		// delete AFRAME.systems.arjs;
		// }
		this.targetEl.removeChild(this.sceneEl);
		const mergedOptions = Object.assign({}, this.options, options);
		this.initScene(this.targetEl, mergedOptions);
		this.init();
	};
}

export default InspectorTools;
