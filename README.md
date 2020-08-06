# Setting up an environment for testing

## Installing dependencies

- Install react: `npm install react react-dom`

- Install babel: `npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react`

- Install webpack: `npm install --save-dev webpack webpack-cli babel-loader`

- Install jest as a dev dependency: `npm install --save-dev jest babel-jest babel-preset-es2015 babel-preset-react react-test-renderer`

- Install enzyme as a dev dependency: `npm install --save-dev enzyme enzyme-adapter-react-16`

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

This file is for building your client-side code only, and won't be used by jest.

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

This file is needed for jest to work correctly.

## Creating a component to test

- Inside of your `src/` folder, add a file called `index.jsx`. This will be the entrypoint when it comes time to actually run our app. The code for this file should look like this:

```
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/App.jsx';

ReactDom.render(<App />, document.getElementById('root'));
```

- Within your `src/` folder, create another folder called `components/`. In this folder, create a file called `App.jsx`. The code for this file should look like this:

```
import React from 'react';

const App = () => (
  <div>
    <h1 id="title">Hello, World</h1>
  </div>
);

export default App;
```

This file will simply print 'Hello, World', but it gives us something for jest to test.

## Creating your tests

- First, add a script to your `package.json` file which will run jest. It should look like: `"test": "jest --coverage"`

Adding the `--coverage` flag will tell jest to collect and report coverage information.

- Next, create a folder called `test`.

- Inside that folder, add your test files. For now, we will create a file called `App.test.js`, which will test our App component. Additional components will get their own test files that will look like `[component_name].test.js`.

These files will hold your test code, and jest will automatically find these and run them.

Inside of `App.test.js`, add the following code:

```
import React from 'react';
import App from '../src/components/App';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

test(`Should contain the title 'Hello, World'`, () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('#title').text()).toBe('Hello, World');
});
```

Now you can run `npm test`, and jest should tell you have 100% code coverage and that your test passed. Once you get your tests to pass, you can launch your `index.html` file however you like. Since your tests are passing, your app should behave exactly as you expect it to.

As your tests become more complex, you will want to wrap tests in a `describe()` function. You can also run `beforeEach()` in order to grab your component before each test runs. That may look something like this:

```
describe('Clever name for test group', () => {
  let wrapper;  // Define our component wrapper
  
  beforeEach(() => {
    wrapper = shallow(<App />);
  });
  
  test('Clever test name 1', () => {
    expect(wrapper.find('something').text()).toBe('Some value');
  });
  
  test('Clever test name 2', () => {
    expect(wrapper.find('something-else').text()).toBe('Another value');
  });
  
  test('Clever test name 3', () => {
    expect(wrapper.find('yet-another-thing').text()).toBe('Some final value');
  });
});
```

## Additional resources:

The jest documentation can be found at: https://jestjs.io/docs/en/getting-started

The enzyme documentation can be found at: https://enzymejs.github.io/enzyme/docs/api/
