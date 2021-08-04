import Base from '../../../node_modules/neo.mjs/src/core/Base.mjs';

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
