# jQuery Fabricator

This is jQuery plugin that pixelates images in a mosaic fashion by turning them into canvas elements. This is still very much a work in progress. I will continue to update the options and add new shapes.

## Usage

Fabricator can only take image elements. If you try to run it on a div or anything other than an img, it will not work. 

    $('img').fabricator({
			options ...
    });

## Options

Options can be passed in an object as an argument to fabricator.

### `shape` (`string`, default: `"triangle"`)

This will determine the shape of the mosaic tiles. Options include:
- `'triangle'`
- `'square'`
- `'bucky'`

### `size` (`integer`, default: `50`)

This will determine the pixel size of the mosaic tiles.

## Contributions

Contributions are welcome. If you would like, you can fork this repository and make a pull-request.

## License

jQuery Fabricator is released under the [MIT license](https://github.com/braznaavtrav/jquery.fabricator/blob/master/LICENSE).

* * *

Copyright :copyright: 2014 Travis McKinney