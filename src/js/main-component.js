// external CDN of VUE: https://webpack.js.org/configuration/externals/
import Vue from 'Vue';

Vue.component("lt-slot", require("./../vue/components/lt-slot.vue").default);
Vue.component("lt-text", require("./../vue/components/lt-text.vue").default);
Vue.component("lt-img", require("./../vue/components/lt-img.vue").default);

var vue = new Vue({
    el: "#app",
    data: {
        template: "",
    },
    render: function(createElement) 
    {
        try {
            let compiled = Vue.compile(this.template);
            if (compiled.staticRenderFns.length > 0)
                return compiled.staticRenderFns[0].call(this, createElement);
            else
                return compiled.render.call(this, createElement);
        } catch (error) {
            console.log("ERROR: ", error);
            return createElement("div");
        }
        
    },
});

vue.template = "<div class='panel'><div class='waiting'>Aguardando...</div></div>";


window.inject = 
{
    style: function(attr)
    {
        if (!this.styleElement )
        {
            this.styleElement = document.createElement("style");
            this.styleElement.type = "text/css";
            document.head.appendChild(this.styleElement);
        }

        this.styleElement.innerHTML = attr.style;
    },
    template: function (attr)
    {
        vue.template = attr.template;
    },
    props: function (attr)
    {
        let obj = null;

        try
        {
            obj = JSON.parse(attr.props);
            
        } 
        catch (error) 
        {
            console.log("ERROR IN PROPS: ", error.message, typeof attr.props);
            return;
        }

        if ( this._previousProps )
        {
            for( let prop in this._previousProps)
                delete vue[prop]
        }
        
        for ( let prop in obj )
            vue[prop] = obj[prop];

        this._previousProps = obj;

        vue.$forceUpdate();
    },
    component: function(attr)
    {
        this.props(attr);
        this.template(attr);
        this.style(attr);
    }
};

window.addEventListener('message', function (event)
{
    console.log("MAIN_COMPONENTE MESSAGE> ", event);
    if (typeof event.data.type !== 'undefined' && typeof inject[event.data.type] !== 'undefined' )
       inject[event.data.type].call(inject, event.data.value);
});