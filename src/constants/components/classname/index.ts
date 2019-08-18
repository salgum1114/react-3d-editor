import { registerComponent } from 'aframe';

export default () => registerComponent('class', {
    schema: {
        type: 'string',
        parse: AFRAME.utils.styleParser.parse,
        stringify: AFRAME.utils.styleParser.stringify,
        default: '',
    },
    update: function() {
        this.el.object3D.class = this.data;
    },
});
