import React from 'react';
import {Modal, Button, Icon} from 'antd';
import PDF from 'react-pdf-js';

export default class ShowPDFModal extends React.Component {

  state = {};

  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }

  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }

  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }

  renderPagination = (page, pages) => {
    let previousButton = <Button className="previous" onClick={this.handlePrevious}><a href="#"><Icon type="left"/> 上一页</a></Button>;
    if (page === 1) {
      previousButton = <Button className="previous disabled"><a href="#"><Icon type="left"/> 上一页</a></Button>;
    }
    let nextButton = <Button className="next" onClick={this.handleNext}><a href="#">下一页 <Icon type="right"/></a></Button>;
    if (page === pages) {
      nextButton = <Button className="next disabled"><a href="#">下一页 <Icon type="right"/></a></Button>;
    }
    return (
      <nav style={{"textAlign":"right"}}>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
    );
  }

  render() {
    // console.log(this.props.pdf)
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    const pdf = this.props.pdf;
    return(
      <Modal {...this.props} style={{ "minWidth": '90%', top: "10px"}}>
        {
          pdf.fileType === '.pdf' ?
            <div>
              <PDF file={pdf.url} onDocumentComplete={this.onDocumentComplete}
                   page={this.state.page}/>
              {pagination}
            </div>:
            <div style={{"textAlign":"center"}}>
              <h2>非PDF文档不可预览</h2>
              <a href={'/api/download?filename='+pdf.url} target="_blank"><Button icon="download">点击下载【{pdf.fileName}】</Button></a>
            </div>
        }
      </Modal>
    );
  }
}
