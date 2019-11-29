import request from '../../../../utils/request';
function root(query) {
  return request("weixinRootService.root", JSON.stringify(query), true);
}

export {
  root,
}
