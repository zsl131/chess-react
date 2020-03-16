import request from '../../../../utils/request';

const baseService = "classImageService";
function list(query) {
  return request(baseService+".listByTeacher", query, true);
}

export {
  list,
}
