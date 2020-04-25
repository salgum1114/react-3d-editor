import { registerComponent } from 'aframe';

export default () => registerComponent('click', {
    schema: {
        type: 'boolean',
    },
    init: function () {
        console.log('click init', this);
    },
    update: function () {
        console.log('click update', this);
    },
    play: function () {
        console.log('click play');
        if (this.data) {
            this._attachEventListener();
        }
    },
    pause: function () {
        console.log('click pause');
        this._detachEventListener();
    },
    _attachEventListener: function () {
        this.el.addEventListener('click', this._click);
    },
    _detachEventListener: function () {
        this.el.removeEventListener('click', this._click);
    },
    _click: function () {
        console.log('click', this);
        // window.location.href = 'https://github.com/salgum1114/react-3d-editor';
    },
});
