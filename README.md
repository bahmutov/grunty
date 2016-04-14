# grunty

> Run any grunt plugin as NPM script without Gruntfile.js

[![NPM][grunty-icon] ][grunty-url]

[![Build status][grunty-ci-image] ][grunty-ci-url]
[![dependencies][grunty-dependencies-image] ][grunty-dependencies-url]
[![devdependencies][grunty-devdependencies-image] ][grunty-devdependencies-url]
[![semantic-release][semantic-image] ][semantic-url]

## Zero task configuration (defaults)

Often I want to run a simple task as NPM script, but hate creating verbose Gruntfile, installing
grunt dependencies, etc. Enter **grunty** - just specify the plugin's module, name and any options
in the NPM script command. No global grunt installation is necessary.

`npm install --save-dev grunty`

then use in the `package.json`

```json
"scripts": {
  "concat": "grunty grunt-contrib-concat concat --src=a.js,b.js --dest=dist/out.js",
  "nice": "grunty grunt-nice-package nice-package"
}
```

## Using configuration file

You can even pass configuration using a JSON file or JS file (just export an object)

For example, put grunt plugin configurations into `config.json`

```json
{
    "concat": {
        "default": {
            "src": ["a.js", "b.js"],
            "dest": "dist/out.js"
        }
    }
}
```

The add `config.json` to the NPM script line

```json
"scripts": {
  "concat": "grunty grunt-contrib-concat concat config.json",
}
```

You can see an example JSON config file in [test/concat.json](test/concat.json) which can be
triggered using `npm run concat-config` command defined in the [package scripts](package.json).

Similarly you can export the JavaScript object from a JS file for configuration,
see [test/concat.js](test/concat.js)

## Examples

### Deploying to GitHub pages

```sh
npm i -D grunty grunt-gh-pages
```

Create `deploy.json`

```json
{
  "gh-pages": {
    "options": {
      "base": "."
    },
    "src": [
      "index.html",
      "dist/app-bundle.min.js"
    ]
  }
}
```

```json
{
  "scripts": {
    "deploy": "grunty grunt-gh-pages gh-pages deploy.json"
  }
}
```

The run `npm run deploy` to deploy to GitHub pages.

## Details

Separate multiple values like filenames using `,` as in `--src=path/to/foo,path/to/bar`

The plugin runs with the your local `package.json` attached to the config, thus you can use
`pkg.name`, `pkg.description` and other properties.
If the plugin requires more elaborate options, write `Gruntfile.js`.

You do need to install the actual plugin and save reference in the `dev` dependencies.

Read [Put mock data into Node require cache](http://glebbahmutov.com/blog/put-mock-data-into-node-require-cache/)
to learn how this project fakes `gruntfile.js` without actually even saving mock one to disk.

If you need to run an example and see diagnostic messages, you can using npm scripts and enabling
the debug messages using [debug](https://www.npmjs.com/package/debug).
For example to debug parsing config json

    $ DEBUG=cli npm run concat-config
    > grunty grunt-contrib-concat concat test/concat.json
    grunty@0.1.2 - Run any grunt plugin as NPM script without Gruntfile.js
      "Gleb Bahmutov <gleb.bahmutov@gmail.com>" https://github.com/bahmutov/grunty
      cwd /Users/gleb/git/grunty
      cli grunty options +0ms { tasks: [], npm: [] }
      cli grunty plugin +2ms grunt-contrib-concat
      cli grunty target +0ms concat
      cli grunty config filename +1ms /grunty/test/concat.json

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/grunty/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[grunty-icon]: https://nodei.co/npm/grunty.png?downloads=true
[grunty-url]: https://npmjs.org/package/grunty
[grunty-ci-image]: https://travis-ci.org/bahmutov/grunty.png?branch=master
[grunty-ci-url]: https://travis-ci.org/bahmutov/grunty
[grunty-dependencies-image]: https://david-dm.org/bahmutov/grunty.png
[grunty-dependencies-url]: https://david-dm.org/bahmutov/grunty
[grunty-devdependencies-image]: https://david-dm.org/bahmutov/grunty/dev-status.png
[grunty-devdependencies-url]: https://david-dm.org/bahmutov/grunty#info=devDependencies
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
