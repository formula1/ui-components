const React = require("react");
const Autocomplete = require("react-autocomplete");
const { Component } = React;
const PropTypes = require("prop-types");

function AutoCompleteTextInput(props){
  const {
    options, ItemComponent, value, onChangeQuery, onSelect, getItemValue
  } = props;
  var getValue = getItemValue || ((v)=>(v));
  return (
    <Autocomplete
      style={{ zIndex: 999 }}
      getItemValue={getValue}
      items={options || []}
      renderItem={(item, isHighlighted) =>(
        <ItemComponent
          onClick={()=>(onSelect(item))}
          item={item}
          isHighlighted={isHighlighted}
        />
      )}
      value={value}
      onChange={(e) => onChangeQuery(e.target.value)}
      onSelect={onSelect}
    />
  );
}

AutoCompleteTextInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.any),
  ItemComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(Component)]),
  value: PropTypes.any,
  onChangeQuery: PropTypes.func,
  onSelect: PropTypes.func,
  getItemValue: PropTypes.func,
};

module.exports = AutoCompleteTextInput;
