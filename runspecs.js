var window = require("jsdom").jsdom().createWindow();
global.window = window;

global.jQuery = require("jquery").create(window);

var jasmine = require("jasmine-node");

var isVerbose = true;
var showColors = true;
jasmine.executeSpecsInFolder(__dirname + '/specs', function(runner, log){    
    process.exit(runner.results().failedCount?1:0);
}, isVerbose, showColors);