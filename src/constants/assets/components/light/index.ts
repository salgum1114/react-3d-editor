import { IComponentDescriptor } from '../../../../models/component';

const light: IComponentDescriptor = {
	isSingleProp: false,
	schema: {
		type: {
			type: 'string',
			default: 'directional',
			oneOf: ['ambient', 'directional', 'hemisphere', 'point', 'spot'],
			schemaChange: true,
		},
		angle: {
			type: 'number',
			default: 60,
			if: {
				type: ['spot'],
			},
		},
		castShadow: {
			type: 'boolean',
			default: false,
			if: {
				type: ['point', 'spot', 'directional'],
			},
		},
		color: {
			type: 'color',
			default: '#fff',
		},
		decay: {
			type: 'number',
			default: 1,
			if: {
				type: ['point', 'spot'],
			},
		},
		distance: {
			type: 'number',
			default: 0,
			min: 0,
			if: {
				type: ['point', 'spot'],
			},
		},
		groundColor: {
			type: 'color',
			default: '#fff',
			if: {
				type: ['hemisphere'],
			},
		},
		intensity: {
			type: 'number',
			default: 1,
			min: 0,
			if: {
				type: ['ambient', 'directional', 'hemisphere', 'point', 'spot'],
			},
		},
		penumbra: {
			type: 'number',
			default: 0,
			min: 0,
			max: 1,
			if: {
				type: ['spot'],
			},
		},
		shadowBias: {
			type: 'number',
			default: 0,
			if: {
				castShadow: true,
			},
		},
		shadowCameraBottom: {
			type: 'number',
			default: -5,
			if: {
				castShadow: true,
			},
		},
		shadowCameraFar: {
			type: 'number',
			default: 500,
			if: {
				castShadow: true,
			},
		},
		shadowCameraFov: {
			type: 'number',
			default: 90,
			if: {
				castShadow: true,
			},
		},
		shadowCameraLeft: {
			type: 'number',
			default: -5,
			if: {
				castShadow: true,
			},
		},
		shadowCameraNear: {
			type: 'number',
			default: 0.5,
			if: {
				castShadow: true,
			},
		},
		shadowCameraRight: {
			type: 'number',
			default: 5,
			if: {
				castShadow: true,
			},
		},
		shadowCameraTop: {
			type: 'number',
			default: 5,
			if: {
				castShadow: true,
			},
		},
		shadowCameraVisible: {
			type: 'boolean',
			default: false,
			if: {
				castShadow: true,
			},
		},
		shadowMapHeight: {
			type: 'number',
			default: 512,
			if: {
				castShadow: true,
			},
		},
		shadowMapWidth: {
			type: 'number',
			default: 512,
			if: {
				castShadow: true,
			},
		},
		shadowRadius: {
			type: 'number',
			default: 1,
			if: {
				castShadow: true,
			},
		},
		target: {
			type: 'selector',
			if: {
				type: ['spot', 'directional'],
			},
		},
	},
};

export default light;
