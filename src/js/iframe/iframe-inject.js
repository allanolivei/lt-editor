export class IFrameInject 
{
    constructor()
    {
        this.html = require('raw-loader!./iframe.html');

        this.iframe = document.createElement("IFRAME");
        this.iframe.src = "about:blank";
        this.iframe.setAttribute("id", "iframe-inject");

        // var html = '<head><title>titulo da iframe</title></head><body>Foo</body>';
        // this.iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);

        this.iframe.setAttribute('src', 'data:text/html;charset=utf-8,' + encodeURI(this.html));
        this.iframe.setAttribute('id', 'the_iframe');
        this.iframe.style.width = 450 + 'px';
        this.iframe.style.height = 200 + 'px';

        // iframe.contentWindow.document.open();
        // iframe.contentWindow.document.write(html);
        // iframe.contentWindow.document.close();
        //<html><body onload="parent.myCallbackFunc(this.window)"></body></html>

        // iframe.src = 'javascript:void((function(){var script = document.createElement(\'script\');' +
        //     'script.innerHTML = "(function() {' +
        //     'document.open();document.domain=\'' + document.domain +
        //     '\';document.close();})();";' +
        //     'document.write("<head>" + script.outerHTML + "</head><body></body>");})())';

        document.body.appendChild(this.iframe);
    }

    injectVUEComponent(component, id)
    {
        this.iframe.contentWindow.postMessage({
            type: "inject-vue-component",
            id: id,
            value: component
        }, "*");
    }

    injectScript(scriptStr, id)
    {
        this.iframe.contentWindow.postMessage({
            type: "inject-script",
            id: id,
            value: scriptStr
        }, "*");
    }

    injectStyle(styleStr, id)
    {
        this.iframe.contentWindow.postMessage({
            type: "inject-style",
            id: id,
            value: styleStr
        }, "*");
    }
}