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
        shape: "triangle", // square, bucky
        size: 50,
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
          self.makeTriangles();
          break;
        case "square":
          self.makeSquares();
          break;
        case "bucky":
          self.makeTriangles();
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

      for (var x = 0; x < width + size; x += size) {
        self._data.points[row] = [];
        for (var y = 0; y < height + size; y += size) {
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
      var self = this,
          size = self.options.size,
          width = self.$canvas.width(),
          height = self.$canvas.height(),
          row = 0,
          point,
          square,
          col,
          offset = size / 2,
          triheight = Math.sqrt(3) * size / 2,
          rowEven,
          colEven;

      // make points
      for (var x = 0; x < width + size; x += size) {
        self._data.points[row] = [];
        rowEven = row % 2 === 0;
        col = 0
        for (var y = 0; y < height + size; y += triheight) {
          colEven = col % 2 === 0;
          if (colEven) {
            point = new Point(x + offset, y);
          }
          else {
            point = new Point(x, y);
          }
          self._data.points[row].push(point);
          col += 1;
        }
        row += 1;
      }

      // draw shapes
      for (var i = 0, rowLength = self._data.points.length; i < rowLength; i++) {
        for (var x = 0; x < self._data.points[i].length; x++) {
          if (self._data.points[i][x+1] && self._data.points[i+1]) {
            if (x % 2 === 0) {
              triangle1 = new Shape(self._data.points[i][x], self._data.points[i+1][x+1], self._data.points[i][x+1]);
              triangle2 = new Shape(self._data.points[i][x], self._data.points[i+1][x], self._data.points[i+1][x+1]);
            }
            else {
              triangle1 = new Shape(self._data.points[i][x], self._data.points[i+1][x], self._data.points[i][x+1]);
              triangle2 = new Shape(self._data.points[i][x+1], self._data.points[i+1][x], self._data.points[i+1][x+1]); 
            }
            triangle1.setColor(self.context);
            triangle2.setColor(self.context);
            self._data.shapes.push(triangle1, triangle2);
          }
        };
      };
    },

    getCenterPoint: function(shape) {
      var cx = 0,
          cy = 0;

      for (var i = shape.points.length - 1; i >= 0; i--) {
        cx += shape.points[i].x;
        cy += shape.points[i].y;
      };

      cx = cx / shape.points.length;
      cy = cy / shape.points.length;

      return new Point(cx, cy);
    },

    makeBuckies: function() {
      var self = this,
          centerPoint,
          shape,
          triangle1,
          triangle2,
          triangle3,
          buckies = [];
      // loop through all triangles
      for (var i = self._data.shapes.length - 1; i >= 0; i--) {
        shape = self._data.shapes[i];
        // make bucky out of the triangle
        centerPoint = self.getCenterPoint(shape);
        // c 0 1
        triangle1 = new Shape(centerPoint, shape.points[0], shape.points[1]);
        // c 1 2
        triangle2 = new Shape(centerPoint, shape.points[1], shape.points[2]);
        // c 2 0
        triangle3 = new Shape(centerPoint, shape.points[2], shape.points[0]);
        
        triangle1.setColor(self.context);
        triangle2.setColor(self.context);
        triangle3.setColor(self.context);
        
        buckies.push(triangle1, triangle2, triangle3);
      };

      // substitute shapes array for buckies
      self._data.shapes = buckies;
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