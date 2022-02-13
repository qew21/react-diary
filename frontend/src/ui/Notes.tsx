import 'antd/dist/antd.css';
import React from 'react';
import moment from 'moment';
import emitter from "../utils/ev"
import { checkStatus } from '../utils/check';
import { Input } from 'antd';

const { TextArea } = Input;

class Notes extends React.Component {
    state = {
      value: ''
    };
  
    constructor(props) {
      super(props);
      this.state = {
        value: '',
      };
    }
  
    callback = (msg) => {
      fetch("/api/diary/" + localStorage.name + "/" + msg, { headers: { 'token': localStorage.token } })
        .then(checkStatus).then(response => response.json()).then(data => {
          this.setState({ value: data.note ? data.note : "" })
          if (data.times) {
            var times = JSON.parse(data.times)
            for (let items in times) {
              localStorage.setItem(items, times[items])
            }
          }
          else {
            this.initTimes()
          }
          emitter.emit("times", '')
        });
  
    };
  
    initTimes() {
      localStorage.sleep = 8
      localStorage.exercise = 1
      localStorage.study = 1
      localStorage.entertainment = 1
      localStorage.other = 0
    }
  
    componentDidMount() {
      this.initTimes()
      var date = moment().format('YYYY-MM-DD');
      this.callback(date);
      emitter.on('connection', this.callback);
    }
  
    // 组件销毁前移除事件监听
    componentWillUnmount() {
      emitter.removeListener("connection", this.callback);
    }
  
  
    updateValue = (value) => {
      this.setState({ value });
    }
    onChange = ({ target: { value } }) => {
      this.setState({ value });
      localStorage.note = value;
  
    };
  
    render() {
      const { value } = this.state;
  
      return (
        <>
          <TextArea
            id='myDiary'
            className='MyTextArea'
            value={value}
            onChange={this.onChange}
            placeholder='今天'
            autoSize={{ minRows: 20, maxRows: 200 }}
          />
        </>
      );
    }
  }

  export default Notes;