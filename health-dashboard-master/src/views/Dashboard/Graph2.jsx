import React, { Component } from 'react';

class Graph2 extends Component {
  componentDidMount() {
    // Assuming you have a ref to the iframe element
    const iframe = document.getElementById('chartIframe2');
    iframe.src = 'https://api.tryterra.co/v2/graphs/c0499bf2-1e5f-4681-95fe-648d9b53ff65/dummy_data?timeframe=0';
  }

  render() {
    return (
      <div>
        <iframe id="chartIframe2" title="API Chart" width="100%" height="350" frameBorder="0"></iframe>
      </div>
    );
  }
}

export default Graph2;
