const React = require("react");
const PropTypes = require("prop-types");
const styleConfig = require("../style");

function BigTextInput(props){
  const { colors, style, box } = props;
  return <textarea
    {...props}
    style={Object.assign(
      {},
      style,
      styleConfig.colors(colors, style),
      styleConfig.box(box, style)
    )}
    value={props.value}
    onChange={(e)=>(
      props.onChange(e.target.value)
    )}
  />;
}

BigTextInput.propTypes = {
  style: PropTypes.any,
  value: PropTypes.string,
  onChange: PropTypes.func,
  colors: styleConfig.colors.shape,
  box: styleConfig.box.shape,
};

module.exports = BigTextInput;
