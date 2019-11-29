import request from '../../../../utils/request';

const baseService = "appRemarkService";
function loadOne() {
  return request(baseService+".loadOne", JSON.stringify({}), true);
}

function addOrUpdate(obj) {
  return request(baseService+".addOrUpdate", JSON.stringify(obj), true);
}

export {
  loadOne,
  addOrUpdate,
}
