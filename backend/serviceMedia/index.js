const express = require("express");
const path = require("path");

const IndexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use("/images", express.static(path.join(__dirname, "/public/images")));

app.use("/", IndexRouter);

app.listen(PORT, () =>
  console.log(`${process.env.APP_NAME} running on PORT ${PORT}`)
);
