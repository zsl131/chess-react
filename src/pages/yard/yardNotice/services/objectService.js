import request from '../../../../utils/request';

const baseService = "yardNoticeService";
function list(query) {
  query.sort = "orderNo_a";
  // console.log(query);
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

export {
  list,
  addOrUpdate,
  loadOne,
  deleteObj
}
