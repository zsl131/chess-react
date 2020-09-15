import request from "../../../../utils/request";

const baseService = "teachPlanService";

function list(query) {
  return request(baseService+".list", query, true);
}

//传ID
function loadOne(obj) {
  return request(baseService+".loadOne", obj, true);
}

function listByCourse(obj) {
  return request(baseService+".listByCourse", obj, true);
}

function listPlan4Manger(obj) {
  return request(baseService+".listPlan4Manger", obj, true);
}

export {
  list,
  loadOne,
  listByCourse,
  listPlan4Manger
}
