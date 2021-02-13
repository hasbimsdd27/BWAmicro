const express = require("express");

const IndexRouter = require("./routes");
const RefreshTokenRouter = require("./routes/refreshToken");

const app = express();
const PORT = process.env.PORT || 4001;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use("/refresh_token", RefreshTokenRouter);
app.use("/", IndexRouter);

app.listen(PORT, () =>
  console.log(`${process.env.APP_NAME} running on PORT ${PORT}`)
);
