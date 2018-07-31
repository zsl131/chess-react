import request from '../../../../utils/request';

function list(query) {
  query.sort = "orderNo_a";
  // console.log(query);
  return request("ageDicService.list", query, true);
}

function addOrUpdate(obj) {
  return request("ageDicService.addOrUpdate", obj, true);
}

function loadOne(id) {
  return request("ageDicService.loadOne", id, true);
}

function deleteObj(id) {
  return request("ageDicService.delete", id, true);
}

export {
  list,
  addOrUpdate,
  loadOne,
  deleteObj
}
