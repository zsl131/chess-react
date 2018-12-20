import React from 'react';
import {Button, Icon, Pagination, Table, Tooltip} from 'antd';
import UpdateModal from '../../course/components/UpdateModal';
import AddModal from '../../course/components/AddModal';
import request from "../../../../utils/request";

import ShowPDFModal from '../../course/components/ShowPDFModal';
import PlayVideoModal from "../../../../components/PlayVideoModal";

export default class ListCourse extends React.Component {

  state = {
    addVisible: false,
    updateVisible: false,
    item:{},
    attachment:{},
    playVideoVisible: false,
    showPDFVisible: false,
  }

  render() {
    const {
      category,
      totalElements,
      addCourse,
      updateCourse,
      ...listOpts
    } = this.props;

    const columns = [{
      title: '标题',
      // dataIndex: 'title'
      render:(record) =>{
        return (
          <div>
            <p>标题：{record.title}</p>
            <p>目标：{record.learnTarget}</p>
          </div>
        )
      }
    }, {
      title: '适合',
      render:(record) => {
        return(
          <p>
            {record.grade}
            {record.term?record.term+"学期":""}
            {record.age?record.age+"岁":''}
          </p>
        );
      }
    }, {
      title: '视频',
      render:(record)=>{return (record.videoId?<Tooltip placement="top" title="播放已上传的课程视频"><Button icon="play-circle" onClick={()=>handlePlayVideo(record)} type="dashed"/></Tooltip>:<span className="red">未传</span>)}
    }, {
      title: 'PPT',
      render:(record)=>{return record.pptId?<Tooltip placement="top" title="下载已上传的PPT课件"><Button icon="download" onClick={()=>handleShowPDF(record.pptId)}/></Tooltip>:<span className="red">未传</span>}
    }, {
      title: '学习单',
      render:(record)=>{return record.learnId?<Tooltip placement="top" title="查看已上传的学习单"><Button icon="eye" onClick={()=>handleShowPDF(record.learnId)}/></Tooltip>:<span className="red">未传</span>}
    }, {
      title: '操作',
      render: (text, record) => {
        return (
          <Tooltip placement="top" title="修改课程">
          <Button type="default" icon="edit" onClick={()=>handleUpdate(record)}/>
          </Tooltip>
        );
      }
    }];

    const handlePlayVideo = (obj) => {
      request("attachmentService.loadOne", {id:obj.videoId}, true).then((res)=>{
        this.setState({attachment: res.obj, playVideoVisible: true})
      });

    }
    const handleShowPDF = (objId) => {
      request("attachmentService.loadOne", {id:objId}, true).then((res)=>{
        this.setState({attachment: res.obj, showPDFVisible: true})
      });
    }

    const handleUpdate = (record) => {
      // onUpdate(record);
      this.setState({updateVisible: true, item: record})
    }

    const handlePageChange = (pageNumber) => {
      onPageChange(pageNumber);
    }

    const pager = () => {
      return (
        <Pagination defaultPageSize={15} total={totalElements} onChange={handlePageChange}/>
      );
    }

    const handleAdd = () => {
      this.setState({addVisible: true})
    }

    const addOpts = {
      maskClosable: false,
      visible: this.state.addVisible,
      title: `添加课程分类【${(category && category.name)?category.name:"根目录"}】`,
      cid: category.id,
      // pname: classCategory.pname,
      onCancel: () => {
        this.setState({addVisible: false});
      },
      onOk : (obj) => {
        // console.log(obj);
        addCourse(obj)
        this.setState({addVisible: false});
      }
    }

    const updateOpts = {
      maskClosable: false,
      visible: this.state.updateVisible,
      title: `修改课程【${this.state.item.title}】`,
      item: this.state.item,
      onCancel:() => {
        this.setState({updateVisible: false})
      },
      onOk:(obj) => {
        addCourse(obj);
        this.setState({updateVisible: false})
      }
    }

    const playVideoOpts = {
      maskClosable: false,
      visible: this.state.playVideoVisible,
      title: `播放视频`,
      okText:'关闭窗口',
      cancelText: '取消',
      video: this.state.attachment,
      onOk:()=> {
        this.setState({playVideoVisible: false})
      },
      onCancel: () => {
        this.setState({playVideoVisible: false})
      }
    }

    const showPDFOpts = {
      maskClosable: false,
      visible: this.state.showPDFVisible,
      title: `PDF预览`,
      okText:'关闭窗口',
      cancelText: '取消',
      pdf: this.state.attachment,
      onOk:()=> {
        this.setState({showPDFVisible: false})
      },
      onCancel: () => {
        this.setState({showPDFVisible: false})
      }
    }

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="bars"/> 科普分课程管理<b>（{category.name}，{listOpts.dataSource.length}条数据）</b></h3>
          <div className="listOperator">
            <Button type="primary" icon="plus" onClick={handleAdd}>添加科普课程</Button>
          </div>
        </div>
        <Table {...listOpts} columns={columns} pagination={false}/>
        {this.state.addVisible && <AddModal {...addOpts}/>}
        {this.state.updateVisible && <UpdateModal {...updateOpts}/>}
        {this.state.playVideoVisible && <PlayVideoModal {...playVideoOpts}/>}
        {this.state.showPDFVisible && <ShowPDFModal {...showPDFOpts}/>}
      </div>
    );
  }

}
