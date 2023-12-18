import React, { Component } from 'react';

class Graph1 extends Component {
  componentDidMount() {
    // Assuming you have a ref to the iframe element
    const iframe = document.getElementById('chartIframe1');
    iframe.src = 'https://api.tryterra.co/v2/graphs/7409e55c-12fd-4090-a315-17bb2c681582/dummy_data?timeframe=7';
  }

  render() {
    return (
      <div>
        <iframe id="chartIframe1" width="100%" height="350" frameBorder="0"></iframe>
      </div>
    );
  }
}

export default Graph1;
