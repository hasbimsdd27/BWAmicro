const express = require("express");

const CoursesRouter = require("./routes/courses");
const MediaRouter = require("./routes/media");
const OrdersRouter = require("./routes/orders");
const PaymentsRouter = require("./routes/payments");
const UsersRouter = require("./routes/users");
const IndexRouter = require("./routes/index");
const RefreshTokenRouter = require("./routes/refreshToken");
const MentorsRouter = require("./routes/mentors");
const ChapterRouter = require("./routes/chapters");
const LessonRouter = require("./routes/lessons");
const MyCoursesRouter = require("./routes/myCourses");
const ImageCoursesRouter = require("./routes/imageCourses");

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
app.use(`${process.env.API_VERSION}/media`, MediaRouter);
app.use(`${process.env.API_VERSION}/orders`, OrdersRouter);
app.use(`${process.env.API_VERSION}/payments`, PaymentsRouter);
app.use(`${process.env.API_VERSION}/users`, UsersRouter);
app.use(`${process.env.API_VERSION}/refresh_token`, RefreshTokenRouter);
app.use(
  `${process.env.API_VERSION}/mentors`,
  Middleware.VerifyToken,
  MentorsRouter
);
app.use(
  `${process.env.API_VERSION}/chapters`,
  Middleware.VerifyToken,
  ChapterRouter
);

app.use(
  `${process.env.API_VERSION}/lessons`,
  Middleware.VerifyToken,
  LessonRouter
);

app.use(
  `${process.env.API_VERSION}/my-courses`,
  Middleware.VerifyToken,
  MyCoursesRouter
);

app.use(
  `${process.env.API_VERSION}/image-courses`,
  Middleware.VerifyToken,
  ImageCoursesRouter
);

app.listen(PORT, () =>
  console.log(`${process.env.APP_NAME} running on PORT ${PORT}`)
);
