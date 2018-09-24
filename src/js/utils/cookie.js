import utils from "./utils";

export default (function(){
    
    function CookieManager(){}

    utils.extend(CookieManager, 
    {

        clear: function()
        {
            var parts = document.cookie.split("; ");
            for (var i = parts.length - 1; i >= 0; i--)
                this.remove(parts[i].split("=")[0]);

            return this;
        },

        has: function(key)
        {
            var parts = document.cookie.split("; ");
            for (var i = 0; i < parts.length; i++)
                if (parts[i].split("=")[0] == key) return true
            return false;
        },

        get: function(key)
        {
            var parts = document.cookie.split("; ");
            for (var i = 0; i < parts.length; i++)
            {
                var key_value = parts[i].split("=");
                if (key_value[0] == key) return key_value[1];
            }

            return undefined;
        },

        set: function(key, value, milliseconds)
        {
            if (milliseconds != undefined)
            {
                var d = new Date();
                d.setTime(d.getTime() + milliseconds);
                document.cookie = key + "=" + value + ";expires=" + d.toUTCString();
            }
            else document.cookie = key + "=" + value;
        },

        add: function(key, value, milliseconds)
        {
            this.set(key, value, milliseconds);
        },

        remove: function(key)
        {
            return this.set(key, "", 0);
        },

        toString: function()
        {
            return document.cookie;
        },

    });

    return CookieManager;

})();

// module.exports = CookieManager;