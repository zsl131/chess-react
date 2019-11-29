import request from '../../../../utils/request';

function list(query) {
  query.sort = "orderNo_a";
  // console.log(query);
  return request("schoolDicService.list", query, true);
}

function addOrUpdate(obj) {
  return request("schoolDicService.addOrUpdate", obj, true);
}

function loadOne(id) {
  return request("schoolDicService.loadOne", id, true);
}

function deleteObj(id) {
  return request("schoolDicService.delete", id, true);
}

export {
  list,
  addOrUpdate,
  loadOne,
  deleteObj
}
