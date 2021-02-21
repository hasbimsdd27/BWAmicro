const ServiceAdapter = require("../../serviceAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = ServiceAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const userId = req.user.data.id;
    const courseId = req.body.course_id;

    const myCourse = await api.post("/api/my-courses", {
      user_id: userId,
      course_id: courseId,
    });
    return res.send(myCourse.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .send({ status: "error", message: "service unavailable" });
    }
    return res.status(error.response.status).send(error.response.data);
  }
};
