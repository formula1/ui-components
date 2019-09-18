const PropTypes = require("prop-types");

const box = require("./box");
const visibility = require("./visibility");
const colors = require("./colors");

module.exports = function(props, componentStyle){
  return Object.assign(
    {}, props.style,
    box(props.box, props.style),
    colors(props.colors, props.style),
    componentStyle,
    visibility(props.visibility)
  );
};

module.exports.shape = {
  style: PropTypes.any,
  box: box.shape,
  colors: colors.shape,
  visibility: visibility.shape,
};

module.exports.clean = function(props){
  delete props.style;
  delete props.box;
  delete props.colors;
  delete props.visibility;
};

module.exports.box = box;
module.exports.visibility = visibility;
module.exports.colors = colors;
