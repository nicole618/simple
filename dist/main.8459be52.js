// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $addSite = $('.sitList .addSite');
var $sitList = $('.siteMain .sitList');
var sitListLi = document.querySelectorAll('.siteMain .sitList li');
var x = localStorage.getItem("x");
var xObject = JSON.parse(x);
var hashMap = xObject || [{
  logo: 'A',
  url: 'https://www.baidu.com/',
  bgColor: '#ac4173'
}, {
  logo: 'T',
  url: 'https://www.taobao.com/',
  bgColor: '#79b462'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var render = function render() {
  $sitList.find('li:not(.addSite)').remove();
  hashMap.forEach(function (element, index) {
    if (index > 8) {
      return;
    }

    var $li = $("\n        <li>\n        <div class=\"site\">\n            <div class=\"logo\">".concat(element.logo, "</div>\n            <div class=\"logoName\">").concat(simplifyUrl(element.url), "</div>\n            <div class=\"more\">\n            <svg class=\"icon\" aria-hidden=\"true\">\n                        <use xlink:href=\"#icon-more\"></use>\n                    </svg>\n            </div>\n            <div class ='moreDetail'>\n            <div class='modifyUrl'>\u7F16\u8F91</div>\n            <div class='close'>\u79FB\u9664</div>\n            </div>\n        </div>\n    </li>")).insertBefore($addSite);
    $li.on('click', function () {
      window.open(element.url);
    });
    $li.on('click', '.close', function (e) {
      hashMap.splice(index, 1);
      render();
      e.stopPropagation();
    });
    $li.on('click', '.moreDetail', function (e) {
      e.stopPropagation();
    });
    $li.on('click', '.more', function (e) {
      $li.find('.moreDetail').addClass('block').end().siblings().find('.moreDetail').removeClass('block');
      e.stopPropagation();
    });
    $(document).on('click', function () {
      $('.moreDetail').removeClass('block');
    });
    $li.find('.logo').css('background', element.bgColor);
    $li.on('click', '.modifyUrl', function (e) {
      var modifyUrl = window.prompt('请输入您更改后的链接');

      if (modifyUrl.indexOf('http') !== 0) {
        modifyUrl = 'https://' + modifyUrl;
      }

      hashMap[index].url = modifyUrl;
      hashMap[index].logo = simplifyUrl(modifyUrl)[0];
      render();
      e.stopPropagation();
    });
  });
};

render();
$addSite.on('click', function () {
  var url = window.prompt('请输入您要添加的网站链接');

  if (url.indexOf('http') !== 0) {
    url = 'https://' + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0],
    url: url,
    bgColor: randomColor()
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});

var randomColor = function randomColor() {
  var colArr = new Array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
  var color = '';

  for (var i = 0; i < 6; i++) {
    var random = Math.floor(Math.random() * 16);
    color += colArr[random];
  }

  return "#" + color;
};
},{}]},{},["epB2"], null)
//# sourceMappingURL=/main.8459be52.js.map