function doIf() {
  if (true) {
    var build = true;
  }

  console.log(build);
}

// hello world
function doIfElse() {
  if (true) {
    var build = true;
  } else {
    var build = false;
  }
}

function doTryCatch() {
  try {
    var build = 1;
  } catch (e) {
    var f = build;
  }
}

var path = "user input";
child_process.exec("ls -l " + path, function (err, data) {
  console.log(data);
});
