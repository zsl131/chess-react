import request from '../../../../utils/request';

const baseService = "classImageService";
function list(query) {
  return request(baseService+".list", query, true);
}

export {
  list,
}
