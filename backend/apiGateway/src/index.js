const express = require("express");

const CoursesRouter = require("./routes/courses");
const MediaRouter = require("./routes/media");
const OrdersPaymentsRouter = require("./routes/orderPayments");
const UsersRouter = require("./routes/users");
const IndexRouter = require("./routes/index");
const RefreshTokenRouter = require("./routes/refreshToken");
const MentorsRouter = require("./routes/mentors");
const ChapterRouter = require("./routes/chapters");
const LessonRouter = require("./routes/lessons");
const MyCoursesRouter = require("./routes/myCourses");
const ImageCoursesRouter = require("./routes/imageCourses");
const ReviewsRouter = require("./routes/reviews");
const WebhookRouter = require("./routes/webhook");

const app = express();
const PORT = process.env.PORT || 4000;
const Middleware = require("./middlewares");

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

app.use(`${process.env.API_VERSION}/`, IndexRouter);
app.use(
  `${process.env.API_VERSION}/courses`,
  // Middleware.VerifyToken,
  CoursesRouter
);
app.use(
  `${process.env.API_VERSION}/media`,
  Middleware.VerifyToken,
  Middleware.Permission(["admin", "student"]),
  MediaRouter
);
app.use(
  `${process.env.API_VERSION}/orders`,
  Middleware.VerifyToken,
  Middleware.Permission(["admin", "student"]),
  OrdersPaymentsRouter
);
app.use(`${process.env.API_VERSION}/users`, UsersRouter);
app.use(`${process.env.API_VERSION}/refresh_token`, RefreshTokenRouter);
app.use(
  `${process.env.API_VERSION}/mentors`,
  Middleware.VerifyToken,
  Middleware.Permission(["admin"]),
  MentorsRouter
);
app.use(
  `${process.env.API_VERSION}/chapters`,
  Middleware.VerifyToken,
  Middleware.Permission(["admin"]),
  ChapterRouter
);

app.use(
  `${process.env.API_VERSION}/lessons`,
  Middleware.VerifyToken,
  Middleware.Permission(["admin"]),
  LessonRouter
);

app.use(
  `${process.env.API_VERSION}/my-courses`,
  Middleware.VerifyToken,
  Middleware.Permission(["admin", "student"]),
  MyCoursesRouter
);

app.use(
  `${process.env.API_VERSION}/image-courses`,
  Middleware.VerifyToken,
  Middleware.Permission(["admin"]),
  ImageCoursesRouter
);

app.use(
  `${process.env.API_VERSION}/reviews`,
  Middleware.VerifyToken,
  Middleware.Permission(["admin", "students"]),
  ReviewsRouter
);
app.use("/webhook", WebhookRouter);

app.listen(PORT, () =>
  console.log(`${process.env.APP_NAME} running on PORT ${PORT}`)
);
