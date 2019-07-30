export default AFRAME.registerPrimitive('a-anchor', AFRAME.utils.extendDeep({}, AFRAME.primitives.getMeshMixin(), {
    defaultComponents: {
        'arjs-anchor': {},
        'arjs-hit-testing': {},
    },
    mappings: {
        'type': 'arjs-anchor.type',
        'size': 'arjs-anchor.size',
        'url': 'arjs-anchor.patternUrl',
        'value': 'arjs-anchor.barcodeValue',
        'preset': 'arjs-anchor.preset',
        'min-confidence': 'arjs-anchor.minConfidence',
        'marker-helpers': 'arjs-anchor.markerhelpers',
        'smooth': 'arjs-anchor.smooth',
        'smooth-count': 'arjs-anchor.smoothCount',
        'smooth-tolerance': 'arjs-anchor.smoothTolerance',
        'smooth-threshold': 'arjs-anchor.smoothThreshold',

        'hit-testing-render-debug': 'arjs-hit-testing.renderDebug',
        'hit-testing-enabled': 'arjs-hit-testing.enabled',
    },
}));
