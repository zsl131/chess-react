import React from 'react';
import { Tree, Input } from 'antd';
import styles from "./leftTree.css"

const TreeNode = Tree.TreeNode;
const Search = Input.Search;

export default class LeftTree extends React.Component {

  state = {
    expandedKeys: [],
    searchValue: '',
    expandAll: true,
    autoExpandParent: true,
  }

  onExpand = (expandedKeys) => {
    this.setState({
      expandedKeys,
      autoExpandParent: false,
    });
  }

  render() {
    const {treeData, onSelect} = this.props;
    const { searchValue, expandedKeys, autoExpandParent } = this.state;
    const handlerSelect = (key, e) => {
      onSelect(key, e.node.props.title);
    }

    const onSearch = (e) => {
      // console.log(e.target.value);
      this.setState({searchValue: e.target.value, expandAll: true});
    }

    const buildTitle = (oldTitle) => {
      const searchValue = this.state.searchValue;
      const index = oldTitle.indexOf(searchValue);
      const beforeStr = oldTitle.substr(0, index);
      const afterStr = oldTitle.substr(index + searchValue.length);
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span style={{ color: '#f50' }}>{searchValue}</span>
          {afterStr}
        </span>
      ) : <span>{oldTitle}</span>;
      return title;
    }

    const menus = treeData&&treeData.map((obj) => {
      return (
        <TreeNode title={buildTitle(obj.system.name + "("+ obj.detailList.length +")")} key={"root_"+`${obj.system.id}`} >
          {
            obj.detailList.map((sub)=> {return (<TreeNode title={buildTitle(sub.system.name + "("+ sub.data.length +")")} key={"child_"+`${sub.system.id}`}>
              {
                sub.data.map((c)=>{return (<TreeNode title={buildTitle(c.sectionNo+"-"+c.name)} key={"detail_"+`${c.id}`}/>)})
              }
            </TreeNode>);})
          }
        </TreeNode>
      );
    });

    return(
      <div>
        {treeData?
          <div>
        <Search className={styles.searchInput} onChange={onSearch} placeholder="可输入名称筛选"/>
        <Tree className={styles.tree} onSelect={handlerSelect}
              defaultExpandAll={this.state.expandAll}
        >
          {menus}
        </Tree>
          </div>
        :<div style={{"padding":"10px"}} className="red">只有设置课程体系学校的教师用户才可使用该功能</div>}
      </div>
    );
  }
}
