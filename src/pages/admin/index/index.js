import React from 'react';
import { connect } from 'dva';
import {Alert, Button} from 'antd';
import {Link} from 'react-router-dom';
import styles from './index.css';

const Index = ({
  loading,
 adminIndex
}) => {

  // console.log(adminIndex);

  const isTeacher = sessionStorage.getItem("isTeacher");
  const systemList = JSON.parse(sessionStorage.getItem("systemList"));
  console.log(isTeacher)

  const alertMessage = ()=> {
    return (
      <div className={styles.panel}><p>有<b> {adminIndex.noConfigTemplateMessage.length} </b>条模板消息需要配置：</p>
        {adminIndex.noConfigTemplateMessage.map((item, index)=> (<p className={styles.contentP} key={index}>{item.name}：{item.rules}</p>))}
        <p><Link to="/admin/templateMessageRelation"><Button type="primary" icon="setting">前去配置</Button></Link></p>
      </div>
    );
  };

  const scoreMessage = () => {
    return (
      <div className={styles.panel}>
        <p>有<b> {adminIndex.noConfigScore.length} </b>条积分规则需要配置：</p>
        {adminIndex.noConfigScore.map((item, index)=> (<Button type="dashed" className={styles.scoreBtn} key={index}>{item}</Button>))}
        <p><Link to="/admin/scoreRule"><Button type="primary" icon="setting">前去配置</Button></Link></p>
      </div>
    );
  };

  // console.log(alertMessage());

  return (
    <div style={{"padding":"15px"}} >
      <h2>· 后台首页</h2>

      {
        (isTeacher && systemList)?
          <div className={styles.adminContainer}>
            {
              systemList.map((item)=> {
                return (
                  <span className={styles.singleBtn}><Button type="primary"><Link to={'/admin/teacherCourse?gid='+item.id}>{item.name}</Link></Button></span>
                )
              })
            }
            <span className={styles.singleBtn}><Button type="primary"><Link to={'/yard/teacherClassImage'}>影像管理</Link></Button></span>
          </div>:
          <div>
            {adminIndex.noConfigTemplateMessage && <div className="auth" sn="/admin/templateMessageRelation"><Alert className={styles.singleAlert} type="error" message={alertMessage()} showIcon /></div>}
            {adminIndex.noConfigScore && <div className="auth" sn="/admin/scoreRule"><Alert className={styles.singleAlert} type="error" message={scoreMessage()} showIcon /></div>}
          </div>
      }
    </div>
  );
}

export default connect(({ loading, adminIndex }) => ({ loading, adminIndex }))(Index);
