const express = require("express");

const CoursesRouter = require("./routes/courses");
const MediaRouter = require("./routes/media");
const OrdersRouter = require("./routes/orders");
const PaymentsRouter = require("./routes/payments");
const UsersRouter = require("./routes/users");
const IndexRouter = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", IndexRouter);
app.use("/courses", CoursesRouter);
app.use("/media", MediaRouter);
app.use("/orders", OrdersRouter);
app.use("/payments", PaymentsRouter);
app.use("/users", UsersRouter);

app.listen(PORT, () => console.log(`API Gateway running on PORT`, PORT));
