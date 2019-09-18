const React = require("react");
const PropTypes = require("prop-types");
const styleConfig = require("../style");

function AbsoluteLayout(props){
  var ari = React.Children.toArray(props.children).filter((c)=>(!!c));

  return (
    <div {...props} style={styleConfig(props, { position: "relative" })}>
      {ari.map((child)=>(

        React.cloneElement(child, {
          style: Object.assign(
            {}, child.props.style,
            {
              position: "absolute",
            },
            layoutToStyle(child.props.layout)
          )
        })
      ))}
    </div>
  );
}

AbsoluteLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
};

AbsoluteLayout.propTypes = Object.assign({}, AbsoluteLayout.propTypes, styleConfig.shape);

module.exports = AbsoluteLayout;

function layoutToStyle(layout){
  if(!layout){
    return {
      top: 0,
      left: 0
    };
  }
  if(Array.isArray(layout)){
    return {
      left: layout[0] || 0,
      top: layout[1] || 0,
    };
  }
  if(typeof layout !== "object"){
    return {
      top: 0,
      left: 0
    };
  }
  var relativeX = "left", relativeY = "top";
  var coordX = 0, coordY = 0;
  if(layout.opposite){
    if(Array.isArray(layout.opposite)){
      relativeX = layout.opposite[0] ? "right" : "left";
      relativeY = layout.opposite[1] ? "bottom" : "top";
    }
    relativeX = layout.opposite.x ? "right" : "left";
    relativeY = layout.opposite.y ? "bottom" : "top";
  }
  if(layout.offset){
    if(Array.isArray(layout.offset)){
      coordX = layout.offset[0] || 0;
      coordY = layout.offset[1] || 0;
    }
    coordX = layout.offset.x || 0;
    coordY = layout.offset.y || 0;
  }
  return {
    [relativeX]: coordX,
    [relativeY]: coordY,
  };
}
