var GLOBAL = global || window

import React, {
  Component
} from 'react';

const TTimers = CComponent => class extends Component {
  static displayName = 'TTimers';

  _clearIntervals() {
    this.__rt_intervals.forEach(GLOBAL.clearInterval)
  }
  _clearTimeouts() {
    this.__rt_timeouts.forEach(GLOBAL.clearTimeout)
  }
  clearInterval(...args) {
    return GLOBAL.clearInterval(...args)
  }
  clearTimeout(...args) {
    return GLOBAL.clearTimeout(...args)
  }

  _clearTimers() {
    this._clearIntervals()
    this._clearTimeouts()
  }

  componentWillMount() {
    this.__rt_intervals = []
    this.__rt_timeouts = []
  }

  componentWillUnmount() {
    this._clearTimers();
  }

  setInterval(callback, ...args) {
    return this.__rt_intervals[
      this.__rt_intervals.push(
        GLOBAL.setInterval((...params) => {
          callback.call(this, ...params)
        }, ...args)
      ) - 1
    ];
  }

  setTimeout(callback, ...args) {
    return this.__rt_timeouts[
      this.__rt_timeouts.push(
        GLOBAL.setTimeout((...params) => {
          callback.call(this, ...params)
        }, ...args)
      ) - 1
    ];
  }

  render() {
    return (
      <CComponent
        setTimeout={this.setTimeout.bind(this)}
        setInterval={this.setInterval.bind(this)}
        clearTimeout={this.clearTimeout.bind(this)}
        clearInterval={this.clearInterval.bind(this)}
        {...this.props}
      />
    );
  }
}

export default TTimers;
