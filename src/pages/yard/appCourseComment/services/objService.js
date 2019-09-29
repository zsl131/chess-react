import request from "../../../../utils/request";

const baseService = "appCourseCommentService";

function list(query) {
  return request(baseService+".list", query, true);
}

function reply(obj) {
  return request(baseService+".reply", obj, true);
}

function loadOne(obj) {
  return request(baseService+".loadOne", obj, true);
}

export {
  list,
  reply,
  loadOne,
}
