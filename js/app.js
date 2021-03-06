var wrapper = document.getElementById("signature-pad");
var container2 =document.getElementById("signature-pad-footer-container")
// var seccioncaptura = document.getElementById("seccion-boton")
var clearButton = container2.querySelector("[data-action=clear]");
var changeColorButton = container2.querySelector("[data-action=change-color]");
var undoButton = container2.querySelector("[data-action=undo]");
var savePNGButton = container2.querySelector("[data-action=save-png]");
var saveJPGButton = container2.querySelector("[data-action=save-jpg]");
var saveSVGButton = container2.querySelector("[data-action=save-svg]");
var capturarButton = document.querySelector("#capturar");
var canvas = wrapper.querySelector("canvas");
var signaturePad = new SignaturePad(canvas, {
  // It's Necessary to use an opaque color when saving image as JPEG;
  // this option can be omitted if only saving as PNG or SVG
  backgroundColor: 'rgb(255, 255, 255)'
});

// Adjust canvas coordinate space taking into account pixel ratio,
// to make it look crisp on mobile devices.
// This also causes canvas to be cleared.
function resizeCanvas() {
  // When zoomed out to less than 100%, for some very strange reason,
  // some browsers report devicePixelRatio as less than 1
  // and only part of the canvas is cleared then.
  var ratio =  Math.max(window.devicePixelRatio || 1, 1);

  // This part causes the canvas to be cleared
  canvas.width = canvas.offsetWidth * ratio;
  canvas.height = canvas.offsetHeight * ratio;
  canvas.getContext("2d").scale(ratio, ratio);

  // This library does not listen for canvas changes, so after the canvas is automatically
  // cleared by the browser, SignaturePad#isEmpty might still return false, even though the
  // canvas looks empty, because the internal data of this library wasn't cleared. To make sure
  // that the state of this library is consistent with visual state of the canvas, you
  // have to clear it manually.
  signaturePad.clear();
}

// On mobile devices it might make more sense to listen to orientation change,
// rather than window resize events.
window.onresize = resizeCanvas;
resizeCanvas();

function download(dataURL, filename) {
  if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
    window.open(dataURL);
  } else {
    var blob = dataURLToBlob(dataURL);
    var url = window.URL.createObjectURL(blob);

    var a = document.createElement("a");
    a.style = "display: none";
    a.href = url;
    a.download = filename;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
  }
}

// One could simply use Canvas#toBlob method instead, but it's just to show
// that it can be done using result of SignaturePad#toDataURL.
function dataURLToBlob(dataURL) {
  // Code taken from https://github.com/ebidel/filer.js
  var parts = dataURL.split(';base64,');
  var contentType = parts[0].split(":")[1];
  var raw = window.atob(parts[1]);
  var rawLength = raw.length;
  var uInt8Array = new Uint8Array(rawLength);

  for (var i = 0; i < rawLength; ++i) {
    uInt8Array[i] = raw.charCodeAt(i);
  }

  return new Blob([uInt8Array], { type: contentType });
}

clearButton.addEventListener("click", function (event) {
  signaturePad.clear();
});

/* undoButton.addEventListener("click", function (event) {
  var data = signaturePad.toData();

  if (data) {
    data.pop(); // remove the last dot or line
    signaturePad.fromData(data);
  }
});

changeColorButton.addEventListener("click", function (event) {
  var r = Math.round(Math.random() * 255);
  var g = Math.round(Math.random() * 255);
  var b = Math.round(Math.random() * 255);
  var color = "rgb(" + r + "," + g + "," + b +")";

  signaturePad.penColor = color;
}); 

savePNGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL();
    download(dataURL, "signature.png");
  }
});

saveJPGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL("image/jpeg");
    download(dataURL, "signature.jpg");
  }
});

saveSVGButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Please provide a signature first.");
  } else {
    var dataURL = signaturePad.toDataURL('image/svg+xml');
    download(dataURL, "signature.svg");
  }
});*/
capturarButton.addEventListener("click", function (event) {
  if (signaturePad.isEmpty()) {
    alert("Por favor dibuja una firma primero.");
  } else {
    var dataURL = signaturePad.toDataURL();
    // download(dataURL, "signature.png");
    
    document.querySelector("#poliza-main").style.display="none"
    document.querySelector("#siniestro-listo").style.display="none"
    document.querySelector("#info-reporte").style.display="none"
    document.querySelector("#reembolsobtn-container").style.display="none"
    document.querySelector("#reporte-daños").style.display="none"
    document.querySelector("#total-daños").style.display="none"
    document.querySelector("#contenedor-top").style.display="none"
    document.querySelector("#canvas").style.display="none"
    document.querySelector("#signature-pad-footer-container").style.display="none"
    document.querySelector("#monto").innerHTML= "El monto de " + sessionStorage.getItem("total-indemnizar") + " por indemnización<br> será transferido a la cuenta" ;
    if (sessionStorage.getItem("banco") == null || sessionStorage.getItem("clabe" == null)) {
      document.querySelector("#banco-transfer").textContent="¡Ningún banco registrado!"
      document.querySelector("#cuenta-transfer").textContent="¡No hay cuenta registrada!"
      addBankAccount();
    }else{
      document.querySelector("#banco-transfer").textContent=sessionStorage.getItem("banco")
      document.querySelector("#cuenta-transfer").textContent=sessionStorage.getItem("clabe")
    }
    
    document.querySelector("#seccion-tran1").style.display="block"
    document.querySelector("#seccion-tran2").style.display="block"
    document.querySelector("#seccion-tran3").style.display="block"
    document.querySelector("#seccion-btn").style.display="block"
  }
});
