import React from 'react';
import {Button, Icon, Pagination, Table, Tooltip, Popconfirm, Dropdown, Menu} from 'antd';
import UpdateModal from '../../course/components/UpdateModal';
import AddModal from '../../course/components/AddModal';
import request from "../../../../utils/request";

import styles from "./list.css";

import ShowPDFModal from '../../course/components/ShowPDFModal';
import PlayVideoModal from "../../../../components/PlayVideoModal";
import menu from "../../../admin/menu/models/menu";

export default class ListCourse extends React.Component {

  state = {
    addVisible: false,
    updateVisible: false,
    item:{},
    attachment:{},
    playVideoVisible: false,
    showPDFVisible: false,
    attachmentList: [],
  };

  render() {
    const {
      category,
      totalElements,
      addCourse,
      updateCourse,
      deleteCourse,
      setShowTest,
      handleAtta,
      ...listOpts
    } = this.props;

    const menus = (record) => {
      return (
        <Menu>
          <Menu.Item>视频：{record.videoId?<Tooltip placement="top" title="播放已上传的课程视频"><Button icon="play-circle" onClick={()=>handlePlayVideo(record)} type="dashed"/></Tooltip>:<span className="red">未传</span>}</Menu.Item>
          <Menu.Item>PPT：{record.pptId?<Tooltip placement="top" title="下载已上传的PPT课件"><Button icon="download" onClick={()=>handleShowPDF(record.pptId)}/></Tooltip>:<span className="red">未传</span>}</Menu.Item>
          <Menu.Item>学习单：{record.learnId?<Tooltip placement="top" title="查看已上传的学习单"><Button icon="eye" onClick={()=>handleShowPDF(record.learnId)}/></Tooltip>:<span className="red">未传</span>}</Menu.Item>
          <Menu.Item><Button icon="setting" type="link" onClick={()=>handleAtta(record)}>视频管理</Button></Menu.Item>
        </Menu>
      )
    };

    const columns = [{
      title: '封面',
      render: (text, record) => {
        return (
          <a key={record.id} href={record.imgUrl} target="_blank" rel="noopener noreferrer"><img src={record.imgUrl} alt={record.title} className={styles.avatarImg}/></a>
        )
      }
    }, {
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
      title: "附件",
      render: (record) => {
        return (
          <Dropdown overlay={menus(record)}>
            <Button>
              附件 <Icon type="down" />
            </Button>
          </Dropdown>
        );
      }
    }/*, {
      title: '视频',
      render:(record)=>{return (record.videoId?<Tooltip placement="top" title="播放已上传的课程视频"><Button icon="play-circle" onClick={()=>handlePlayVideo(record)} type="dashed"/></Tooltip>:<span className="red">未传</span>)}
    }, {
      title: 'PPT',
      render:(record)=>{return record.pptId?<Tooltip placement="top" title="下载已上传的PPT课件"><Button icon="download" onClick={()=>handleShowPDF(record.pptId)}/></Tooltip>:<span className="red">未传</span>}
    }, {
      title: '学习单',
      render:(record)=>{return record.learnId?<Tooltip placement="top" title="查看已上传的学习单"><Button icon="eye" onClick={()=>handleShowPDF(record.learnId)}/></Tooltip>:<span className="red">未传</span>}
    }*/, {
      title: '测试',
      render:(record)=>{return <Tooltip placement="top" title="是否显示给测试教师用户"><Button icon={record.showTest==="1"?"check":"close"} type={record.showTest==="1"?"primary":"default"} onClick={()=>setShowTest(record)}/></Tooltip>}
    }, {
      title: '操作',
      render: (text, record) => {
        return (
          <div>
          <Tooltip placement="top" title="修改课程">
          <Button type="default" icon="edit" onClick={()=>handleUpdate(record)}/>
          </Tooltip>
          <Tooltip placement="top" title="删除课程">
            <Popconfirm okType="danger" onConfirm={()=>deleteCourse(record)} title={`确定删除[${record.title}]？此操作不可逆！`}><Button type="default" icon="close"/></Popconfirm>
        </Tooltip>
          </div>
        );
      }
    }];

    const handlePlayVideo = (obj) => {
      request("attachmentService.loadOne", {id:obj.videoId}, true).then((res)=>{
        this.setState({attachment: res.obj, playVideoVisible: true})
      });

    };
    const handleShowPDF = (objId) => {
      request("attachmentService.loadOne", {id:objId}, true).then((res)=>{
        this.setState({attachment: res.obj, showPDFVisible: true})
      });
    };

    const handleUpdate = (record) => {
      // onUpdate(record);
      request("classCourseService.loadOne", {id:record.id}, true).then((res)=>{
        //console.log(res)
        this.setState({updateVisible: true, item: record, attachmentList: res.attaList});
      });
    };

    const handlePageChange = (pageNumber) => {
      onPageChange(pageNumber);
    };

    const pager = () => {
      return (
        <Pagination defaultPageSize={15} total={totalElements} onChange={handlePageChange}/>
      );
    };

    const handleAdd = () => {
      this.setState({addVisible: true})
    };

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
    };

    const updateOpts = {
      maskClosable: false,
      visible: this.state.updateVisible,
      title: `修改课程【${this.state.item.title}】`,
      item: this.state.item,
      attachmentList: this.state.attachmentList,
      onCancel:() => {
        this.setState({updateVisible: false})
      },
      onOk:(obj) => {
        addCourse(obj);
        this.setState({updateVisible: false})
      }
    };

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
    };

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
    };

    return (
      <div>
        <div className="listHeader">
          <h3><Icon type="bars"/> 科普课程管理<b>（{category.name}，{listOpts.dataSource.length}条数据）</b></h3>
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
