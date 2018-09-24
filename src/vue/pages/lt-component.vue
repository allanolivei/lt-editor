<template>
    <v-layout justify-center column fill-height>
        <v-flex fill-height class="d-flex pa-1">
            <v-card class="d-flex" height="100%">
                <v-card-text>
                    <iframe ref="iframe" src="component.html" frameborder="0" style="width: 100%; height: 100%; background: white;"></iframe>
                </v-card-text>
            </v-card>
        </v-flex>
        <v-flex fill-height>
            <v-layout row>
                <v-flex xs4 v-for="k in ['props', 'template', 'style-props', 'style']" :key="k">
                    <v-card class="ma-1" height="100%">
                        <v-card-title>{{k}}</v-card-title>
                        <v-card-text>
                            <textarea :id="'textarea-'+k" v-model='component[k]'></textarea>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</template>

<script>
            
    import CodeMirror from "codemirror";
    import "htmlmixed";
    import "javascript";
    import "css";

    export default 
    {
        data: () => ({
            component: 
            {
                name: "",
                template: "",
                style: "",
                props: ""
            },
            isLoadComplete: false
        }),

        props: 
        {
            // source: String
        },

        created: function()
        {
            let self = this;
            this.componentRef = firebase.database().ref('components/'+this.$route.params.id);
        },

        destroyed: function()
        {
            if( this.isLoadComplete )
            {
                this.componentRef.update({
                    template: this.htmlEditor.getValue(),
                    style: this.cssEditor.getValue(),
                    props: this.propsEditor.getValue()
                });
            }
        },

        mounted: function()
        {

            this.propsEditor = CodeMirror.fromTextArea(document.getElementById("textarea-props"), {
                lineNumbers: true,
                mode: "javascript"
            });

            this.htmlEditor = CodeMirror.fromTextArea(document.getElementById("textarea-template"), {
                lineNumbers: true,
                mode: "htmlmixed"
            });

            this.cssPropsEditor = CodeMirror.fromTextArea(document.getElementById("textarea-style-props"), {
                lineNumbers: true,
                mode: "javascript"
            });

            this.cssEditor = CodeMirror.fromTextArea(document.getElementById("textarea-style"), {
                lineNumbers: true,
                mode: "css"
            });

            let self = this;

            
            

            
            self.$refs.iframe.onload = function()
            {
                self.componentRef.once('value', function(data) 
                {

                    self.component = data.val();
                    self.htmlEditor.setValue(self.component.template);
                    self.cssEditor.setValue(self.component.style);
                    self.propsEditor.setValue(self.component.props);

                    self.$refs.iframe.contentWindow.postMessage({
                        type: "component",
                        value: { 
                            template: self.component.template,
                            style: self.component.style, 
                            props: self.component.props
                        }
                    }, "*");

                    self.htmlEditor.on("changes", function(event)
                    {
                        self.$refs.iframe.contentWindow.postMessage({
                            type: "template",
                            value: { template: self.htmlEditor.getValue() }
                        }, "*");
                    });

                    self.cssEditor.on("changes", function(event)
                    {
                        self.$refs.iframe.contentWindow.postMessage({
                            type: "style",
                            value: { style: self.cssEditor.getValue() }
                        }, "*");
                    });

                    self.propsEditor.on("changes", function(event)
                    {
                        self.$refs.iframe.contentWindow.postMessage({
                            type: "props",
                            value: { props: self.propsEditor.getValue() }
                        }, "*");
                    });

                    self.isLoadComplete = true;

                });
            };

            // self.$refs.iframe.onload = function(){
            //     self.$refs.iframe.contentWindow.postMessage({
            //         type: "component",
            //         value: { 
            //             template: self.htmlEditor.getValue(),
            //             style: self.cssEditor.getValue(), 
            //             props: self.propsEditor.getValue() 
            //         }
            //     }, "*");
            // }

        }
    }
</script>
