import Toolbar  from '../../../node_modules/neo.mjs/src/container/Toolbar.mjs';
import Viewport from '../../../node_modules/neo.mjs/src/container/Viewport.mjs';

/**
 * @class MyApp.view.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends Viewport {
    static getConfig() {return {
        className: 'MyApp.view.MainContainer',
        autoMount: true,
        layout   : {ntype: 'vbox', align: 'stretch'},

        items: [{
            ntype: 'component',
            flex : 1
        }, {
            module: Toolbar,
            flex  : 'none',
            items : [{
                text: 'Stop Animation'
            }]
        }]
    }}
}

Neo.applyClassConfig(MainContainer);

export {MainContainer as default};
