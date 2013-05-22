
var grunt = require('grunt');

module.exports = function(app, files) {
  var files = grunt.file.expand({filter: 'isFile'}, files);
  for(var i = 0; i < files.length; i++) {
    require(files[i])(app);
  }
};
