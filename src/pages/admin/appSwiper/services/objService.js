import request from '../../../../utils/request';

const baseService = "appSwiperService";

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

export {
  list,
  addOrUpdate,
  deleteObj,
  loadOne,
}
