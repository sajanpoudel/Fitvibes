import React, { Component } from 'react';

class Graph3 extends Component {
  componentDidMount() {
    // Assuming you have a ref to the iframe element
    const iframe = document.getElementById('chartIframe3');
    iframe.src = 'https://api.tryterra.co/v2/graphs/0b1bed19-7513-4014-b3e9-2a8f064e097a/dummy_data?timeframe=6';
  }

  render() {
    return (
      <div>
        <iframe id="chartIframe3" title="API Chart" width="100%" height="350" frameBorder="0"></iframe>
      </div>
    );
  }
}

export default Graph3;
