import request from '../utils/request';

export default function initBase() {
  //console.log("interceptor - initBase");
  return request("appConfigService.loadOne", JSON.stringify({}), true);
}
