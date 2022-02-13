import 'antd/dist/antd.css';
import React from 'react';
import { LeftOutlined, RightOutlined, DoubleLeftOutlined, DoubleRightOutlined} from '@ant-design/icons';
import moment from 'moment';
import { Button, message } from 'antd';
import { create_diary } from '../utils/diary';
import emitter from "../utils/ev"



class SaveButtons extends React.Component {
    info = async () => {
      try {
        const data = await create_diary(localStorage.name, localStorage.note, localStorage.date);
  
        if (data) {
          message.info('保存成功');
          emitter.emit("addDate", localStorage.date)
        }
      } catch (err) {
        if (err instanceof Error) {
          // handle errors thrown from frontend
          console.log(err.message);
        } else {
          // handle errors thrown from backend
          console.log("error while create diary");
        }
      }
    };
    render() {
      return (
        <div style={{ textAlign: "center" }} className="MySaveButton">
          <Button style={{ marginRight: 25 }} icon={<DoubleLeftOutlined />} shape="circle"
            onClick={() => { emitter.emit("date", moment(localStorage.date, "YYYYMMDD").add(-1, 'months')) }}></Button>
          <Button style={{ marginRight: 25 }} icon={<LeftOutlined />} shape="circle"
            onClick={() => { emitter.emit("date", moment(localStorage.date, "YYYYMMDD").add(-1, 'days')) }}></Button>
          <Button type="primary" style={{ marginRight: 25 }} onClick={this.info} shape="round">保存</Button>
          <Button icon={<RightOutlined />} style={{ marginRight: 25 }} shape="circle"
            onClick={() => { emitter.emit("date", moment(localStorage.date, "YYYYMMDD").add(1, 'days')) }}></Button>
          <Button icon={<DoubleRightOutlined />} shape="circle"
            onClick={() => { emitter.emit("date", moment(localStorage.date, "YYYYMMDD").add(1, 'months')) }}></Button>
        </div>
      );
    }
  }

  export default SaveButtons;