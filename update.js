'use strict';

// Patch endsWith
String.prototype.endsWith || (String.prototype.endsWith = function (suffix) {
  if (this.length < suffix.length)
    return false;
  return this.lastIndexOf(suffix) === this.length - suffix.length;
});

var vm = require('vm');
var fs = require('fs');
var async = require('async');
var request = require('request');

var reqOpts = {
  pool: {
    maxSockets: 10
  }
};

var writeDataFile = function (data) {
  var timestampStr = '/* Data updated at ' + new Date() + ' */\n';
  var urlFuncStr = 'var url = function (ver) { return this[ver]; };\n';
  var exportStr = 'module.exports = ';

  var fileContent = [timestampStr, urlFuncStr, exportStr, JSON.stringify(data), ';'].join('');
  fileContent = fileContent.replace(/['"]\{URL}['"]/g, 'url');
  fs.writeFile('data.js', fileContent, function (err) {
    if (err) {
      console.log('Cannot write data.js: ' + err);
    } else {
      console.log('Data saved to data.js.');
    }
  });
};

var fetchVersions = function (libs) {
  console.log('Fetching versions of ' + libs.length + ' libs...');

  var data = {};
  var fetch = function (lib, callback) {
    var libId = lib[0], libFilename = lib[1];
    request.get('http://cdn.code.baidu.com/v/' + libId, reqOpts, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        callback(error || response.statusCode, null);
        return;
      }

      var def = JSON.parse(body);
      var versions = def['versions'];

      if (!versions) {
        console.log(util.inspect(def));
      }

      var version = {
        'versions': versions,
        'url': '{URL}'
      };
      for (var i = versions.length - 1, v, files; i >= 0; --i) {
        v = versions[i];
        files = def[v];
        for (var j = files.length - 1, file; j >= 0; --j) {
          file = files[j];
          if (file.endsWith(libFilename)) {
            version[v] = 'http://apps.bdimg.com/' + file;
            break;
          }
        }
      }
      data[libId] = version;

      console.log(libId + ' fetched with ' + versions.length + ' versions.');
      callback();
    });
  };

  async.map(libs, fetch, function (error, results) {
    if (error) {
      console.log('Error got while fetching versions: ' + error);
      return;
    }

    process.nextTick(function () {
      writeDataFile(data);
    });
  });
};

var parseLibs = function (libsJs) {
  var sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(libsJs, sandbox);
  var libs = sandbox['libs'];
  fetchVersions(Object.keys(libs).map(function (key) {
    return [key, libs[key]['filename']];
  }));
};

var loadLibs = function () {
  request.get('http://cdn.code.baidu.com/libs.js', reqOpts, function (error, response, body) {
    if (error || response.statusCode !== 200) {
      console.log('Error got while fetching libs: ' + error || response.statusCode);
      return;
    }

    process.nextTick(function () {
      parseLibs(body);
    });
  });
};

loadLibs();
