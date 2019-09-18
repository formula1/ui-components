const React = require("react");
const PropTypes = require("prop-types");
const styleConfig = require("../style");

function GridLayout(props){
  var ari = React.Children.toArray(props.children);

  var childrenXY = ari.reduce((mappedChildren, child)=>{
    var { layout } = child.props;
    if(Array.isArray(layout)){
      layout = {
        y: layout[0] || 0,
        x: layout[1] || 0,
        sizeX: 1,
        sizeY: 1
      };
    }
    if(!layout){
      layout = {};
    }
    if(typeof layout.y !== "number"){
      layout.y = parseInt(
        Object.keys(mappedChildren).sort().pop()
      ) || 0;
    }
    if(typeof layout.x !== "number"){
      layout.x = layout.y in mappedChildren ?
      (parseInt(
        Object.keys(mappedChildren[layout.y]).sort().pop()
      )  + 1) : 0;
    }
    if(typeof layout.sizeX !== "number"){
      layout.sizeX = 1;
    }
    if(typeof layout.sizeY !== "number"){
      layout.sizeY = 1;
    }
    var y = layout.y, maxY = layout.y + layout.sizeY;
    var x = layout.x, maxX = layout.x + layout.sizeX;
    var isFirst = true;
    for(y; y < maxY; y++){
      if(!(y in mappedChildren)){
        mappedChildren[y] = {};
      }
      for(x = layout.x; x < maxX; x++){
        if(x in mappedChildren[y]){
          throw `[${y}, ${x}] is used by more than one child`;
        }
        if(isFirst){
          isFirst = false;
          var newProps = Object.assign({}, child.props);
          delete newProps.layout;
          mappedChildren[y][x] = {
            child: <child.type {...newProps} />,
            size: { colSpan: layout.sizeX, rowSpan: layout.sizeY }
          };
        } else{
          mappedChildren[y][x] = null;
        }
      }
    }
    return mappedChildren;
  }, {});



  var parentProps = Object.assign({}, props);
  styleConfig.clean(parentProps);

  return (
    <table {...parentProps} style={styleConfig(props, {})}>
      <tbody>
        {mapIncompleteList(childrenXY, (y, item)=>{
          if(!item) return (<tr key={y} />);
          var currentMissing = 0;
          var ret = [];
          mapIncompleteList(item, (x, item)=>{
            if(!item){
              currentMissing++;
              return;
            }
            var cm = currentMissing;
            currentMissing = 0;
            if(cm > 0){
              ret.push(
                <td style={{ visbility: "hidden" }} key={"m" + x} colSpan={cm} />
              );
            }

            ret.push(
              <td key={x} {...item.size}>{item.child}</td>
            );
          });
          return (
            <tr key={y}>{ret}</tr>
          );
        })}
      </tbody>
    </table>
  );
}

GridLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]),
};

GridLayout.propTypes = Object.assign({}, GridLayout.propTypes, styleConfig.shape);

module.exports = GridLayout;

function mapIncompleteList(object, fn){
  var keys = Object.keys(object).sort((a, b)=>(parseInt(a) - parseInt(b)));
  var last = keys[keys.length - 1];
  var result = [];
  var curKey = 0;

  for(var i = 0; i <= last; i++){

    if(parseInt(keys[curKey]) === i){

      result.push(
        fn(i, object[keys[curKey]])
      );
      curKey++;
    } else{
      result.push(fn(i));
    }
  }
  return result;
}
