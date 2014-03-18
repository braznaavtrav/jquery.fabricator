describe('Fabricator Setup', function () {
	
	var $img,
			jQueryVersion = '1.11.0',
      width = 200,
      height = 300;

	beforeEach(function (done) {
    $img = $('<img />');
    $img.attr('src', 'http://placekitten.com/' + width + '/' + height);
    $('body').append($img);
    $img.load( function() {
      width = $img.width();
      height = $img.height();
      done();
    });
  });

  afterEach(function () {
    $img.remove();
  });

  it('should return a jquery object', function () {
    expect($img.fabricator().jquery).toBe(jQueryVersion);  
  });

  it('should only work with an image', function () {
    spyOn($, 'error');
    $('body').fabricator();
    expect($.error).toHaveBeenCalled();
  });

  it('should create a canvas element', function () {
    expect($('canvas').size()).toBe(1)  
  });

  it('canvas should be same size as image', function () {
    var $canvas = $('canvas');
    expect($canvas.width()).toBe(width);
    expect($canvas.height()).toBe(height);
  });

});