import request from '../../../../utils/request';

const baseService = "classCategoryService";

function listRoot(query) {
  return request(baseService+".listRoot", JSON.stringify(query), true);
}

function listChildren(pid) {
  return request(baseService+".listChildren", JSON.stringify(pid), true);
}

function update(obj) {
  return request(baseService+".update", JSON.stringify(obj), true);
}

function deleteObj(id) {
  return request(baseService+".delete", JSON.stringify(id), true);
}

function add(obj) {
  return request(baseService+".add", obj, true);
}

export {
  listRoot,
  listChildren,
  update,
  deleteObj,
  add,
}
