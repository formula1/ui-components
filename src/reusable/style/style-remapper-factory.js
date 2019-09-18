const PropTypes = require("prop-types");
module.exports = function(defaults, mapping){
  var fn = remapper.bind(void 0, defaults, mapping);
  fn.shape = PropTypes.shape(Object.keys(mapping).reduce((r, k)=>(
    r[k] = PropTypes.string, r
  ), {}));
  return fn;
};

function remapper(defaults, mapping, config, style){
  return Object.assign(
    {},
    Object.keys(defaults).reduce((result, key)=>{
      if(key in mapping) result[mapping[key]] = defaults[key];
      return result;
    }, {}),
    style,
    Object.keys(config || {}).reduce((result, key)=>{
      if(key in mapping) result[mapping[key]] = config[key];
      return result;
    }, {})
  );
}
