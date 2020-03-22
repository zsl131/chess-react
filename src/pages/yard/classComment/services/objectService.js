import request from '../../../../utils/request';

const baseService = "classCommentService";
function listAll(query) {
  return request(baseService+".listAll", query, true);
}

function listByTea(query) {
  return request(baseService+".listByTea", query, true);
}

function add(query) {
  return request(baseService+".add", query, true);
}

function reply(query) {
  return request(baseService+".reply", query, true);
}

function deleteObj(query) {
  return request(baseService+".delete", query, true);
}

export {
  listAll,
  reply,
  deleteObj,
  add,
  listByTea,
}
