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

function deleteStudent(data) {
  return request("activityStudentService.deleteStudent", data, true);
}

export {
  list,
  onUpdatePayFlag,
  updateStatus,
  deleteStudent
}
