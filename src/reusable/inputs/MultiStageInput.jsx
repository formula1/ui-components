const React = require("react");

const MultiStageInput = (props)=>{
  var children = React.Children.toArray(props.children);
  const currentChild = children[props.page || 0];
  if(!currentChild){
    console.warn("non-existant page");
    return null;
  }
  var key = children[props.page].props.name;
  return React.cloneElement(currentChild, {
    value: (props.value || {})[key],
    onChange: (newValue)=>(
      props.onChange && props.onChange(Object.assign(
        {}, props.value, { [key]: newValue }
      ))
    )
  });
};

module.exports = MultiStageInput;
