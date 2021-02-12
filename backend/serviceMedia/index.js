const express = require("express");

const IndexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", IndexRouter);

app.listen(PORT, () => console.log(`Service Media running on PORT`, PORT));
