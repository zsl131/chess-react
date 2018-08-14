import request from '../../../../utils/request';

function list(query) {
  return new request("questionService.list",query,true);
}

function addOrUpdate(obj) {
  return new request("questionService.addOrUpdate",obj,true);
}

function deleteObj(id) {
  return new request("questionService.delete",id,true);
}
function loadOne(id) {
  return request("questionService.loadOne", id, true);
}
export {
  list,
  addOrUpdate,
  deleteObj,
  loadOne,
}
