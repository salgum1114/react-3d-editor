import { registerComponent } from 'aframe';

export default () => registerComponent('resource', {
    schema: {
        type: 'resource',
        parse: AFRAME.utils.styleParser.parse,
        stringify: AFRAME.utils.styleParser.stringify,
        default: '',
    },
    update: function() {
        this.el.object3D.resource = this.data;
    },
});
