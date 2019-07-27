import { IPrimitive } from '../primitives';

export const catalogs: IPrimitive[] = [
    {
        key: 'buster_drone',
        type: 'a-entity',
        title: 'Buster Drone',
        description: 'Buster Drone glTF',
        url: '/catalogs/buster_drone/scene.gltf',
        image: '/catalogs/buster_drone/buster_drone.png',
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
        ],
    },
    {
        key: 'black_dragon',
        type: 'a-entity',
        title: 'Black Dragon',
        description: 'Black Dragon glTF',
        url: '/catalogs/black_dragon/scene.gltf',
        image: '/catalogs/black_dragon/buster_drone.png',
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
];
