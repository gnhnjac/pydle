// globals

var tries = 0;

var question;

const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  mode: "python",
  theme: "hacker",
});

function init(add) {
  // set value to daily challenge

  const date1 = new Date("2/25/2022");
  date1.setDate(date1.getDate() - add);
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  var diffDays = (Math.ceil(diffTime / (1000 * 60 * 60 * 24)) % 51).toString();

  if (diffDays == "0") diffDays = "1";

  question = diffDays;

  while (diffDays.length < 2) diffDays = "0" + diffDays;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    editor.setValue(
      xhttp.responseText.substring(0, xhttp.responseText.indexOf("pass") + 4)
    );
  };
  xhttp.open(
    "GET",
    `https://raw.githubusercontent.com/r1cc4rdo/daily_coding_problem/master/problems/${diffDays}/problem_${diffDays}.py`,
    true
  );
  xhttp.send();
}

init(0);

function isOverflown(element) {
  return (
    element.scrollHeight > element.clientHeight ||
    element.scrollWidth > element.clientWidth
  );
}

async function evaluateData() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var text_case = this.responseText;

      pypyjs
        .exec(editor.getValue() + `\nx=${text_case}`)
        .then(() => {
          return pypyjs.get("x");
        })
        .then((result) => {
          var tag = document.createElement("p");
          var text = document.createTextNode(
            "Result evaluated to " + result.toString()
          );
          tag.appendChild(text);
          document.getElementById("log").appendChild(tag);
          document
            .getElementById("log")
            .appendChild(document.createElement("br"));
          document
            .getElementById("log")
            .appendChild(document.createElement("br"));

          if (result) {
            document.getElementById("finalmsg").style.visibility = "visible";
            document.getElementById("finalmsg").classList.add("appear");
          }
        })
        .catch((err) => {
          var tag = document.createElement("p");
          var text = document.createTextNode(err);
          tag.appendChild(text);
          document.getElementById("log").appendChild(tag);
          document
            .getElementById("log")
            .appendChild(document.createElement("br"));
          document
            .getElementById("log")
            .appendChild(document.createElement("br"));
        });

      tries++;
      document.getElementById("stats").innerHTML = "Tries: " + tries;
    }
  };
  xhttp.open("GET", `/testcase/${question}`, true);
  xhttp.send();
}

var t = setInterval(() => {
  if (isOverflown(document.getElementById("log"))) {
    var parent = document.getElementById("log");
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }
}, 1000);
