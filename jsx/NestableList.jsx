/** @jsx React.DOM */

var NestableItem = require('./NestableItem');

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
    selected : React.PropTypes.array,
    // @todo - the maximum depth for nesting
    maxDepth : React.PropTypes.number
  },

  nodePlacement : undefined,
  dragged : undefined,

  // Lifecycle
  getDefaultProps : function () {
    return {
      className : "draggable list",
      selected : [],
      element : NestableItem,
      number : 2
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

    var top = this.over.parentNode.getBoundingClientRect().top
      , relY = e.clientY - top
      , height = this.over.offsetHeight + top
      , parent = this.over.parentNode;
    
    // console.log(height * 0.25, relY, height * 0.75);

    if (relY < height * 0.25) {
      this.nodePlacement = "before";
      parent.insertBefore(placeholder, this.over);
    } else if (relY < height * 0.5 && relY > height * 0.25) {
      this.nodePlacement = "inside";
      var list = this.over.getElementsByClassName("list")[0];
      if (!list) {
        list = document.createElement("div");
        list.className= "list";
        list.appendChild(placeholder);

        this.over.appendChild(list);
      } else {
        list.appendChild(placeholder);
      }
    } else if (relY > height * 0.5) {
      this.nodePlacement = "after";
      parent.insertBefore(placeholder, this.over.nextElementSibling);
    }
  },
  onDragEnd: function(e) {
    if (typeof this.props.onRearrange != "function") { return; }

    // this.dragged.style.display = "block";
    placeholder.remove();

    // Update data
    var data = this.props.data
      , from = Number(this.dragged.dataset.index)
      , to = Number(this.over.dataset.index);

    if (this.nodePlacement == "inside") {
      if (!data[to].data) {
        data[to].data = data.splice(from, 1);
      } else {
        data[to].data.push(data.splice(from, 1));
      }
    } else {
      if (from < to) to--;
      if (this.nodePlacement == "after") to++;
      data.splice(to, 0, data.splice(from, 1)[0]);
    }

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
                  key={m.id || m.cid || i}
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