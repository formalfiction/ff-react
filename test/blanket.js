// this file is some weird nonsense with grunt-mocha-test. see:
// https://github.com/pghalliday/grunt-mocha-test#generating-coverage-reports
var path = require('path');
var srcDir = path.join(__dirname, '..')

require('blanket')({
  // Only files that match the pattern will be instrumented
  pattern: [srcDir],
  "data-cover-never": [ path.join(srcDir,"node_modules"), path.join(srcDir,"test") ]
});