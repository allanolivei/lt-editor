import * as monaco from 'monaco-editor'; 

let editor = monaco.editor.create(document.getElementById('container'), {
    value: [
        'function x() {',
        '\tconsole.log("Hello world!");',
        '}'
    ].join('\n'),
    language: 'javascript',
    theme: "vs-dark"
});

editor.setLanguage()
editor.setValue("teste");