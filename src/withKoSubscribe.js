import React from 'react';
import PropTypes from 'prop-types';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { ConnectedKoSubscribe } from './ConnectedKoSubscribe';

export const withKoSubscribe = Component => {
  const Wrapper = ({ innerRef, ...props }) => (
    <ConnectedKoSubscribe
      render={state => <Component state={state} ref={innerRef} {...props} />}
    />
  );
  Wrapper.displayName = `withKoSubscribe(${Component.displayName ||
    Component.name ||
    'Component'})`;
  Wrapper.propTypes = {
    innerRef: PropTypes.func
  };
  Wrapper.WrappedComponent = Component;
  return hoistNonReactStatics(Wrapper, Component);
};
