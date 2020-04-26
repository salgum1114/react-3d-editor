import { registerComponent } from 'aframe';
import metadata from 'polestar-icons/lib/Example/polestar.json';

const icons = (() =>
	metadata.icons.reduce((prev: any, curr: any) => {
		return Object.assign(prev, {
			[curr.name]: curr,
		});
	}, {}))();

export default () =>
	registerComponent('icon', {
		schema: {
			name: {
				type: 'string',
			},
		},
		init() {
			const { name } = this.data;
			this.drawIcon(name);
		},
		drawIcon(name: string) {
			const canvas = document.createElement('canvas') as any;
			canvas.width = 1024;
			canvas.height = 1024;
			const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
			ctx.font = '900 200px polestar';
			ctx.fillStyle = '#red';
			ctx.textAlign = 'center';
			ctx.textBaseline = 'middle';
			const icon = icons[name];
			if (icons[name]) {
				ctx.fillText(String.fromCharCode(parseInt(icon.unicode, 16)), canvas.width / 2, canvas.height / 2);
			} else {
				ctx.fillText(String.fromCharCode(parseInt(icons.map.unicode, 16)), canvas.width / 2, canvas.height / 2);
			}
			this.el.setAttribute('material', 'src', canvas.toDataURL());
		},
		update() {
			const { name } = this.data;
			if (name && name.length) {
				this.drawIcon(name);
			}
		},
	});
