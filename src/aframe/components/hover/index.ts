import { registerComponent } from 'aframe';

export default () => registerComponent('hover', {
    schema: {
        type: 'boolean',
    },
    init: function () {
        console.log('hover init', this);
    },
    update: function () {
        console.log('hover update', this);
    },
    play: function () {
        console.log('hover play');
        if (this.data) {
            this._attachEventListener();
        }
    },
    pause: function () {
        console.log('hover pause');
        this._detachEventListener();
    },
    _attachEventListener: function () {
        this.el.addEventListener('mouseenter', this._mouseenter);
        this.el.addEventListener('mouseleave', this._mouseleave);
    },
    _detachEventListener: function () {
        this.el.removeEventListener('mouseenter', this._mouseenter);
        this.el.removeEventListener('mouseleave', this._mouseleave);
    },
    _mouseenter: function () {
        console.log('mouseenter', this);
    },
    _mouseleave: function () {
        console.log('mouseleave', this);
    },
});
