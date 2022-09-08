const express = require("express");
const cors = require("cors");
const fs = require("fs");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

const port = 8000;

app.get("/test", (_, res) => {
  return res.json({ status: "backend is working" });
});

app.use("/images", express.static("images"));

app.get("/api/planets", (_, res) => {
  const rawdata = fs.readFileSync("./mock-data/list.json");
  const results = JSON.parse(rawdata).map((planet) => {
    const { id, name, image } = planet;
    return {
      id,
      name,
      image,
    };
  });

  return res.json(results);
});

app.get("/api/planets/:id", (req, res) => {
  const planetId = parseInt(req.params["id"]);
  const rawdata = fs.readFileSync("./mock-data/list.json");
  const results = JSON.parse(rawdata).find((planet) => planet.id === planetId);

  return res.json(results);
});

app.listen(port, () => {
  console.log("Listening on port " + port);
});
