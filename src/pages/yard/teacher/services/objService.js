import request from "../../../../utils/request";

const baseService = "teacherService";
const school = "schoolService";

function list(query) {
  return request(baseService+".list", query, true);
}

function addOrUpdate(obj) {
  return request(baseService+".addOrUpdate", obj, true);
}

function listSchool(query) {
  return request(school+".listNoPage", query, true);
}

//传ID
function loadOne(obj) {
  return request(baseService+".loadOne", obj, true);
}

//传ID
function deleteObj(obj) {
  return request(baseService+".delete", obj, true);
}

function queryCountTree(obj) {
  return request("videoRecordService.queryCountTree", obj, true);
}

function saveCount(obj) {
  return request("teacherVideoCountService.updateCount", obj, true);
}

function queryGradeRole(obj) {
  return request(baseService+ ".queryGradeRole", obj, true);
}

function authRole(obj) {
  return request(baseService + ".authRole", obj, true);
}

export {
  list,
  addOrUpdate,
  queryGradeRole,
  authRole,
  listSchool,
  deleteObj,
  loadOne,
  queryCountTree,
  saveCount,
}
