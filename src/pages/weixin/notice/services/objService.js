import request from "../../../../utils/request";

const baseService = "noticeService";
function loadOne(obj) {
  return request(baseService+".loadOne", obj, true);
}

function list(obj) {
  const conditions = {status : '1'};
  obj.conditions = conditions;
  obj.sort="id_d";
  return request(baseService+".list", obj, true);
}

export {
  loadOne,
  list,
}
