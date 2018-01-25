import React from 'react';
import PropTypes from 'prop-types';

export class KoSubscribe extends React.Component {
  static propTypes = {
    subscribe: PropTypes.object.isRequired,
    render: PropTypes.func,
    children: PropTypes.func,
  };

  static defaultProps = {
    subscribe: {},
    render: () => null,
  };

  constructor(props) {
    super(props);
    this.state = Object.keys(props.subscribe).reduce((state, key) => {
      state[key] = props.subscribe[key]();
      return state;
    }, {});

    this.subscriptions = [];
  }

  componentDidMount() {
    this.subscriptions = Object.keys(this.props.subscribe).map(key =>
      this.props.subscribe[key].subscribe(value =>
        this.setState(() => ({[key]: value})),
      ),
    );
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.dispose());
  }

  render() {
    const {render, children = render} = this.props;

    return children(this.state);
  }
}
