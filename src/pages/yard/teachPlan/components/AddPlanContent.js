import React from "react";
import {Form, Input, message, Modal, Radio, Tooltip} from "antd";
import {formItemLayout_large} from "@/utils/common";
import request from "../../../../utils/request";
import {getTeacherInfo} from "../../../../utils/authUtils";
import MyEditor from "../../../../components/Editor/MyEditor";

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
class AddPlanContent extends React.Component {

  state = {
    plan: {},
    canLoad: true,
    course:{},
    showEditor: false,
    canEditor: true,
  };

  render() {

    const {
      courseId,
      planId,
      onOk,
      form: {
        getFieldDecorator,
        setFieldsValue,
        validateFieldsAndScroll,
      },
      ...opts
    } = this.props;

    // console.log(this.state.plan)
    const {plan,showEditor,canEditor} = this.state;
    const teacher = getTeacherInfo();
    if(planId && planId>0 && this.state.canLoad) {
      request("teachPlanService.loadOne", {id: planId}, true).then((res)=> {
        //console.log(res);
        setDatas(res)
      })
    } else {
      if(canEditor) {
        this.setState({showEditor: true, canEditor: false})
      }
    }

    const setDatas = (obj) => {
      const plan = obj.obj;
      this.setState({plan: plan, canLoad: false, showEditor: true, canEditor: false});
      setFieldsValue(plan);

    };

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          values.courseId = courseId;
          values.teaId = teacher.id;
          //console.log(values)
          request("teachPlanService.addOrUpdatePlan", values, true).then((res)=> {
            // console.log(res)
            message.success(res.message);
            onOk(res.plan);
          });
        }
      });
    };

    const handleChangeContent = (html) => {
      // console.log("add===", html);
      setFieldsValue({"teachStep": html});
    };

    const modalOpts = {
      ...opts,
      onOk: handleOk
    };

    const editorMenu = [
      'head',
      'bold',
      'italic',
      'underline'
    ];

    return(
      <Modal {...modalOpts} style={{"minWidth":"80%", "top":"20px"}}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout_large} label="知识点名称">
            {getFieldDecorator('blockName', {rules: [{required: true, message: '此项不能为空'}]})(<Input placeholder="输入知识点名称" />)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="知识点导入">
              {getFieldDecorator('guide')(<TextArea placeholder="输入知识点导入" rows={2}>&nbsp;</TextArea>)}
          </FormItem>
          {showEditor?
            <FormItem {...formItemLayout_large} label="授课过程">
              {getFieldDecorator('teachStep', {rules: [{required: true, message: '此面不能为空'}]})(<MyEditor content={plan?plan.teachStep:""} placeholder="授课过程" menu={editorMenu} onChangeContent={handleChangeContent}/>)}
            </FormItem>:""}

          <FormItem {...formItemLayout_large} label="承上启下">
            {getFieldDecorator('nextTeach')(<TextArea placeholder="输入如何过渡到下一堂课" rows={3}>&nbsp;</TextArea>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddPlanContent;
