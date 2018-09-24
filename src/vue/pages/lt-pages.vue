<template>
    <v-container>
        <v-container class="page">
            <v-layout align-center justify-center row wrap>
                <v-flex xs4 v-for="(o, i) in pages" :key="i">
                    <v-hover>
                        <v-card 
                            :class="`elevation-${hover ? 12 : 2} card mx-auto grey darken-2`" 
                            flat 
                            tile 
                            height="150px" 
                            slot-scope="{ hover }" 
                            @click.native="editPage(o.key)">

                            <v-btn color="red" dark small absolute top right fab @click.prevent.stop="deletePageHandler(o.key)">
                                <v-icon>delete</v-icon>
                            </v-btn>
                            <v-card-title class="title">Página {{i+1}}</v-card-title>


                        </v-card>
                    </v-hover>
                </v-flex>
            </v-layout>
        </v-container>
            
        <v-btn color="pink" dark absolute top right fab large @click="addButtonHandler">
            <v-icon>add</v-icon>
        </v-btn>

    </v-container>

</template>

<script>

import CookieManager from "./../../js/utils/cookie.js";

export default 
{
    data: () => ({
        pages: []
    }),

    created: function()
    {
        this.pagesRef = firebase.database().ref('pages');
        var self = this;

        this.pagesRef.on('child_added', function(data) 
        {
            console.log("added page: ", data.key);
            let item = data.val();
            item.key = data.key;
            self.pages.push( item );
        });

        this.pagesRef.on('child_removed', function(data) 
        {
            for( let i = self.pages.length - 1 ; i >= 0 ; i-- )
                if( self.pages[i].key == data.key )
                    self.pages.splice(i, 1);
        });
    },

    destroyed: function()
    {
    },

    methods:
    {
        addButtonHandler: function()
        {
            this.createPage();
        },

        createPage: function()
        {
            let pageData = 
            {
                title: "Página "+(this.pages.length+1),
                template: "master-blank",
                page: 
                "{"+
                "\n    \"main\": "+
                "\n    ["+
                "\n        {"+
                "\n            \"template\": \"lt-text\","+
                "\n            \"text\": \"Página "+(this.pages.length+1)+"\""+
                "\n        }"+
                "\n    ]"+
                "\n}"
            };
            this.pagesRef.push().set(pageData);
        },

        deletePageHandler: function(pageKey)
        {
            this.pagesRef.child(pageKey).remove();
        },

        editPage: function(pageKey)
        {
            this.$router.push({path: '/pagina/'+pageKey});
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


