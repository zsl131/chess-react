import { remoteCheckLogin } from '../services/login';
import router from 'umi/router';

export default {
  namespace: 'login',
  state:{},
  reducers: {
    'cacheLogin'(state, { payload: datas }) {
      const loginUser = datas.datas.user;
      const navMenus = datas.datas.navMenus;
      const authMenus = datas.datas.authMenus;
      sessionStorage.setItem("loginUser", JSON.stringify(loginUser));
      sessionStorage.setItem("navMenus", JSON.stringify(navMenus));
      sessionStorage.setItem("authMenus", JSON.stringify(authMenus));

      router.push("/admin/index");
    }
  },
  effects: {
    *login({ payload: values }, { put, call }) {
      // console.log("loginModel", payload);
      const data = yield call(remoteCheckLogin, values);
      console.log("login", data);
      // yield put({ type: 'cacheLogin', payload: data });

      const loginUser = data.datas.user;
      const navMenus = data.datas.navMenus;
      const authMenus = data.datas.authMenus;
      sessionStorage.setItem("loginUser", JSON.stringify(loginUser));
      sessionStorage.setItem("navMenus", JSON.stringify(navMenus));
      sessionStorage.setItem("authMenus", JSON.stringify(authMenus));

      router.push("/admin/index");

      // const data = yield call(remoteCheckLogin, {values});
    }
  }
}
