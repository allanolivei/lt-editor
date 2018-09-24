
<script>


export default 
{
    props: {
        children: 
        {
            type: Array|String,
            default: ""
        },
        tagName: 
        {
            type: String,
            default: "div"
        }
    },
    render: function (createElement) 
    {
        console.log("render-slot");

        if( typeof(this.children) === 'string' )
        {
            return createElement(
                this.tagName, 
                {  class: "lt-text", domProps: { innerHTML: this.children }, }
            );
        }
        else
        {
            return createElement(
                this.tagName,
                {},
                this.children.map(function (child) 
                {
                    if( child.template ) 
                        return createElement(child.template, {key: child.id, props: child}, '');
                    else
                        return createElement("div", {  class: "lt-text", domProps: { innerHTML: child } });
                })
            );
        }

    },
}

</script>

