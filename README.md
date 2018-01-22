# react-knockout

## Install

```bash
npm install --save react-knockout
```

## Demo
Live demo: https://vaaralav.github.io/react-knockout

Source code: [`example/src`](example/src)

Sandbox: https://codesandbox.io/s/github/vaaralav/react-knockout/tree/master/example

## Usage

### `KoSubscribe`- Subscribe to observables on the go
```jsx
import React, { Component } from 'react';
import counter from './counter'; // ko.observable

import { KoSubscribe } from 'react-knockout';

class Example extends Component {
  render() {
    return (
      <KoSubscribe
        subscribe={{
          counter
        }}
        render={({ counter }) => <pre>{counter}</pre>}
      />
    );
  }
}
```

### `KoProvider` - Handle subscriptions at high level and connect where needed

```jsx
import React, { Component } from "react";
import counter from "./counter"; // ko.observable
import status from "./status"; // ko.observable
import queue from "./queue"; // ko.observable

import {
  KoProvider,
  ConnectedKoSubscribe,
  withKoSubscribe
} from "react-knockout";

function Status({ state: { status = "Unknown", queue = [] } }) {
  return (
    <div>
      <h3>{status}</h3>
      <ol>{queue.map(val => <li>{val}</li>)}</ol>
    </div>
  );
}

const ConnectedStatus = withKoSubscribe(Status);

class Example extends Component {
  render() {
    return (
      <KoProvider
        subscribe={{
          counter,
          status,
          queue
        }}
      >
        <div>
          <ConnectedKoSubscribe
            render={({ counter }) => <pre>{counter}</pre>}
          />
          <ConnectedStatus />
        </div>
      </KoProvider>
    );
  }
}
```

## License

MIT © [Ville Vaarala](https://github.com/vaaralav)
