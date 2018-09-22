import request from "../../../../utils/request";

const baseService = "noticeService";
const categoryService = "noticeCategoryService";

function list(query) {
  return request(baseService+".list", query, true);
}

function addOrUpdate(obj) {
  return request(baseService+".addOrUpdate", obj, true);
}

function updateProperty(obj) {
  return request(baseService+".updateField", obj, true);
}

//传ID
function loadOne(obj) {
  return request(baseService+".loadOne", obj, true);
}

//传ID
function deleteObj(obj) {
  return request(baseService+".delete", obj, true);
}

function listCategory(obj) {
  return request(categoryService+".list", obj, true);
}

function saveCategory(obj) {
  return request(categoryService+".addOrUpdate", obj, true);
}

function deleteCate(id) {
  return request(categoryService+".delete", id, true);
}

export {
  list,
  addOrUpdate,
  deleteObj,
  updateProperty,
  loadOne,
  listCategory,
  saveCategory,
  deleteCate,
}
