import React from 'react';
import ReactEcharts from 'echarts-for-react';
import emitter from "../utils/ev"

const defaultOption = {
    title: {
      text: ''
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['sleep', 'exercise', 'study', 'entertainment', 'other']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: []
    },
    yAxis: {
      type: 'value',
      splitLine:{show: false},
    },
    series: [
      {
        name: 'sleep',
        type: 'line',
        data: []
      },
      {
        name: 'exercise',
        type: 'line',
        data: []
      },
      {
        name: 'study',
        type: 'line',
        data: []
      },
      {
        name: 'entertainment',
        type: 'line',
        data: []
      },
      {
        name: 'other',
        type: 'line',
        data: []
      }
    ]
  };
  
  
class Stats extends React.Component {  
    state = {
        option:{...defaultOption}
      };

    callback =(msg)=> {
        this.setState({option: msg})
        
      };

    componentDidMount  ()
  {
    emitter.on('stats', this.callback);
  }
  render(){
      return <ReactEcharts
      option={this.state.option}
      style={{marginTop:'5%',width:'90%',height: '300px'}}
  ></ReactEcharts>

  }
  
}

export default Stats;