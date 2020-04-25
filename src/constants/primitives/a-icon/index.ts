import { registerPrimitive } from 'aframe';

export default () => registerPrimitive('a-icon', {
    defaultComponents: {
        icon: {
            name: 'map',
        },
        geometry: {
            primitive: 'plane',
        },
        material: {
            side: 'double',
            transparent: true,
        },
    },
    mappings: {
        icon: 'icon.name',
    },
});
