import "./../css/main.scss";
import Vue from "vue";
import Vuetify from 'vuetify'
import VueRouter from "vue-router";


//pages
import ltHome from "../vue/pages/lt-home.vue";
import ltIndex from "../vue/pages/lt-index.vue";
import ltComponent from "../vue/pages/lt-component.vue";
import ltPage from "../vue/pages/lt-page.vue";
import ltPages from "../vue/pages/lt-pages.vue";
import ltComponents from "../vue/pages/lt-Components.vue";


Vue.use(Vuetify);
Vue.use(VueRouter);

const routes = 
[
    { 
        path: '/', 
        name: "home",
        component: ltHome 
    },
    { 
        path: '/componente/:id', 
        name: "componente",
        component: ltComponent 
    },
    { 
        path: '/pagina/:id', 
        name: "pagina",
        component: ltPage 
    },
    { 
        path: '/componentes', 
        name: "componentes",
        component: ltComponents 
    },
    { 
        path: '/paginas', 
        name: "paginas",
        component: ltPages 
    },
];

const router = new VueRouter({
    routes // short for `routes: routes`
});

const app = new Vue({
    router,
    render: h => h(ltIndex)
    // `
    // <v-app dark>
    //     <h1>Hello App!</h1>
    //     <h2>Controles</h2>
    //     <p>
    //         <router-link to="/">Go to Foo</router-link>
    //         <router-link to="/bar">Go to Bar</router-link>
    //     </p>
    //     <router-view></router-view>
    // </v-app>
    // `
}).$mount('#app')

// new Vue({
//     el: "#app",
//     render: h=>h(ltIndex)
// });