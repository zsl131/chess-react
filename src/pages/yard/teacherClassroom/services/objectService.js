import request from "../../../../utils/request";

function findOwn(query) {
  return request("teacherClassroomService.findOwn", query, true);
}

function addOrUpdate(obj) {
  return request("teacherClassroomService.addOrUpdate", obj, true);
}

export {
  findOwn,
  addOrUpdate,
}
