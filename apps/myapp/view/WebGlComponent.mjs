import Canvas from '../../../node_modules/neo.mjs/src/component/Canvas.mjs';

/**
 * @class MyApp.view.WebGlComponent
 * @extends Neo.component.Canvas
 */
class WebGlComponent extends Canvas {
    static getConfig() {return {
        className: 'MyApp.view.WebGlComponent'
    }}

    /**
     * Triggered after the offscreenRegistered config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetOffscreenRegistered(value, oldValue) {
        if (value) {
            console.log('afterSetOffscreenRegistered', value);
        }
    }
}

Neo.applyClassConfig(WebGlComponent);

export {WebGlComponent as default};
