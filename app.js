const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const socketIO = require("socket.io");
const fs = require("fs");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.text({ type: "*/*" })); // Support raw text bodies
app.use(express.static("public"));

// Set EJS as the template engine
app.set("view engine", "ejs");

// Directory to store request and response logs
const logDir = path.join(__dirname, "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

// Store requestData globally
let requestData = [];
let webhookConfig = {
  body: "",
  headers: {},
  auth: "",
  cookies: {},
};

// Helper to write logs
const writeLog = (filename, data) => {
  const filePath = path.join(logDir, filename);
  fs.writeFileSync(filePath, data, "utf-8");
};

// Dashboard route to view and edit webhook response config
app.get("/", (req, res) => {
  res.render("index", { requestData, webhookConfig });
});

// Endpoint to configure webhook response
app.post("/configure", (req, res) => {
  const { body, headers, auth, cookies } = req.body;

  // Parse headers and cookies to JSON format
  webhookConfig.body = body || "";
  webhookConfig.headers = headers ? JSON.parse(headers) : {};
  webhookConfig.auth = auth || "";
  webhookConfig.cookies = cookies ? JSON.parse(cookies) : {};

  res.redirect("/");
});

// Dynamic route for webhook listening to any path except `/`
app.all("*", async (req, res) => {
  const { headers, body, params, query, cookies, method, url } = req;

  const requestDetails = {
    method,
    url,
    headers,
    body,
    params,
    query,
    cookies,
    timestamp: new Date().toISOString(),
  };

  // Store the request data
  requestData.unshift(requestDetails); // Add the latest request at the beginning
  if (requestData.length > 10) requestData.pop(); // Remove the oldest request if the list exceeds 10

  // Notify clients via WebSocket
  io.emit("newEvent", requestDetails);

  // Save request log
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  writeLog(
    `request-${timestamp}.json`,
    JSON.stringify(requestDetails, null, 2)
  );

  // Set custom headers, cookies, and auth if configured
  for (const [key, value] of Object.entries(webhookConfig.headers)) {
    res.setHeader(key, value);
  }

  for (const [key, value] of Object.entries(webhookConfig.cookies)) {
    res.cookie(key, value);
  }

  if (webhookConfig.auth) {
    res.setHeader("Authorization", webhookConfig.auth);
  }

  // Respond with the custom body or a default response
  const responseBody =
    webhookConfig.body || JSON.stringify(requestDetails, null, 2);
  res.status(200).send(responseBody);

  // Save response log
  writeLog(`response-${timestamp}.txt`, responseBody);
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
