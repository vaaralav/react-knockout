import React from 'react';
import PropTypes from 'prop-types';

export class WithSubscriptions extends React.Component {
  static propTypes = {
    subscribe: PropTypes.object.isRequired,
    render: PropTypes.func.isRequired
  };

  static defaultProps = {
    subscribe: {}
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
    const { subscribe } = this.props;
    this.subscriptions = Object.keys(this.props.subscribe).map(key =>
      this.props.subscribe[key].subscribe(value =>
        this.setState(() => ({ [key]: value }))
      )
    );
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.dispose());
  }

  render() {
    const { render } = this.props;

    return render(this.state);
  }
}
