import Canvas from '../../../node_modules/neo.mjs/src/component/Canvas.mjs';

/**
 * @class MyApp.view.WebGlComponent
 * @extends Neo.component.Canvas
 */
class WebGlComponent extends Canvas {
    static getConfig() {return {
        /**
         * @member {String} className='MyApp.view.WebGlComponent'
         * @protected
         */
        className: 'MyApp.view.WebGlComponent',
        /**
         * @member {String[]} cls=['neo-webgl-component']
         */
        cls: ['neo-webgl-component'],
        /**
         * @member {Object} _vdom
         */
        _vdom:
        {tag: 'd3fc-group', 'auto-resize': true, cls: ['neo-canvas-wrapper'], cn: [
            {tag: 'd3fc-canvas', cn: [
                {tag: 'canvas'}
            ]}
        ]}
    }}

    /**
     * Triggered after the id config got changed
     * @param {String} value
     * @param {String} oldValue
     */
    afterSetId(value, oldValue) {
        let me = this;

        me.vdom.id = me.getWrapperId();
        me.vdom.cn[0].cn[0].id = `${value}__canvas`;

        super.afterSetId(value, oldValue);
    }

    /**
     * Triggered after the offscreenRegistered config got changed
     * @param {Boolean} value
     * @param {Boolean} oldValue
     * @protected
     */
    afterSetOffscreenRegistered(value, oldValue) {
        if (value) {
            let me           = this,
                domListeners = me.domListeners;

            domListeners.push(
                {measure: me.onMeasure, scope: me} // custom d3fc dom event
            );

            me.domListeners = domListeners;

            // remote method access to the canvas worker
            MyApp.canvas.Helper.renderSeries(this.getCanvasId());

            Neo.main.DomAccess.getBoundingClientRect({id: me.id}).then(rect => {
                me.updateSize(rect.height, rect.width);
            });
        }
    }

    /**
     * Override this method when using wrappers (e.g. D3)
     * @returns {String}
     */
    getCanvasId() {
        return this.vdom.cn[0].cn[0].id;
    }


    /**
     * @returns {Object} The new vdom root
     */
    getVdomRoot() {
        return this.vdom.cn[0];
    }

    /**
     * @returns {Object} The new vnode root
     */
    getVnodeRoot() {
        return this.vnode.childNodes[0];
    }

    /**
     *
     * @returns {String}
     */
    getWrapperId() {
        return `${this.id}__wrapper`;
    }

    /**
     * @param {Object} data
     */
    onMeasure(data) {
        let node = data.path[0];
        this.updateSize(node.clientHeight, node.clientWidth);
    }

    /**
     * @param {Number} height
     * @param {Number} width
     */
    updateSize(height, width) {
        MyApp.canvas.Helper.updateSize({ height, width });
    }
}

Neo.applyClassConfig(WebGlComponent);

export {WebGlComponent as default};
