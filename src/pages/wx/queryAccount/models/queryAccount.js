import * as queryAccountService from '../services/queryAccountService';

export default {
  state:{
    datas:''
  },
  reducers: {
    setAccount(state, {payload: data}) {
      localStorage.setItem("wxLoginAccount", data.datas);
      console.log("set session value");
      sessionStorage.setItem("abcSession", "this is abc session");

      return {...state, datas: data.datas};
    }
  },
  effects: {
    *queryAccount({payload: query}, {call,put}) {
      const data = yield call(queryAccountService.queryAccount, query);
      yield put({type: 'setAccount', payload: data});
    }
  },
  subscriptions: {
    setup({history,dispatch}) {
      return history.listen((location) => {
        if(location.pathname === '/wx/queryAccount') {
          dispatch({type:'queryAccount', payload: location.query});
        }
      });
    }
  }
}
