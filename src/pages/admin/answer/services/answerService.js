import request from '../../../../utils/request';

function addOrUpdate(obj) {
  return new request("answerService.addOrUpdate",obj,true);
}

function list(query) {
  return new request("answerService.list",query,true);
}
function deleteObj(obj) {
  return new request("answerService.delete",obj,true);
}

export {
  addOrUpdate,
  list,
  deleteObj,
}
