const express = require('express');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.get('/ansible-doc/:module', (req, res) => {
  const { module } = req.params;

  exec(`ansible-doc ${module}`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: `Error fetching info: ${error}` });
    }
    if (stderr) {
      return res.status(500).json({ error: `Stderr output: ${stderr}` });
    }

    res.json({ info: stdout });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
