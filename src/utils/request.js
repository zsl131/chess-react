import fetch from 'dva/fetch';
import { message } from 'antd';
import configApi from './configApi';

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
    // const error = new Error(data.reason);
    // error.response = data;
    // throw error;
  } else {
    // console.log("checkDatas result:", data.result);
    return data.result;
  }
  //return data.result;
}

function catchError(error) {
  console.log(error);
  message.error("出现错误："+error, 6);
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

  const defaultOption = {
    method: 'GET',
    headers: {
      'auth-token': configApi.authToken,
      'api-code': apiCode
    }
  }
  // console.log("encode before", params);
  params = encodeURI(params);
  // console.log("encode after", params);
  return fetch(isBase?configApi.api.baseRequest+params : configApi.api.queryOrSubmit+params, options || defaultOption)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkDatas)
    // .then(data => ({ data }))
    // .catch(err => ({ err }));
    .catch(catchError);
}
