const defaults = {
  sizeX: "auto",
  sizeY: "auto",
  overflowX: "auto",
  overflowY: "auto",
  boxSizing: "content-box",
  innerSpace: "0",
  outerSpace: "0",
  border: "0",
};

const mapping = {
  sizeX: "width",
  sizeY: "height",
  overflowX: "overflowX",
  overflowY: "overflowY",
  boxSizing: "boxSizing",
  innerSpace: "padding",
  outerSpace: "margin",
  border: "borderWidth"
};

const styleRemapperFactory = require("./style-remapper-factory");

const remappedFn = styleRemapperFactory(defaults, mapping);

module.exports = function(config, style){
  var newStyle = remappedFn(config, style);
  if(!newStyle.borderStyle){
    newStyle.borderStyle = newStyle.borderWidth !== "0" ? "solid" : "none";
  }
  return newStyle;
};

module.exports.shape = remappedFn.shape;
