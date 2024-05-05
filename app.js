const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.PORT;

const path = require("path");
const fs = require("fs").promises;

const app = express();

app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const logsPath = path.resolve(__dirname, "data", "logs.txt");

app.get("/", async (req, res) => {
  const data = await fs.readFile(logsPath, "utf8");
  const logs = data.split("\r\n").filter((i) => !!i);
  res.render("index", { logs });
});

app.post("/", async (req, res) => {
  const text = req.body.text;
  await fs.appendFile(logsPath, `${text}\r\n`);
  res.redirect("/");
});

app.listen(port, () => console.log(`App listening on port ${port}`));
