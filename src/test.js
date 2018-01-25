/* globals describe, expect, it, document */
import React from 'react';
import ReactDOM from 'react-dom';
import ko from 'knockout';
import renderer from 'react-test-renderer';
import {KoSubscribe} from './';

describe('KoSubscribe', () => {
  it('Should not throw without props', () => {
    const App = () => (
      <div>
        <KoSubscribe />
      </div>
    );
    const wrapper = renderer
      .create(
        <div>
          <KoSubscribe />
        </div>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should get initial value using render prop', () => {
    const value = ko.observable('Hello');
    const wrapper = renderer
      .create(<KoSubscribe subscribe={{value}} render={({value}) => value} />)
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('Should get initial value using children', () => {
    const value = ko.observable('Hello');
    const wrapper = renderer
      .create(
        <KoSubscribe subscribe={{value}}>{({value}) => value}</KoSubscribe>,
      )
      .toJSON();
    expect(wrapper).toMatchSnapshot();
  });

  it('Should update when observable updates', () => {
    const counter = ko.observable(0);
    const component = renderer.create(
      <KoSubscribe subscribe={{counter}}>{({counter}) => counter}</KoSubscribe>,
    );

    expect(component.toJSON()).toMatchSnapshot();

    // Update the observable value and expect the snapshot to contain the update
    counter(1);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
