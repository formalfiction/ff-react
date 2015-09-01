/** @jsx React.DOM */
var React = require('React');

var Item = require('./Item');

var placeholder = document.createElement("div");
placeholder.className = "placeholder item";

var NestableList = React.createClass({displayName: "NestableList",
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
    // the place to look for & place data props
    nestingProp : React.PropTypes.string,
    // @todo - the maximum depth for nesting
    maxDepth : React.PropTypes.number,
  },

  nodePlacement : undefined,
  dragged : undefined,

  // Lifecycle
  getDefaultProps : function () {
    return {
      className : "draggable list",
      selected : [],
      element : Item,
      nestingProp : "data",
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

    // only use "indside" checks if we can nest
    if (!this.over.dataset.list) {
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
    } else {
      if (relY < height / 2) {
        this.nodePlacement = "before";
        parent.insertBefore(placeholder, this.over);
      } else {
        this.nodePlacement = "after";
        parent.insertBefore(placeholder, this.over.nextElementSibling);
      }
    }
  },
  onDragEnd: function(e) {
    if (typeof this.props.onRearrange != "function") { return; }

    this.dragged.style.display = "block";
    placeholder.remove();

    var np = this.props.nestingProp
      , from = Number(this.dragged.dataset.index)
      , to = Number(this.over.dataset.index)
      , fromList = this.dragged.dataset.list ? this.props.data[+this.dragged.dataset.list][np] : this.props.data
      , toList = this.over.dataset.list ? this.props.data[+this.over.dataset.list][np] : this.props.data
      , sameList = (this.dragged.dataset.list == this.over.dataset.list)
      , finalAddress;

    if (this.nodePlacement == "inside") {
      if (this.props.data[+this.over.dataset.index][np]) {
        this.props.data[+this.over.dataset.index][np].splice(to, 0, fromList.splice(from, 1)[0]);
        finalAddress = [+this.over.dataset.index, to+1];
      } else {
        this.props.data[+this.over.dataset.index][np] = fromList.splice(from, 1);
        finalAddress = [+this.over.dataset.index, 0];
      }
    } else {
      if (from < to && sameList) to--;
      if (this.nodePlacement == "after") to++;
      toList.splice(to, 0, fromList.splice(from, 1)[0]);
      var fromAdd = +this.over.dataset.list;
      
      finalAddress = this.over.dataset.list ? [fromAdd, to] : [to];
    }

    console.log(finalAddress);
    this.props.onRearrange(this.props.data, this.props.name, finalAddress);
  },

  // render
  renderItem : function (m,i) {

  },
  render: function() {
    var items, np = this.props.nestingProp;

    if (this.props.data.length) {
      items = this.props.data.map(function(m, i){
        var selected = false;
        for (var j=0; j < this.props.selected.length; j++) {
          if (i === this.props.selected[j]) { selected = true; break; }
        }

        var item = React.createElement(this.props.element, React.__spread({},  
                      this.props, 
                      {selected: selected, 
                      data: m, 
                      index: i, 
                      "data-index": i, 
                      draggable: "true", 
                      key: i, 
                      onDragEnd: this.onDragEnd, 
                      onDragStart: this.onDragStart}))

        if (m[np]) {
          return (
            React.createElement("div", {key: i + ".list"}, 
              item, 
              React.createElement("div", {className: "list"}, 
                
                  m[np].map(function(d,j){
                    return React.createElement(this.props.element, React.__spread({},  
                              this.props, 
                              {"data-list": i, 
                              "data-index": j, 
                              key: i + "." + j, 
                              data: d, 
                              draggable: "true", 
                              onDragEnd: this.onDragEnd, 
                              onDragStart: this.onDragStart}))
                  }, this)
                
              )
            )
          );
        } else {
          return item;
        }
        
      }, this);
    } else if (!this.props.loading) {
      items = React.createElement("div", {className: "noItems"}, 
                React.createElement("h4", {className: "text-center"}, this.props.noItemsString)
              )
    }

    return (
    React.createElement("div", {ref: "list", className: this.props.className, onDragOver: this.onDragOver}, 
      items, 
      this.props.loading ? React.createElement(Spinner, null) : undefined
    )
    )
  }
});

module.exports = NestableList;