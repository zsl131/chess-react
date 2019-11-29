import request from '../../../../utils/request';

const baseService = "gradeRoleService";

function list(query) {
  //console.log("list query :", query);
  return request(baseService+".list", query, true);
}

function addOrUpdate(obj) {
  return request(baseService+".addOrUpdate", obj, true);
}

function deleteObj(id) {
  return request(baseService+".delete", JSON.stringify(id), true);
}

function loadOne(id) {
  return request(baseService+".loadOne", id, true);
}

function querySystem(rid) {
  return request(baseService+".querySystem", rid, true);
}

function authSystem(obj) {
  return request(baseService+".authSystem", obj, true);
}

export {
  list,
  addOrUpdate,
  deleteObj,
  loadOne,
  querySystem,
  authSystem,
}
