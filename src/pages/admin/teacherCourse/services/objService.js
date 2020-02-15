import request from "../../../../utils/request";

const baseService = "appCourseService";
function listCourse(query) {
  return request(baseService+".listCourse", JSON.stringify(query), true);
}

function loadCourse(query) {
  return request(baseService+".loadCourse", JSON.stringify(query), true);
}

export {
  listCourse,
  loadCourse
}
