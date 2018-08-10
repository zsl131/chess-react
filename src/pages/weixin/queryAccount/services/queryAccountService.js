import request from '../../../../utils/request';

function queryAccount(query) {
  return request("tempAccountService.queryAccount", query, true);
}

export {
  queryAccount
}
