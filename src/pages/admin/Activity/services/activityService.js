import request from '../../../../utils/request';

function list(query) {
  return request("activityService.list", JSON.stringify(query), true);
}

function loadOne(id) {
  return request("activityService.loadOne", JSON.stringify(id), true);
}

function addOrUpdate(obj) {
  obj.status = (obj.status && obj.status !== undefined)?"1":"0";
  console.log("service:::", obj);
  return request("activityService.addOrUpdate", JSON.stringify(obj), true);
}

function deleteObj(id) {
  return request("activityService.delete", JSON.stringify(id), true);
}

function listDep() {
  const user = JSON.parse(sessionStorage.getItem("loginUser"));
  console.log("loginUser:::"+user);
  return request("activityService.listDep", JSON.stringify({ userId: user.id }), true);
}

export {
  list,
  loadOne,
  addOrUpdate,
  deleteObj,
  listDep,
}
