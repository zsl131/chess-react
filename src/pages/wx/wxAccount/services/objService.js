import request from "../../../../utils/request";

const smsService = "smsService";
function loadCode(phone) {
  return request(smsService+".loadCode4WxBind", phone, true);
}

function bindPhoneByOpenid(phone) {
  return request(smsService+".bindPhoneByOpenid", phone, true)
}

export {
  loadCode,
  bindPhoneByOpenid,
}
