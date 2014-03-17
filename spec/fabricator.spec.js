describe('Fabricator', function () {
	
	var $img,
			jQueryVersion = '1.11.0',
      width = 200,
      height = 300;

	beforeEach(function () {
		$img = $('<img />');
		$img.attr('src', 'http://placekitten.com/' + width + '/' + height);
		$('body').append($img);
    width = $img.width();
    height = $img.height();
  });

  afterEach(function () {
	 $img.remove();
  });

  it('should return a jquery object', function () {
    $img.load( function() {
      expect($img.fabricator().jquery).toBe(jQueryVersion);  
    });
  });

  it('should create a canvas element', function () {
    $img.load( function() {
      expect($('canvas').size()).toBe(1)  
    });
  });

  it('canvas should be same size as image', function () {
    $img.load( function() {
      var $canvas = $('canvas');
      expect($canvas.width()).toBe(width);
      expect($canvas.height()).toBe(height);
    });
  });

});