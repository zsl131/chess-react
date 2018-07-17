import React from 'react';
import { Tree } from 'antd';
import styles from "./leftTree.css"

const TreeNode = Tree.TreeNode;

const LeftTree = ({
    menuTree
}) => {

  const menus = menuTree.map((obj) => {
    return (
      <TreeNode title={obj.menu.name} key={obj.menu.id}>
        {
          obj.children.map((sub)=> {return (<TreeNode title={sub.name} key={sub.id}/>);})
        }
      </TreeNode>
    );
  });
  return(
    <Tree className={styles.tree}>
      {menus}
    </Tree>
  );
}

export default LeftTree;
