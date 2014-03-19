describe('Fabricator Shape Options', function () {
	
	var $img;

  beforeEach(function (done) {
    jasmine.addMatchers(imagediff.jasmine);
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

  it('square shape', function (done) {
    $img.fabricator({
      shape: "square"
    });
    
    var canvas = document.getElementsByTagName('canvas')[0];
    expect(canvas).toImageDiffEqual($img, 0);
    done();
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