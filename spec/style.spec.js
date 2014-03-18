describe('Fabricator Shape Options', function () {
	
	var $img,
      width = 200,
      height = 300;

  beforeEach(function (done) {
    $img = $('<img />');
    $img.attr('src', 'http://placekitten.com/' + width + '/' + height);
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