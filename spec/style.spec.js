describe('Fabricator Shape Options', function () {
	
	var $img;

  beforeEach(function (done) {
    $img = $('<img />');
    $img.attr('src', './example/test.jpg');
    $('body').append($img);
    $img.load( function() {
      done();
    });
  });

  afterEach(function () {
	 $img.remove();
  });

  it('square shape', function () {
    $img.fabricator({
      shape: "square"
    });
    // expect().toBe();
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