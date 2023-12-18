import React, { Component } from 'react';

class Body extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityData: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/body')
      .then((response) => response.json())
      .then((data) => this.setState({ activityData: data }))
      .catch((error) => console.error('Error fetching activity data:', error));
  }

  render() {
    const latestActivity = this.state.activityData[
      this.state.activityData.length - 1
    ];

    return (
      <div>
        {latestActivity && (
          <pre>
            {parseFloat(
              latestActivity.temperature_data.body_temperature_samples[4].temperature_celsius
            ).toFixed(2)}
          </pre>
        )}
      </div>
    );
  }
}

export default Body;
