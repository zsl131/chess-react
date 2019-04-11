import * as objService from '../services/objService';
import {message} from 'antd';
import {getLoginAccount2Obj, setLoginAccount} from "../../../../utils/loginAccountUtils";

export default {
  state: {
    code: '',
    phone: '',
    canInputCode: false,
  },
  reducers: {
    modifyState(state, {payload: options}) {
      return {...state, ...options};
    }
  },
  effects: {
    *loadCode({payload: phone}, {call, put}) {
      const data = yield call(objService.loadCode, {phone});
      console.log(data);
      if(data) {
        message.success("验证码已发送到手机，请注意查收");
        yield put({type: 'modifyState', payload: {code: data.code, phone: data.phone, canInputCode: true}});
      }
    },
    *bindPhone({payload: phone}, {call}) {
      const data = yield call(objService.bindPhoneByOpenid, {phone});
      if(data) {
        message.success(data.message);
        let loginAccount = getLoginAccount2Obj();
        loginAccount.bindPhone = "1";
        loginAccount.phone = phone;
        setLoginAccount(JSON.stringify(loginAccount));
      }
    },
    *queryAccountByOpenid({payload}, {call}) {
      const loginAccount = getLoginAccount2Obj();
      const openid = loginAccount.openid;
      const data = yield call(objService.queryAccountByOpenid, {openid:openid});
      if(data) {
        console.log(data.obj);
        setLoginAccount(JSON.stringify(data.obj));
        message.success("刷新成功");
      }
    },
  }
}
