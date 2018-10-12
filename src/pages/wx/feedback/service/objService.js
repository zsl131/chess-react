import request from "../../../../utils/request";

const feedbackService = "weixinFeedbackService";
function listFeedback(query) {
  query.size = 4;
  return request(feedbackService+".listFeedback", query, true);
}

export {
  listFeedback,
}
