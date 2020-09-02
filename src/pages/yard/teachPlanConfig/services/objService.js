import request from '../../../../utils/request';

function loadOne() {
  return request("teachPlanConfigService.loadOne", JSON.stringify({}), true);
}

function save(obj) {
  return request("teachPlanConfigService.save", JSON.stringify(obj), true);
}

export {
  loadOne,
  save,
}
