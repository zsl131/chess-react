import request from '../../../../utils/request';

function list(query) {
  return request("activityCommentService.list", query, true);
}

function update(comment) {
  return request("activityCommentService.update", comment, true);
}

function updateStatus(obj) {
  return request("activityCommentService.updateStatus", obj, true);
}

function deleteObj(id) {
  return request("activityCommentService.delete", id, true);
}

function loadOne(id) {
  return request("activityCommentService.loadOne", id, true);
}

export {
  list,
  update,
  updateStatus,
  deleteObj,
  loadOne,
}
