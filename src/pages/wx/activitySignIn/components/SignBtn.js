import {Button} from 'antd-mobile';

const SignBtn = ({
  item, inline,onClick
                 }) => {
  return (
    <div>
      {item.status !== '1' && <span className='red'>未审核</span>}
      {item.status ==='1' && item.hasCheck==='1' && <span className="blue">已签到</span>}
      {item.status === '1' && item.hasCheck!=='1' && <Button type="primary" inline={inline} onClick={()=>onClick(item.id)}>签到</Button>}
    </div>
  );
}

export default SignBtn;
