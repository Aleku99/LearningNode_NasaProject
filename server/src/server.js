const http = require("http");
const app = require("./app");
const cluster = require("cluster");
const os = require("os");
const { loadPlanetsData } = require("./models/planets.model");
const mongoose = require("mongoose");

const MONGO_URL =
  "mongodb+srv://nasa-api:LT7bkcheKqH15XbW@cluster0.vl3gf4x.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();
  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });
}

if (cluster.isPrimary) {
  const numCpus = os.cpus().length;
  for (let i = 0; i < numCpus; i++) {
    cluster.fork();
  }
} else {
  startServer();
}
