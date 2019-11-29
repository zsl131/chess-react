import request from "../../../../utils/request";

const baseService = "appVersionService";

function list(query) {
  return request(baseService+".list", query, true);
}

function addOrUpdate(obj) {
  return request(baseService+".addOrUpdate", obj, true);
}

function loadOne(obj) {
  return request(baseService+".loadOne", obj, true);
}

function updateField(obj) {
  return request(baseService+".updateField", obj, true);
}

export {
  list,
  addOrUpdate,
  loadOne,
  updateField,
}
