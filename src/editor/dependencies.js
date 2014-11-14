/* global require */
// require("es5-shim");

var $ = jQuery = require("jquery/dist/jquery");
require("fuelux/dist/css/fuelux.css");
require("codemirror/lib/codemirror.css");
require("codemirror/theme/solarized.css");

require("codemirror/mode/javascript/javascript");
require("codemirror/mode/python/python");
require("codemirror/mode/ruby/ruby");
require("codemirror/mode/clike/clike");
require("codemirror/mode/jade/jade");

require("codemirror/addon/hint/show-hint");
require("codemirror/addon/hint/javascript-hint");
require("codemirror/addon/hint/css-hint");
require("codemirror/addon/hint/anyword-hint");


require("editor/styles/application.less");
