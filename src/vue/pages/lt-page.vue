<template>
    <v-layout justify-center column fill-height>
        <v-flex fill-height class="d-flex pa-1">
            <v-card class="d-flex" height="100%">
                <v-card-text>
                    <iframe ref="iframe" src="page.html" frameborder="0" style="width: 100%; height: 100%; background: white;"></iframe>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex fill-height>
            <v-layout row>
                <v-flex xs12 >
                    <v-card class="ma-1" height="100%">
                        <v-card-title>Página</v-card-title>
                        <v-card-text>
                            <textarea id="textarea-page" v-model='page'></textarea>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
            
    import CodeMirror from "codemirror";
    import "javascript";

    export default 
    {
        data: () => ({
            isLoadComplete: false,
            page: ""
// `{
// 	"main": [
//         {
// 			"template": "lt-text",
// 			"text": "Ola Page"
// 		},
// 		{
// 			"template": "lt-panel",
// 			"header": [
//                 {
//                     "template": "lt-text",
//                     "text": "Título"
//                 }
//             ],
// 			"children": [
//                 {
//                     "template": "lt-text",
//                     "text": "Meu painel"
//                 }
//             ]
// 		}
// 	]
// }`
        }),

        props: 
        {
            source: String
        },

        created: function()
        {
            this.pageRef = firebase.database().ref("pages/"+this.$route.params.id);
        },

        destroyed: function()
        {
            if( this.isLoadComplete )
            {
                this.pageRef.update({
                    page: this.pageEditor.getValue()
                });
            }
        },

        mounted: function()
        {
            let self = this;

            self.pageEditor = CodeMirror.fromTextArea(document.getElementById("textarea-page"), {
                lineNumbers: true,
                mode: "javascript"
            });

            self.pageEditor.on("changes", function(event)
            {
                self.$refs.iframe.contentWindow.postMessage({
                    type: "page",
                    value: { page: self.pageEditor.getValue() }
                }, "*");
            });

            // load iframe
            this.$refs.iframe.onload = function()
            {
                // load components
                firebase.database().ref("components").once("value", function(snapshot)
                {
                    self.$refs.iframe.contentWindow.postMessage({
                        type: "components",
                        value: { components: snapshot.val() }
                    }, "*");

                    // load page
                    self.pageRef.once('value', function(data) 
                    {
                        let result = data.val();
                        console.log("PAGE LOAD COMPLETE: ", result);

                        self.pageEditor.setValue( result.page );

                        self.$refs.iframe.contentWindow.postMessage({
                            type: "page",
                            value: { page: result.page }
                        }, "*");

                        self.isLoadComplete = true;
                    });


                });
                
            };

            // self.$refs.iframe.onload = function()
            // {
            //     self.componentRef.once('value', function(data) 
            //     {

            //         self.component = data.val();
            //         self.htmlEditor.setValue(self.component.template);
            //         self.cssEditor.setValue(self.component.style);
            //         self.propsEditor.setValue(self.component.props);

            //         self.$refs.iframe.contentWindow.postMessage({
            //             type: "component",
            //             value: { 
            //                 template: self.htmlEditor.getValue(),
            //                 style: self.cssEditor.getValue(), 
            //                 props: self.propsEditor.getValue() 
            //             }
            //         }, "*");

            //         self.isLoadComplete = true;

            //     });
            // };




        }
    }
</script>
