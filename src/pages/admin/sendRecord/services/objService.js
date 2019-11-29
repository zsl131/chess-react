import request from '../../../../utils/request';

const service = "sendRecordService";
function list(query) {
  //console.log("list query :", query);
  return request(service+".list", query, true);
}

export {
  list,
}
