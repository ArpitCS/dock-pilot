const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const { execFile } = require("child_process");

const app = express();

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "homepage.html"));
});

app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "dashboard.html"));
});

app.get("/containers", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "containers.html"));
});

app.get("/images", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "images.html"));
});

app.get("/lab", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "lab.html"));
});

// Script Routes
app.get("/total-images", (req, res) => {
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "dashboard/total-images.sh"
  ); // Change to your script path
  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/stopped-containers", (req, res) => {
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "dashboard/stopped-containers.sh"
  ); // Change to your script path
  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/running-containers", (req, res) => {
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "dashboard/running-containers.sh"
  ); // Change to your script path
  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/start-all", (req, res) => {
  const scriptPath = path.join(__dirname, "scripts", "dashboard/start-all.sh"); // Change to your script path
  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/stop-all", (req, res) => {
  const scriptPath = path.join(__dirname, "scripts", "dashboard/stop-all.sh"); // Change to your script path
  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/restart-all", (req, res) => {
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "dashboard/restart-all.sh"
  ); // Change to your script path
  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/prune", (req, res) => {
  const scriptPath = path.join(__dirname, "scripts", "dashboard/prune.sh"); // Change to your script path
  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/system-resources", (req, res) => {
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "dashboard/system-resources.sh"
  ); // Change to your script path
  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/get-containers", (req, res) => {
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "containers/get-containers.sh"
  ); // Change to your script path
  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/get-logs/:containerId", (req, res) => {
  const { containerId } = req.params;
  const scriptPath = path.join(__dirname, "scripts", "containers/get-logs.sh"); // Change to your script path
  execFile(scriptPath, [containerId], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/start-container/:containerId", (req, res) => {
  const { containerId } = req.params;
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "containers/start-container.sh"
  ); // Change to your script path
  execFile(scriptPath, [containerId], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/stop-container/:containerId", (req, res) => {
  const { containerId } = req.params;
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "containers/stop-container.sh"
  ); // Change to your script path
  execFile(scriptPath, [containerId], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/delete-container/:containerId", (req, res) => {
  const { containerId } = req.params;
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "containers/delete-container.sh"
  ); // Change to your script path
  execFile(scriptPath, [containerId], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/restart-container/:containerId", (req, res) => {
  const { containerId } = req.params;
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "containers/restart-container.sh"
  ); // Change to your script path
  execFile(scriptPath, [containerId], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/inspect-container/:containerId", (req, res) => {
  const { containerId } = req.params;
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "containers/inspect-container.sh"
  ); // Change to your script path
  execFile(scriptPath, [containerId], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.post("/create-container", (req, res) => {
  const {
    containerName,
    containerImage,
    ports,
    envVars,
    volumes,
    networkMode,
    restartPolicy,
  } = req.body;

  const args = [
    containerName,
    containerImage,
    JSON.stringify(ports || []),
    JSON.stringify(envVars || []),
    JSON.stringify(volumes || []),
    networkMode || "bridge",
    restartPolicy || "no",
  ];

  execFile(scriptPath, args, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send({
        success: false,
        message: `Error executing script: ${error.message}`,
        details: stderr
      });
    }

    console.log(`Script output: ${stdout}`);
    res.send({
      success: true,
      message: `Container ${containerName} created successfully.`,
      details: stdout.trim()
    });
  });
});

// Start the server
const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
