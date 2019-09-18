const React = require("react");
const PropTypes = require("prop-types");
const styleConfig = require("../style");

function TextWithNewLines(props){
  var newProps = Object.assign({}, props);
  styleConfig.clean(newProps);
  return (<pre {...newProps}
    style={styleConfig(props)}
  >{props.children}</pre>);
}

TextWithNewLines.propTypes = {
  children: PropTypes.string.isRequired,
};
TextWithNewLines.propTypes = Object.assign(
  {}, TextWithNewLines.propTypes, styleConfig.shape
);

module.exports = TextWithNewLines;
