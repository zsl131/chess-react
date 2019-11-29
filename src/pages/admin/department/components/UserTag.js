import React from 'react';
import { Tag } from 'antd';

const { CheckableTag  } = Tag;

export default class UserTag extends React.Component {

  state = {
    objId: this.props.userid,
    checked: this.props.checked,
  }

  handleChange = (check) => {
    this.setState({ checked: check });
    this.props.onChange({objId : this.state.objId, checked: check});
  }

  render() {
    return (
      <CheckableTag {...this.props} checked={this.state.checked} onChange={this.handleChange}/>
    );
  }
}
