(function (xhr) {
  function banana(xhrInstance) { // Example
    if (xhrInstance.readyState === 4) {
      console.log(xhrInstance.responseText);
      chrome.runtime.sendMessage(__extensionId, {data: xhrInstance.responseText});
    }
  }

  var open = xhr.open;
  xhr.open = function (method, url, async) {
    if (/^GET$/i.test(method)) {
      var send = this.send;
      this.send = function (data) {
        // Test if request body contains "TEST"
        var rsc = this.onreadystatechange;
        if (rsc) {
          // Apply monkey-patch
          this.onreadystatechange = function () {
            banana(this);
            return rsc.apply(this, arguments);
          };
        }
        return send.apply(this, arguments);
      };
    }
    return open.apply(this, arguments);
  };
})(XMLHttpRequest.prototype);