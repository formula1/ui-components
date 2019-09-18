const React = require("react");
const PropTypes = require("prop-types");
const styleConfig = require("../style");

function Text(props){
  var newProps = Object.assign({}, props);
  styleConfig.clean(newProps);

  return (<span {...newProps}
    style={styleConfig(props)}
  >{props.children}</span>);
}

Text.propTypes = {
  children: PropTypes.string.isRequired,
};
Text.propTypes = Object.assign(
  {}, Text.propTypes, styleConfig.shape
);

module.exports = Text;
