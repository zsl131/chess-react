import request from '../../../../utils/request';

function list(query) {
  return request("activityService.list", JSON.stringify(query), true);
}

function loadOne(id) {
  return request("activityService.loadOne", JSON.stringify(id), true);
}

function addOrUpdate(obj) {
  obj.status = (obj.status && obj.status !== undefined)?"1":"0";
  // console.log("service:::", obj);
  return request("activityService.addOrUpdate", JSON.stringify(obj), true, {method: "POST"});
}

function deleteObj(id) {
  return request("activityService.delete", JSON.stringify(id), true);
}

function listDep() {
  const user = JSON.parse(sessionStorage.getItem("loginUser"));
  // console.log("loginUser:::"+user);
  return request("activityService.listDep", JSON.stringify({ userId: user.id }), true);
}

function listRecord(query) {
  return request("activityRecordService.listRecord", query, true);
}

function addOrUpdateRecord(obj) {
  return request("activityRecordService.addOrUpdate", obj, true);
}

function deleteRecord(id) {
  return request("activityRecordService.deleteObj", id, true);
}

function loadOneRecord(id) {
  return request("activityRecordService.loadOne", id, true);
}

function loadImage(id) {
  return request("activityRecordImageService.listByRecordId", id, true);
}

function deleteImage(id) {
  return request("activityRecordImageService.deleteImage", id, true);
}

export {
  list,
  loadOne,
  addOrUpdate,
  deleteObj,
  listDep,
  listRecord,
  addOrUpdateRecord,
  deleteRecord,
  loadOneRecord,
  loadImage,
  deleteImage,
}
