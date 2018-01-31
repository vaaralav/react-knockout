import React from 'react';
import PropTypes from 'prop-types';
import { Subscriber } from 'react-broadcast';

import { KoProvider } from './KoProvider';

export function ConnectedKoSubscribe(props) {
  const {render, children = render} = props;
  return (
    <Subscriber channel={KoProvider.channel}>
      {value => children(value)}
    </Subscriber>
  );
}

ConnectedKoSubscribe.defaultProps = {
  render: () => null,
};

ConnectedKoSubscribe.propTypes = {
  children: PropTypes.func,
  render: PropTypes.func,
};
