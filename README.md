# react-knockout

[![Build Status](https://travis-ci.org/vaaralav/react-knockout.svg?branch=master)](https://travis-ci.org/vaaralav/react-knockout)
[![npm version](https://badge.fury.io/js/react-knockout.svg)](https://npmjs.com/package/react-knockout)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](LICENSE)

- [Install](#install)
- [Demo](#demo)
- [Usage](#usage)
- [API](#api)
- [License](#license)

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
          counter,
        }}
        render={({ counter }) => <pre>{counter}</pre>}
      />
    );
  }
}
```

### `KoProvider` - Handle subscriptions at high level and connect where needed

```jsx
import React, { Component } from 'react';
import counter from './counter'; // ko.observable
import status from './status'; // ko.observable
import queue from './queue'; // ko.observable

import {
  KoProvider,
  ConnectedKoSubscribe,
  withKoSubscribe,
} from 'react-knockout';

function Status({ state: { status = 'Unknown', queue = [] } }) {
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
          queue,
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

## API

### `<KoSubscribe subscribe render>`

Makes subscribed ko.observable changes to call the render function provided as `render` or `children` prop.

#### Props

- `subscribe`(Object of ko.observables): The ko.observables you want to subscribe.
- `render` or `children` (Function): A function that gets the values of the subscribed observables as the first parameter and returns JSX.

#### Example

Using function as `children`.

```jsx
ReactDOM.render(
  <KoSubscribe
    subscribe={{
      greeting: ko.observable('Hello'),
      name: ko.observable('world'),
    }}
  >
     {({ greeting, name }) => `${greeting}, ${name}!`}
  </KoSubscribe>,
  element,
);
```

Using `render` prop.

```jsx
ReactDOM.render(
  <KoSubscribe
    subscribe={{
      greeting: ko.observable('Hello'),
      name: ko.observable('world'),
    }}
    render={({ greeting, name }) => `${greeting}, ${name}!`}
  />,
  element,
);
```

### `<KoProvider subscribe>`

Makes the subscribed ko.observables available to `withKoSubscribe` and `<ConnectedKoSubscribe>` in the component hierarchy.

#### Props

- `subscribe`(Object of ko.observables): The ko.observables you want to subscribe.
- `children` (ReactElement): The root of your component hierarchy.

#### Example

```jsx
ReactDOM.render(
  <KoProvider subscribe={subscriptions}>
      <MyRootComponent />
  </KoProvider>,
  element,
);
```

### `<ConnectedKoSubscribe render>`

A connected component that gives access to observables subscribed with `<KoProvider>` above in the component hierarchy.

#### Props

- `render` or `children` (Function): A function that gets the values of the subscribed observables as the first parameter and returns JSX.

#### Example

```jsx
ReactDOM.render(
  <KoProvider
    subscribe={{
      greeting: ko.observable('Hello'),
      name: ko.observable('world'),
    }}
  >
    <ConnectedKoSubscribe>
      {({ greeting, name }) => `${greeting}, ${name}!`}
    </ConnectedKoSubscribe>
  </KoProvider>,
  element,
);
```

### `withKoSubscribe(Component)`

A higher-order component that gives access to observables subscribed with `<KoProvider>` above in the component hierarchy.

#### Arguments

- `Component` (ReactComponent): A component that will receive the values of subscribed observables as `state` prop.

#### Example

```jsx
const Greeter = ({ state }) => `${state.greeting}, ${state.name}!`;
const ConnectedGreeter = withKoSubscribe(Greeter);

ReactDOM.render(
  <KoProvider
    subscribe={{
      greeting: ko.observable('Hello'),
      name: ko.observable('world'),
    }}
  >
    <ConnectedGreeter />
  </KoProvider>,
  element,
);
```

## License

MIT © [Ville Vaarala](https://github.com/vaaralav)
