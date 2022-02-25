// globals

var tries = 0;

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  mode: "python",
  theme: "hacker",
});
function sendData() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/check", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    var jsonResponse = JSON.parse(xhr.responseText);
    console.log(jsonResponse);
    var tag = document.createElement("p");
    var text = document.createTextNode(
      "Received response from server, your answer evaluated to " +
        jsonResponse.correct
    );
    tag.appendChild(text);
    document.getElementById("log").appendChild(tag);
    document.getElementById("log").appendChild(document.createElement("br"));
    document.getElementById("log").appendChild(document.createElement("br"));

    if (jsonResponse.correct)
    {
      document.getElementById("finalmsg").style.visibility = "visible";
      document.getElementById("finalmsg").classList.add("appear");

    }
  };
  pypyjs
    .exec(editor.getValue())
    .then(() => {
      return pypyjs.get("x");
    })
    .then((result) => {
      var tag = document.createElement("p");
      var text = document.createTextNode(
        "Sent " + result + " to server, waiting for response..."
      );
      tag.appendChild(text);
      document.getElementById("log").appendChild(tag);
      document.getElementById("log").appendChild(document.createElement("br"));
      document.getElementById("log").appendChild(document.createElement("br"));
      xhr.send(
        JSON.stringify({
          guess: result,
        })
      );
    })
    .catch((err) => {
      var tag = document.createElement("p");
      var text = document.createTextNode(err);
      tag.appendChild(text);
      document.getElementById("log").appendChild(tag);
      document.getElementById("log").appendChild(document.createElement("br"));
      document.getElementById("log").appendChild(document.createElement("br"));
    });
    tries++;
    document.getElementById("stats").innerHTML ="Tries: " + tries;

}

var t=setInterval(()=>{

  if (isOverflown(document.getElementById("log"))) {
    var parent = document.getElementById("log");
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

},1000);