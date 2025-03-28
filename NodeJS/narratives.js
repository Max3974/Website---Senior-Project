const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(path.join(__dirname, "..")));

// endpoint to serve the HTML file
app.get("/narratives.html", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "narratives_js.html"));
});

// mock response for task narratives assigned to a user
const mockTaskNarrativesByUser = {
    1: [
      { id: 2, title: "Task 2" },
    ],
    2: [
      { id: 1, title: "Task 1" },
      { id: 2, title: "Task 2" },
      { id: 3, title: "Task 3" },
    ],
    3: [],
  };
  
  app.get("/api/task-narratives/:userId", (req, res) => {
    const userId = parseInt(req.params.userId, 10); // convert id to int
    const taskNarratives = mockTaskNarrativesByUser[userId] || []; // empty array if userId is out of range
    res.json(taskNarratives);
  });

app.listen(3000, () => {
  console.log("Server running on port 3000");
});