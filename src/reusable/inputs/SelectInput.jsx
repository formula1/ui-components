const React = require("react");
const { Component } = require("react");
const { StackLayout, AbsoluteLayout } = require("../layouts");
const { Text } = require("../renders");

class SelectInput extends Component {
  constructor(a, b, c){
    super(a, b, c);
    this.state = { show: false };
  }
  render(){
    const {
      onChange, value, options, ItemComponent, NoValueComponent
    } = this.props;
    const NetNoValueComponent = NoValueComponent || DefaultNoValueComponent;
    const NetItemComponent = ItemComponent || DefaultItemComponent;
    if(options.length === 1 && options[0] === value){
      return <NetItemComponent item={value} />;
    }
    return (
      <StackLayout>
        {
          !value ?
            <NetNoValueComponent
              onSelect={()=>(this.setState({ show: true }))}
            />
          :
            <NetItemComponent
              item={value}
              onSelect={()=>(this.setState({ show: true }))}
            />
        }
        <AbsoluteLayout>
          <StackLayout>
          {
            options.map((item, i)=>(
              <NetItemComponent
                key={i}
                selected={value === item}
                item={item}
                onSelect={()=>(
                  this.setState(
                    { show: false },
                    ()=>(onChange(item))
                  )
                )}
              />
            ))
          }
          </StackLayout>
        </AbsoluteLayout>
      </StackLayout>
    );
  }
};

module.exports = SelectInput;

function DefaultNoValueComponent(props){
  return (
    <Text onClick={props.onSelect}>Click to Select a value</Text>
  );
}

function DefaultItemComponent(props){
  return (
    <Text onClick={props.onSelect}>{props.item}</Text>
  );
}
