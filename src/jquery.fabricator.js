/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

  // undefined is used here as the undefined global
  // variable in ECMAScript 3 and is mutable (i.e. it can
  // be changed by someone else). undefined isn't really
  // being passed in so we can ensure that its value is
  // truly undefined. In ES5, undefined can no longer be
  // modified.

  // window and document are passed through as local
  // variables rather than as globals, because this (slightly)
  // quickens the resolution process and can be more
  // efficiently minified (especially when both are
  // regularly referenced in your plugin).

  // Create the defaults once
  var pluginName = "fabricator",
      defaults = {
        shape: "triangle",
        size: 50,
        animation: false,

      };

  // The actual plugin constructor
  function Fabricator( el, options ) {
    this.el = el;
    this.$el = $(el);

    // jQuery has an extend method that merges the
    // contents of two or more objects, storing the
    // result in the first object. The first object
    // is generally empty because we don't want to alter
    // the default options for future instances of the plugin
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;
    this._data = {};

    this.init();
  }

  function Point(x,y) {
    this.x = x;
    this.y = y;
  }

  function Shape() {
    // make a shape containing each of the arguments
    this.points = arguments;
  }

  Shape.prototype.componentToHex = function(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  Shape.prototype.rgbToHex = function(r, g, b) {
    return "#" + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  Shape.prototype.setColor = function(context) {
    // x = average of all points x value
    // y = average of all points y value
    var x = 0,
        y = 0,
        colorData;

    for (var i = this.points.length - 1; i >= 0; i--) {
      x += this.points[i].x;
      y += this.points[i].y;
    };

    x = x / this.points.length;
    y = y / this.points.length;

    colorData = context.getImageData(x, y, 1, 1).data
    this.hexColor = this.rgbToHex(colorData[0], colorData[1], colorData[2]);
  }

  Shape.prototype.draw = function(context) {
    // draw this shape to the context passed in
    var self = this;

    context.fillStyle = self.hexColor;
    context.beginPath();
    context.moveTo(self.points[0].x, self.points[0].y);
    for (var i = 1; i < self.points.length; i++) {
      context.lineTo(self.points[i].x, self.points[i].y);
    };
    context.closePath();
    context.fill();
    context._shapes.push(this); // this is for testing purposes
  }

  Fabricator.prototype = {

    init: function() {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.options
      // you can add more functions like the one below and
      // call them like so: this.yourOtherFunction(this.element, this.options).
      
      if (this.swapImgWithCanvas()) {
        this.setUpPoints();
        this.drawShapes();
      }
    },

    swapImgWithCanvas: function() {
      // if el is an image 
      // insert canvas element after image
      // hide image element

      var self = this,
          width = self.$el.width(),
          height = self.$el.height();

      if (self.$el.is('img')) {
        self.$canvas = $('<canvas />');
        self.$canvas
          .width(width)
          .height(height);
        self.$canvas[0].width = width;
        self.$canvas[0].height = height;
        self.$el.after(self.$canvas);
        self.$el.hide();
        self.context = self.$canvas[0].getContext('2d');
        self.context._shapes = [];
        self.context.drawImage(self.el, 0, 0, width, height);
        return true;
      } 
      else {
        $.error('Element used must be an <img>.');
        return false;
      }

    },

    setUpPoints: function() {
      var self = this;
      self._data.points = [];
      self._data.shapes = [];
      switch (self.options.shape) {
        case "triangle":
          // make squares
          self.makeTriangles();
          break;
        case "square":
          // make squares
          self.makeSquares();
          break;
        case "bucky":
          // make triangles
          self.makeTriangles();
          // make bucky
          self.makeBuckies();
          break;
        default:
          $.error('Invalid shape option.');
      }
    },

    makeSquares: function() {
      var self = this,
          size = self.options.size,
          width = self.$canvas.width(),
          height = self.$canvas.height(),
          row = 0,
          point,
          square;

      for (var x = 0; x < width; x += size) {
        self._data.points[row] = [];
        for (var y = 0; y < height; y += size) {
          point = new Point(x, y);
          self._data.points[row].push(point);
        }
        row += 1;
      }

      for (var i = 0, pointSize = self._data.points.length; i < pointSize; i++) {
        for (var x = 0; x < self._data.points[i].length; x++) {
          // if a square can be made by going one down and one to the right
          if (self._data.points[i][x+1] && self._data.points[i+1]) {
            square = new Shape(self._data.points[i][x], self._data.points[i][x+1], self._data.points[i+1][x+1], self._data.points[i+1][x]);
            square.setColor(self.context);
            self._data.shapes.push(square);
          }
        };
      };

    },

    makeTriangles: function() {
    },

    makeBuckies: function() {
    },

    drawShapes: function() {
      // loop through self._data.shapes
      // for each shape
      // shape.draw(self.context)
      var self = this;

      for (var i = self._data.shapes.length - 1; i >= 0; i--) {
        self._data.shapes[i].draw(self.context);
      };
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName,
          new Fabricator( this, options ));
        }
    });
  };

})( jQuery, window, document );