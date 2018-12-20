import request from '../../../../utils/request';

const baseService = "classCourseNewService";
const cateService = "classCategoryService";
const courseService = "classCourseService";
function index(query) {
  return request(baseService+".index", JSON.stringify(query), true);
}

function addCategory(obj) {
  return request(cateService+".add", obj, true);
}

function updateCategory(obj) {
  return request(cateService+".update", obj, true);
}

function addOrUpdateCourse(obj){
  return request(courseService+".addOrUpdate", obj, true);
}

export {
  index,
  addCategory,
  updateCategory,
  addOrUpdateCourse,
}
