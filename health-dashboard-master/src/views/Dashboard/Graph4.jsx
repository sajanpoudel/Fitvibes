import React, { Component } from 'react';

class Graph4 extends Component {
  componentDidMount() {
    // Assuming you have a ref to the iframe element
    const iframe = document.getElementById('chartIframe4');
    iframe.src = 'https://api.tryterra.co/v2/graphs/bff820ed-39c4-4e67-bc78-8a7c6f85829f/dummy_data?timeframe=31';
  }

  render() {
    return (
      <div>
        <iframe id="chartIframe4" width="100%" height="350" frameBorder="0"></iframe>
      </div>
    );
  }
}

export default Graph4;
