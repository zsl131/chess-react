import {connect} from 'dva';

const QueryAccount = ({
  queryAccount
}) => {
  const ttt = localStorage.getItem("wxLoginAccount");
  console.log("ttt", ttt);
  return (
    <div>{queryAccount.datas}</div>
  )
}

export default connect(({queryAccount}) => ({queryAccount}))(QueryAccount);
