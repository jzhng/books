import React from 'react';
import { Header, Empty, SoftKey } from 'kaid';

import './index.scss';

export default class Shelf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: null
    };
    // don't use class properties instead of proper manual this-binding
    // see: https://github.com/airbnb/enzyme/issues/944
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.setState({
      books: []
    });
  }

  componentDidUpdate() {
    this.focus();
  }

  focus() {
    this.element && this.element.focus();
  }

  onKeyDown(evt) {
    const { key } = evt;
    switch (key) {
      case 'SoftLeft':
        // patch needed to filemanager
        new MozActivity({      // eslint-disable-line no-undef
          name: 'view',
          data: {
            type: 'file/path',
          }
        });
        break;
      default:
        break;
    }
  };

  render() {
    const { books } = this.state;
    return (
      <div
        className="shelf"
        tabIndex="-1"
        role="menu"
        onKeyDown={this.onKeyDown}
        ref={(node) => { this.element = node; }}
      >
        <Header text="books" />
        <div className="shelf-content">
          {books
            ? books.length === 0
              ? <Empty text="no-books" />
              : null
            : null
          }
        </div>
        <SoftKey left="open" />
      </div>
    );
  }
}
