describe('Fabricator Shape Options', function () {
	
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

  it('square shape', function () {
    $img.load( function() {
      $img.fabricator({
        shape: "square"
      });
    });
    // expect(true).toBe(false);
  });

  // it('triangle shape', function () {
  //   $img.load( function() {
  //     $img.fabricator({
  //       shape: "triangle"
  //     });
  //     expect().toBe();  
  //   });
  // });

  // it('bucky shape', function () {
  //   $img.load( function() {
  //     $img.fabricator({
  //       shape: "bucky"
  //     });
  //     expect().toBe();  
  //   });
  // });

  // it('should default to triangle shape', function () {
  //   $img.load( function() {
  //     $img.fabricator();
  //     expect().toBe();  
  //   });
  // });

});