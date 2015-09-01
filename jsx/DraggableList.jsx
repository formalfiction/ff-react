/** @jsx React.DOM */
var React = require('React');

var Item = require('./Item');

var placeholder = document.createElement("div");
placeholder.className = "placeholder item";

var DraggableList = React.createClass({
  propTypes : {
    data : React.PropTypes.array.isRequired,
    // should be a react element that we can iterate with
    element : React.PropTypes.func.isRequired,
    // accepts a name prop to conform to "onValueChange" spec
    name : React.PropTypes.string,
    // set to true to disable dragging
    disableDrag : React.PropTypes.bool,
    loading : React.PropTypes.bool,
    // Func to call when we re-arrange the list
    onRearrange : React.PropTypes.func,
    // Func to call when we need more rows, typically 
    // from scrolling down the screen
    onLoadMore : React.PropTypes.func,
    // should be a react element that we can iterate with
    element : React.PropTypes.func,
    // string to display when we have no items in the list
    noItemsString : React.PropTypes.string,
    // array of indexes to add "selected" class to.
    // for a single selection, pass in a single element array :)
    selected : React.PropTypes.array
  },

  nodePlacement : undefined,
  dragged : undefined,

  // Lifecycle
  getDefaultProps : function () {
    return {
      className : "draggable list",
      selected : [],
      element : Item
    }
  },

  // Event Handlers
	onDragStart: function(e) {
    if (typeof this.props.onRearrange != "function") { return; }

    this.dragged = e.currentTarget;
    // if dragged isn't the list item container, iterate up until we have the item
    if (!this.dragged.dataset.index) {
      while (true) {
        if (!this.dragged.parentNode) { break; }
        this.dragged = this.dragged.parentNode;
        if (this.over.dataset.index) { break; }
      }
    }

    e.dataTransfer.effectAllowed = 'move';
    
    // Firefox requires dataTransfer data to be set
    e.dataTransfer.setData("text/html", e.currentTarget);
  },
  onDragOver: function(e) {
    if (typeof this.props.onRearrange != "function") { return; }

    e.preventDefault();
    this.dragged.style.display = "none";
    if (e.target.className == placeholder.className) return;
    this.over = e.target;
    if (!this.over.dataset.index) {
      while (true) {
        if (!this.over.parentNode) { break; }
        this.over = this.over.parentNode;
        if (this.over.dataset.index) { break; }
      }
    }

    var relY = e.clientY - this.over.parentNode.getClientRects()[0].top
      , height = this.over.offsetHeight / 2
      , parent = this.over.parentNode;
    
    if (relY < height) {
      this.nodePlacement = "before";
      parent.insertBefore(placeholder, this.over);
    } else if (relY > height) {
      this.nodePlacement = "after";
      parent.insertBefore(placeholder, this.over.nextElementSibling);
    }
  },
  onDragEnd: function(e) {
    if (typeof this.props.onRearrange != "function") { return; }

    this.dragged.style.display = "block";
    this.dragged.parentNode.removeChild(placeholder);

    // Update data
    var data = this.props.data
      , from = Number(this.dragged.dataset.index)
      , to = Number(this.over.dataset.index);

    if (from < to) to--;
    if (this.nodePlacement == "after") to++;
    data.splice(to, 0, data.splice(from, 1)[0]);

    this.props.onRearrange(data, this.props.name);
  },
  render: function() {
    var items;

    if (this.props.data.length) {
      items = this.props.data.map(function(m, i){
        var selected = false;
        for (var j=0; j < this.props.selected.length; j++) {
          if (i === this.props.selected[j]) { selected = true; break; }
        }
        
        return (<this.props.element 
                  {...this.props} 
                  selected={selected} 
                  data={m} 
                  index={i}
                  data-index={i}
                  draggable="true"
                  key={i}
                  onDragEnd={this.onDragEnd}
                  onDragStart={this.onDragStart}/>);
      }, this);
    } else if (!this.props.loading) {
      items = <div className="noItems">
                <h4 className="text-center">{this.props.noItemsString}</h4>
              </div>
    }

    return (
    <div ref="list" className={this.props.className} onDragOver={this.onDragOver}>
      {items}
      {this.props.loading ? <Spinner /> : undefined}
    </div>
    )
  }
});

module.exports = DraggableList;