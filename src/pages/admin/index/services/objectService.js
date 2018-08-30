import request from "../../../../utils/request";

function findNoConfigTemplateMessage(query) {
  return request("templateMessageRelationService.noConfig", query, true);
}

export {
  findNoConfigTemplateMessage,
}
