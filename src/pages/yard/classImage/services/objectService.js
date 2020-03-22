import request from '../../../../utils/request';

const baseService = "classImageService";
function list(query) {
  return request(baseService+".list", query, true);
}

function reply(query) {
  return request(baseService+".reply", query, true);
}

export {
  list,
  reply,
}
