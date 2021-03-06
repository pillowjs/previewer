'use strict';

const React = require('react');
const QRCode = require('qrcode.react');
const ForkmeonComponent = require('forkmeon.github.io');

const pkg = require('../package');

const backgroundImage = '//pillowjs.github.io/demoview/assets/iphone.png';

const noop = () => {};
const getUrlParams = name => {
  var results = new RegExp(`[\\?&]${name}=([^&#]*)`).exec(location.href);
  return results ? results[1] : null;
};

class DemoView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
  }

  renderChildren() {
    return (
      <div
        className="content"
        style={{
          marginTop: `${this.props.containerWidth / 5}px`,
          display: 'inline-block'
        }}
      >
        <div
          className="preview"
          style={{
            width: this.props.containerWidth,
            height: this.props.containerHeight,
            overflow: 'hidden',
            float: 'left',
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: '100%'
          }}
        >
          <iframe
            src={ this.props.previewUrl }
            style={{
              width: '506px',
              height: '895px',
              overflow: 'scroll',
              border: 'none',
              marginTop: '178px',
              marginLeft: '6px',
              borderRadius: '2px',
              zoom: '0.5'
            }}
            scrolling="no"
          ></iframe>
        </div>
        <div
          className="qrcode"
          style={{
            float: 'right',
            marginTop: '2px',
            marginLeft: `${this.props.containerWidth / 10}px`
          }}
        >
          <QRCode
            value={ this.props.previewUrl }
            size={ this.props.containerWidth - 100 }
          />

          <div className="info">
          </div>
        </div>
      </div>
    );
  }

  getForkmeonProps() {
    return {
      classPrefix: pkg.name,
      fixed: true,
      text: 'Fork me on Github',
      linkUrl: pkg.repository.url,
      onDemoUpdateDid: noop,
      flat: true
    };
  }

  render() {
    return (
      <div
        ref="container"
        className={`${this.props.prefixClassName}-container`}
        style={{
          textAlign: 'center'
        }}
      >
        <header>
          <ForkmeonComponent {...this.getForkmeonProps()}/>
        </header>
        {this.renderChildren()}
        <footer>
        </footer>
      </div>
    );
  }
}

const previewUrl = getUrlParams('previewUrl');

DemoView.defaultProps = {
  containerWidth: 300,
  containerHeight: 627,
  prefixClassName: 'rc-demoview',
  previewUrl: previewUrl ? decodeURIComponent(previewUrl) : 'https://pillowjs.github.io/pillow'
};

module.exports = DemoView;
