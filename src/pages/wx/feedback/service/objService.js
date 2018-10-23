import request from "../../../../utils/request";

const feedbackService = "weixinFeedbackService";
function listFeedback(query) {
  query.size = 4;
  return request(feedbackService+".listFeedback", query, true);
}

function list(query) {
  return request(feedbackService+".list", query, true);
}

function reply(obj) {
  return request(feedbackService+".reply", obj, true);
}

export {
  listFeedback,
  list,
  reply,
}
