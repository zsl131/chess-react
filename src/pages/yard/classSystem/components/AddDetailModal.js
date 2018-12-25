import React from 'react';
import {Form, Input, Modal, Select, InputNumber,TreeSelect} from 'antd';
import request from "../../../../utils/request";

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = TreeSelect.TreeNode;

@Form.create()
export default class AddDetailModal extends React.Component {

  state = {
    fetching: false,
    treeData:[],
  }

  componentDidMount() {
    const {setFieldsValue} = this.props.form;
    setFieldsValue({sid:this.props.sid});
  }

  fetchTree = ()=> {
    if(this.state.treeData<=0) {
      request("classCategoryService.buildCategorySystemTree", {sid: this.props.sid}, true).then((res) => {
        this.setState({treeData: res.data, fetching: false});
      });
    }
  }

  render() {

    const { getFieldDecorator, validateFieldsAndScroll} = this.props.form;
    const {fetching, treeData} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 17 },
      },
    };

    const handleOk = (e) => {
      e.preventDefault();

      validateFieldsAndScroll((errors, values) => {
        // console.log(values);
        if(!errors) {
          this.props.onOk(values);
        }
      });
    }

    const modalOpts = {
      ...this.props,
      onOk: handleOk
    }


    return(
      <Modal {...modalOpts}>
        <Form layout="horizontal">
          {getFieldDecorator("sid")(<input type="hidden"/>)}
          <FormItem {...formItemLayout} label="名称">
            {getFieldDecorator('name', {rules: [{required: true, message: '名称不能为空'}]})(<Input placeholder="输入名称"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="序号">
            {getFieldDecorator('orderNo', {rules: [{required: true, message: '序号不能为空'}]})(<InputNumber step={1} placeholder="输入序号"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="章节序号">
            {getFieldDecorator('sectionNo', {rules: [{required: true, message: '章节序号不能为空'}]})(<InputNumber step={0.1} placeholder="章节序号"/>)}
          </FormItem>
          <FormItem {...formItemLayout} label="对应课程">
            {getFieldDecorator('courseId')(
              <TreeSelect
                placeholder="选择对应课程"
                notFoundContent={fetching ? <Spin size="small" /> : null}
                onFocus={this.fetchTree}
                showSearch
                treeDefaultExpandAll={true}
                searchPlaceholder="输入名称筛选"
                treeNodeFilterProp="title"
                style={{ width: '100%' }}
              >
                {
                  treeData.map(item => {
                      return (
                        <TreeNode value={"c_"+item.category.id} title={item.category.name} key={item.category.id} disabled>
                          {
                            item.treeList.map(e => {
                              return (
                                <TreeNode value={"c_"+e.category.id} title={e.category.name} key={e.category.id} disabled>
                                  {
                                    e.courseList.map(o=><TreeNode value={o.course.id} title={(o.hasUse?"已配":"未配")+"-"+o.course.title} key={"c_"+`${o.course.id}`}/>)
                                  }
                                </TreeNode>
                              )
                            })
                          }
                        </TreeNode>
                      )
                    }
                  )
                }
              </TreeSelect>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}
