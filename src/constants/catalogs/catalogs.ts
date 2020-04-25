import { IPrimitive } from '../primitives';

export const catalogs: IPrimitive[] = [
	{
		key: 'buster_drone',
		type: 'a-entity',
		title: 'Buster Drone',
		description: 'Buster Drone glTF',
		url: './catalogs/buster_drone/scene.gltf',
		image: './catalogs/buster_drone/buster_drone.png',
		attributes: [
			{
				attribute: 'gltf-model',
				default: '/catalogs/buster_drone/scene.gltf',
			},
			{
				attribute: 'scale',
				default: '0.01 0.01 0.01',
			},
			{
				attribute: 'position',
				default: '0 1 0',
			},
			{
				attribute: 'animation-mixer.duration',
				default: '0',
			},
			{
				attribute: 'animation-mixer.clip',
				default: '*',
			},
			{
				attribute: 'animation-mixer.loop',
				default: 'repeat',
			},
		],
	},
	{
		key: 'black_dragon',
		type: 'a-entity',
		title: 'Black Dragon',
		description: 'Black Dragon glTF',
		url: './catalogs/black_dragon/scene.gltf',
		image: './catalogs/buster_drone/buster_drone.png',
		attributes: [
			{
				attribute: 'gltf-model',
				default: '/catalogs/black_dragon/scene.gltf',
			},
			{
				attribute: 'scale',
				default: '0.0005 0.0005 0.0005',
			},
			{
				attribute: 'position',
				default: '0 0 0',
			},
		],
	},
	{
		key: 'transformer',
		type: 'a-entity',
		title: 'Transformer',
		description: 'Transformer OBJ',
		url: './catalogs/transformer/Transformer.obj',
		image: './catalogs/buster_drone/buster_drone.png',
		attributes: [
			{
				attribute: 'obj-model',
				default: {
					obj: '/catalogs/transformer/Transformer.obj',
					mtl: '/catalogs/transformer/Transformer.mtl',
				},
			},
			{
				attribute: 'scale',
				default: '0.01 0.01 0.01',
			},
			{
				attribute: 'position',
				default: '0 0 0',
			},
		],
	},
	// {
	//     key: 'player_camera',
	//     type: '',
	//     title: 'Player Camera',
	//     description: 'First person narrative camera',
	//     image: './catalogs/playercamera/playercamera.png',
	//     fragment: {
	//         entity: `
	//         <a-entity id="playerCamera" position="0 1.6 8">
	//             <a-entity id="camera" camera="active: false;" look-controls wasd-controls>
	//                 <!-- Cursor. -->
	//                 <a-entity id="cursor" position="0 0 -2"
	//                             geometry="primitive: ring; radiusOuter: 0.016; radiusInner: 0.01"
	//                             material="color: #ff9; shader: flat; transparent: true; opacity: 0.5"
	//                             scale="2 2 2" raycaster>
	//                 </a-entity>
	//             </a-entity>
	//         </a-entity>
	//         `,
	//     },
	// },
	{
		key: 'sample_video',
		type: 'a-video',
		title: 'Big Buck Bunny',
		description: 'Big Buck Bunny',
		image: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
		attributes: [
			{
				attribute: 'material.src',
				default: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
			},
		],
	},
];
