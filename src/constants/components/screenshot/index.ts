export default () => {
    AFRAME.components.screenshot.Component.prototype.renderCapture = function (camera, size, projection) {
        var autoClear = this.el.renderer.autoClear;
        var el = this.el;
        var imageData;
        var output;
        var pixels;
        var renderer = el.renderer;
        // Create rendering target and buffer to store the read pixels.
        output = this.getRenderTarget(size.width, size.height);
        pixels = new Uint8Array(4 * size.width * size.height);
        // Resize quad, camera, and canvas.
        this.resize(size.width, size.height);
        // Render scene to render target.
        renderer.autoClear = true;
        renderer.clear();
        renderer.setRenderTarget(output);
        renderer.render(el.object3D, camera);
        renderer.autoClear = autoClear;
        // Read image pizels back.
        renderer.readRenderTargetPixels(output, 0, 0, size.width, size.height, pixels);
        renderer.setRenderTarget(null);
        if (projection === 'perspective') {
          pixels = this.flipPixelsVertically(pixels, size.width, size.height);
        }
        imageData = new ImageData(new Uint8ClampedArray(pixels), size.width, size.height);
        // Hide quad after projecting the image.
        this.quad.visible = false;
        // Copy pixels into canvas.
        this.ctx.putImageData(imageData, 0, 0);
      };
      AFRAME.components.screenshot.Component.prototype.getCanvas = function (projection) {
        var isVREnabled = this.el.renderer.vr.enabled;
        var renderer = this.el.renderer;
        // Disable VR.
        var params = this.setCapture(projection);
        renderer.vr.enabled = false;
        this.renderCapture(params.camera, params.size, params.projection);
        // Restore VR.
        renderer.vr.enabled = isVREnabled;
        return this.canvas;
      };
};
