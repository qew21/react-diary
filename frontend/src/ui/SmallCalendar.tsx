import React from 'react';
import emitter from "../utils/ev"
import { UserOutlined, LeftOutlined, RightOutlined, DoubleLeftOutlined, DoubleRightOutlined, SyncOutlined, MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import moment, { Moment } from 'moment';
import { Menu, Dropdown, Button, message, Space, Tooltip, Typography, Select, Radio, Col, Row, } from 'antd';
import { Calendar, Badge, InputNumber } from 'antd';
import { checkStatus } from '../utils/check';


class SmallCalendar extends React.Component {
    state = {
      month: moment().format('YYYY-MM'),
      dateList: ['']
    };
    loading = true
    dateCellRender = (value) => {
      var date = value.format('YYYY-MM-DD');
      if (this.state.dateList.includes(date)) {
        return (
          <ul className="events" key={date}>
            <div style={{ textAlign: 'center' }}>
              <Badge status="success" text="1" />
            </div>
          </ul>
        );
      }
  
    }
    fetchUrl = () => {
      var temparrayDate = [''];
      var option = {}
      fetch("/api/date/" + localStorage.name + "/" + this.state.month, { headers: { 'token': localStorage.token } })
        .then(checkStatus).then(response => response.json()).then(data => {
          if (data != null && 'date' in data) {
            for (var x in data.date)  // x 为属性名
            {
              if (!temparrayDate.includes(data.date[x]))
                temparrayDate.push(data.date[x]);
            }
          }
          if (data != null && 'option' in data) {
            option = data.option
            emitter.emit("stats", option)
          }
  
          this.setState({
            dateList: temparrayDate,
          });
        });
  
    }
    addDate = (msg) => {
      if (!this.state.dateList.includes(msg)) {
        this.state.dateList.push(msg)
        this.setState({
          dateList: this.state.dateList,
        });
      }
    }
  
    componentDidMount() {
      this.fetchUrl();
      localStorage.date = moment().format('YYYY-MM-DD')
      emitter.on('addDate', this.addDate);
  
  
    }
  
    onPanelChange = (value: any, mode: any) => {
      if (mode == "month") {
        this.state.month = value.format('YYYY-MM');
        this.fetchUrl();
      }
    }

    onSelect = (date: moment.Moment) => {
        localStorage.date = date.format('YYYY-MM-DD')
        emitter.emit("connection", localStorage.date)
        // cb(date);
    }

    render() {
      return (
        <div className="site-calendar-demo-card">
          <Calendar
            fullscreen={true}
            headerRender={({ value, type, onChange, onTypeChange }) => {
              const start = 0;
              const end = 12;
              const monthOptions: JSX.Element[] = [];
  
              const current = value.clone();
              const localeData = value.localeData();
              const months: string[] = [];
              for (let i = 0; i < 12; i++) {
                current.month(i);
                months.push((i + 1) + "月");
              }
  
              for (let index = start; index < end; index++) {
                monthOptions.push(
                  <Select.Option className="month-item" key={`${index}`} value={`${index}`}>
                    {months[index]}
                  </Select.Option>,
                );
              }
              const month = value.month();
  
              const year = value.year();
              const options: JSX.Element[] = [];
              for (let i = year - 10; i < year + 10; i += 1) {
                options.push(
                  <Select.Option key={i} value={i} className="year-item">
                    {i}
                  </Select.Option>,
                );
              }
              const callback = (msg) => {
                onChange(msg);
  
              };
              if (this.loading) {
                emitter.on('date', callback)
                this.loading = false
              }
  
  
              return (
  
                <div style={{ padding: 8 , backgroundColor: "#f0f0f0"}}>
                  <Row gutter={8}>
                    <Col>
                      <Radio.Group size="small" onChange={e => onTypeChange(e.target.value)} value={type}>
                        <Radio.Button value="month">Month</Radio.Button>
                        <Radio.Button value="year">Year</Radio.Button>
                      </Radio.Group>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        className="my-year-select"
                        onChange={newYear => {
                          const now = value.clone().year(Number(newYear));
                          onChange(now);
                        }}
                        value={String(year)}
                      >
                        {options}
                      </Select>
                    </Col>
                    <Col>
                      <Select
                        size="small"
                        dropdownMatchSelectWidth={false}
                        value={String(month)}
                        onChange={selectedMonth => {
                          const newValue = value.clone();
                          newValue.month(parseInt(selectedMonth, 10));
                          onChange(newValue);
                        }}
                      >
                        {monthOptions}
                      </Select>
                    </Col>
                  </Row>
                </div>
              );
            }}
            style={{
              width: '300px',
              border: 'none',
              borderRadius: '0px',
              cursor: 'pointer',
              fontSize: '12px',
              margin: '0px',
              padding: '0px',
            }}
            onPanelChange={this.onPanelChange}
            dateCellRender={this.dateCellRender}
            onSelect={this.onSelect}
          />
        </div>
      );
    }
  }
  

  export default SmallCalendar;