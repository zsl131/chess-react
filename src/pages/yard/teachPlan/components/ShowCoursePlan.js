import React from "react";
import {Form, Modal, Tabs} from "antd";
import {formItemLayout_large} from "@/utils/common";
import request from "../../../../utils/request";
import {getTeacherInfo} from "../../../../utils/authUtils";

const FormItem = Form.Item;
const { TabPane } = Tabs;

@Form.create()
class ShowCoursePlan extends React.Component {

  state = {
    planList: [],
    curId: 0
  };

  render() {

    const {
      planList,
      curId,
      onOk,
      ...opts
    } = this.props;

    const handleOk = (e) => {
      e.preventDefault();
      onOk();
    };

    const modalOpts = {
      ...opts,
      onOk: handleOk,
    };

    return(
      <Modal {...modalOpts} style={{"minWidth":"80%", "top":"20px"}}>
        {
          (planList && planList.length>0) ?<Tabs defaultActiveKey={curId+""}>
            {planList.map((item)=> {
              return (
                <TabPane tab={item.blockName} key={item.id}>
                  <Form layout="horizontal">
                    {/*<FormItem {...formItemLayout_large} label="知识点名称">
                      <b>{item.blockName}</b>
                    </FormItem>*/}
                    <FormItem {...formItemLayout_large} label="知识点导入">
                      {item.guide?item.guide:<span className="red">未填写</span>}
                    </FormItem>
                    <FormItem {...formItemLayout_large} label="授课过程">
                      <span dangerouslySetInnerHTML={{__html: item.teachStep}}></span>
                    </FormItem>
                    <FormItem {...formItemLayout_large} label="承上启下">
                      {item.nextTeach?item.nextTeach:<span className="red">未填写</span>}
                    </FormItem>
                  </Form>
                </TabPane>
              )
            })}
          </Tabs>:"还没有写教案信息，赶紧去添加吧"
        }

      </Modal>
    );
  }
}

export default ShowCoursePlan;
