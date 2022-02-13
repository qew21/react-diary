import 'antd/dist/antd.css';
import '../css/App.css';
import React from 'react';
import { Space} from 'antd';
import Stats from '../ui/Stats';
import SmallCalendar from '../ui/SmallCalendar';
import SaveButtons from '../ui/SaveButtons';
import Notes from '../ui/Notes';
import Times from '../ui/Times';
import UserButton from '../ui/UserButton';

export default class Diary extends React.Component {
  render() {
    var screenw=screen.width;
    if(screenw>1000)
    {
      return (
        <div className="Diary">
          <header className="App-header">
            <UserButton />
            <Space size='large' align="start">
              <SmallCalendar />
              <Space direction="vertical" >
                <Notes />
                <SaveButtons />
              </Space>
              <Times />
            </Space>
            <Stats />
          </header>
        </div>
      );
    }
    else
    {
      return (
        <div className="Diary">
          <header className="App-header">
            <UserButton />
            <SmallCalendar />
            <SaveButtons />
            <Notes />
            <Times />
            <Stats />
          </header>
        </div>
      );
    }
  }
}
