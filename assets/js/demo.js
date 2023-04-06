var demo = {


    init() {
        var me = this;

        // Root
        me.root = "http://srv01:9090/ix-Contelo/plugin/de.elo.ix.plugin.proxy/wf/apps/app/elo.integration.Client/";

        // Default Settings
        me.setDefaultSettings();

        me.system = "teams";
        me.guid = "(863F8B31-A4E1-387D-2D72-A7DE845522C4)";

        // Öffnen
        me.open();

        // Event Listner hinzufügen
        me.addListner();
    },  

    addListner() {
        var me = this;

        $('.btn-refresh').on('click', function () {
            me.open();
        });

        $('.btn-event').on('click', function () {
            me.guid = me.getGuid($(this).data('type'), $(this).data('id')); 
            me.open();
        });

        $('.btn-all-default').on('click', function() {
            me.setDefaultSettings();
            me.open();
        });

        $('.btn-all-on').on('click', function() {
            $('#settings-form').find('input').prop('checked', true);
            me.open();
        });

        $('.btn-all-off').on('click', function() {
            $('#settings-form').find('input').prop('checked', false);
            me.open();
        });

        $('#settings-form').on('click', 'input', function() {
            me.open();
        });

        $('.btn-layout').on('click', function() {
            me.setLayout($(this).data('layout'));
        });

    },

    setDefaultSettings() {
        $('#settings-form').find('input').each(function() {
            $(this).prop('checked', $(this).data('default'));
        });
    },


    getAttributes() {
        var me = this;
        
        var settings = {};

        $('#settings-form').find('input').each(function() {
            settings[$(this).attr('id')] = $(this).prop('checked');
        });

        return settings;
    },


    open() {
        var me = this;

        // Initalisieren
        var options = [];

        // System
        options.push('system=' + me.system);
                    
        options.push('guid=' + me.guid);

        // Settings hinzufügen
        var attributes = me.getAttributes();

        for(var item in attributes) {
            options.push(item + "=" + attributes[item]);
        }

        var link = me.root + "?" + options.join("&");

        $('#link-preview').html(link);

        $('#frame').attr('src', link);
    },

    // Layout setzen
    setLayout(id) {

        var layouts = {
            1: [9,3],
            2: [6,6],
            3: [3,9],
            4: [12,12]
        }

        $('#col-1').removeClass().addClass('col-' + layouts[id][0]);
        $('#col-2').removeClass().addClass('col-' + layouts[id][1]);
    },

    // Temporär, noch mit Suche beschäftigen
    getGuid(type, id) {
        guid = {
            auftraege: {
                1000: '3F9BF7EC-5225-7799-754C-3B666BF612A3',
                2000: '18337D1B-C268-4AD7-C396-D69B3B7AACE8',
                3000: '8F93567C-770F-935C-713E-3D35D7A6D4EA',
            },
            debitor: {
                1000: 'B3492331-71F1-3A46-ED8D-D39219FCF189',
                2000: '6B86CEC8-8971-124C-CA80-ABC0B85D424A',
                3000: '0276B414-2441-D113-E2F1-CC5876C6B175',
            },
            kreditor: {
                1000: 'AFB53AE4-4544-CEB7-116D-01242BD17B9D',
                2000: 'FD43781A-D38D-DC73-2D53-ABDA4602FE77',
                3000: '404E18A8-DED9-3039-B075-3DF4BEECA663',
            }
        }

        return "(" + guid[type][id] + ")";
    }
}