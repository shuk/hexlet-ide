[![Build Status](https://travis-ci.org/Hexlet/hexlet-ide.svg?branch=master)](https://travis-ci.org/Hexlet/hexlet-ide)

### RUN backend
    npm i

    hexlet-ide -r .

### Embed usage

    1. npm i --save hexlet-ide
    2. require hexlet-ide frontend module
       var HexletIde = require("hexlet-ide/src/editor/main");

    3. Create widget
       var widget = HexletIde.create(document.getElementById("ide"), {
         url: "Backend url"
       });
