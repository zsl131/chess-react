import request from '../../../../utils/request';

function listRoot() {
  return request("menuService.listRoot", JSON.stringify({}), true);
}

function listChildren(pid) {
  return request("menuService.listChildren", JSON.stringify(pid), true);
}

function update(obj) {
  return request("menuService.update", JSON.stringify(obj), true);
}

export {
  listRoot,
  listChildren,
  update,
}
