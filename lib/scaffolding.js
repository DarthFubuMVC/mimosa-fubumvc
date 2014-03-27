"use strict";
var Bliss, bliss, copyContents, cwd, fs, initFiles, log, makeFolders, path, relativeToThisFile, setupFileSystem, wrench, _, _ref;

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

setupFileSystem = function(args) {
  makeFolders();
  return initFiles(args);
};

makeFolders = function() {
  var folders;
  folders = ['assets/scripts', 'assets/styles', 'public'];
  return _.each(folders, function(dir) {
    if (!fs.existsSync(dir)) {
      log("info", "creating " + dir);
      return wrench.mkdirSyncRecursive(dir, 0x1ff);
    }
  });
};

initFiles = function(flags) {
  var contents, ext, fileWithContents, files, useCoffee, viewModel;
  if (flags == null) {
    flags = false;
  }
  useCoffee = flags === "coffee";
  ext = useCoffee ? "coffee" : "js";
  files = ["bower.json", "mimosa-config." + ext];
  viewModel = {
    name: path.basename(cwd)
  };
  contents = _(files).map(function(f) {
    return relativeToThisFile("../fubu-import-templates/" + f);
  }).map(function(f) {
    return bliss.render(f, viewModel);
  }).map(function(f) {
    return f.trim();
  }).value();
  fileWithContents = _.zip(files, contents);
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
  setupFileSystem: setupFileSystem
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYzpcXGhvbWVcXGdpdGh1YlxcbWltb3NhLWZ1YnVtdmNcXGxpYlxcc2NhZmZvbGRpbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjOlxcaG9tZVxcZ2l0aHViXFxtaW1vc2EtZnVidW12Y1xcc3JjXFxzY2FmZm9sZGluZy5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsWUFBQSxDQUFBO0FBQUEsSUFBQSw0SEFBQTs7QUFBQSxFQUNBLEdBQUssT0FBQSxDQUFRLElBQVIsQ0FETCxDQUFBOztBQUFBLElBRUEsR0FBTyxPQUFBLENBQVEsTUFBUixDQUZQLENBQUE7O0FBQUEsTUFHQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBSFQsQ0FBQTs7QUFBQSxDQUlBLEdBQUksT0FBQSxDQUFRLFFBQVIsQ0FKSixDQUFBOztBQUFBLE9BSzRCLE9BQUEsQ0FBUSxRQUFSLENBQTVCLEVBQUMsV0FBQSxHQUFELEVBQU0sMEJBQUEsa0JBTE4sQ0FBQTs7QUFBQSxLQU1BLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FOUixDQUFBOztBQUFBLEtBT0EsR0FBWSxJQUFBLEtBQUEsQ0FDVjtBQUFBLEVBQUEsR0FBQSxFQUFLLFFBQUw7QUFBQSxFQUNBLFlBQUEsRUFBYyxLQURkO0FBQUEsRUFFQSxPQUFBLEVBQVMsRUFGVDtDQURVLENBUFosQ0FBQTs7QUFBQSxHQVdBLEdBQU0sT0FBTyxDQUFDLEdBQVIsQ0FBQSxDQVhOLENBQUE7O0FBQUEsZUFhQSxHQUFrQixTQUFDLElBQUQsR0FBQTtBQUNoQixFQUFBLFdBQUEsQ0FBQSxDQUFBLENBQUE7U0FDQSxTQUFBLENBQVUsSUFBVixFQUZnQjtBQUFBLENBYmxCLENBQUE7O0FBQUEsV0FpQkEsR0FBYyxTQUFBLEdBQUE7QUFDWixNQUFBLE9BQUE7QUFBQSxFQUFBLE9BQUEsR0FBVSxDQUFDLGdCQUFELEVBQW1CLGVBQW5CLEVBQW9DLFFBQXBDLENBQVYsQ0FBQTtTQUNBLENBQUMsQ0FBQyxJQUFGLENBQU8sT0FBUCxFQUFnQixTQUFDLEdBQUQsR0FBQTtBQUNkLElBQUEsSUFBQSxDQUFBLEVBQVMsQ0FBQyxVQUFILENBQWMsR0FBZCxDQUFQO0FBQ0UsTUFBQSxHQUFBLENBQUksTUFBSixFQUFhLFdBQUEsR0FBVSxHQUF2QixDQUFBLENBQUE7YUFDQSxNQUFNLENBQUMsa0JBQVAsQ0FBMEIsR0FBMUIsRUFBK0IsS0FBL0IsRUFGRjtLQURjO0VBQUEsQ0FBaEIsRUFGWTtBQUFBLENBakJkLENBQUE7O0FBQUEsU0F3QkEsR0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNWLE1BQUEsNERBQUE7O0lBRFcsUUFBUTtHQUNuQjtBQUFBLEVBQUEsU0FBQSxHQUFZLEtBQUEsS0FBUyxRQUFyQixDQUFBO0FBQUEsRUFDQSxHQUFBLEdBQVMsU0FBSCxHQUFrQixRQUFsQixHQUFnQyxJQUR0QyxDQUFBO0FBQUEsRUFFQSxLQUFBLEdBQVEsQ0FBQyxZQUFELEVBQWdCLGdCQUFBLEdBQWUsR0FBL0IsQ0FGUixDQUFBO0FBQUEsRUFHQSxTQUFBLEdBQ0U7QUFBQSxJQUFBLElBQUEsRUFBTSxJQUFJLENBQUMsUUFBTCxDQUFjLEdBQWQsQ0FBTjtHQUpGLENBQUE7QUFBQSxFQUtBLFFBQUEsR0FBVyxDQUFBLENBQUUsS0FBRixDQUNULENBQUMsR0FEUSxDQUNKLFNBQUMsQ0FBRCxHQUFBO1dBQU8sa0JBQUEsQ0FBb0IsMkJBQUEsR0FBMEIsQ0FBOUMsRUFBUDtFQUFBLENBREksQ0FFVCxDQUFDLEdBRlEsQ0FFSixTQUFDLENBQUQsR0FBQTtXQUFPLEtBQUssQ0FBQyxNQUFOLENBQWEsQ0FBYixFQUFnQixTQUFoQixFQUFQO0VBQUEsQ0FGSSxDQUdULENBQUMsR0FIUSxDQUdKLFNBQUMsQ0FBRCxHQUFBO1dBQU8sQ0FBQyxDQUFDLElBQUYsQ0FBQSxFQUFQO0VBQUEsQ0FISSxDQUlULENBQUMsS0FKUSxDQUFBLENBTFgsQ0FBQTtBQUFBLEVBVUEsZ0JBQUEsR0FBbUIsQ0FBQyxDQUFDLEdBQUYsQ0FBTSxLQUFOLEVBQWEsUUFBYixDQVZuQixDQUFBO0FBQUEsRUFZQSxDQUFDLENBQUMsSUFBRixDQUFPLGdCQUFQLEVBQXlCLFNBQUMsSUFBRCxHQUFBO1dBQ3ZCLFlBQUEsQ0FBYSxJQUFiLEVBRHVCO0VBQUEsQ0FBekIsQ0FaQSxDQURVO0FBQUEsQ0F4QlosQ0FBQTs7QUFBQSxZQTJDQSxHQUFlLFNBQUMsSUFBRCxHQUFBO0FBQ2IsTUFBQSxrQkFBQTtBQUFBLEVBRGUsb0JBQVUsa0JBQ3pCLENBQUE7QUFBQSxFQUFBLElBQUEsQ0FBQSxFQUFTLENBQUMsVUFBSCxDQUFjLFFBQWQsQ0FBUDtBQUNFLElBQUEsR0FBQSxDQUFJLE1BQUosRUFBYSxXQUFBLEdBQVUsUUFBdkIsQ0FBQSxDQUFBO1dBQ0EsRUFBRSxDQUFDLGFBQUgsQ0FBaUIsUUFBakIsRUFBMkIsUUFBM0IsRUFGRjtHQURhO0FBQUEsQ0EzQ2YsQ0FBQTs7QUFBQSxNQWdETSxDQUFDLE9BQVAsR0FBaUI7QUFBQSxFQUFDLGlCQUFBLGVBQUQ7Q0FoRGpCLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIlxyXG5mcyA9IHJlcXVpcmUgJ2ZzJ1xyXG5wYXRoID0gcmVxdWlyZSAncGF0aCdcclxud3JlbmNoID0gcmVxdWlyZSAnd3JlbmNoJ1xyXG5fID0gcmVxdWlyZSAnbG9kYXNoJ1xyXG57bG9nLCByZWxhdGl2ZVRvVGhpc0ZpbGV9ID0gcmVxdWlyZSAnLi91dGlsJ1xyXG5CbGlzcyA9IHJlcXVpcmUgJ2JsaXNzJ1xyXG5ibGlzcyA9IG5ldyBCbGlzc1xyXG4gIGV4dDogXCIuYmxpc3NcIlxyXG4gIGNhY2hlRW5hYmxlZDogZmFsc2UsXHJcbiAgY29udGV4dDoge31cclxuY3dkID0gcHJvY2Vzcy5jd2QoKVxyXG5cclxuc2V0dXBGaWxlU3lzdGVtID0gKGFyZ3MpIC0+XHJcbiAgbWFrZUZvbGRlcnMoKVxyXG4gIGluaXRGaWxlcyhhcmdzKVxyXG5cclxubWFrZUZvbGRlcnMgPSAtPlxyXG4gIGZvbGRlcnMgPSBbJ2Fzc2V0cy9zY3JpcHRzJywgJ2Fzc2V0cy9zdHlsZXMnLCAncHVibGljJ11cclxuICBfLmVhY2ggZm9sZGVycywgKGRpcikgLT5cclxuICAgIHVubGVzcyBmcy5leGlzdHNTeW5jIGRpclxyXG4gICAgICBsb2cgXCJpbmZvXCIsIFwiY3JlYXRpbmcgI3tkaXJ9XCJcclxuICAgICAgd3JlbmNoLm1rZGlyU3luY1JlY3Vyc2l2ZSBkaXIsIDBvMDc3N1xyXG5cclxuaW5pdEZpbGVzID0gKGZsYWdzID0gZmFsc2UpIC0+XHJcbiAgdXNlQ29mZmVlID0gZmxhZ3MgPT0gXCJjb2ZmZWVcIlxyXG4gIGV4dCA9IGlmIHVzZUNvZmZlZSB0aGVuIFwiY29mZmVlXCIgZWxzZSBcImpzXCJcclxuICBmaWxlcyA9IFtcImJvd2VyLmpzb25cIiwgXCJtaW1vc2EtY29uZmlnLiN7ZXh0fVwiXVxyXG4gIHZpZXdNb2RlbCA9XHJcbiAgICBuYW1lOiBwYXRoLmJhc2VuYW1lIGN3ZFxyXG4gIGNvbnRlbnRzID0gXyBmaWxlc1xyXG4gICAgLm1hcCAoZikgLT4gcmVsYXRpdmVUb1RoaXNGaWxlIFwiLi4vZnVidS1pbXBvcnQtdGVtcGxhdGVzLyN7Zn1cIlxyXG4gICAgLm1hcCAoZikgLT4gYmxpc3MucmVuZGVyIGYsIHZpZXdNb2RlbFxyXG4gICAgLm1hcCAoZikgLT4gZi50cmltKClcclxuICAgIC52YWx1ZSgpXHJcbiAgZmlsZVdpdGhDb250ZW50cyA9IF8uemlwKGZpbGVzLCBjb250ZW50cylcclxuXHJcbiAgXy5lYWNoIGZpbGVXaXRoQ29udGVudHMsIChwYWlyKSAtPlxyXG4gICAgY29weUNvbnRlbnRzIHBhaXJcclxuICAjYXZvaWQgcmV0dXJuaW5nIGFuIGFycmF5IG9mIG5vdGhpbmcgd2hlbiB1c2luZyBhIGNvbXByZWhlbnNpb24gYXMgeW91ciBsYXN0IGxpbmVcclxuICAjYnkgdXNpbmcgYW4gZXhwbGljaXQgcmV0dXJuXHJcbiAgcmV0dXJuXHJcblxyXG5jb3B5Q29udGVudHMgPSAoW2ZpbGVOYW1lLCBjb250ZW50c10pIC0+XHJcbiAgdW5sZXNzIGZzLmV4aXN0c1N5bmMgZmlsZU5hbWVcclxuICAgIGxvZyBcImluZm9cIiwgXCJjcmVhdGluZyAje2ZpbGVOYW1lfVwiXHJcbiAgICBmcy53cml0ZUZpbGVTeW5jIGZpbGVOYW1lLCBjb250ZW50c1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7c2V0dXBGaWxlU3lzdGVtfVxyXG4iXX0=