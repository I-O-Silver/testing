# Setting up an environment for testing

## Installing dependencies

- Install react: `npm i react react-dom`

- Install babel: `npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react`

- Install webpack: `npm i --save-dev webpack webpack-cli babel-loader`

- Install jest as a dev dependency: `npm install --save-dev jest babel-jest babel-preset-es2015 babel-preset-react react-test-renderer`

- Install enzyme as a dev dependency: `npm i --save-dev enzyme enzyme-adapter-react-16`

## Setting up webpack and babel

- Create a file called `webpack.config.js`, and add the following code:

```
const path = require('path');

const DIST_DIR = path.resolve(__dirname, 'public');
const SRC_DIR = path.resolve(__dirname, 'src');

module.exports = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: SRC_DIR,
        loader: 'babel-loader',
        query: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    ]
  }
};
```

- Create a file called `babel.config.js`, and add the following code:

```
module.exports = {
  presets: [
    '@babel/preset-react',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
};
```

## Creating your tests

- First, add a script to your `package.json` file which will run jest. It should look like: `"test": "jest"`

- Next, create a folder called `test`.

- Inside that folder, add your test files. For now, we will create a file called `App.test.js`, which will test our App component. Additional components will get their own test files that will look like `[component_name].test.js`.

These files will hold your test code, and jest will automatically find these and run them.

## Additional resources:

- The jest documentation can be found at: https://jestjs.io/docs/en/getting-started

- The enzyme documentation can be found at: https://enzymejs.github.io/enzyme/docs/api/
