import request from '../../../../utils/request';

function list(query) {
  return request("studentService.list", query, true);
}

function addStudent(obj) {
  return request("studentService.addStudentOnly", obj, true);
}

function deleteObj(id) {
  console.log(id);
  return request("studentService.deleteObj", id, true);
}

function updateObj(obj) {
  return request("studentService.updateObj", obj, true);
}

function loadObj(id) {
  return request("studentService.loadObj", id, true);
}

export {
  list,
  addStudent,
  deleteObj,
  updateObj,
  loadObj,
}
