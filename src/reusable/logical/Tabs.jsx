const React = require("react");
const { Component } = React;
const { Text } = require("../renders");
const { StackLayout } = require("../layouts");
const PropTypes = require("prop-types");
function Tabs(props){
  var { selected, selectIndex, children } = props;
  children = React.Children.toArray(children);
  var activeIndex = Math.min(props.selected || 0, children.length -1);
  return (<StackLayout className="tabs"
    layoutConfig={{
      orientation: "y",
      justifyContent: "center",
    }}
  >
    <StackLayout
      style={{ width: "100%" }}
      layoutConfig={{ orientation: "x" }}
      layout={{ sizeAdapt: -1 }}
    >
      {children.map((child, i)=>(
        <Text
          key={i}
          class={selected === i ? "active-tab" : ""}
          onClick={()=>(i !== activeIndex && selectIndex(i))}
        >{child.props.label}</Text>
      ))}
    </StackLayout>
    {children.length && React.cloneElement(
      children[activeIndex], { layout: { sizeAdapt: 1 } }
    )}
  </StackLayout>);
}

Tabs.propTypes = {
  selected: PropTypes.number,
  selectIndex: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.element)
};

class TabsState extends Component {
  constructor(a, b, c){
    super(a, b, c);
    this.state = {
      selected: 0,
    };
  }
  render(){
    return (
      <Tabs
        selected={this.state.selected}
        selectIndex={(i)=>(this.setState({ selected: i }))}
      >{
        this.props.children
      }</Tabs>
    );
  }
}

TabsState.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element)
};

module.exports = TabsState;
