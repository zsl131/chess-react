import request from '../../../../utils/request';

function list(query) {
  return request("contactsService.list",query,true);
}

function addOrUpdate(obj) {
  return request("contactsService.addOrUpdate",obj,true);
}

function loadOne(id) {
  return request("contactsService.loadOne",id,true);
}

function deleteObj(id) {
  return request("contactsService.delete",id,true);
}

export {
  loadOne,
  list,
  deleteObj,
  addOrUpdate,
}
