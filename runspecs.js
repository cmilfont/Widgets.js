var jsdom = require("jsdom").jsdom,
    document = jsdom("<html><head></head><body></body></html>"),
    window = document.createWindow();

global.window = window;
global.document = document;
global.jQuery = require("jquery").create(window);

var jasmine = require("jasmine-node");

require(__dirname + '/lib/widgets.core');
require(__dirname + '/lib/widgets.dialog');

var isVerbose = true;
var showColors = true;
jasmine.executeSpecsInFolder(__dirname + '/specs', function(runner, log){    
    process.exit(runner.results().failedCount?1:0);
}, isVerbose, showColors);