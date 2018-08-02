import request from '../../../../utils/request';

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
  return request("activityService.loadOne", query, true);
}

function addComment(comment) {
  return request("activityCommentService.add", comment, true);
}

export {
  list,
  loadOne,
  addComment,
}
