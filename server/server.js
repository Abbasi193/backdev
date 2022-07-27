const express = require("express");
var fs = require("fs");
const process = require("process");
const spawn = require("child_process").spawn;
const path = require("path");
var checkGit = require("check-git");
const cors = require("cors");
const http = require("http")

const { Server } = require("socket.io");

const port = process.env.PORT || 5000
const DIR = __dirname

const dirPath = path.join(__dirname, "SavedProjects");
var execSync = require('child_process').execSync;

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(cors());

const bodyParser = require("body-parser");
const { response } = require("express");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
})


app.post("/project", function (req, res) {

  // process.chdir(__dirname);

  var folderName;
  folderName = `./SavedProjects/${req.body.folderName}`;

  if (!fs.existsSync(folderName)) {

    fs.mkdirSync(folderName);

    try {
      // Change the directory
      process.chdir(process.cwd() + folderName);          // code to change directory

      spawn("cmd", ["/c", "npm init -y"], {
        //<----
        shell: true,
        stdio: "inherit",
      });

      // // change directory temporarly for testing
      // process.chdir(DIR)
      res.send("all good")
    }
    catch (err) {
      // Printing error if occurs
      console.error("error occured while " + "changing directory: " + err);
    }
  } else {

    res.send("Project Name Already Present")
  }
});
// process.chdir(process.cwd() + folderName); 
app.get("/openPro", function (req, res) {
  //console.log(req);
  console.log(process.cwd());
  fs.readdir("./SavedProjects", (err, items) => {

    res.send(items);
  });
});
app.post("/changeProject", function (req, res) {
  try {
    process.chdir(__dirname + `\\SavedProjects\\` + req.body.folderName);
    console.log(process.cwd())
    console.log('changeProject')
    res.send('good');
  }
  catch (e) {
    console.log(e)
    res.send('bad')
  }

});
app.post("/reset", function (req, res) {
  console.log('called')
  process.chdir(DIR);
  res.end()

});

app.post("/gitinit", function (req, res) {
  //console.log(req);
  console.log("in git init");
  if (checkGit(process.cwd())) {
    console.log('git repository already exist');
  } else {

    console.log('Git repository not exist....... Now initializing');

    var temp = spawn("cmd", ["/c", "git init"], {
      //<----
      shell: true,
      stdio: "inherit",
    })

    temp.on('close', function (err) {
      // process.stdout.write('"npm install" finished with code ' + code + '\n');
      if (err) {
        res.send("Failed")
      }
      else {
        res.send("Success")
      }

    });

  }
});

app.post("/gitadd", function (req, res) {
  //console.log(req);
  console.log("in git add");
  console.log(process.cwd())

  var temp = spawn("cmd", ["/c", "git add ."], {
    //<----
    shell: true,
    stdio: "inherit",
  })

  temp.on('close', function (err) {
    // process.stdout.write('"npm install" finished with code ' + code + '\n');
   
  
      if (err) {
        res.send("Failed")
      }
      else {
        res.send("Success")
      }
  });
})
app.post("/gitcommit", function (req, res) {
  //console.log(req);
  console.log("in git commit");
  console.log(req.body.commitMessage);


  var temp = spawn("cmd", ["/c", `git commit -m "${req.body.commitMessage}"`], {
    //<----
    shell: true,
    stdio: "inherit",
  })



    temp.on('close', function (err) {
      // process.stdout.write('"npm install" finished with code ' + code + '\n');
      if (err) {
        res.send("Failed")
      }
      else {
        res.send("Success")
      }

  

  });

})
app.post("/revertcommit", function (req, res) {
  //console.log(req);
  console.log("in git revert commit");



  var temp = spawn("cmd", ["/c", `git reset --soft HEAD~`], {
    //<----
    shell: true,
    stdio: "inherit",
  })



    temp.on('close', function (err) {
      // process.stdout.write('"npm install" finished with code ' + code + '\n');
      if (err) {
        res.send("Failed")
      }
      else {
        res.send("Success")
      }


  });
})

app.post("/gitpush", function (req, res) {
  //console.log(req);
  console.log("in git push");



  var temp = spawn("cmd", ["/c", `git push`], {
    //<----
    shell: true,
    stdio: "inherit",
  })

 

    temp.on('close', function (err) {
      // process.stdout.write('"npm install" finished with code ' + code + '\n');
      if (err) {
        res.send("Failed")
      }
      else {
        res.send("Success")
      }

  });
})
app.post("/gitpull", function (req, res) {
  //console.log(req);
  console.log("in git pull");



  var temp = spawn("cmd", ["/c", `git pull`], {
    //<----
    shell: true,
    stdio: "inherit",
  })


  temp.on('close', function (err) {
    // process.stdout.write('"npm install" finished with code ' + code + '\n');
    if (err) {
      res.send("Failed")
    }
    else {
      res.send("Succes")
    }

  });

});

app.post("/npmmodule", function (req, res) {
  //console.log(req);
  console.log("in npm mdule");
  console.log(req.body.npmModule);


  var temp = spawn("cmd", ["/c", `npm i "${req.body.npmModule}"`], {
    //<----
    shell: true,
    stdio: "inherit",
  })

  temp.on('close', function (err) {
    // process.stdout.write('"npm install" finished with code ' + code + '\n');
    if (err) {

      res.send("Failed")
    }
    else {

      res.send("Success")
    }
  });

});


app.post("/createheroku", function (req, res) {

  console.log("in heroku Create App");



  var temp = spawn("cmd", ["/c", `heroku create "${req.body.appName}"`], {
    //<----
    shell: true,
    stdio: "inherit",
  })


  temp.on('close', function (err) {

    if (err) {
      res.send("Failed")
    }
    else {
      res.send("Success")
    }

  });

});

app.post("/pushheroku", function (req, res) {

  console.log("in heroku push");



  var temp = spawn("cmd", ["/c", `git push heroku`], {
    //<----
    shell: true,
    stdio: "inherit",
  })


  temp.on('close', function (err) {

    if (err) {
      res.send("Failed")
    }
    else
      res.send("Success")


  });

});

app.post("/savestate", function (req, res) {
  let data = req.body.state
  try {
    fs.writeFileSync(process.cwd() + '\\state.json', data);
    // file written successfully
  } catch (err) {
    res.status(404).send(err);
    return
  }
  res.send('State saved');
});

app.get("/getstate", function (req, res) {

  try {
    const state = fs.readFileSync(process.cwd() + '\\state.json', 'utf8');
    res.send(state);
  } catch (err) {
    res.status(404).send(err);
  }

});

app.get("/getcode", function (req, res) {

  try {
    const code = fs.readFileSync(process.cwd() + '\\index.js', 'utf8');
    res.send(code);
    // res.send(state);
  } catch (err) {
    res.status(404).send(err);
  }

});

app.post("/savecode", function (req, res) {
  let data = req.body.code
  try {
    fs.writeFileSync(process.cwd() + '\\index.js', data);
    // file written successfully
  } catch (err) {
    res.status(404).send(err);
    return
  }
  res.send('Code saved');
});

app.post("/runProject", function (req, res) {

  var temp = spawn("cmd", ["/c", "node index.js"], {
    //<----
    shell: true,
    stdio: "inherit",
  })

  temp.on('close', function (err) {
    if (err) {
      res.send("Failed")
    }
    else {
      res.send("Success")
    }
  });
  // temp.stdout.on('data', function (data) {
  //   console.log(data)
  //   // if (err) {
  //   //   // res.send("Failed")
  //   // }
  //   // else {
  //   //   res.send("Success")
  //   // }
  // });
})
app.use(express.static(path.join(__dirname, 'build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

server.listen(port, async () => {
  console.log("Server started on " + port);
});



