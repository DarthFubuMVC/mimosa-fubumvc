"use strict";
var Bliss, bliss, copyContents, cwd, deleteFolders, filesAtBase, fs, initFiles, log, makeFolders, path, relativeToThisFile, removeAllFilesFromDirectory, resetFileSystem, setupFileSystem, setupFileSystemWithConfig, wrench, _, _ref;

fs = require('fs');

path = require('path');

wrench = require('wrench');

_ = require('lodash');

_ref = require('./util'), log = _ref.log, relativeToThisFile = _ref.relativeToThisFile;

Bliss = require('bliss');

bliss = new Bliss({
  ext: ".bliss",
  cacheEnabled: false,
  context: {}
});

cwd = process.cwd();

setupFileSystem = function(args, retrieveConfig) {
  return retrieveConfig(false, function(config) {
    return setupFileSystemWithConfig(config, args);
  });
};

setupFileSystemWithConfig = function(config, args) {
  var baseDir;
  baseDir = config.fubumvc ? config.fubumvc.baseDir : cwd;
  makeFolders(baseDir);
  return initFiles(args, baseDir);
};

resetFileSystem = function(args, retrieveConfig) {
  return retrieveConfig(false, function(config) {
    var baseDir;
    baseDir = config.fubumvc ? config.fubumvc.baseDir : cwd;
    deleteFolders(baseDir);
    return setupFileSystem(args, retrieveConfig);
  });
};

makeFolders = function(baseDir) {
  var folders;
  if (baseDir == null) {
    baseDir = "";
  }
  folders = ['assets/scripts', 'assets/styles', 'public'];
  return _.each(folders, function(dir) {
    var target;
    if (!fs.existsSync(dir)) {
      target = path.join(baseDir, dir);
      log("info", "creating " + target);
      return wrench.mkdirSyncRecursive(target, 0x1ff);
    }
  });
};

removeAllFilesFromDirectory = function(folder, keep) {
  return fs.readdirSync(folder).forEach(function(file) {
    var err, isDir, targetFile;
    targetFile = path.join(folder, file);
    isDir = fs.lstatSync(targetFile).isDirectory();
    if (file === keep) {
      if (isDir) {
        removeAllFilesFromDirectory(targetFile);
      }
      return;
    }
    try {
      if (isDir) {
        return wrench.rmdirSyncRecursive(targetFile);
      } else {
        if (/\.gitignore/.test(targetFile)) {
          return;
        }
        fs.unlinkSync(targetFile);
        return log("success", "deleted " + targetFile);
      }
    } catch (_error) {
      err = _error;
      return log("error", err);
    }
  });
};

deleteFolders = function(baseDir) {
  var folders;
  if (baseDir == null) {
    baseDir = "";
  }
  folders = ['assets', 'public'];
  return _.each(folders, function(dir) {
    var target;
    target = path.join(baseDir, dir);
    return removeAllFilesFromDirectory(target, "scripts");
  });
};

filesAtBase = function(baseDir, files) {
  return _.map(files, function(f) {
    return path.join(baseDir, f);
  });
};

initFiles = function(flags, baseDir) {
  var contents, ext, fileWithContents, files, useCoffee, viewModel;
  if (flags == null) {
    flags = false;
  }
  if (baseDir == null) {
    baseDir = "";
  }
  useCoffee = flags === "coffee";
  ext = useCoffee ? "coffee" : "js";
  files = ["bower.json", "mimosa-config." + ext, "assets/dont-delete-me.js"];
  viewModel = {
    name: path.basename(cwd)
  };
  contents = _(files).map(function(f) {
    return relativeToThisFile(path.join("../fubu-import-templates/", f));
  }).map(function(f) {
    return bliss.render(f, viewModel);
  }).map(function(f) {
    return f.trim();
  }).value();
  fileWithContents = _.zip(filesAtBase(baseDir, files), contents);
  _.each(fileWithContents, function(pair) {
    return copyContents(pair);
  });
};

copyContents = function(_arg) {
  var contents, fileName;
  fileName = _arg[0], contents = _arg[1];
  if (!fs.existsSync(fileName)) {
    log("info", "creating " + fileName);
    return fs.writeFileSync(fileName, contents);
  }
};

module.exports = {
  setupFileSystem: setupFileSystem,
  resetFileSystem: resetFileSystem,
  setupFileSystemWithConfig: setupFileSystemWithConfig
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL21udC9SZXNvdXJjZXMvUHJvamVjdHMvbWltb3NhLWZ1YnVtdmMvbGliL3NjYWZmb2xkaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiL21udC9SZXNvdXJjZXMvUHJvamVjdHMvbWltb3NhLWZ1YnVtdmMvc3JjL3NjYWZmb2xkaW5nLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxZQUFBLENBQUE7QUFBQSxJQUFBLGlPQUFBOztBQUFBLEVBQ0EsR0FBSyxPQUFBLENBQVEsSUFBUixDQURMLENBQUE7O0FBQUEsSUFFQSxHQUFPLE9BQUEsQ0FBUSxNQUFSLENBRlAsQ0FBQTs7QUFBQSxNQUdBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FIVCxDQUFBOztBQUFBLENBSUEsR0FBSSxPQUFBLENBQVEsUUFBUixDQUpKLENBQUE7O0FBQUEsT0FLNEIsT0FBQSxDQUFRLFFBQVIsQ0FBNUIsRUFBQyxXQUFBLEdBQUQsRUFBTSwwQkFBQSxrQkFMTixDQUFBOztBQUFBLEtBTUEsR0FBUSxPQUFBLENBQVEsT0FBUixDQU5SLENBQUE7O0FBQUEsS0FPQSxHQUFZLElBQUEsS0FBQSxDQUNWO0FBQUEsRUFBQSxHQUFBLEVBQUssUUFBTDtBQUFBLEVBQ0EsWUFBQSxFQUFjLEtBRGQ7QUFBQSxFQUVBLE9BQUEsRUFBUyxFQUZUO0NBRFUsQ0FQWixDQUFBOztBQUFBLEdBV0EsR0FBTSxPQUFPLENBQUMsR0FBUixDQUFBLENBWE4sQ0FBQTs7QUFBQSxlQWFBLEdBQWtCLFNBQUMsSUFBRCxFQUFPLGNBQVAsR0FBQTtTQUNoQixjQUFBLENBQWUsS0FBZixFQUFzQixTQUFDLE1BQUQsR0FBQTtXQUNwQix5QkFBQSxDQUEwQixNQUExQixFQUFrQyxJQUFsQyxFQURvQjtFQUFBLENBQXRCLEVBRGdCO0FBQUEsQ0FibEIsQ0FBQTs7QUFBQSx5QkFrQkEsR0FBNEIsU0FBQyxNQUFELEVBQVMsSUFBVCxHQUFBO0FBQzFCLE1BQUEsT0FBQTtBQUFBLEVBQUEsT0FB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RUFBUDtFQUFBLENBRkksQ0FHVCxDQUFDLEdBSFEsQ0FHSixTQUFDLENBQUQsR0FBQTtXQUFPLENBQUMsQ0FBQyxJQUFGLENBQUEsRUFBUDtFQUFBLENBSEksQ0FJVCxDQUFDLEtBSlEsQ0FBQSxDQUxYLENBQUE7QUFBQSxFQVVBLGdCQUFBLEdBQW1CLENBQUMsQ0FBQyxHQUFGLENBQU0sV0FBQSxDQUFZLE9BQVosRUFBcUIsS0FBckIsQ0FBTixFQUFtQyxRQUFuQyxDQVZuQixDQUFBO0FBQUEsRUFZQSxDQUFDLENBQUMsSUFBRixDQUFPLGdCQUFQLEVBQXlCLFNBQUMsSUFBRCxHQUFBO1dBQ3ZCLFlBQUEsQ0FBYSxJQUFiLEVBRHVCO0VBQUEsQ0FBekIsQ0FaQSxDQURVO0FBQUEsQ0EvRFosQ0FBQTs7QUFBQSxZQWtGQSxHQUFlLFNBQUMsSUFBRCxHQUFBO0FBQ2IsTUFBQSxrQkFBQTtBQUFBLEVBRGUsb0JBQVUsa0JBQ3pCLENBQUE7QUFBQSxFQUFBLElBQUEsQ0FBQSxFQUFTLENBQUMsVUFBSCxDQUFjLFFBQWQsQ0FBUDtBQUNFLElBQUEsR0FBQSxDQUFJLE1BQUosRUFBYSxXQUFBLEdBQVUsUUFBdkIsQ0FBQSxDQUFBO1dBQ0EsRUFBRSxDQUFDLGFBQUgsQ0FBaUIsUUFBakIsRUFBMkIsUUFBM0IsRUFGRjtHQURhO0FBQUEsQ0FsRmYsQ0FBQTs7QUFBQSxNQXVGTSxDQUFDLE9BQVAsR0FBaUI7QUFBQSxFQUFDLGlCQUFBLGVBQUQ7QUFBQSxFQUFrQixpQkFBQSxlQUFsQjtBQUFBLEVBQW1DLDJCQUFBLHlCQUFuQztDQXZGakIsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiXHJcbmZzID0gcmVxdWlyZSAnZnMnXHJcbnBhdGggPSByZXF1aXJlICdwYXRoJ1xyXG53cmVuY2ggPSByZXF1aXJlICd3cmVuY2gnXHJcbl8gPSByZXF1aXJlICdsb2Rhc2gnXHJcbntsb2csIHJlbGF0aXZlVG9UaGlzRmlsZX0gPSByZXF1aXJlICcuL3V0aWwnXHJcbkJsaXNzID0gcmVxdWlyZSAnYmxpc3MnXHJcbmJsaXNzID0gbmV3IEJsaXNzXHJcbiAgZXh0OiBcIi5ibGlzc1wiXHJcbiAgY2FjaGVFbmFibGVkOiBmYWxzZSxcclxuICBjb250ZXh0OiB7fVxyXG5jd2QgPSBwcm9jZXNzLmN3ZCgpXHJcblxyXG5zZXR1cEZpbGVTeXN0ZW0gPSAoYXJncywgcmV0cmlldmVDb25maWcpIC0+XHJcbiAgcmV0cmlldmVDb25maWcoZmFsc2UsIChjb25maWcpIC0+XG4gICAgc2V0dXBGaWxlU3lzdGVtV2l0aENvbmZpZyBjb25maWcsIGFyZ3NcbiAgKVxuXG5zZXR1cEZpbGVTeXN0ZW1XaXRoQ29uZmlnID0gKGNvbmZpZywgYXJncykgLT5cbiAgYmFzZURpciA9IGlmIGNvbmZpZy5mdWJ1bXZjIHRoZW4gY29uZmlnLmZ1YnVtdmMuYmFzZURpciBlbHNlIGN3ZFxuICBtYWtlRm9sZGVycyhiYXNlRGlyKVxyXG4gIGluaXRGaWxlcyhhcmdzLCBiYXNlRGlyKVxyXG5cclxucmVzZXRGaWxlU3lzdGVtID0gKGFyZ3MsIHJldHJpZXZlQ29uZmlnKSAtPlxyXG4gIHJldHJpZXZlQ29uZmlnKGZhbHNlLCAoY29uZmlnKSAtPlxuICAgIGJhc2VEaXIgPSBpZiBjb25maWcuZnVidW12YyB0aGVuIGNvbmZpZy5mdWJ1bXZjLmJhc2VEaXIgZWxzZSBjd2RcbiAgICBkZWxldGVGb2xkZXJzKGJhc2VEaXIpXHJcbiAgICBzZXR1cEZpbGVTeXN0ZW0gYXJncywgcmV0cmlldmVDb25maWdcclxuICApXG5cclxubWFrZUZvbGRlcnMgPSAoYmFzZURpciA9IFwiXCIpLT5cclxuICBmb2xkZXJzID0gWydhc3NldHMvc2NyaXB0cycsICdhc3NldHMvc3R5bGVzJywgJ3B1YmxpYyddXHJcbiAgXy5lYWNoIGZvbGRlcnMsIChkaXIpIC0+XHJcbiAgICB1bmxlc3MgZnMuZXhpc3RzU3luYyBkaXJcclxuICAgICAgdGFyZ2V0ID0gcGF0aC5qb2luKGJhc2VEaXIsIGRpcilcbiAgICAgIGxvZyBcImluZm9cIiwgXCJjcmVhdGluZyAje3RhcmdldH1cIlxyXG4gICAgICB3cmVuY2gubWtkaXJTeW5jUmVjdXJzaXZlIHRhcmdldCwgMG8wNzc3XHJcblxucmVtb3ZlQWxsRmlsZXNGcm9tRGlyZWN0b3J5ID0gKGZvbGRlciwga2VlcCkgLT5cbiAgZnMucmVhZGRpclN5bmMoZm9sZGVyKS5mb3JFYWNoIChmaWxlKSAtPlxuICAgIHRhcmdldEZpbGUgPSBwYXRoLmpvaW4oZm9sZGVyLCBmaWxlKVxuICAgIGlzRGlyID0gZnMubHN0YXRTeW5jKHRhcmdldEZpbGUpLmlzRGlyZWN0b3J5KClcbiAgICBpZiBmaWxlIGlzIGtlZXBcbiAgICAgIGlmIGlzRGlyIHRoZW4gcmVtb3ZlQWxsRmlsZXNGcm9tRGlyZWN0b3J5IHRhcmdldEZpbGVcbiAgICAgIHJldHVyblxuICAgIHRyeVxuICAgICAgaWYgaXNEaXIgdGhlbiB3cmVuY2gucm1kaXJTeW5jUmVjdXJzaXZlKHRhcmdldEZpbGUpIGVsc2VcbiAgICAgICAgaWYgKC9cXC5naXRpZ25vcmUvLnRlc3QgdGFyZ2V0RmlsZSlcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgZnMudW5saW5rU3luYyh0YXJnZXRGaWxlKVxuICAgICAgICBsb2cgXCJzdWNjZXNzXCIsIFwiZGVsZXRlZCAje3RhcmdldEZpbGV9XCJcclxuICAgIGNhdGNoIGVyclxuICAgICAgbG9nKFwiZXJyb3JcIiwgZXJyKVxuXHJcbmRlbGV0ZUZvbGRlcnMgPSAoYmFzZURpciA9IFwiXCIpLT5cclxuICBmb2xkZXJzID0gWydhc3NldHMnLCAncHVibGljJ11cclxuICBfLmVhY2ggZm9sZGVycywgKGRpcikgLT5cclxuICAgIHRhcmdldCA9IHBhdGguam9pbihiYXNlRGlyLCBkaXIpXG4gICAgcmVtb3ZlQWxsRmlsZXNGcm9tRGlyZWN0b3J5IHRhcmdldCwgXCJzY3JpcHRzXCJcblxuZmlsZXNBdEJhc2UgPSAoYmFzZURpciwgZmlsZXMpIC0+XG4gIF8ubWFwIGZpbGVzLCAoZiktPiBwYXRoLmpvaW4oYmFzZURpciwgZilcblxyXG5pbml0RmlsZXMgPSAoZmxhZ3MgPSBmYWxzZSwgYmFzZURpciA9IFwiXCIpIC0+XHJcbiAgdXNlQ29mZmVlID0gZmxhZ3MgPT0gXCJjb2ZmZWVcIlxyXG4gIGV4dCA9IGlmIHVzZUNvZmZlZSB0aGVuIFwiY29mZmVlXCIgZWxzZSBcImpzXCJcclxuICBmaWxlcyA9IFtcImJvd2VyLmpzb25cIiwgXCJtaW1vc2EtY29uZmlnLiN7ZXh0fVwiLCBcImFzc2V0cy9kb250LWRlbGV0ZS1tZS5qc1wiXVxyXG4gIHZpZXdNb2RlbCA9XHJcbiAgICBuYW1lOiBwYXRoLmJhc2VuYW1lIGN3ZFxyXG4gIGNvbnRlbnRzID0gXyBmaWxlc1xyXG4gICAgLm1hcCAoZikgLT4gcmVsYXRpdmVUb1RoaXNGaWxlIHBhdGguam9pbihcIi4uL2Z1YnUtaW1wb3J0LXRlbXBsYXRlcy9cIiwgZilcclxuICAgIC5tYXAgKGYpIC0+IGJsaXNzLnJlbmRlciBmLCB2aWV3TW9kZWxcclxuICAgIC5tYXAgKGYpIC0+IGYudHJpbSgpXHJcbiAgICAudmFsdWUoKVxyXG4gIGZpbGVXaXRoQ29udGVudHMgPSBfLnppcChmaWxlc0F0QmFzZShiYXNlRGlyLCBmaWxlcyksIGNvbnRlbnRzKVxyXG5cclxuICBfLmVhY2ggZmlsZVdpdGhDb250ZW50cywgKHBhaXIpIC0+XHJcbiAgICBjb3B5Q29udGVudHMgcGFpclxyXG4gICNhdm9pZCByZXR1cm5pbmcgYW4gYXJyYXkgb2Ygbm90aGluZyB3aGVuIHVzaW5nIGEgY29tcHJlaGVuc2lvbiBhcyB5b3VyIGxhc3QgbGluZVxyXG4gICNieSB1c2luZyBhbiBleHBsaWNpdCByZXR1cm5cclxuICByZXR1cm5cclxuXHJcbmNvcHlDb250ZW50cyA9IChbZmlsZU5hbWUsIGNvbnRlbnRzXSkgLT5cclxuICB1bmxlc3MgZnMuZXhpc3RzU3luYyBmaWxlTmFtZVxyXG4gICAgbG9nIFwiaW5mb1wiLCBcImNyZWF0aW5nICN7ZmlsZU5hbWV9XCJcclxuICAgIGZzLndyaXRlRmlsZVN5bmMgZmlsZU5hbWUsIGNvbnRlbnRzXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtzZXR1cEZpbGVTeXN0ZW0sIHJlc2V0RmlsZVN5c3RlbSwgc2V0dXBGaWxlU3lzdGVtV2l0aENvbmZpZ31cclxuIl19
