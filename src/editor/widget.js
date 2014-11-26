/* global document */

(function() { "use strict";
  var apiHost = "";
  var apiUrl = apiHost + "/index";

  function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  function insertIde(script) {
    var container = document.createElement("div");
    container.id = "HexletIDE";
    container.className = "hexlet-ide";
    container.style.display = "block";
    container.style.float = "none";
    container.style.overflow = "hidden";
    container.style.padding = 0;
    container.style.margin = "20px 0";

    insertAfter(script, container);

    var iframe = document.createElement("iframe");
    iframe.src = apiUrl;
    iframe.id = "hexlet-ide-iframe";
    iframe.name = "hexlet-ids-iframe";
    iframe.scrolling = "no";
    iframe.setAttribute("allowFullScreen", "true");
    iframe.style.overflow = "hidden";
    iframe.style.margin = 0;
    iframe.style.border = 0;
    iframe.style.display = "inline-block";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.float = "none";
    iframe.style.visibility = "hidden";
    iframe.onload = function() { this.style.visibility = "visible"; };

    container.appendChild(iframe);
  }

  var script = document.getElementById("ide-widget");

  if (script) {
    insertIde(script);
  }
})();
