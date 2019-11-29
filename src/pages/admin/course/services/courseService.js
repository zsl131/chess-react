import request from '../../../../utils/request';

function list(query) {
  return new request("courseService.list",query,true);
}

function addOrUpdate(obj) {
  return new request("courseService.addOrUpdate",obj,true);
}

function deleteObj(id) {
  return new request("courseService.delete",id,true);
}
function loadOne(id) {
  return new request("courseService.loadOne",id,true);
}

export {
  list,
  addOrUpdate,
  deleteObj,
  loadOne,
}
