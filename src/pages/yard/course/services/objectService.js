import request from '../../../../utils/request';

const baseService = "classSystemService";
const detailService = "classSystemDetailService";
function index(query) {
  return request(baseService+".indexByTeacher", JSON.stringify(query), true);
}

function addOrUpdateSystem(obj) {
  return request(baseService+".addOrUpdate", obj, true);
}

function addOrUpdateDetail(obj) {
  return request(detailService+".addOrUpdate", obj, true);
}

export {
  index,
  addOrUpdateSystem,
  addOrUpdateDetail,
}
