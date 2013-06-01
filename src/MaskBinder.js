/**
 * MaskBinder for ExtJS 4.x, a plugin used by grid to fix the LoadMask position issue.
 * By default, grid use LoadMask to achieve the mask effect during store loading.
 * But the mask remains at the initial position when the parent container scrolls or the grid is being dragged.
 * That's because the LoadMask dom is created under body level (outside grid dom),the grid dom changes won't affect the mask dom.
 * While the Element.mask will render the mask directly in the Element dom, so this plugin uses the Element.mask to fix this problem.
 *
 * The MaskBinder can handle the grid show/hide/expand/collapse and reconfigure store behavior.
 * Example:
 * {
 *      xtype: 'grid',
 *      plugins: ['maskbinder'],
 *      ...
 * }
 *
 * @author: twinssbc
 * @version 1.0.0
 * @ptype maskbinder
 */

Ext.define('Ext.ux.MaskBinder', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.maskbinder',
    mixins: {
        bindable: 'Ext.util.Bindable'
    },
    init: function (grid) {
        var me = this;

        if (!grid || !grid.getStore) {
            throw new Error('target is not a valid grid component');
        }

        me.grid = grid;
        grid.getView().loadMask = false;

        grid.mon(grid, {
            show: me.onGridShow,
            hide: me.onGridHide,
            expand: me.onGridExpand,
            collapse: me.onGridCollapse,
            beforerender: function (grid) {
                me.bindStore(grid.getStore(), true);
            },
            reconfigure: function (grid, store) {
                me.bindStore(store, true);
            },
            scope: me
        });
    },
    onBeforeLoad: function () {
        if (this.grid.isVisible(true)) {
            this.setMask();
        } else {
            this.showMaskNext = true;
        }
        this.loading = true;
    },
    onLoad: function () {
        if (this.grid.isVisible(true)) {
            this.unsetMask();
        }
        this.loading = false;
        this.showMaskNext = false;
    },
    onGridShow: function () {
        this.onComponentShow();
    },
    onGridHide: function () {
        this.onComponentHide();
    },
    onGridExpand: function () {
        this.onComponentShow();
    },
    onGridCollapse: function () {
        this.onComponentHide();
    },
    setMask: function () {
        var targetEl = this.grid.getTargetEl();
        if (targetEl) {
            targetEl.mask('Loading mask...');
        }
    },
    unsetMask: function () {
        var targetEl = this.grid.getTargetEl();
        if (targetEl) {
            targetEl.unmask();
        }
    },
    onComponentShow: function () {
        if (this.showMaskNext && this.loading) {
            this.setMask();
        }
        this.showMaskNext = false;
    },
    onComponentHide: function () {
        if (this.loading) {
            this.unsetMask();
            this.showMaskNext = true;
        }
    },
    bindStore: function (store, initial) {
        var me = this;
        if (store && !store.boundMask) {
            me.mixins.bindable.bindStore.apply(me, arguments);
            store.boundMask = true;
            if (store.isLoading()) {
                me.onBeforeLoad();
            }
        }
    },
    getStoreListeners: function (store) {
        var result = {};
        if (!store || (store && store.proxy && !store.proxy.isSynchronous)) {
            result.beforeload = this.onBeforeLoad;
            result.load = this.onLoad;
        }
        return result;
    }
});
