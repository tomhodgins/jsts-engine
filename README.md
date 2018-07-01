# jsts-engine

**Interpolate Files as JavaScript Template Strings**

## About

This function allows you to treat any file or string as a JavaScript template string, and use 100% vanilla JavaScript logic for templating and preprocessing.

## Usage

This plugin is provided in the following three formats:

- [index.js](index.js) is a CommonJS module formatted for Node.js
- [index.es.js](index.es.js) is a standard ES module
- [index.browser.js](index.browser.js) is a script containing a named function

### Installing from npm

```
npm install jsts-engine
```

### Linking from cdn

The two options for CDN-hosted usage include linking the ES module:

```html
<script type=module>
  import jstsEngine from 'https://tomhodgins.github.io/jsts-engine/index.es.js'

  // your code here…
</script>
```

Or alternatively linking the browser version:

```html
<script src=https://tomhodgins.github.io/jsts-engine/index.browser.js></script>
<script>
  // your code here…
</script>
```

## JSTS Format

The JSTS format is simply treating a file as a JavaScript Template string. Anything outside of the `${}` brackets is the host file (in whatever language that may be) and everything inside the `${}` brackets is 100% JavaScript.

This means you can use JavaScript, JavaScript's logic, and even functions to help you template files in any language, you can template HTML, preprocess CSS, template natural language documents - the possibilities are endless.

### Writing JSTS files

To write a JSTS file you need any text that can optionally include `${}`, and any valid JavaScript inside those brackets. Here's a simple example:

```js
This is a JSTS file. 1 + 2 + 3 + 4 = ${1 + 2 + 3 + 4}.
```

### Reading JSTS files

Next, in order to turn our file (a string) into what we want, we must first read the string as a JavaScript template string, interpolate the JavaScript in `${}` brackets, and then return the result. This is what the jsts-engine function does.

```js
jstsEngine(string, environment)
```

The JSTS engine accepts a string, and optionally also a JavaScript object that you can add any objects (variables, values, functions, etc) that you want to be available during the interpolation of the string.

There is also an additional argument called `output` which is created at the time of interpolation and you are able to interact with and even write to.

At the end of interpolation, the JSTS engine will return an array that contains two things:

- the string after interpolation
- the output object

### Reading templates

Suppose we have the JSTS engine loaded with the name `jstsEngine` for the following examples:

```js
jstsEngine('1 + 2 + 3 + 4 = ${1 + 2 + 3 + 4}')
```

When we run this, we get back an array like this containing the interpolated string, and the result of the output object:

```js
['1 + 2 + 3 + 4 = 10', {}]
```

Now suppose we have a string like this: `Double 5 is: ${double(5)}`. When we interpolate that, unless we explicitly give the JSTS engine a `double()` function in the environment object it won't know what do to:

```js
jstsEngine(
  'Double 5 is: ${double(5)}',
  {double: num => num * 2}
)
```

And we get back this result:

```js
['Double 5 is: 10', {}]
```

### The output object

The output object is an optional space where values can be written and accessed during interpolation, as well as surviving to be returned with the interpolated string. This allows you to be as flexible with the output of your file as you can be with the input. Consider the following examples:

```js
jstsEngine(
  '${output.word = "Hello"} world. ${output.word} everybody!'
)
```

In this example, we write the string `"Hello"` to `output.word`. Not only does this allow us to re-use this value later in our template by referring to `${output.word}` a second time, but we also end up with `{word: "Hello"}` as our output object, allowing us to work with the data further even after the interpolation is complete.

```js
["Hello world. Hello everybody!", {word: "Hello"}]
```

## Plugins

- [jsts-node](https://github.com/tomhodgins/jsts-node)
- [jsts-dom](https://github.com/tomhodgins/jsts-dom)

## Further reading

- [JavaScript techniques for preprocessing CSS](https://responsive.style/theory/what-is-a-jic-stylesheet.html)
- [Using JSTS files for working with CSS](https://responsive.style/theory/the-jic-format.html)