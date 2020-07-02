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

function setShowTest(obj) {
  return request(courseService+".setShowTest", obj, true);
}

function deleteCategory(id) {
  return request(cateService+".delete", id, true);
}

function deleteCourse(id) {
  return request(courseService+".delete", id, true);
}

function loadOne(id) {
  return request(courseService+".loadOne", id, true);
}


export {
  index,
  addCategory,
  updateCategory,
  addOrUpdateCourse,
  setShowTest,
  deleteCategory,
  deleteCourse,
  loadOne,
}
