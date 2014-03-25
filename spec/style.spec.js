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

  });

  it('square shape', function () {
    $img.fabricator({
      shape: 'square',
      size: 20
    });
    var img = $('img')[0];
    var canvas = document.getElementsByTagName('canvas')[0],
        image1 = imagediff.toImageData(canvas),
        image2 = imagediff.toImageData(canvas);

    // expect(imagediff.isImage($img[0])).toBe(true);
    expect(img).toImageDiffEqual(img);
  });

  it('triangle shape', function () {
    $img.fabricator({
      shape: 'triangle',
      size: 20
    });
    var img = $('img')[0];
    var canvas = document.getElementsByTagName('canvas')[0],
        image1 = imagediff.toImageData(canvas),
        image2 = imagediff.toImageData(canvas);

    // expect(imagediff.isImage($img[0])).toBe(true);
    expect(img).toImageDiffEqual(img);
  });

  it('bucky shape', function () {
    $img.fabricator({
      shape: 'bucky',
      size: 60
    });
    var img = $('img')[0];
    var canvas = document.getElementsByTagName('canvas')[0],
        image1 = imagediff.toImageData(canvas),
        image2 = imagediff.toImageData(canvas);

    // expect(imagediff.isImage($img[0])).toBe(true);
    expect(img).toImageDiffEqual(img);
  });

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