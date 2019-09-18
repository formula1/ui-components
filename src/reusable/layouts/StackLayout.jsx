const React = require("react");
const PropTypes = require("prop-types");
const styleConfig = require("../style");
const defaultLayout = {
  orientation: "y",
  wrap: false,
  justifyContent: void 0,
  alignItems: void 0,
  alignContent: void 0,
};

const defaultChildLayout = {
  sizeAdapt: -1,
  sizeBase: "auto",
  alignSelf: void 0
};

function StackLayout(props){
  const { layoutConfig, children } = props;
  var netLayout = Object.assign({}, defaultLayout, layoutConfig);
  var parentProps = Object.assign({}, props);
  delete parentProps.layoutConfig;
  styleConfig.clean(parentProps);

  return (
    <div
      {...parentProps}
      style={styleConfig(props,
        {
          display: "flex",
          flexDirection: netLayout.orientation === "x" ? "row" : "column",
          flexWrap: netLayout.wrap ? "wrap" : "nowrap",
          justifyContent: netLayout.justifyContent,
          alignItems: netLayout.alignItems,
          alignContent: netLayout.alignContent,
        }
      )}
    >{React.Children.toArray(children).filter((c)=>(!!c && typeof c !== "string")).map((child, i)=>{
      var { layout } = child.props;
      layout = Object.assign({}, defaultChildLayout, layout);
      var style = {
        [layout.sizeAdapt > 0 ? "flexGrow" : "flexShrink"]: Math.abs(layout.sizeAdapt),
        flexBasis: layout.sizeBase,
        alignSelf: layout.align
      };
      var newProps = Object.assign({}, child.props, {
        style: Object.assign({}, child.props.style, style)
      });
      delete newProps.layout;
      return <child.type key={i} {...newProps} />;
    })}</div>
  );
}

StackLayout.propTypes = {
  layoutConfig: PropTypes.shape({
    orientation: PropTypes.oneOf(["x", "y"]),
    wrap: PropTypes.bool,
    justifyContent: PropTypes.string,
    alignItems: PropTypes.string,
    alignContent: PropTypes.string,
  }),
  children: PropTypes.any
};

StackLayout.propTypes = Object.assign(
  {}, StackLayout.propTypes, styleConfig.shape
);

module.exports = StackLayout;
