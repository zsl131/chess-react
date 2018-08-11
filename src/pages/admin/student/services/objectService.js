import request from '../../../../utils/request';

function list(query) {

  return request("studentService.list", query, true);
}

export {
  list,
}
