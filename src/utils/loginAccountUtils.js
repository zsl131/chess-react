import configApi from './configApi';

export function setLoginAccount(loginAccountStr) {
  localStorage.setItem(configApi.accountSessionName, loginAccountStr);
}

export function getLoginAccount() {
  return localStorage.getItem(configApi.accountSessionName);
}
