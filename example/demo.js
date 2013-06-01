Ext.Loader.setConfig({enabled: true});
Ext.Loader.setPath("Ext.ux", "http://cdn.sencha.io/ext-4.2.0-gpl/examples/ux");

Ext.require(
    [
        'Ext.ux.ajax.SimManager'
    ]
);

Ext.application({
    name: 'Grid Mask Plugin Demo',
    launch: function () {
        Ext.ux.ajax.SimManager.init({
            delay: 5000
        }).register({
                '/app/data': {
                    stype: 'json',
                    data: [
                        {
                            name: 'aaa'
                        },
                        {
                            name: 'bbb'
                        }
                    ]
                }
            });

        Ext.create('Ext.container.Viewport', {
            layout: 'fit',
            items: [
                {
                    xtype: 'container',
                    autoScroll: true,
                    items: [
                        {
                            xtype: 'box',
                            html: '<h4>click "Load" button to load the mask, then try scrolling the page or hiding/showing/dragging the grid</h4>'
                        },
                        {
                            xtype: 'button',
                            text: 'hide grid',
                            handler: function (button) {
                                button.up('viewport').down('#testGrid').hide();
                            }
                        },
                        {
                            xtype: 'button',
                            text: 'show grid',
                            handler: function (button) {
                                button.up('viewport').down('#testGrid').show();
                            }
                        },
                        {
                            xtype: 'grid',
                            itemId: 'testGrid',
                            title: 'A Grid with MaskBinder plugin',
                            width: 500,
                            height: 300,
                            draggable: true,
                            collapsible: true,
                            plugins: ['maskbinder'],
                            tbar: [
                                {
                                    text: 'Load',
                                    handler: function (button) {
                                        button.up('grid').getStore().load();
                                    }
                                }
                            ],
                            store: Ext.create('Ext.data.Store', {
                                fields: ['name'],
                                proxy: {
                                    type: 'ajax',
                                    url: '/app/data',
                                    reader: {
                                        type: 'json'
                                    }
                                },
                                data: [
                                    {
                                        name: 'test 1'
                                    },
                                    {
                                        name: 'test 2'
                                    }
                                ]
                            }),
                            columns: {
                                items: [
                                    {
                                        text: 'Name',
                                        dataIndex: 'name'
                                    }
                                ],
                                defaults: {
                                    flex: 1
                                }
                            }
                        },
                        {
                            xtype: 'panel',
                            title: 'a long panel',
                            width: 300,
                            height: 1000
                        }
                    ]
                }
            ]
        });
    }
});