# react-knockout

## Install

```bash
npm install --save react-knockout
```

## Usage

```jsx
import React, { Component } from 'react';
import counter from './counter'; // ko.observable

import { WithSubscriptions } from 'react-knockout';

class Example extends Component {
  render() {
    return (
      <WithSubscriptions
        subscribe={{
          counter
        }}
        render={({ counter }) => <pre>{counter}</pre>}
      />
    );
  }
}
```

## License

MIT © [Ville Vaarala](https://github.com/vaaralav)
