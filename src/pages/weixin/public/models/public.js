import * as publicService from '../services/publicService';

export default {
  namespace:'weixinPublic',
  state: {

  },
  subscriptions: {
    setup({history, dispatch}) {
      return history.listen((location)=> {
        if(location.pathname === '/weixin/public/loadLoginAccount') {
          dispatch({type:'loadLoginAccount', payload: location.query});
        }
      });
    }
  },
  reducers: {
    setLoginAccount(state, {payload: data}) {
      sessionStorage.setItem("loginAccount", JSON.stringify(data.loginAccount));
      window.location.href = data.url;
      return {...state};
    }
  },
  effects: {
    *loadLoginAccount({payload: query}, {call,put}) {
      console.log("loadLoginAccount", query);
      const data = yield call(publicService.queryLoginAccount, {code:query.code});
      yield put({type:'setLoginAccount', payload:{url:query.url, loginAccount: data.datas}});
    }
  }
}
