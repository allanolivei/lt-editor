import Vue from "vue";

// register components
Vue.component("lt-slot", require("./../vue/components/lt-slot.vue").default);
Vue.component("lt-text", require("./../vue/components/lt-text.vue").default);
Vue.component("lt-img", require("./../vue/components/lt-img.vue").default);
Vue.component("lt-panel", require("./../vue/components/lt-panel.vue").default);

// list components
// console.log(Vue.options.components);

// dados da página
var data = 
{
    page: {
        main: [
            {
                "template": "lt-text",
                "text": ""
            }
        ]
    }
    // main: []
    // main: 
    // [
    //     {
    //         template: 'lt-text',
    //         text: "Ola Page"
    //     },
    //     {
    //         template: 'lt-panel',
    //         header: [
    //             {
    //                 template: 'lt-text',
    //                 text: 'Título'
    //             }
    //         ],
    //         children: [
    //             {
    //                 template: 'lt-text',
    //                 text: "Meu painel"
    //             }
    //         ]
    //     },
    // ]
};

//página mestra
var pageMaster = 
`
<div class='main-frame'>
    <lt-slot class='content-frame-row' tagName='div' :children='page.main' />
</div>
`;

const vue = new Vue({
    el: "#app",
    template: pageMaster,
    data: data
});

window.inject =
{
    page: function(attr)
    {
        let obj = null;

        try
        {
            obj = JSON.parse(attr.page);
        }
        catch (error) 
        {
            console.log("ERROR IN PAGE: ", error.message, typeof attr.page);
            return;
        }

        Vue.set(vue, "page", obj);
    },

    components: function (attr)
    {
        let styles = "";

        for( let key in attr.components )
        {
            let propsKeys = [];
            let props = JSON.parse(attr.components[key].props);
            for( let k in props )
                propsKeys.push(k);
                
            Vue.component(key, {
                template: attr.components[key].template,
                props: propsKeys
            });

            console.log("add style: ", attr.components[key].style);

            styles += attr.components[key].style;
        }

        this.style({ style: styles });
    },

    style: function (attr)
    {
        if (!this.styleElement)
        {
            this.styleElement = document.createElement("style");
            this.styleElement.type = "text/css";
            document.head.appendChild(this.styleElement);
        }

        this.styleElement.innerHTML = attr.style;
    },
    // template: function (attr)
    // {
    //     vue.template = attr.content;
    // },
    // props: function (attr)
    // {
    //     let obj = null;

    //     try
    //     {
    //         obj = JSON.parse(attr.content);

    //     }
    //     catch (error) 
    //     {
    //         console.log("ERROR IN PROPS: ", error.message, typeof attr.content);
    //         return;
    //     }

    //     console.log("OBJECT APROVADO: ", obj);

    //     if (this._previousProps)
    //     {
    //         for (let prop in this._previousProps)
    //             delete vue[prop]
    //     }

    //     for (let prop in obj)
    //         vue[prop] = obj[prop];

    //     this._previousProps = obj;

    //     vue.$forceUpdate();
    // }
};




window.addEventListener('message', function (event)
{
    if (typeof event.data.type !== 'undefined' && typeof inject[event.data.type] !== 'undefined')
        inject[event.data.type].call(inject, event.data.value);
});