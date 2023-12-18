import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
// core components
import GridItem from "../../components/Grid/GridItem.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import Danger from "../../components/Typography/Danger.jsx";
import Card from "../../components/Card/Card.jsx";
import CardHeader from "../../components/Card/CardHeader.jsx";
import ChatbotPopup from "../../components/ChatbotPopup.jsx";
import CardIcon from "../../components/Card/CardIcon.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import CardFooter from "../../components/Card/CardFooter.jsx";
import Body from "./Body.jsx";
import Activity from "./Activity.jsx";
import Daily from "./Daily.jsx";
import Sleep from "./Sleep.jsx"

import Graph2 from "./Graph2.jsx";
import Graph3 from "./Graph3.jsx";
import Graph4 from "./Graph4.jsx";

import { lineChart } from "../../variables/charts.jsx";
// import { useState, useEffect } from "react";


// import { MongoClient } from "mongodb";

import {
  getFutureStressData,
  getMoodData,
  getRuminationData,
  getSleepData
} from "../../services/data";

import dashboardStyle from "../../assets/jss/modules/views/dashboardStyle.jsx";
import Graph1 from "./Graph1.jsx";
// import Body from "./Body.jsx";

async function generateGraph(){
  const userToken = await fetch("")
}

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      stressData: { labels: [], series: [] },
      moodData: { labels: [], series: [] },
      ruminationData: { labels: [], series: [] },
      sleepData: { labels: [], series: [] }
    };

    getFutureStressData().then(data => {
      this.setState({ stressData: data });
    });

    getMoodData().then(data => {
      this.setState({ moodData: data });
    });

    getRuminationData().then(data => {
      this.setState({ ruminationData: data });
    });

    getSleepData().then(data => {
      this.setState({ sleepData: data });
    });
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  getAvg(series) {
    if (series[0]) {
      const arr = series[0];
      var sum = 0;
      for (var i = 0; i < arr.length; i++) {
        sum += parseInt(arr[i], 10);
      }
      return sum / arr.length;
    }
  }

  getDiff(series) {
    if (series[0]) {
      const arr = series[0];
      const first = arr[0];
      const last = arr[arr.length - 1];
      const diff = ((last - first) / first) * 100;
      return diff.toFixed(2);
    }
    return "N/A";
  }



  render() {
    const { classes } = this.props;
    const { stressData, moodData, ruminationData, sleepData } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Icon>warning</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Total Active Minutes</p>
                <h3 className={classes.cardTitle}>
                  <Activity></Activity>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Danger>
                    <Warning />
                  </Danger>
                  <a href="#" onClick={e => e.preventDefault()}>
                    Improve your score
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <Icon>insert_emoticon</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Body Temperature</p>
                <h3 className={classes.cardTitle}>
                  <Body></Body>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 5 Months
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">

                  <Icon>av_timer</Icon>
                </CardIcon>
                <p className={classes.cardCategory}>Total Calories Burned</p>
                <h3 className={classes.cardTitle}>
                  <Daily></Daily>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 5 Months
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <Accessibility />
                </CardIcon>
                <p className={classes.cardCategory}>Average BPM in Sleep</p>
                <h3 className={classes.cardTitle}>
                  <Sleep></Sleep>
                </h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  Last 5 Months
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>




{/* 


      



        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="warning">
                <ChartistGraph
                  className="ct-chart"
                  data={stressData}
                  type="Line"
                  options={lineChart.options}
                  listener={lineChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Future Stress</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} />
                    {this.getDiff(stressData.series)}%
                  </span>{" "}
                  increase in 5 months.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="success">
                <ChartistGraph
                  className="ct-chart"
                  data={moodData}
                  type="Line"
                  options={lineChart.options}
                  listener={lineChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Mood</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} />
                    {this.getDiff(moodData.series)}%
                  </span>{" "}
                  increase in 5 months.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="danger">
                <ChartistGraph
                  className="ct-chart"
                  data={ruminationData}
                  type="Line"
                  options={lineChart.options}
                  listener={lineChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Rumination</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} />
                    {this.getDiff(moodData.series)}%
                  </span>{" "}
                  increase in 5 months.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card chart>
              <CardHeader color="info">
                <ChartistGraph
                  className="ct-chart"
                  data={sleepData}
                  type="Line"
                  options={lineChart.options}
                  listener={lineChart.animation}
                />
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>Sleep</h4>
                <p className={classes.cardCategory}>
                  <span className={classes.successText}>
                    <ArrowUpward className={classes.upArrowCardCategory} />
                    {this.getDiff(sleepData.series)}%
                  </span>{" "}
                  increase in 5 months.
                </p>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> updated 4 minutes ago
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer> */}

<h1>API Chart</h1>

        <div className="graph"style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: '10px', // Adjust the gap as needed
}}><Graph1></Graph1>
      <Graph2></Graph2>
      <Graph3></Graph3>
      <Graph4></Graph4></div>


      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
