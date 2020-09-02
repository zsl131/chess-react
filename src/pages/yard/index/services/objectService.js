import request from "../../../../utils/request";

function index(query) {
  return request("yardIndexService.index", query, true);
}

export {
  index,
}
