import request from '../../../../utils/request';

const baseService = "moduleService";
function list(query) {
  return request(baseService+".list", query, true);
}

function addOrUpdate(obj) {
  return request(baseService+".addOrUpdate", obj, true);
}

function loadOne(id) {
  return request(baseService+".loadOne", id, true);
}

function deleteObj(id) {
  return request(baseService+".delete", id, true);
}

function reSubmit(id) {
  return request(baseService+".send", id, true);
}

function synch(query) {
  return request(baseService+".synch", query, true);
}

export {
  list,
  addOrUpdate,
  loadOne,
  deleteObj,
  reSubmit,
  synch,
}
