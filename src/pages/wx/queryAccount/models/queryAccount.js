import * as queryAccountService from '../services/queryAccountService';
import {setLoginAccount} from '../../../../utils/loginAccountUtils';

export default {
  state:{
    datas:''
  },
  reducers: {
    setAccount(state, {payload: data}) {
      // console.log(data);
      // localStorage.setItem(configApi.accountSessionName, data.message);
      setLoginAccount(data.message);
      // console.log("set session value");

      return {...state, datas: data.message};
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
