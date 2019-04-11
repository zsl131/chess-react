import React from 'react';
import ReactDOM from 'react-dom';
import {Tabs,Badge} from 'antd-mobile';
import { StickyContainer, Sticky } from 'react-sticky';
import ListDetail from './ListDetail';

export default class MyTabs extends React.Component {

  render() {

    function renderTabBar(props) {
      return (<Sticky>
        {({ style }) => <div style={{ ...style, zIndex: 1 }}><Tabs.DefaultTabBar {...props} /></div>}
      </Sticky>);
    }

    const dtoList = this.props.dataSource;

    console.log(dtoList);

    // let tabs = [];
    const tabs = dtoList.map((item) => {
      return ({title: <Badge text={item.detailList.length}>{item.system.name}</Badge>});
    });

    const details = dtoList.map((item)=> {
      return <ListDetail key={item.system.id} dataSource={item.detailList}/>
    });

    return (
      <StickyContainer>
        <Tabs tabs={tabs} renderTabBar={renderTabBar} tabBarBackgroundColor="#F4F4F4" destroyInactiveTab={true} swipeable={false}>
          {details}
        </Tabs>
      </StickyContainer>
    )
  }
}
