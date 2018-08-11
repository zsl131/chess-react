import { remoteCheckLogin } from '../services/login';
import router from 'umi/router';
import {checkLogin, setLoginUser} from '../../../utils/authUtils';

export default {
  namespace: 'login',
  state:{},
  reducers: {
    'cacheLogin'(state, { payload: datas }) {
      /*const loginUser = datas.obj.user;
      const navMenus = datas.obj.navMenus;
      const authMenus = datas.obj.authMenus;
      sessionStorage.setItem("loginUser", JSON.stringify(loginUser));
      sessionStorage.setItem("navMenus", JSON.stringify(navMenus));
      sessionStorage.setItem("authMenus", JSON.stringify(authMenus));*/
      setLoginUser(datas.obj);

      router.push("/admin/index");
    }
  },
  effects: {
    *login({ payload: values }, { put, call }) {
      const data = yield call(remoteCheckLogin, values);
      // console.log("login", data);

      if(data) {
        /*const loginUser = data.obj.user;
        const navMenus = data.obj.navMenus;
        const authMenus = data.obj.authMenus;
        sessionStorage.setItem("loginUser", JSON.stringify(loginUser));
        sessionStorage.setItem("navMenus", JSON.stringify(navMenus));
        sessionStorage.setItem("authMenus", JSON.stringify(authMenus));*/

        setLoginUser(data.obj);

        router.push("/admin/index");
      }
    }
  },
  subscriptions: {
    setup({history}) {
      return history.listen((location) => {
        if(location.pathname === "/login") {
          if(checkLogin()) {
            router.push("/admin/index");
          }
        }
      });
    }
  }
}
