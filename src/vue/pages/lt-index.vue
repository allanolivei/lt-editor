<template>
    <v-app dark>

        <v-navigation-drawer v-model="drawer" clipped fixed app>
            <v-list class="pa-1">
                <v-list-tile avatar>
                    <v-list-tile-avatar>
                        <img src="https://randomuser.me/api/portraits/men/85.jpg">
                    </v-list-tile-avatar>

                    <v-list-tile-content>
                        <v-list-tile-title>Allan Oliveira</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-list class="pt-0" dense>
                <v-divider></v-divider>

                <v-list-tile v-for="item in items" :key="item.title" @click="goto(item.address)">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        
        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>LT-Editor</v-toolbar-title>
        </v-toolbar>


                    <!--
                        v-layout justify-center align-center 
                        <v-flex shrink>
                        <v-tooltip right>
                            <v-btn slot="activator" :href="source" icon large target="_blank">
                                <v-icon large>code</v-icon>
                            </v-btn>
                            <span>Source</span>
                        </v-tooltip>
                        <v-tooltip right>
                            <v-btn slot="activator" icon large href="https://codepen.io/johnjleider/pen/qxQWda" target="_blank">
                                <v-icon large>mdi-codepen</v-icon>
                            </v-btn>
                            <span>Codepen</span>
                        </v-tooltip>
                    </v-flex> -->

        <v-content>
            <router-view></router-view>
            <!-- <v-container>
                OI
            </v-container>
            <v-container fluid fill-height>
                <v-layout>
                    <v-flex align-content-center >
                        <v-tabs
                            style="height: 100%"
                            v-model="active"
                            color="cyan"
                            dark
                            grow
                            slider-color="yellow"
                            fill-height>

                            
                            <v-tab v-for="k in ['html', 'css', 'props']" :key="k">
                                {{k}}
                            </v-tab>

                            <v-tab-item v-for="k in ['html', 'css', 'props']" :key="k">
                                <v-card>
                                    <v-textarea box rows="20" v-model='component[k]'></v-textarea>
                                </v-card>
                            </v-tab-item>

                        </v-tabs>
                    </v-flex>
                </v-layout>
            </v-container> -->
        </v-content>
        <v-footer app fixed>
            <span>&copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>

export default 
{

    data: () => ({
        drawer: false,
        items: [
            { title: 'Index', icon: 'home', address: '/' },
            { title: 'Páginas', icon: 'library_books', address: '/paginas' },
            // { title: 'Página', icon: 'description', address: '/pagina' },
            { title: 'Componentes', icon: 'widgets', address: '/componentes' },
            // { title: 'Componente', icon: 'layers', address: '/componente' }
        ]
    }),

    props: 
    {
        source: String
    },

    components: 
    {
        // 'lt-menu': ltMenu,
    },

    mounted: function()
    {
    },

    methods: 
    {
        goto: function(address)
        {
            this.drawer = false;
            this.$router.push(address)
        }
    }
}
</script>
