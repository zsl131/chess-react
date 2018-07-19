import request from "../../../../utils/request";

function list(query) {
  return request("departmentService.list", JSON.stringify(query), true);
}

function addOrUpdate(obj) {
  return request("departmentService.addOrUpdate", JSON.stringify(obj), true);
}

function deleteObj(id) {
  return request("departmentService.delete", JSON.stringify(id), true);
}

function loadOne(id) {
  return request("departmentService.loadOne", JSON.stringify(id), true)
}

export {
  list,
  addOrUpdate,
  deleteObj,
  loadOne,
}
