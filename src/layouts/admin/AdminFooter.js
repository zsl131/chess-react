import React from 'react';

export default class AdminFooter extends React.Component {
  render() {
    return (
      <div style={{"textAlign": "center"}}>
        <p dangerouslySetInnerHTML={{__html: this.props.message}}></p>
        <p>技术支持：奇思教育</p>
        <p>监管部门：昭通市科协、昭通市教体局</p>
      </div>
    );
  }
}

AdminFooter.defaultProps = {
  message: '&copy; 2020-2023 Created By zsl'
}
