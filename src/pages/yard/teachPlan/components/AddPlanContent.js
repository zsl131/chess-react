import React from "react";
import {Form, Input, message, Modal, Radio, Tooltip} from "antd";
import {formItemLayout_large} from "@/utils/common";
import request from "../../../../utils/request";
import {getTeacherInfo} from "../../../../utils/authUtils";
import MyEditor from "../../../../components/Editor/MyEditor";

const FormItem = Form.Item;
const { TextArea } = Input;

const theName = "blockName";
const theImport = "importCon";
const theStep = "theStepCon";
const theNext = "theNextCon";

@Form.create()
class AddPlanContent extends React.Component {

  state = {
    plan: {},
    canLoad: true,
    course:{},
    showEditor: false,
    canEditor: true,
    sessionStep: ''
  };

  checkValues() {
    const {setFieldsValue} = this.props.form;
    const name = sessionStorage.getItem(theName);
    if(name) {
      setFieldsValue({blockName: name});
    }

    const theImportCon = sessionStorage.getItem(theImport);
    if(theImportCon) {
      setFieldsValue({guide: theImportCon});
    }

    const theStepCon = sessionStorage.getItem(theStep);
    //console.log(theStepCon)
    if(theStepCon) {
      // setFieldsValue({teachStep: theStepCon});
      this.setState({sessionStep: theStepCon});
    }

    const theNextCon = sessionStorage.getItem(theNext);
    if(theNextCon) {
      setFieldsValue({nextTeach: theNextCon});
    }
  };

  componentDidMount() {
    this.checkValues();
  }

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
    const {plan,showEditor,canEditor, sessionStep} = this.state;
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

            cleanSession();
          });
        }
      });
    };

    const cleanSession = () => {
      sessionStorage.removeItem(theNext);
      sessionStorage.removeItem(theName);
      sessionStorage.removeItem(theImport);
      sessionStorage.removeItem(theStep);
    };

   const handleChangeContent = (html) => {
      // console.log("add===", html);
      setFieldsValue({"teachStep": html});
      setValue(theStep, html);
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

    const changeName = (e) => {
      setValue(theName, e.target.value);
    };
    const changeGuide = (e) => {
      setValue(theImport, e.target.value);
    };
    const changeNext = (e) => {
      setValue(theNext, e.target.value);
    };

    const setValue = (name, value) => {
      sessionStorage.setItem(name, value);
    };

    return(
      <Modal {...modalOpts} style={{"minWidth":"80%", "top":"20px"}}>
        <Form layout="horizontal">
          {getFieldDecorator("id")(<Input type="hidden"/>)}
          <FormItem {...formItemLayout_large} label="知识点名称">
            {getFieldDecorator('blockName', {rules: [{required: true, message: '此项不能为空'}]})(<Input placeholder="输入知识点名称" onKeyUp={changeName}/>)}
          </FormItem>
          <FormItem {...formItemLayout_large} label="知识点导入">
              {getFieldDecorator('guide')(<TextArea placeholder="输入知识点导入" onKeyUp={changeGuide} rows={2}>&nbsp;</TextArea>)}
          </FormItem>
          {showEditor?
            <FormItem {...formItemLayout_large} label="授课过程">
              {getFieldDecorator('teachStep', {rules: [{required: true, message: '此面不能为空'}]})(<MyEditor content={sessionStep?sessionStep:""} placeholder="授课过程" menu={editorMenu} onChangeContent={handleChangeContent}/>)}
            </FormItem>:""}

          <FormItem {...formItemLayout_large} label="承上启下">
            {getFieldDecorator('nextTeach')(<TextArea placeholder="输入如何过渡到下一堂课" onKeyUp={changeNext} rows={3}>&nbsp;</TextArea>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

export default AddPlanContent;
