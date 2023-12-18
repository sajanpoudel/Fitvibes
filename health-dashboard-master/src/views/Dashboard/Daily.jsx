import React, { Component } from 'react';

class Daily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityData: [],
    };
  }

  componentDidMount() {
    fetch('http://localhost:5000/api/daily')
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
              latestActivity.calories_data.total_burned_calories
            ).toFixed(2)}
          </pre>
        )}
      </div>
    );
  }

}

export default Daily;
