const React = require("react");
const { Component } = React;
const { SortableContainer, SortableElement, arrayMove } = require("react-sortable-hoc");
const { StackLayout } = require("../layouts");
const PropTypes = require("prop-types");

var SortableList = SortableContainer(({ children })=>(
  <StackLayout>{children}</StackLayout>
));

function ListInput(props){
  const { ItemComponent, value, onChange } = props;
  console.log(value);
  var SortableListItem = SortableElement((props)=>{
    console.log(props);
    const { item, index } = props;
    return (
      <ItemComponent
        item={item}
        index={index}
      />
    );
  });

  return (
    <SortableList onSortEnd={({ oldIndex, newIndex })=>{
      Promise.resolve().then(()=>{
        onChange(arrayMove(value, oldIndex, newIndex));
      });
    }}>{
      value.map((item, index) => (
        <SortableListItem
          key={`item-${index}`} index={index} item={item}
        />
      ))
    }</SortableList>
  );
}

ListInput.propTypes = {
  ListComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(Component)]),
  ItemComponent: PropTypes.oneOfType([PropTypes.func, PropTypes.instanceOf(Component)]),
  value: PropTypes.any,
  onChange: PropTypes.func,
};

module.exports = ListInput;
