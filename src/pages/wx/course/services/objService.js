import request from '../../../../utils/request';

function listOwn(query) {
  return request("classSystemService.listByWxTeacher", query, true);
}

function loadDetail(query) {
  return request("classSystemService.loadDetailByWxTeacher", query, true);
}

export {
  listOwn,
  loadDetail,
}
