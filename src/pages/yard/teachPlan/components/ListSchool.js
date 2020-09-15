import React from "react";
import {Button, Dropdown, Empty, Form, Icon, Menu, message, Modal, Popconfirm, Table, Tooltip} from "antd";
// import { DragableBodyRow } from '@/components/common/DragTable';
import {buildSortObj} from "@/utils/common";
import request from "../../../../utils/request";
import {getTeacherInfo} from "../../../../utils/authUtils";
import AddPlanContent from "./AddPlanContent";

import HTML5Backend from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import {DragableBodyRow} from "../../../../components/common/DragTable";
import ShowPlan from "./ShowPlan";


class ListSchool extends React.Component {

  state = {
  };

  render() {

    const {
      schoolList,
      onClick,
    } = this.props;

    return(
      <div style={{"padding":"12px"}}>
        <h3>请点击下面学校查看：</h3>
        {schoolList.map((item)=> {
          return (
            <span key={item.id} style={{"padding":"5px 10px"}}><Button type="default" onClick={()=>onClick(item)}>{item.name}</Button></span>
          )
        })}
      </div>
    );
  }
}

export default ListSchool;
