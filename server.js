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
app.use("/views", express.static(path.join(__dirname, "views")));
app.use("/utils", express.static(path.join(__dirname, "utils")));

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
  try {
    const {
      containerName,
      containerImage,
      ports,
      envVars,
      volumes,
      networkMode,
      restartPolicy,
    } = req.body;
    
    console.log("Received container creation request:", req.body);
    
    // Validate required fields
    if (!containerImage) {
      return res.status(400).json({ 
        success: false, 
        message: 'Container image is required' 
      });
    }

    // Build the Docker command
    let command = `docker run -d`;
    
    // Add container name if provided
    if (containerName) {
      command += ` --name "${containerName}"`;
    }
    
    // Add restart policy if provided
    if (restartPolicy && restartPolicy !== "no") {
      command += ` --restart ${restartPolicy}`;
    }
    
    // Add network mode if provided
    if (networkMode) {
      command += ` --network ${networkMode}`;
    }
    
    // Add port mappings if provided
    if (Array.isArray(ports) && ports.length > 0) {
      ports.forEach(port => {
        if (port.hostPort && port.containerPort) {
          command += ` -p ${port.hostPort}:${port.containerPort}`;
        }
      });
    }
    
    // Add environment variables if provided
    if (Array.isArray(envVars) && envVars.length > 0) {
      envVars.forEach(env => {
        if (env.key) {
          command += ` -e ${env.key}=${env.value || ''}`;
        }
      });
    }
    
    // Add volume mappings if provided
    if (Array.isArray(volumes) && volumes.length > 0) {
      volumes.forEach(volume => {
        if (volume.hostPath && volume.containerPath) {
          command += ` -v ${volume.hostPath}:${volume.containerPath}`;
        }
      });
    }
    
    // Add the image name
    command += ` ${containerImage}`;
    
    console.log(`Executing command: ${command}`);
    
    // Execute the Docker command
    const { exec } = require('child_process');
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error creating container: ${error.message}`);
        return res.status(500).json({ 
          success: false, 
          message: `Error creating container: ${error.message}`,
          details: stderr
        });
      }
      
      console.log(`Container creation output: ${stdout}`);
      if (stderr) console.error(`Container creation stderr: ${stderr}`);
      
      res.json({ 
        success: true, 
        message: containerName ? `Container ${containerName} created successfully` : 'Container created successfully', 
        details: stdout.trim() 
      });
    });
  } catch (error) {
    console.error(`Error in create-container route: ${error}`);
    res.status(500).json({ 
      success: false, 
      message: `Internal server error: ${error.message}` 
    });
  }
});

// Images routes
app.get("/get-images", (req, res) => {
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "images/get-images.sh"
  );
  execFile(scriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/pull-image/:imageName", (req, res) => {
  const { imageName } = req.params;
  const scriptPath = path.join(__dirname, "scripts", "images/pull-image.sh");
  execFile(scriptPath, [imageName], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/remove-image/:imageId", (req, res) => {
  const { imageId } = req.params;
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "images/remove-image.sh"
  );
  execFile(scriptPath, [imageId], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.get("/inspect-image/:imageId", (req, res) => {
  const { imageId } = req.params;
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "images/inspect-image.sh"
  );
  execFile(scriptPath, [imageId], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

app.post("/tag-image", (req, res) => {
  const { imageId, newTag } = req.body;
  const scriptPath = path.join(
    __dirname,
    "scripts",
    "images/tag-image.sh"
  );
  execFile(scriptPath, [imageId, newTag], (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error}`);
      return res.status(500).send(`Error executing script: ${error.message}`);
    }
    console.log(`Script output: ${stdout}`);
    res.send(stdout.trim());
  });
});

// Start the server
const PORT = 3030;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
