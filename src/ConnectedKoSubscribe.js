import React from 'react';
import PropTypes from 'prop-types';
import { Subscriber } from 'react-broadcast';

import { KoProvider } from './KoProvider';

export const ConnectedKoSubscribe = props => (
  <Subscriber channel={KoProvider.channel}>
    {value => props.render(value)}
  </Subscriber>
);

ConnectedKoSubscribe.propTypes = {
  render: PropTypes.func.isRequired
};
