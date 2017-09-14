/**
 * Created by PhpStorm.
 * User: Sharapov A. <alexander@sharapov.biz>
 * Web: http://sharapov.biz
 * Date: 15.09.2017
 * Time: 0:15
 */

var MultiTabDetection = function () {
  var defaultAlertText = 'Another tab is open! The site does not allow multitab navigation. Please close all other tabs and refresh the page.',
      useBootstrapPopup = false;

  var registerTabGUID = function (options) {
    // detect local storage available
    if (typeof (Storage) !== "undefined") {
      // get (set if not) tab GUID and store in tab session
      if (sessionStorage["tabGUID"] === null) sessionStorage["tabGUID"] = tabGUID();
      var guid = sessionStorage["tabGUID"];

      // add eventlistener to local storage
      window.addEventListener("storage", storage_Handler, false);

      // set tab GUID in local storage
      localStorage["tabGUID"] = guid;
    }
  };

  var storage_Handler = function (e) {
    // if tabGUID does not match then more than one tab and GUID
    if (e.key === 'tabGUID') {
      if (e.oldValue !== e.newValue) tabWarning();
    }
  };

  var tabGUID = function () {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
  };

  var tabWarning = function () {
    if(useBootstrapPopup === true) {
      bsModal(defaultAlertText);
    } else {
      alert(defaultAlertText);
    }
  };

  var bsModal = function (alert) {
    var div1 = document.createElement('div');
    div1.id = 'multiTabPreventPopup';
    div1.className = 'modal fade in';
    div1.style = 'display: block';
    div1.setAttribute("role", "dialog");

    var innerDiv1m = document.createElement('div');
    innerDiv1m.className = 'modal-dialog';
    div1.appendChild(innerDiv1m);

    var innerDiv2m = document.createElement('div');
    innerDiv2m.className = 'modal-content';
    innerDiv1m.appendChild(innerDiv2m);

    var innerDiv3 = document.createElement('div');
    innerDiv3.className = 'modal-header';
    innerDiv2m.appendChild(innerDiv3);

    var headerM = document.createElement("H4");
    headerM.className = 'modal-title';
    innerDiv3.appendChild(headerM);

    var innerDiv31 =  document.createElement('div');
    innerDiv31.className = 'modal-body';
    innerDiv31.innerHTML = alert;
    innerDiv2m.appendChild(innerDiv31);

    var innerDiv32 =  document.createElement('div');
    innerDiv32.className = 'modal-footer';
    innerDiv2m.appendChild(innerDiv32);

    document.getElementsByTagName('body')[0].appendChild(div1);
  };

  return {
    init: function (options) {
      defaultAlertText = options.alertText || defaultAlertText;
      useBootstrapPopup = options.useBootstrapPopup || useBootstrapPopup;
      registerTabGUID(options);
    }
  };
}();

function prevent_multitab(alert) {
  MultiTabDetection.init({
    alertText: alert,
    useBootstrapPopup: true
  });
}



