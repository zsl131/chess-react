import request from '../../../../utils/request';

function queryLoginAccount(code) {
  return request("wxAccountService.queryAccountByCode", code, true);
}

export {
  queryLoginAccount,
}
