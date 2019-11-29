import request from "../../../../utils/request";

const baseService = "qiniuConfigService";
function loadOne(query) {
  return request(baseService+".loadOne", query, true);
}

function save(obj) {
  return request(baseService+".save", obj, true);
}

export {
  loadOne,
  save,
}
