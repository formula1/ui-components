const React = require("react");
const NumericInput = require("react-numeric-input");
const PropTypes = require("prop-types");

function NumberInput(props){
  return <NumericInput
    {...props}
    min={props.min}
    max={props.max}
    step={props.step}
    precision={props.precision}
    parse={props.parse}
    format={props.format}
    value={props.value}
    onChange={props.onChange}
  />;
}

NumberInput.propTypes = {
  value: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  precision: PropTypes.number,
  parse: PropTypes.func,
  format: PropTypes.func,
  onChange: PropTypes.func,
};

module.exports = NumberInput;
