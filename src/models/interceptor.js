import initBase from '../services/interceptorService';
const APP_CONFIG_SESSION_NAME = "appConfig";
export default {
  namespace: 'interceptor',
  state: {
    appObj:[]
  },
  reducers: {
    'cacheAppConfig'(state, { payload: data }) {
      //console.log("interceptor-test:", state, data);
      localStorage.setItem(APP_CONFIG_SESSION_NAME, JSON.stringify(data));
      return {...state, appObj: data || []};
    }
  },
  effects: {
    *init({ payload }, { put, call }) {
      const appConfig = localStorage.getItem(APP_CONFIG_SESSION_NAME);
      //console.log("init", appConfig);
      if(appConfig === null || appConfig === 'null') {
        const data = yield call(initBase);
        //console.log("initBase", data);
        yield put({ type: 'cacheAppConfig', payload: data.datas });
      }  else {
        //console.log("not null", JSON.parse(appConfig));
        yield put({ type: 'cacheAppConfig', payload: JSON.parse(appConfig) });
      }
    },
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return dispatch({ type: 'init', payload: 'abcfs123' })
    }
  }
}
