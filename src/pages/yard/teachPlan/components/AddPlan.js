import React from "react";
import {Form, Input, message, Modal, Radio, Tooltip} from "antd";
import {formItemLayout_large} from "@/utils/common";
import request from "../../../../utils/request";
import {getTeacherInfo} from "../../../../utils/authUtils";

const FormItem = Form.Item;
const { TextArea } = Input;

@Form.create()
class AddPlan extends React.Component {

  state = {
    plan: {},
    canLoad: true,
    course:{},
  };

  render() {

    const {
      courseId,
      plan,
      onOk,
      form: {
        getFieldDecorator,
        setFieldsValue,
        validateFieldsAndScroll,
      },
      ...opts
    } = this.props;

    // console.log(this.state.plan)
    const teacher = getTeacherInfo();
    if(!plan && this.state.canLoad) {
      request("teachPlanService.queryPlan", {teaId: teacher.id, courseId: courseId}, true).then((res)=> {
        // console.log(res);
        setDatas(res)
      })
    }

    const setDatas = (obj) => {
      const plan = obj.plan;
      this.setState({plan: plan, canLoad: false, course: obj.course});
      setFieldsValue(plan);
    };

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        if(!errors) {
          values.courseId = courseId;
          values.teaId = teacher.id;
          request("teachPlanService.addOrUpdatePlan", values, true).then((res)=> {
            // console.log(res)
            message.success(res.message);
          });
          onOk(values);
        }
      });
    };

    const modalOpts = {
      ...opts,
      onOk: handleOk
    };

    return(
      <Modal {...modalOpts} style={{"minWidth":"80%", "top":"20px"}}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout_large} label="对应课程">
            <b className="blue"><span className="red">【{(this.state.plan && this.state.plan.id)?"已填写":"未填写"}】</span>{this.state.course.title}</b>
          </FormItem>
          <FormItem {...formItemLayout_large} label="知识点导入">
              {getFieldDecorator('guide', {rules: [{required: true, message: '此项不能为空'}]})(<TextArea placeholder="输入知识点导入" rows={3}>&nbsp;</TextArea>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="授课过程">
            {getFieldDecorator('teachStep', {rules: [{required: true, message: '此面不能为空'}]})(<TextArea placeholder="输入授课过程" rows={3}>&nbsp;</TextArea>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="承上启下">
            {getFieldDecorator('nextTeach', {rules: [{required: true, message: '此面不能为空'}]})(<TextArea placeholder="输入如何过渡到下一堂课" rows={3}>&nbsp;</TextArea>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddPlan;
