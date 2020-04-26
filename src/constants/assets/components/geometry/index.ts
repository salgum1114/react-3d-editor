import { IComponentDescriptor, GeometryDefault } from '../../../../models/component';

const geometry: IComponentDescriptor = {
	isSingleProp: false,
	schema: {
		buffer: {
			type: 'boolean',
			default: true,
		},
		primitive: {
			type: 'string',
			default: 'box',
			oneOf: [
				'box',
				'circle',
				'cone',
				'cylinder',
				'dodecahedron',
				'icosahedron',
				'octahedron',
				'plane',
				'ring',
				'sphere',
				'tetrahedron',
				'torus',
				'torusKnot',
				'triangle',
			],
		},
		skipCache: {
			type: 'boolean',
			default: false,
		},
		width: {
			type: 'number',
			if: {
				primitive: ['box', 'plane'],
			},
			default: {
				box: 1,
				plane: 1,
			} as GeometryDefault,
		},
		height: {
			type: 'number',
			if: {
				primitive: ['box', 'cone', 'cylinder', 'plane'],
			},
			default: {
				box: 1,
				cone: 2,
				cylinder: 3,
				plane: 1,
			} as GeometryDefault,
		},
		depth: {
			type: 'number',
			if: {
				primitive: ['box'],
			},
			default: {
				box: 1,
			} as GeometryDefault,
		},
		segmentsDepth: {
			type: 'number',
			if: {
				primitive: ['box'],
			},
			default: {
				box: 1,
			} as GeometryDefault,
		},
		segmentsHeight: {
			type: 'number',
			if: {
				primitive: ['box', 'cone', 'cylinder', 'plane', 'sphere'],
			},
			default: {
				box: 1,
				cone: 18,
				cylinder: 18,
				plane: 1,
				sphere: 36,
			} as GeometryDefault,
		},
		segmentsWidth: {
			type: 'number',
			if: {
				primitive: ['box', 'plane', 'sphere'],
			},
			default: {
				box: 1,
				plane: 1,
				sphere: 18,
			} as GeometryDefault,
		},
		segmentsRadial: {
			type: 'number',
			if: {
				primitive: ['cone', 'cylinder', 'torus', 'torusKnot'],
			},
			default: {
				cone: 36,
				cylinder: 36,
				torus: 36,
				torusKnot: 36,
			} as GeometryDefault,
		},
		segmentsTheta: {
			type: 'number',
			if: {
				primitive: ['ring'],
			},
			default: {
				ring: 32,
			} as GeometryDefault,
		},
		segmentsPhi: {
			type: 'number',
			if: {
				primitive: ['ring'],
			},
			default: {
				ring: 8,
			} as GeometryDefault,
		},
		segmentsTubular: {
			type: 'number',
			if: {
				primitive: ['torus', 'torusKnot'],
			},
			default: {
				torus: 32,
				torusKnot: 32,
			} as GeometryDefault,
		},
		segments: {
			type: 'number',
			if: {
				primitive: ['circle'],
			},
			default: {
				circle: 32,
			} as GeometryDefault,
		},
		radius: {
			type: 'number',
			if: {
				primitive: [
					'circle',
					'cylinder',
					'dodecahedron',
					'octahedron',
					'shpere',
					'tetrahedron',
					'torus',
					'torusKnot',
				],
			},
			default: {
				circle: 1,
				cylinder: 1,
				dodecahedron: 1,
				octahedron: 1,
				sphere: 1,
				tetrahedron: 1,
				torus: 1,
				torusKnot: 1,
			} as GeometryDefault,
		},
		radiusBottom: {
			type: 'number',
			if: {
				primitive: ['cone'],
			},
			default: {
				cone: 1,
			} as GeometryDefault,
		},
		radiusTop: {
			type: 'number',
			if: {
				primitive: ['cone'],
			},
			default: {
				cone: 1,
			} as GeometryDefault,
		},
		radiusInner: {
			type: 'number',
			if: {
				primitive: ['ring'],
			},
			default: {
				ring: 1,
			} as GeometryDefault,
		},
		radiusOuter: {
			type: 'number',
			if: {
				primitive: ['ring'],
			},
			default: {
				ring: 1,
			} as GeometryDefault,
		},
		radiusTubular: {
			type: 'number',
			if: {
				primitive: ['torus', 'torusKnot'],
			},
			default: {
				torus: 0.2,
				torusKnot: 0.2,
			} as GeometryDefault,
		},
		thetaStart: {
			type: 'number',
			if: {
				primitive: ['circle', 'cone', 'cylinder', 'ring', 'sphere'],
			},
			default: {
				circle: 0,
				cone: 0,
				cylinder: 0,
				ring: 0,
				sphere: 0,
			} as GeometryDefault,
		},
		thetaLength: {
			type: 'number',
			if: {
				primitive: ['circle', 'cone', 'cylinder', 'ring', 'sphere'],
			},
			default: {
				circle: 360,
				cone: 360,
				cylinder: 360,
				ring: 360,
				sphere: 360,
			} as GeometryDefault,
		},
		openEnded: {
			type: 'boolean',
			if: {
				primitive: ['cone', 'cylinder'],
			},
			default: {
				cone: false,
				cylinder: false,
			} as GeometryDefault,
		},
		phiStart: {
			type: 'number',
			if: {
				primitive: ['sphere'],
			},
			default: {
				sphere: 0,
			} as GeometryDefault,
		},
		phiLength: {
			type: 'number',
			if: {
				primitive: ['shpere'],
			},
			default: {
				sphere: 360,
			} as GeometryDefault,
		},
		arc: {
			type: 'number',
			if: {
				primitive: ['torus'],
			},
			default: {
				torus: 360,
			} as GeometryDefault,
		},
		p: {
			type: 'number',
			if: {
				primitive: ['torusKnot'],
			},
			default: {
				torusKnot: 2,
			} as GeometryDefault,
		},
		q: {
			type: 'number',
			if: {
				primitive: ['torusKnot'],
			},
			default: {
				torusKnot: 3,
			} as GeometryDefault,
		},
		vertexA: {
			type: 'vec3',
			if: {
				primitive: ['triangle'],
			},
			default: {
				triangle: {
					x: 0,
					y: 0.5,
					z: 0,
				},
			} as GeometryDefault,
		},
		vertexB: {
			type: 'vec3',
			if: {
				primitive: ['triangle'],
			},
			default: {
				triangle: {
					x: -0.5,
					y: -0.5,
					z: 0,
				},
			} as GeometryDefault,
		},
		vertexC: {
			type: 'vec3',
			if: {
				primitive: ['triangle'],
			},
			default: {
				triangle: {
					x: 0.5,
					y: -0.5,
					z: 0,
				},
			} as GeometryDefault,
		},
	},
};

export default geometry;
