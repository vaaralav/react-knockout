import React from 'react';
import PropTypes from 'prop-types';
import { Broadcast } from 'react-broadcast';
import { KoSubscribe } from './KoSubscribe';

export class KoProvider extends React.Component {
  static channel = '__react-knockout_channel__';

  render() {
    const { children, ...props } = this.props;

    return (
      <KoSubscribe
        {...props}
        render={state => (
          <Broadcast channel={KoProvider.channel} value={state}>
            {children}
          </Broadcast>
        )}
      />
    );
  }
}

KoProvider.propTypes = {
  children: PropTypes.element.isRequired
};
