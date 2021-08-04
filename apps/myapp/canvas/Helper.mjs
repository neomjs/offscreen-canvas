import Base from '../../../node_modules/neo.mjs/src/core/Base.mjs';

import '../../../node_modules/d3-array/dist/d3-array.js';
import '../../../node_modules/d3-color/dist/d3-color.js';
import '../../../node_modules/d3-format/dist/d3-format.js';
import '../../../node_modules/d3-interpolate/dist/d3-interpolate.js';
import '../../../node_modules/d3-scale-chromatic/dist/d3-scale-chromatic.js';
import '../../../node_modules/d3-random/dist/d3-random.js';
import '../../../node_modules/d3-scale/dist/d3-scale.js';
import '../../../node_modules/d3-shape/dist/d3-shape.js';
import '../../../node_modules/d3-time-format/dist/d3-time-format.js';
import '../../../node_modules/@d3fc/d3fc-extent/build/d3fc-extent.js';
import '../../../node_modules/@d3fc/d3fc-random-data/build/d3fc-random-data.js';
import '../../../node_modules/@d3fc/d3fc-rebind/build/d3fc-rebind.js';
import '../../../node_modules/@d3fc/d3fc-series/build/d3fc-series.js';
import '../../../node_modules/@d3fc/d3fc-webgl/build/d3fc-webgl.js';

const xScale = d3.scaleLinear().domain([-5, 5]),
      yScale = d3.scaleLinear().domain([-5, 5]);

/**
 * @class MyApp.canvas.Helper
 * @extends Neo.core.Base
 * @singleton
 */
class Helper extends Base {
    static getConfig() {return {
        /**
         * @member {String} className='MyApp.canvas.Helper'
         * @protected
         */
        className: 'MyApp.canvas.Helper',
        /**
         * @member {Boolean} singleton=true
         * @protected
         */
        singleton: true,
        /**
         * @member {Object[]|null} data=null
         */
        data: null,
        /**
         * @member {Number} itemsAmount=1000
         */
        itemsAmount: 1000,
        /**
         * @member {Object} remote={app:['renderSeries']}
         * @protected
         */
        remote: {
            app: [
                'renderSeries'
            ]
        },
        /**
         * @member {Function|null} series=null
         */
        series: null
    }}

    /**
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        this.generateData();
        this.generateSeries()
        console.log(typeof this.series);
    }

    /**
     *
     */
    generateData() {
        let randomNormal    = d3.randomNormal(0, 1),
            randomLogNormal = d3.randomLogNormal();

        this.data = Array.from({ length: this.itemsAmount }, () => ({
            x   : randomNormal(),
            y   : randomNormal(),
            size: randomLogNormal() * 10
        }));
    }

    /**
     *
     */
    generateSeries() {
        let colorScale = d3.scaleOrdinal(d3.schemeAccent),

        series = fc
            .seriesWebglPoint()
            .xScale(xScale)
            .yScale(yScale)
            .crossValue(d => d.x)
            .mainValue(d => d.y)
            .size(d => d.size)
            .equals((previousData, data) => previousData.length > 0),

        webglColor = color => {
            let { r, g, b, opacity } = d3.color(color).rgb();
            return [r / 255, g / 255, b / 255, opacity];
        },

        fillColor = fc
            .webglFillColor()
            .value((d, i) => webglColor(colorScale(i)))
            .data(this.data);

        series.decorate(program => {
            fillColor(program);
        });

        this.series = series;
    }

    /**
     *
     */
    render() {
        let me   = this,
            ease = 5 * (0.51 + 0.49 * Math.sin(Date.now() / 1e3));

        xScale.domain([-ease, ease]);
        yScale.domain([-ease, ease]);

        me.series(me.data);

        requestAnimationFrame(me.render.bind(me));
    }

    /**
     * @param {String} canvasId
     */
    renderSeries(canvasId) {
        let gl = Neo.currentWorker.map[canvasId].getContext('webgl');

        this.series.context(gl);
        this.render();
    }
}

Neo.applyClassConfig(Helper);

let instance = Neo.create(Helper);

Neo.applyToGlobalNs(instance);

export default instance;
