const PropTypes = require("prop-types");

module.exports = function(config){
  var visibilityStyle = {};
  if(config === "none"){
    visibilityStyle.display = "none";
  }
  return visibilityStyle;
};

module.exports.shape = PropTypes.string;
