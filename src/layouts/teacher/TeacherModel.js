import React from 'react';
import Helmet from 'react-helmet';
import configApi from "../../utils/configApi";
import router from 'umi/router';

export default class TeacherModel extends React.Component {

  handleBack = () => {
    router.go(-2);
  }
  handleLock=()=> {
    router.push("/login");
  }

  render() {
    return (
      <div>
        <Helmet><title>{configApi.appName} - 科普进校园</title></Helmet>
        {this.props.children}
      </div>
    );
  }

}
