import { registerComponent } from 'aframe';

export default () => registerComponent('name', {
    schema: {
        type: 'string',
    },
    update: function() {
        this.el.object3D.name = this.data;
    },
});
