const ServiceAdapter = require("../../serviceAdapter");
const { URL_SERVICE_COURSE, URL_API_GATEWAY } = process.env;

const api = ServiceAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const courses = await api.get("/api/courses", {
      params: {
        ...req.query,
        status: "published",
      },
    });
    const coursesData = courses.data;
    const firstPage = coursesData.data.first_page_url.split("?").pop();
    const lastPage = coursesData.data.first_page_url.split("?").pop();

    coursesData.data.first_page_url = `${URL_API_GATEWAY}/courses?${firstPage}`;
    coursesData.data.last_page_url = `${URL_API_GATEWAY}/courses?${lastPage}`;

    if (coursesData.data.next_page_url) {
      const nextPage = coursesData.data.next_page_url.split("?").pop();
      coursesData.data.next_page_url = `${URL_API_GATEWAY}/courses?${nextPage}`;
    }
    if (coursesData.data.prev_page_url) {
      const prevPage = coursesData.data.prev_page_url.split("?").pop();
      coursesData.data.prev_page_url = `${URL_API_GATEWAY}/courses?${prevPage}`;
    }

    coursesData.data.path = `${URL_API_GATEWAY}/courses`;

    return res.send(coursesData);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .send({ status: "error", message: "service unavailable" });
    }
    return res.status(error.response.status).send(error.response.data);
  }
};
