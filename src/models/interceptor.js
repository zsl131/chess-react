import * as interceptorService from '../services/interceptorService';
const APP_CONFIG_SESSION_NAME = "appConfig";
const WX_CONFIG_SESSION_NAME = "wxConfig";
export default {
  namespace: 'interceptor',
  state: {
    appConfig:[],
    wxConfig:[],
  },
  reducers: {
    'cacheAppConfig'(state, { payload: data }) {
      //console.log("interceptor-test:", state, data);
      sessionStorage.setItem(APP_CONFIG_SESSION_NAME, JSON.stringify(data));
      return {...state, appConfig: data || []};
    },
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
    reloadPage(state, {payload}) {
      window.location.reload();
      return {...state};
    }
  },
  effects: {
    *init({ payload }, { put, call }) {
      const appConfig = sessionStorage.getItem(APP_CONFIG_SESSION_NAME);
      const wxConfig = sessionStorage.getItem(WX_CONFIG_SESSION_NAME);
      // console.log("appConfig::"+appConfig, "wxConfig:::"+wxConfig);
      if(appConfig === undefined || appConfig === null || appConfig === 'null' || wxConfig===wxConfig || wxConfig === null || wxConfig === 'null') {
        const data = yield call(interceptorService.loadWebBaseConfig);
        // console.log("initBase", data);
        // yield put({ type: 'cacheAppConfig', payload: data.datas });
        sessionStorage.setItem(APP_CONFIG_SESSION_NAME, data.datas.ac);
        sessionStorage.setItem(WX_CONFIG_SESSION_NAME, data.datas.wc);
        yield put({type: 'modifyState', payload: {appConfig: data.datas.ac, wxConfig: data.datas.wc}});
      }  else {
        // console.log("not null", JSON.parse(appConfig));
        // yield put({ type: 'cacheAppConfig', payload: JSON.parse(appConfig) });
        yield put({type: 'modifyState', payload: {appConfig: JSON.parse(appConfig), wxConfig: JSON.parse(wxConfig)}});
      }

      /*if(wxConfig === null || wxConfig === 'null') {
        const data = yield call(interceptorService.loadWxConfig);
        yield sessionStorage.setItem(WX_CONFIG_SESSION_NAME, JSON.stringify(data.datas));
        yield put({type: 'modifyState', payload: { wxConfig: data.datas }});
      } else {
        yield put({ type: 'modifyState', payload: { wxConfig: JSON.parse(wxConfig) } });
      }*/
    },
    *queryLoginAccount({ payload: code }, { call, put }) {
      const data = yield call(interceptorService.queryLoginAccount, { code: code });
      if(data) {
        yield sessionStorage.setItem("loginAccount", JSON.stringify(data.datas));
        yield put({type: 'reloadPage', payload:{}});
      }
    }
  },
  subscriptions: {
    setup({ history, dispatch }) {
      return dispatch({ type: 'init'})
    }
  }
}
