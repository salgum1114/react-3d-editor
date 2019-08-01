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
                default: 'AUTO',
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
        key: 'player_camera',
        type: '',
        title: 'Player Camera',
        description: 'First person narrative camera',
        image: './catalogs/buster_drone/buster_drone.png',
        fragment: {
            entity: `
            <a-entity id="playerCamera" position="0 1.6 8">
                <a-entity id="camera" camera="active: false;" look-controls wasd-controls>
                    <!-- Cursor. -->
                    <a-entity id="cursor" position="0 0 -2"
                                geometry="primitive: ring; radiusOuter: 0.016; radiusInner: 0.01"
                                material="color: #ff9; shader: flat; transparent: true; opacity: 0.5"
                                scale="2 2 2" raycaster>
                    </a-entity>
                </a-entity>
            </a-entity>
            `,
        },
    },
    {
        key: 'sample_video',
        type: 'a-video',
        title: 'Big Buck Bunny',
        description: 'Big Buck Bunny',
        attributes: [
            {
                attribute: 'material.src',
                default: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            },
        ],
    },
];
