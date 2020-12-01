import request from '../../../../utils/request';

function list(query) {
  return request("activityStudentService.list", query, true);
}

function updateStatus(data) {
  return request("activityStudentService.updateStatus", data, true);
}

function onUpdatePayFlag(data) {
  return request("activityStudentService.updatePayFlag", data, true);
}

export {
  list,
  onUpdatePayFlag,
}
