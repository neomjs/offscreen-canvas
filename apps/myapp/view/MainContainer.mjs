import Toolbar        from '../../../node_modules/neo.mjs/src/container/Toolbar.mjs';
import Viewport       from '../../../node_modules/neo.mjs/src/container/Viewport.mjs';
import WebGlComponent from './WebGlComponent.mjs';

/**
 * @class MyApp.view.MainContainer
 * @extends Neo.container.Viewport
 */
class MainContainer extends Viewport {
    static getConfig() {return {
        /**
         * @member {String} className='MyApp.view.MainContainer'
         * @protected
         */
        className: 'MyApp.view.MainContainer',
        /**
         * @member {Boolean} autoMount=true
         * @protected
         */
        autoMount: true,
        /**
         * @member {Object} layout={ntype:'vbox',align:'stretch'}
         */
        layout: {ntype: 'vbox', align: 'stretch'}
    }}

    /**
     * @param {Object} config
     */
    constructor(config) {
        super(config);

        let me = this;

        me.items = [{
            module: WebGlComponent,
            flex  : 1
        }, {
            module: Toolbar,
            flex  : 'none',
            items : [{
                handler: me.onStopAnimationButtonClick.bind(me),
                text   : 'Stop Animation'
            }, {
                handler    : me.changeItemAmount.bind(me, 10000),
                pressed    : true,
                style      : {marginLeft: '2em'},
                text       : `${(10000).toLocaleString()} items`,
                toggleGroup: 'itemAmount',
                value      : 10000
            }, {
                handler    : me.changeItemAmount.bind(me, 100000),
                style      : {marginLeft: '.2em'},
                text       : `${(100000).toLocaleString()} items`,
                toggleGroup: 'itemAmount',
                value      : 100000
            }, {
                handler    : me.changeItemAmount.bind(me, 1000000),
                style      : {marginLeft: '.2em'},
                text       : `${(1000000).toLocaleString()} items`,
                toggleGroup: 'itemAmount',
                value      : 1000000
            }]
        }];
    }

    /**
     * @param {Number} count
     */
    changeItemAmount(count) {
        console.log('changeItemAmount', count);

        let me = this;

        me.items[1].items.forEach(item => {
            if (item.toggleGroup === 'itemAmount') {
                item.pressed = item.value === count;
            }
        });
    }

    /**
     * @param {Object} data
     */
    onStopAnimationButtonClick(data) {
        let enableAnimation = true,
            buttonText;

        if (data.component.text === 'Stop Animation') {
            buttonText      = 'Start Animation';
            enableAnimation = false;
        } else {
            buttonText = 'Stop Animation';
        }

        data.component.text = buttonText;

        MyApp.canvas.Helper.enableAnimation(enableAnimation);
    }
}

Neo.applyClassConfig(MainContainer);

export {MainContainer as default};
