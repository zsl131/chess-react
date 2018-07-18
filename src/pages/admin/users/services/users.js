import request from '../../../../utils/request';

function remoteUserList(query) {
  // const valStr = JSON.stringify(values);
  // const params = {};
  if(query===null || query === undefined) {query = {}};
  query.page = query.page?query.page:0;
  query.size = query.size?query.size:15;
  console.log("service", JSON.stringify(query));
  // params.conditions.key
  return request("userService.listUser", JSON.stringify(query), true);
}

function remoteSaveUser(user) {
  // console.log("remoteSaveUser", user);
  user.isAdmin = (user.isAdmin && user.isAdmin !== undefined)?"1":"0";
  user.status = (user.status || user.status === undefined)?'1':'0';
  // console.log("remoteSaveUser", user);
  return request("userService.saveUser", JSON.stringify(user), true);
}

function remoteDelete(id) {
  return request("userService.deleteUser", JSON.stringify(id), true);
}

function loadOne(id) {
  return request("userService.loadOne", JSON.stringify(id), true);
}

function matchRole(id) {
  return request("userService.matchRole", JSON.stringify(id), true);
}

function authRole(obj) {
  return request("userService.authRole", JSON.stringify(obj), true);
}

function updatePwd(obj) {
  return request("userService.updatePwd", JSON.stringify(obj), true);
}

export {
  remoteUserList,
  remoteSaveUser,
  remoteDelete,
  loadOne,
  matchRole,
  authRole,
  updatePwd
}
