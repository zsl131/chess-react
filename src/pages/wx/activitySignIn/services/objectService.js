import request from '../../../../utils/request';

function findRecord(query) {
  return request("activityStudentService.listRecordByOpenid", query, true);
}

function onSign(id) {
  return request("activityStudentService.sign", id, true);
}

function findRecordByPhone(query) {
  return request("activityStudentService.listRecordByPhone", query, true);
}

export {
  findRecord,
  onSign,
  findRecordByPhone,
}
