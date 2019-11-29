import request from '../../../../utils/request';

const baseService = "classSystemService";
const detailService = "classSystemDetailService";
function index(query) {
  return request(baseService+".index", JSON.stringify(query), true);
}

function addOrUpdateSystem(obj) {
  return request(baseService+".addOrUpdate", obj, true);
}

function addOrUpdateDetail(obj) {
  return request(detailService+".addOrUpdate", obj, true);
}

function deleteSystem(id) {
  return request(baseService+".deleteSystem", id, true);
}

function deleteSystemDetail(id) {
  return request(detailService+".deleteSystemDetail", id, true);
}

export {
  index,
  addOrUpdateSystem,
  addOrUpdateDetail,
  deleteSystem,
  deleteSystemDetail
}
