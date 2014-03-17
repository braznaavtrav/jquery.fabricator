describe('Fabricator', function () {
	
	var $img,
			jQueryVersion = '1.11.0';

	beforeEach(function () {
		$img = $('<img />');
		$img.attr('src', 'http://placekitten.com/200/300');
		$('body').append($img);
		waits(500);
  });

  afterEach(function () {
	 $img.remove();
  });

  it('should return a jquery object', function () {
    expect($img.fabricator().jquery).toBe(jQueryVersion);
  });

  it('should create a canvas element', function () {
    expect($('canvas').size()).toBe(1)
  });

  it('canvas should be same size as image', function () {
  	var $canvas = $('canvas');
    expect($canvas.width()).toBe(300);
    expect($canvas.height()).toBe(200);
  });

});