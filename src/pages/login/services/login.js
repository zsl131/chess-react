import request from '../../../utils/request';

export function remoteCheckLogin(values) {
  const valStr = JSON.stringify(values);
  // console.log("login--->service:::", values);
  return request("userService.login", valStr, true);
  // console.log("loginService",values, valStr);
}
