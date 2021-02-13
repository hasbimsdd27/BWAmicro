const express = require("express");

const CoursesRouter = require("./routes/courses");
const MediaRouter = require("./routes/media");
const OrdersRouter = require("./routes/orders");
const PaymentsRouter = require("./routes/payments");
const UsersRouter = require("./routes/users");
const IndexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use(`${process.env.API_VERSION}/`, IndexRouter);
app.use(`${process.env.API_VERSION}/courses`, CoursesRouter);
app.use(`${process.env.API_VERSION}/media`, MediaRouter);
app.use(`${process.env.API_VERSION}/orders`, OrdersRouter);
app.use(`${process.env.API_VERSION}/payments`, PaymentsRouter);
app.use(`${process.env.API_VERSION}/users`, UsersRouter);

app.listen(PORT, () =>
  console.log(`${process.env.APP_NAME} running on PORT ${PORT}`)
);
