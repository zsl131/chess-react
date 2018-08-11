import {connect} from 'dva';

const QueryAccount = ({
  queryAccount
}) => {
  return (
    <div>{queryAccount.datas}</div>
  )
}

export default connect(({queryAccount}) => ({queryAccount}))(QueryAccount);
