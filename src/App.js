import React, { Component } from 'react';
import { Button, Icon, Input, List, Row, Switch } from 'antd';
import _ from 'lodash';

import ExtHelper from './ext-helper';

const Item = List.Item;

class App extends Component {

  constructor() {
    super();
    this.state = {
      extHelper: new ExtHelper(),
      result: { error: '[ERROR] Extension not initialized yet' },
    }
  }

  componentDidMount() {
    const { extHelper } = this.state;
    extHelper.result
      .then((result) => {
        this.setState({
          result,
        });
      })
      .catch((error) => {
        this.setState({
          result: { error },
        });
      });
  }

  setNewExtState = () => {
    const { extHelper, result } = this.state;
    const { error, ...rest } = result;
    if (error) {
      console.log(error);
    } else {
      extHelper.setNewState(rest);
    }
  }

  toggleCORSStatus = (isCORSOn) => {
    const { active, ...rest } = _.get(this.state, 'result', {});
    this.setState({
      result: { active: isCORSOn, ...rest },
    }, this.setNewExtState);
  }

  setExposedHeaders = () => {
    if (this.exposedHeader) {
      const header = this.exposedHeader.input.value;
      this.exposedHeader.input.value = '';
      const { exposedHeaders, ...rest } = _.get(this.state, 'result', {});
      let headers = _.toString(exposedHeaders).trim();
      if (headers === '') {
        headers = header;
      } else {
        headers += `,${header}`;
      }

      this.setState({
        result: { exposedHeaders: headers, ...rest },
      }, this.setNewExtState);
    }
  }

  removeExposedHeader = (header) => {
    const { exposedHeaders, ...rest } = _.get(this.state, 'result', {});
    let headers = _.toString(exposedHeaders).trim();
    headers = headers.replace(new RegExp(`,?${header}`), '');
    this.setState({
      result: { exposedHeaders: headers, ...rest },
    }, this.setNewExtState);
  }

  getExposedHeaders = (result) => {
    const headers = _.toString(_.get(result, 'exposedHeaders', '')).trim();
    if (headers === '') {
      return [];
    } else {
      return headers.split(',');
    }
  }

  addURL = () => {
    const url = _.toString(_.get(this.urlPattern, 'input.value'));
    if (url) {
      const { urls, ...rest } = _.get(this.state, 'result', {});
      this.urlPattern.input.value = '';
      this.setState({
        result: { urls: (urls || []).concat([url]), ...rest },
      }, this.setNewExtState);
    }
  }

  removeURL = (urlToRemove) => {
    const { urls, ...rest } = _.get(this.state, 'result', {});
    urls.splice(urls.indexOf(urlToRemove), 1);
    this.setState({
      result: { urls, ...rest },
    }, this.setNewExtState);
  }

  doOnEnter = (callback) => {
    return function (evt) {
      if (evt.key === 'Enter') {
        callback();
      }
    }
  }

  render() {
    const { result } = this.state;
    const isCORSOn = _.get(result, 'active');
    const exposedHeaders = this.getExposedHeaders(result);
    const urls = _.get(result, 'urls', []);

    return (
      <Row className="App">
        <div>
          <div
            className='full-width title'
          >
            Settings
          </div>
          <div
            className='flex-row-space-between enable-cors'
          >
            <div>
              Enable cross-origin resource sharing
            </div>
            <Switch
              checked={isCORSOn}
              onChange={this.toggleCORSStatus}
            />
          </div>
        </div>

        <div>
          <div
            className='full-width title'
          >
            Access-Control-Expose-Headers
          </div>
          <div
            className='flex-row-space-between access-control-expose-headers'
          >
            <Input
              onKeyPress={this.doOnEnter(this.setExposedHeaders)}
              placeholder='header'
              ref={(ref) => this.exposedHeader = ref}
            />
            <Button
              className='m-l-5'
              icon='plus'
              onClick={this.setExposedHeaders}
              shape='circle'
              size='small'
              type='primary'
            />
          </div>
          <List
            className='cors-list'
            dataSource={exposedHeaders}
            locale={{ emptyText: 'No headers added' }}
            renderItem={(item) =>
              <Item>
                {item}
                <Icon
                  onClick={() => this.removeExposedHeader(item)}
                  type='delete'
                />
              </Item>
            }
          />
        </div>

        <div>
          <div
            className='full-width title'
          >
            Intercepted URLs or URL patterns
            <Icon
              className='match-patters-link'
              onClick={() => window.open('https://developer.chrome.com/extensions/match_patterns')}
              type='link'
            />
          </div>
          <div
            className='flex-row-space-between access-control-expose-headers'
          >
            <Input
              onKeyPress={this.doOnEnter(this.addURL)}
              placeholder='URL or URL Pattern'
              ref={(ref) => this.urlPattern = ref}
            />
            <Button
              className='m-l-5'
              icon='plus'
              onClick={this.addURL}
              shape='circle'
              size='small'
              type='primary'
            />
          </div>
          <List
            className='cors-list'
            dataSource={urls}
            locale={{ emptyText: 'No URLs added' }}
            renderItem={(item) =>
              <Item>
                {item}
                <Icon
                  onClick={() => this.removeURL(item)}
                  type='delete'
                />
              </Item>
            }
          />
        </div>
      </Row>
    );
  }
}

export default App;
