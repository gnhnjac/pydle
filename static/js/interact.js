
var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
    lineNumbers: true,
    mode: "python",
  });

  
function sendData() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/check", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    var jsonResponse = JSON.parse(xhr.responseText);
    console.log(jsonResponse);
  };
  xhr.send(
    JSON.stringify({
      code: editor.getValue()
    })
  );
}