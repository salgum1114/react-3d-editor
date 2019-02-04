import { IProperties } from '../components';

export interface IGeometryProperties {
    buffer: IProperties;
    primitive: IProperties;
    skipCache: IProperties;
}

export const properties: IGeometryProperties = {
    buffer: {
        property: 'buffer',
        description: 'Transform geometry into a BufferGeometry to reduce memory usage at the cost of being harder to manipulate.',
        defaultValue: true,
    },
    primitive: {
        property: 'primitive',
        description: 'Name of a geometry (e.g., one of the geometries listed below). Determines the geometry type and what other properties are available.',
        defaultValue: 'box',
    },
    skipCache: {
        property: 'skipCache',
        description: 'Disable retrieving the shared geometry object from the cache.',,
        defaultValue: false,
    },
}

export interface IBoxProperties {
    width: IProperties;
    height: IProperties;
    depth: IProperties;
    segmentsDepth: IProperties;
    segmentsHeight: IProperties;
    segmentsWidth: IProperties;
}

export const boxProperties: IBoxProperties = {
    width: {
        property: 'width',
        description: 'Width (in meters) of the sides on the X axis.',
        defaultValue: 1,
    },
    height: {
        property: 'height',
        description: 'Height (in meters) of the sides on the Y axis.',
        defaultValue: 1,
    },
    depth: {
        property: 'depth',
        description: 'Depth (in meters) of the sides on the Z axis.',
        defaultValue: 1,
    },
    segmentsDepth: {
        property: 'segmentsDepth',
        description: 'Number of segmented faces on the z-axis',
        defaultValue: 1,
    },
    segmentsHeight: {
        property: 'segmentsHeight',
        description: 'Number of segmented faces on the y-axis',
        defaultValue: 1,
    },
    segmentsWidth: {
        property: 'segmentsWidth',
        description: 'Number of segmented faces on the x-axis',
        defaultValue: 1,
    },
}

export interface ICircleProperties {
    radius: IProperties;
    segments: IProperties;
    thetaStart: IProperties;
    thetaLength: IProperties;
}

export const circleProperties: ICircleProperties = {
    radius: {
        property: 'radius',
        description: 'Radius (in meters) of the circle.',
        defaultValue: 1,
    },
    segments: {
        property: 'segments',
        description: 'Number of triangles to construct the circle, like pizza slices. A higher number of segments means the circle will be more round.',
        defaultValue: 32,
    },
    thetaStart: {
        property: 'thetaStart',
        description: 'Start angle for first segment. Can be used to define a partial circle.',
        defaultValue: 0,
    },
    thetaLength: {
        property: 'thetaLength',
        description: 'The central angle (in degrees). Defaults to 360, which makes for a complete circle.',
        defaultValue: 360,
    },
}

export interface IConeProperties {
    height: IProperties;
    openEnded: IProperties;
    radiusBottom: IProperties;
    radiusTop: IProperties;
    segmentsRadial: IProperties;
    segmentsHeight: IProperties;
    thetaStart: IProperties;
    thetaLength: IProperties;
}

export const coneProperties: IConeProperties = {
    height: {
        property: 'height',
        description: 'Height of the cone.',
        defaultValue: 2,
    },
    openEnded: {
        property: 'openEnded',
        description: 'Whether the ends of the cone are open (true) or capped (false).',
        defaultValue: false,
    },
    radiusBottom: {
        property: 'radiusBottom',
        description: 'Radius of the bottom end of the cone.',
        defaultValue: 1,
    },
    radiusTop: {
        property: 'radiusTop',
        description: 'Radius of the top end of the cone.',
        defaultValue: 1,
    },
    segmentsRadial: {
        property: 'segmentsRadial',
        description: 'Number of segmented faces around the circumference of the cone.',
        defaultValue: 36,
    },
    segmentsHeight: {
        property: 'segmentsHeight',
        description: 'Number of rows of faces along the height of the cone.',
        defaultValue: 18,
    },
    thetaStart: {
        property: 'thetaStart',
        description: 'Starting angle in degrees.',
        defaultValue: 0,
    },
    thetaLength: {
        property: 'thetaLength',
        description: 'Central angle in degrees.',
        defaultValue: 360,
    },
}

export interface ICylinderInterface {
    radius: IProperties;
    height: IProperties;
    segmentsRadial: IProperties;
    segmentsHeight: IProperties;
    openEnded: IProperties;
    thetaStart: IProperties;
    thetaLength: IProperties;
}

export const cylinderProperties: ICylinderInterface = {
    radius: {
        property: 'radius',
        description: 'Radius of the cylinder.',
        defaultValue: 1,
    },
    height: {
        property: 'height',
        description: 'Height of the cylinder.',
        defaultValue: 2,
    },
    segmentsRadial: {
        property: 'segmentsRadial',
        description: 'Number of segmented faces around the circumference of the cylinder.',
        defaultValue: 36,
    },
    segmentsHeight: {
        property: 'segmentsHeight',
        description: 'Number of rows of faces along the height of the cylinder.',
        defaultValue: 18,
    },
    openEnded: {
        property: 'openEnded',
        description: 'Whether the ends of the cylinder are open (true) or capped (false).',
        defaultValue: false,
    },
    thetaStart: {
        property: 'thetaStart',
        description: 'Starting angle in degrees.',
        defaultValue: 0,
    },
    thetaLength: {
        property: 'thetaLength',
        description: 'Central angle in degrees.',
        defaultValue: 360,
    },
}

export interface IDodecahedronProperties {
    radius: IProperties;
}

export const dodecahedronProperties: IDodecahedronProperties = {
    radius: {
        property: 'radius',
        description: 'Radius (in meters) of the dodecahedron.',
        defaultValue: 1,
    },
}

export interface IOctahedronProperties {
    radius: IProperties;
}

export const octahedronProperties: IOctahedronProperties = {
    radius: {
        property: 'radius',
        description: 'Radius (in meters) of the octahedron.',
        defaultValue: 1,
    },
}

export interface IPlaneProperties {
    width: IProperties;
    height: IProperties;
    segmentsHeight: IProperties;
    segmentsWidth: IProperties;
}

export const planeProperties: IPlaneProperties = {
    width: {
        property: 'width',
        description: 'Width along the X axis.',
        defaultValue: 1,
    },
    height: {
        property: 'width',
        description: 'Height along the Y axis.',
        defaultValue: 1,
    },
    segmentsHeight: {
        property: 'width',
        description: 'Number of segmented faces on the y-axis',
        defaultValue: 1,
    },
    segmentsWidth: {
        property: 'width',
        description: 'Number of segmented faces on the x-axis',
        defaultValue: 1,
    },
}

export interface IRingProperies {
    radiusInner: IProperties;
    radiusOuter: IProperties;
    segementsTheta: IProperties;
    segementsPhi: IProperties;
    thetaStart: IProperties;
    thetaLength: IProperties;
}

export const ringProperties: IRingProperies = {
    radiusInner: {
        property: 'radiusInner',
        description: 'Radius of the inner hole of the ring.',
        defaultValue: 1,
    },
    radiusOuter: {
        property: 'radiusOuter',
        description: 'Radius of the outer edge of the ring.',
        defaultValue: 1,
    },
    segementsTheta: {
        property: 'segementsTheta',
        description: 'Number of segments. A higher number means the ring will be more round.',
        defaultValue: 32,
    },
    segementsPhi: {
        property: 'segementsPhi',
        description: 'Number of triangles within each face defined by segmentsTheta.',
        defaultValue: 8,
    },
    thetaStart: {
        property: 'thetaStart',
        description: 'Starting angle in degrees.',
        defaultValue: 0,
    },
    thetaLength: {
        property: 'thetaLength',
        description: 'Central angle in degrees.',
        defaultValue: 360,
    },
}

export interface ISphereProperties {
    radius: IProperties;
    segmentsWidth: IProperties;
    segmentsHeight: IProperties;
    phiStart: IProperties;
    phiLength: IProperties;
    thetaStart: IProperties;
    thetaLength: IProperties;
}

export const sphereProperties: ISphereProperties = {
    radius: {
        property: 'radius',
        description: '',
        defaultValue: 1,
    },
    segmentsWidth: {
        property: 'segmentsWidth',
        description: '',
        defaultValue: 18,
    },
    segmentsHeight: {
        property: 'segmentsHeight',
        description: '',
        defaultValue: 36,
    },
    phiStart: {
        property: 'phiStart',
        description: '',
        defaultValue: 0,
    },
    phiLength: {
        property: 'phiLength',
        description: '',
        defaultValue: 360,
    },
    thetaStart: {
        property: 'thetaStart',
        description: '',
        defaultValue: 0,
    },
    thetaLength: {
        property: 'thetaLength',
        description: '',
        defaultValue: 360,
    },
}

export interface ITetrahedronProperties {
    radius: IProperties;
}

export const tetrahedronProperties: IOctahedronProperties = {
    radius: {
        property: 'radius',
        description: 'Radius (in meters) of the tetrahedron.',
        defaultValue: 1,
    },
}

export interface ITorusProperties {
    radius: IProperties;
    radiusTubular: IProperties;
    segmentsRadial: IProperties;
    segmentsTubular: IProperties;
    arc: IProperties;
}

export const torusProperties: ITorusProperties = {
    radius: {
        property: 'radius',
        description: 'Radius of the outer edge of the torus.',
        defaultValue: 1,
    },
    radiusTubular: {
        property: 'radiusTubular',
        description: 'Radius of the tube.',
        defaultValue: 0.2,
    },
    segmentsRadial: {
        property: 'segmentsRadial',
        description: 'Number of segments along the circumference of the tube ends. A higher number means the tube will be more round.',
        defaultValue: 36,
    },
    segmentsTubular: {
        property: 'segmentsTubular',
        description: 'Number of segments along the circumference of the tube face. A higher number means the tube will be more round.',
        defaultValue: 32,
    },
    arc: {
        property: 'arc',
        description: 'Central angle.',
        defaultValue: 360,
    },
}

export interface ITorusKnotProperties {
    radius: IProperties;
    radiusTubular: IProperties;
    segmentsRadial: IProperties;
    segmentsTubular: IProperties;
    p: IProperties;
    q: IProperties;
}

export const torusKnotProperties: ITorusKnotProperties = {
    radius: {
        property: 'radius',
        description: 'Radius that contains the torus knot.',
        defaultValue: 1,
    },
    radiusTubular: {
        property: 'radiusTubular',
        description: 'Radius of the tubes of the torus knot.',
        defaultValue: 0.2,
    },
    segmentsRadial: {
        property: 'segmentsRadial',
        description: 'Number of segments along the circumference of the tube ends. A higher number means the tube will be more round.',
        defaultValue: 36,
    },
    segmentsTubular: {
        property: 'segmentsTubular',
        description: 'Number of segments along the circumference of the tube face. A higher number means the tube will be more round.',
        defaultValue: 32,
    },
    p: {
        property: 'segmentsTubular',
        description: 'How many times the geometry winds around its axis of rotational symmetry.',
        defaultValue: 2,
    },
    q: {
        property: 'segmentsTubular',
        description: 'How many times the geometry winds around a circle in the interior of the torus.',
        defaultValue: 3,
    },
}

export interface ITriangleProperties {
    vertexA: IProperties;
    vertexB: IProperties;
    vertexC: IProperties;
}

export const triangleProperties: ITriangleProperties = {
    vertexA: {
        property: 'vertexA',
        description: 'Coordinates of one of the three vertices',
        defaultValue: '0 0.5 0',
    },
    vertexB: {
        property: 'vertexB',
        description: 'Coordinates of one of the three vertices',
        defaultValue: '-0.5 -0.5 0',
    },
    vertexC: {
        property: 'vertexC',
        description: 'Coordinates of one of the three vertices',
        defaultValue: '0.5 -0.5 0',
    },
}
