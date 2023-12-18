import React, { Component } from 'react';

class Sleep extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityData: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/sleep')
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
              latestActivity.heart_rate_data.summary.avg_hr_bpm
            ).toFixed(2)}
          </pre>
        )}
      </div>
    );
  }

}

export default Sleep;
