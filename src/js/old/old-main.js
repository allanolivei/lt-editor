console.clear();

import "./../css/main.scss";
import Vue from "vue";
import Vuetify from 'vuetify'
// import VueIndex from "./../vue/pages/index.vue";
// import { IFrameInject } from "./iframe/iframe-inject";


import CodeMirror from "codemirror";
import "htmlmixed";
import "javascript";



import Panel from "./../vue/panel.vue";

Vue.use(Vuetify);

var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("textarea-html"), {
    lineNumbers: true,
    mode: "htmlmixed"
});

var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("textarea-css"), {
    lineNumbers: true,
    mode: "javascript"
});

var myCodeMirror = CodeMirror.fromTextArea(document.getElementById("textarea-props"), {
    lineNumbers: true,
    mode: "javascript"
});


// Vue.component("my-panel", Panel);

// console.log("CODE VALUE: "+myCodeMirror.getValue());

let button = document.getElementsByClassName("btn")[0];

let iframe = document.createElement("IFRAME");
iframe.src = "component.html";
iframe.setAttribute("id", "iframe-component");

// var html = '<head><title>titulo da iframe</title></head><body>Foo</body>';
// iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);

// iframe.setAttribute('src', 'data:text/html;charset=utf-8,' + encodeURI(this.html));
// iframe.setAttribute('id', 'the_iframe');
iframe.style.width = 450 + 'px';
iframe.style.height = 200 + 'px';

document.body.appendChild(iframe);

iframe.onload = function()
{
    console.log( "IFRAME: ", iframe.contentWindow.inject );

    iframe.contentWindow.postMessage({
        type: "style",
        value: 
        {
            content: `
                div
                {
                    background: red;
                    padding: 20px;
                    border-radius: 8px;
                }
            `
        }
    }, "*");
};

button.addEventListener("click", function () 
{
    iframe.contentWindow.postMessage({
        type: "template",
        value:
        {
            content: myCodeMirror.getValue()
        }
    }, "*");
});


// button.addEventListener("click", function(){
//     iframe.injectVUEComponent({
//         html: `
//             <div class="panel"><h4>Um novo Panel</h4><h4 v-if="hasContent">{{content}}</h4></div>
//         `,
//         css: `
//             .panel
//             {
//                 color: white;
//                 background: brown;
//                 padding: 20px;
//                 border-radius: 8px;
//                 ${document.getElementsByTagName("textarea")[0].value}
//             }
//         `,
//         data:
//         {
//             content:
//             {
//                 default: "content allan"
//             },
//             hasContent:
//             {
//                 default: true
//             }
//         }
//     });
// });

// new Vue({
//     el: "#app",
//     render: h => h(Panel),
//     data: {
//         content: "ola vue"
//     }
// });

// let iframe = new IFrameInject();

// iframe.iframe.onload = function()
// {
//     iframe.injectStyle(`
//         body 
//         {
//             color: red;
//         }
//     `);

//     iframe.injectScript(`
//         console.log("style initialized");
//     `);

//     iframe.injectVUEComponent({
//         html: `
//             <div class="panel"><h4>Um novo Panel</h4><h4 v-if="hasContent">{{content}}</h4></div>
//         `,
//         css: `
//             .panel
//             {
//                 color: white;
//                 background: brown;
//                 padding: 20px;
//                 border-radius: 8px
//             }
//         `,
//         data: 
//         {
//             content: 
//             {
//                 default: "content de exemplo"
//             },
//             hasContent:
//             {
//                 default: true
//             }
//         }
//     });
// };