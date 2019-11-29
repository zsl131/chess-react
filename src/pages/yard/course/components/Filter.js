import React from 'react';
import {Button, Form, Input, Select,TreeSelect} from 'antd';
import request from "../../../../utils/request";

const Option = Select.Option;
const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;

@Form.create()
export default class Filter extends React.Component {

  state = {
    data: [],
    fetching: false,
    gradeList:[],
    treeData:[],
  }

  fetchTree = ()=> {
    if(this.state.treeData<=0) {
      request("classCategoryService.buildCategoryTree", {}, true).then((res) => {
        this.setState({treeData: res.data, fetching: false});
      });
    }
  }

  fetchGrade = ()=> {
    if(this.state.gradeList<=0) {
      request("gradeService.listNoPage", {}, true).then((response) => {
        let data = [{value: "*", text: "==所有年级=="}];
        data.push( ...response.list.map((item) => ({
          value: ""+item.id,
          text: item.name,
        })));

        this.setState({gradeList: data, fetching: false});
      });
    }
  }

  render() {

    const {getFieldDecorator, validateFields} = this.props.form;
    const { fetching, treeData, gradeList } = this.state;

    const handleSubmit = (e) => {
      e.preventDefault();
      validateFields((errors, values) => {
        // console.log("filter", errors, values);
        this.props.onFilter(values);
      });
    }

    return (
      <Form layout="inline" onSubmit={handleSubmit}>
        <FormItem>
          {getFieldDecorator("cpid")(
            <TreeSelect
              placeholder="所在大分类"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              onFocus={this.fetchTree}
              showSearch
              allowClear={true}
              searchPlaceholder="输入名称筛选"
              treeNodeFilterProp="title"
              treeDefaultExpandAll
              style={{ width: '120px' }}
            >
              <TreeNode value="*" title="所有分类" key="0">
                {
                  treeData.map(item => {
                     return (
                      <TreeNode value={item.category.id} title={item.category.name} key={item.category.id} />
                     )
                    }
                  )
                }
              </TreeNode>
            </TreeSelect>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("cid")(
            <TreeSelect
              placeholder="所在小分类"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              onFocus={this.fetchTree}
              showSearch
              allowClear={true}
              searchPlaceholder="输入名称筛选"
              treeNodeFilterProp="title"
              treeDefaultExpandAll
              style={{ width: '120px' }}
            >
              <TreeNode value="*" title="所有分类" key="0">
                {
                  treeData.map(item => {
                      return (
                        <TreeNode value={item.category.id} title={item.category.name} key={item.category.id} disabled>
                          {
                            item.children.map(e => <TreeNode value={e.id} title={e.name} key={e.id}/>)
                          }
                        </TreeNode>
                      )
                    }
                  )
                }
              </TreeNode>
            </TreeSelect>
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("title_like")(<Input placeholder="课程标题"/>)}
        </FormItem>

        <FormItem>
          {getFieldDecorator("gradeId")(
            <Select
              placeholder="年级"
              notFoundContent={fetching ? <Spin size="small" /> : null}
              onFocus={this.fetchGrade}
              style={{ width: '120px' }}
            >
              {gradeList.map(d => <Option key={d.value}>{d.text}</Option>)}
            </Select>
          )}
        </FormItem>

        <FormItem>
          {getFieldDecorator("age_eq")(<Input placeholder="年龄"/>)}
        </FormItem>
        <FormItem>
          <Button type="dashed" htmlType="submit">筛选</Button>
        </FormItem>
      </Form>
    );
  }

}
