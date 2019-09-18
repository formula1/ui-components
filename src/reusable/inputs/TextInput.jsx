const React = require("react");
const PropTypes = require("prop-types");

function TextInput(props){
  return <input
    {...props}
    type="text"
    value={props.value}
    onChange={(e)=>(props.onChange(e.target.value))}
  />;
}

TextInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

module.exports = TextInput;
