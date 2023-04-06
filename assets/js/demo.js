var demo = {


    init() {
        var me = this;

        // Root
        me.root = "https://www.buerosystemhaus.de";

        // Default Settings
        me.setDefaultSettings();

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
            me.type =  $(this).data('type');
            me.id = $(this).data('id');            

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

        // type & Id
        // @todo

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
    }



}