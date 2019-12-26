const path = require("path");
const fs = require("fs");
const pageConfig = require("../../config/page.js");

exports.getPageDir = function() {
  if (__dirname.toString().indexOf('src') === -1) {
    console.log('请将工具放到src的子目录下，以便定位目录');
    process.exit();
  }
  return path.resolve(__dirname.split('src')[0], './src/pages/')
};

exports.existsPage = function(name) {
  if (pageConfig.hasOwnProperty(name)) {
    return true
  }
  return false;
};

exports.updatePageConfig = function(name) {
  if (pageConfig.hasOwnProperty(name)) {
    console.log(name + '页面已经存在，请使用其他名字');
    process.exit();
  }

  let config = fs.readFileSync('../../config/page.js').toString();

  let configStr = `{
    ${name}:{
        title:'Template',
        requiredParams:{//必填参数
        },
        optionalParams:{//可选参数
        },
    },`;

  try {
    fs.writeFileSync('../../config/page.js', config.replace('{', configStr))
    console.log('生成配置成功，请手动配置src/config/page.js文件的页面标题。')
  } catch (e) {
    console.log('生成配置失败，请手动配置src/config/page.js文件')
  }

};

exports.debounce = function(func, wait, immediate) {
  var timeout
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  }
}