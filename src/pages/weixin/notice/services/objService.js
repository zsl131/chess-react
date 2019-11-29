import request from "../../../../utils/request";

const baseService = "noticeService";
const commentService = "noticeCommentService";
function loadOne(obj) {
  return request(baseService+".loadOne", obj, true);
}

function list(obj) {
  const conditions = {status : '1'};
  obj.conditions = conditions;
  obj.sort = "isTop_d,id_d";
  return request(baseService+".list", obj, true);
}

function addComment(obj) {
  return request(commentService+".add", obj, true);
}

function onGood(id) {
  return request(commentService+".onGood", id, true);
}

function listComment(obj) {
  return request(commentService+".list4Wx", obj, true)
}

export {
  loadOne,
  list,
  addComment,
  onGood,
  listComment,
}
