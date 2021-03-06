import request from '../../../../utils/request';
import {getOpenid} from '../../../../utils/loginAccountUtils';

function list(query) {
  const con = {"status": "1"};
  if(!query.conditions) {query.conditions={}}
  Object.assign(query.conditions, con);
  // query.conditions = con; //只获取状态为1的
  query.sort = "createTime_d";
  // console.log(query);
  return request("activityService.list", query, true);
}

function loadOne(query) {
  query.openid = getOpenid();
  return request("activityService.loadOne4Wx", query, true);
}

function addComment(comment) {
  return request("activityCommentService.add", comment, true);
}

function onGood(id) {
  return request("activityService.onGood", id, true);
}

function onCommentGood(id) {
  return request("activityCommentService.onGood", id, true);
}

function listComment(param) {
  return request("activityCommentService.list4Wx", param, true);
}

function listOwn(query) {
  return request("activityStudentService.listOwn", query, true);
}

function deleteApply(query) {
  return request("studentService.deleteApply", query, true);
}

export {
  list,
  loadOne,
  addComment,
  onGood,
  onCommentGood,
  listComment,
  listOwn,
  deleteApply,
}
