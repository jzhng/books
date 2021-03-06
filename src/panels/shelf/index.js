import React from 'react';
import { Header, Empty, SoftKey, List, ListItem } from 'kaid';

import './index.scss';

export default class Shelf extends React.Component {
  constructor(props) {
    super(props);
    // don't use class properties instead of proper manual this-binding
    // see: https://github.com/airbnb/enzyme/issues/944
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  componentDidMount() {
    this.focus();
  }

  componentDidUpdate() {
    SoftKey.register({
      left: 'open',
      center: this.list ? 'read' : '',
      right: ''
    }, this.element);
    this.focus();
  }

  componentWillUnmount() {
    SoftKey.unregister(this.element);
  }

  focus() {
    this.list ? this.list.focus() : this.element.focus();
  }

  show = () => {
    this.element.classList.remove('hidden');
    this.focus();
  }

  hide = () => {
    this.element.classList.add('hidden');
  }

  onKeyDown(evt) {
    const { key, target } = evt;
    const { onSelect } = this.props;
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

      case 'Enter':
        if (this.list) {
          onSelect(target.id);
        }
        break;

      default:
        break;
    }
  };

  render() {
    const { books } = this.props;
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
          {
            books.size === 0
              ? <Empty text="no-books" />
              : (
                <List ref={(list) => { this.list = list; }}>
                  {[...books.values()].map(file => (
                    <ListItem
                      primary={file.metadata.title}
                      icon="file"
                      focusable="true"
                      key={file.name}
                      id={file.name}
                    />
                  ))}
                </List>
              )
          }
        </div>
        <SoftKey left="open" />
      </div>
    );
  }
}
