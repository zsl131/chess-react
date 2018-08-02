import fetch from 'dva/fetch';
import { message } from 'antd';
import configApi from './configApi';
import { toBase64 } from "./AesUtil";

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function checkDatas(data) {
  // console.log("checkDatas", data);
  if(data.errCode !== "0") {
    message.error(data.reason);
  } else {
    return data.result;
  }
}

function catchError(error) {
  //console.log("name: "+error.name, "message: "+error.message);
  if(error.message.search("Gateway Timeout")>=0) {
    message.error("服务端网络异常", 6);
  } else {
    message.error("出现错误：" + error.message, 6);
  }
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(apiCode, params, isBase, options) {

  // console.log("configApi", configApi);

  let defaultOption = {
    method: 'GET',
    headers: {
      'auth-token': configApi.authToken,
      'api-code': apiCode
    }
  }

  Object.assign(defaultOption, options || {});

  // console.log("option", defaultOption)

  const paramsType = Object.prototype.toString.call(params);

  // console.log("paramsType:::", paramsType);
  if(paramsType === '[object Object]') {
    // console.log("changeType:", params);
    params = JSON.stringify(params); //如果是对象则转换成字符串
    // console.log("After changeType:", params);
  }

  // console.log("encode before", params);
  params = encodeURI(params);
  // console.log("encode after", params);
  params = toBase64(params);
  // console.log("encode after aes", params);
  return fetch(isBase?configApi.api.baseRequest+params : configApi.api.queryOrSubmit+params, defaultOption)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkDatas)
    // .then(data => ({ data }))
    // .catch(err => ({ err }));
    .catch(catchError);
}
