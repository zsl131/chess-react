import request from '../../../../utils/request';
import {getOpenid} from '../../../../utils/loginAccountUtils';

function loadActivityRecord(query) {
  query.openid = getOpenid();
  return request("studentService.loadActivityRecord", query, true);
}

function addStudent(student) {
  student.openid = getOpenid();
  return request("studentService.addStudent", student, true);
}

function addStudentOnly(student) {
  student.openid = getOpenid();
  return request("studentService.addStudentOnly", student, true);
}

function deleteApply(query) {
  query.openid = getOpenid();
  return request("studentService.deleteApply", query, true);
}

function deleteBatch(objIds) {
  objIds.openid = getOpenid();
  console.log(objIds);
}

function applyBatch(objIds) {
  objIds.openid = getOpenid();
  console.log(objIds);
}

export {
  loadActivityRecord,
  addStudent,
  addStudentOnly,
  deleteApply,
  deleteBatch,
}
