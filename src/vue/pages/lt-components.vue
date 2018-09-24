<template>
    <v-container>
        <v-container class="page">
            <v-layout align-center justify-center row wrap>
                <v-flex xs4 v-for="(o, i) in components" :key="i">
                    <v-hover>
                        <v-card 
                            :class="`elevation-${hover ? 12 : 2} card mx-auto`" 
                            flat 
                            tile 
                            height="150px" 
                            slot-scope="{ hover }" 
                            @click.native="editComponente(o.name)">

                            <v-btn color="red" dark small absolute top right fab @click.prevent.stop="deleteComponentHandler(o.name)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                            <v-card-title class="title">{{o.name}}</v-card-title>


                        </v-card>
                    </v-hover>
                </v-flex>
            </v-layout>
        </v-container>
            
        <v-btn color="pink" dark absolute top right fab large @click="addButtonHandler">
            <v-icon>add</v-icon>
        </v-btn>

        <v-dialog v-model="dialog" persistent max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline">Configuração do Componente</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field label="Nome do Componente" required autofocus v-model="componenteName"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click.native="createComponenteButtonHandler">Criar Componente</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

    </v-container>

</template>

<script>

import CookieManager from "./../../js/utils/cookie.js";

export default 
{
    data: () => ({
        components: [],
        dialog: false,
        componenteName: ""
    }),

    created: function()
    {
        this.componentsRef = firebase.database().ref('components');
        var self = this;

        this.componentsRef.on('child_added', function(data) 
        {
            self.components.push( data.val() );
        });

        this.componentsRef.on('child_removed', function(data) 
        {
            for( let i = self.components.length - 1 ; i >= 0 ; i-- )
                if( self.components[i].name == data.key )
                    self.components.splice(i, 1);
        });
    },

    destroyed: function()
    {
    },

    methods:
    {
        addButtonHandler: function()
        {
            this.dialog = true;
        },

        createComponenteButtonHandler: function()
        {
            if( this.componenteName.length == 0 || this.getComponentByName(this.componenteName) != null ) return;
            
            this.dialog = false;
            this.createComponent(this.componenteName);
            this.componenteName = "";
        },

        getComponentByName: function(componentName)
        {
            for( let i = 0 ; i < this.components.length ; i++ )
                if( this.components[i].name == componentName ) return this.components[i]
            
            return null;
        },

        createComponent: function(componentName)
        {
            let componentData = {
                name: componentName,
                template: "<div class='"+componentName+"'>\n</div>",
                style: "."+componentName+"\n{\n}",
                props: "{\n}"
            };

            this.componentsRef.child(componentName).set(componentData);
        },

        deleteComponentHandler: function(componentName)
        {
            this.componentsRef.child(componentName).remove();
        },

        editComponente: function(componenteName)
        {
            this.$router.push({path: '/componente/'+componenteName});
        }
    }
}
</script>

<style lang="sass" scoped>
    .flex
    {
        padding: 10px;

        .card
        {
            justify-content: center;
            align-items: center;
            display: flex;
            cursor: pointer;
        }
    }

    .page
    {
        max-width: 1000px;
        position: relative;
    }
</style>


