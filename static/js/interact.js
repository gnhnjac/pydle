var already_finished = false;

if (getCookie("pydle") != null) {
  document.getElementById("main").visibility = "hidden";
  document.getElementById("main").style.display = "none";
  document.getElementById("popup").style.display = "none";
  document.getElementById("finalmsg").style.visibility = "visible";
  document.getElementById("finalmsg").classList.add("appear");
  already_finished = true;
}

// globals

var tries = 0;

var question;

document.querySelector("#close").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "none";
});
document.getElementById("info").addEventListener("click", function () {
  document.querySelector(".popup").style.display = "block";
});

const editor = CodeMirror.fromTextArea(document.getElementById("code"), {
  lineNumbers: true,
  mode: "python",
  theme: "hacker",
  extraKeys: {
    Tab: function (cm) {
      cm.replaceSelection("    ", "end");
    },
  },
});

editor.setSelection(
  {
    line: editor.firstLine(),
    ch: 0,
    sticky: null,
  },
  {
    line: editor.lastLine(),
    ch: 0,
    sticky: null,
  },
  { scroll: false }
);
//auto indent the selection
editor.indentSelection("smart");

// Hook up output streams to write to the console.
pypyjs.stdout = function (data) {
  var tag = document.createElement("p");
  var text = document.createTextNode(data);
  tag.appendChild(text);
  document.getElementById("log").appendChild(tag);
  document.getElementById("log").appendChild(document.createElement("br"));
  document.getElementById("log").appendChild(document.createElement("br"));
};

function init() {
  // set value to daily challenge

  const date1 = new Date("2/26/2022");
  date1.setDate(date1.getDate());
  const date2 = new Date();
  const diffTime = Math.abs(date2 - date1);
  var diffDays = (Math.floor(diffTime / (1000 * 60 * 60 * 24)) % 51).toString();
  question = diffDays;

  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    editor.setValue(xhttp.responseText);
    document.getElementById("objective").innerHTML =
      xhttp.responseText.substring(
        xhttp.responseText.indexOf('"""') + 3,
        xhttp.responseText.indexOf("Example")
      );
  };
  xhttp.open("GET", `/getq/${question}`, true);
  xhttp.send();
}

init();

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

      var skeleton = editor.getValue();
      //skeleton = skeleton.replace("print(")

      pypyjs
        .exec(
          "import js\njquery=js.globals['$']\n" + skeleton + `\nx=${text_case}`
        )
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
            var share = `I completed today's pydle in ${tries} tries, here is my solution:@@@${editor
              .getValue()
              .split("\n")
              .join("@@@")}`;
            createCookie("pydle", share, "/");
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

function copyResults() {
  /* Copy the text inside the text field */
  if (!already_finished) {
    navigator.clipboard.writeText(
      `I completed today's pydle in ${tries} tries, here is my solution:\n` +
        editor.getValue()
    );
  } else {
    var cook = getCookie("pydle");
    navigator.clipboard.writeText(cook.split("@@@").join("\n"));
  }
  /* Alert the copied text */
  alert("Copied the result to clipboard");
}

function createCookie(name, value, path) {
  var expires = "";
  var date = new Date();
  var midnight = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    23,
    59,
    59
  );
  expires = "; expires=" + midnight.toGMTString();
  if (!path) {
    path = "/";
  }
  document.cookie = name + "=" + value + expires + "; path=" + path;
}
function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin != 0) return null;
  } else {
    begin += 2;
    var end = document.cookie.indexOf(";", begin);
    if (end == -1) {
      end = dc.length;
    }
  }
  // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));
  return decodeURI(dc.substring(begin + prefix.length, end));
}
