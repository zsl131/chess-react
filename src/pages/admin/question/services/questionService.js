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

function addOrUpdateAnswer(obj) {
  return new request("answerService.addOrUpdate",obj,true);
}

function show(id) {
  return new request("questionService.show",id,true);
}
function showw(id) {
  return new request("questionService.showw",id,true);
}
function showww(id) {
  return new request("questionService.showww",id,true);
}
function showwww(id) {
  return new request("questionService.showwww",id,true);
}
function loadOne(id) {
  return request("questionService.loadOne", id, true);
}
export {
  list,
  addOrUpdate,
  deleteObj,
  addOrUpdateAnswer,
  show,
  showw,
  showww,
  showwww,
  loadOne,
}
