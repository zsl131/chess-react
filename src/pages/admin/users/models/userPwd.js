import {updatePwd} from "../services/users";
import { message } from "antd";
import * as smsService from "../services/smsService";
import {getLoginUser, setLoginUserOnly} from "../../../../utils/authUtils";
export default {
  namespace: 'userPwd',
  state: {
    phone:null,
    canInputCode: false,
    code:null
  },
  reducers: {
    modifyState(state, { payload: options }) {
      return {...state, ...options};
    },
  },
  effects: {
    *updatePwd({ payload: values }, { call }) {
      const data = yield call(updatePwd, values);
      // console.log(data);
      if(data) {
        message.success(data.message);
      }
    },
    *sendCode({payload: phone}, {call,put}) {
      const data = yield call(smsService.sendCode, {phone});
      console.log(data);

      if(data) {
        message.success("验证码已发送到手机，请注意查收");
        yield put({type: 'modifyState', payload: {code: data.code, phone: data.phone, canInputCode: true}});
      }
    },
    *bindPhone({payload: phone}, {call}) {
      const data = yield call(smsService.bindPhone, {phone});
      if(data) {
        message.success(data.message);
        let loginUser = getLoginUser();
        loginUser.phone = phone;
        setLoginUserOnly(loginUser);
      }
    }
  },
  subscriptions: {

  }
}
