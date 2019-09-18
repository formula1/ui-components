const defaults = {
  bg: "transparent",
  text: "#000000",
  border: "#787878",
};

const mapping = {
  bg: "backgroundColor",
  text: "color",
  border: "borderColor"
};

const styleRemapperFactory = require("./style-remapper-factory");

module.exports = styleRemapperFactory(defaults, mapping);
