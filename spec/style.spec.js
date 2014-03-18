describe('Fabricator Style Options', function () {
	
	var $img;

	beforeEach(function () {
		$img = $('<img />');
		$img.attr('src', 'http://placekitten.com/200/300');
		$('body').append($img);
    width = $img.width();
    height = $img.height();
  });

  afterEach(function () {
	 $img.remove();
  });

  // it('should return a jquery object', function () {
  //   $img.load( function() {
  //     expect($img.fabricator().jquery).toBe(jQueryVersion);  
  //   });
  // });

});