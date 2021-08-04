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

/**
 * @class MyApp.canvas.Helper
 * @extends Neo.core.Base
 * @singleton
 */
class Helper extends Base {
    static getConfig() {return {
        className: 'MyApp.canvas.Helper',
        singleton: true
    }}

    /**
     *
     * @param {Object} config
     */
    constructor(config) {
        super(config);
        console.log('Helper ready');
    }
}

Neo.applyClassConfig(Helper);

let instance = Neo.create(Helper);

Neo.applyToGlobalNs(instance);

export default instance;
