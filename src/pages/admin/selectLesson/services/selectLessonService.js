import request from "../../../../utils/request";
function list(query){
  return request ("selectLessonService.list",JSON.stringify(query),true);
}
function addOrUpdate(obj){
  return request("selectLesson.addOrUpdate",JSON.stringify(obj),true);
}
function deleteObj(id) {
  return request("selectLesson.delete",JSON.stringify(id),true);
}
export {
  list,
  addOrUpdate,
  deleteObj
}
