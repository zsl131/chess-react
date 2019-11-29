import React from 'react';
import request from "../utils/request";
import {Button, message} from "antd";
import AddCourseTag from "./AddCourseTag";

export default class CourseTag extends React.Component {

  state = {
    cid: 0,
    allTags:[], //所有的标签
    tids:[], //已有的标签
    addVisible: false,
  };

  componentDidMount() {

    let cid = this.props.cid;
    const that = this;
    request("classCourseTagService.loadTags", {cid: cid}, true).then((res) => {
      that.setState({allTags: res.allTags, tids: res.tids});
    });
  }

  render() {

    const setTag = (tid) => {
      //console.log(tid);
      let tids = this.state.tids;
      const cid = this.props.cid;
      const that = this;
      request("classCourseTagService.setTag", {cid: cid, tid: tid}, true).then((res) => {
        if(!tids.includes(tid)) {tids.push(tid);}
        else {tids.splice(tids.findIndex(item => item === tid), 1)}
        that.setState({tids: tids});
        message.success("设置成功");
      });
    }

    const Btns = () => {
      const allTags = this.state.allTags;
      const tids = this.state.tids;
      return (
      allTags.map((item)=> {
        return <span key={item.id}><Button onClick={()=>setTag(item.id)} type={tids.includes(item.id)?"primary":"default"}>{item.name}</Button>&nbsp;&nbsp;</span>
      })
      )
    }

    const onAddTag = () => {
      this.setState({addVisible: true});
    };

    const addOpts = {
      visible: this.state.addVisible,
      maskClosable: false,
      onOk: (obj) => {
        //console.log(obj);
        const that = this;
        let allTags = this.state.allTags;
        request("classCourseTagService.loadTag", obj, true).then((res) => {
          const tag = res.tag;
          let exists = false;
          allTags.map((item)=>{if(item.id===tag.id) exists = true;});
          if(!exists) {allTags.push(tag); that.setState({allTags: allTags}); message.success("新增成功");}
          that.setState({addVisible: false});
        });
      },
      onCancel: () => {
        this.setState({addVisible: false})
      }
    }

    return (
      <div>
        <Btns/>
        <Button shape="circle" icon="plus" onClick={()=>onAddTag()}/>
        {this.state.addVisible && <AddCourseTag {...addOpts}/>}
      </div>
    )
  }
}
