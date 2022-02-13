import 'antd/dist/antd.css';
import React from 'react';
import { Input } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Button,Space } from 'antd';
import emitter from "../utils/ev"
import Icon from '@ant-design/icons';

class Times extends React.Component {
  state = {
    sleep: Number(localStorage.sleep),
    exercise:  Number(localStorage.exercise),
    study:  Number(localStorage.study),
    entertainment:  Number(localStorage.entertainment),
    other:  Number(localStorage.other),
  };

  sleepChange = (value) => {
    this.state.sleep = Number(value.target.value);
    localStorage.sleep = value.target.value
    this.setState(this.state)
  }
  exerciseChange = (value) => {
    this.state.exercise = Number(value.target.value);
    localStorage.exercise = value.target.value
    this.setState(this.state)
  }
  studyChange = (value) => {
    this.state.study = Number(value.target.value);
    localStorage.study = value.target.value
    this.setState(this.state)
  }
  entertainmentChange = (value) => {
    this.state.entertainment = Number(value.target.value);
    localStorage.entertainment = value.target.value
    this.setState(this.state)
  }
  otherChange = (value) => {
    this.state.other = Number(value.target.value);
    localStorage.other = value.target.value
    this.setState(this.state)
  }
  callback = () => {
    for (let item in this.state) {
      this.state[item] = Number(localStorage.getItem(item))
    }
    this.setState(this.state)

  };

  componentDidMount() {
    emitter.on('times', this.callback);
  }

  SleepSvg = () => (
    <svg width="1.5em" height="1.5em" fill="currentColor" viewBox="0 0 1024 1024">
      <path d="M284.444444 341.333333c0-65.422222 17.066667-128 45.511112-182.044444C209.066667 
    224.711111 126.577778 351.288889 126.577778 497.777778c0 211.911111 172.088889 384 384 384 146.488889 
    0 273.066667-82.488889 338.488889-201.955556-54.044444 28.444444-115.2 45.511111-182.044445 
    45.511111C456.533333 725.333333 284.444444 553.244444 284.444444 341.333333z 
    m378.311112-184.888889h36.977777l-46.933333 46.933334c-4.266667 4.266667-5.688889 9.955556-2.844444 
    15.644444 2.844444 5.688889 7.111111 8.533333 12.8 8.533334h71.111111c8.533333 0 14.222222-5.688889 
    14.222222-14.222223s-5.688889-14.222222-14.222222-14.222222H696.888889l46.933333-46.933333c4.266667-4.266667 
    5.688889-9.955556 2.844445-15.644445-2.844444-5.688889-7.111111-8.533333-12.8-8.533333h-71.111111c-8.533333 
    0-14.222222 5.688889-14.222223 14.222222s7.111111 14.222222 14.222223 14.222222z m234.666666 
    265.955556h-93.866666l103.822222-103.822222c4.266667-4.266667 5.688889-9.955556 
    2.844444-15.644445-2.844444-5.688889-7.111111-8.533333-12.8-8.533333h-128c-8.533333 
    0-14.222222 5.688889-14.222222 14.222222s5.688889 14.222222 14.222222 14.222222h93.866667L759.466667 
    426.666667c-4.266667 4.266667-5.688889 9.955556-2.844445 15.644444 2.844444 5.688889 7.111111 8.533333 
    12.8 8.533333h128c8.533333 0 14.222222-5.688889 14.222222-14.222222s-7.111111-14.222222-14.222222-14.222222z"
        p-id="3582"></path><path d="M536.177778 401.066667h51.2L526.222222 462.222222c-4.266667 4.266667-5.688889 
    9.955556-2.844444 15.644445 2.844444 5.688889 7.111111 8.533333 12.8 8.533333h85.333333c8.533333 0 
    14.222222-5.688889 14.222222-14.222222s-5.688889-14.222222-14.222222-14.222222h-51.2l61.155556-61.155556c4.266667-4.266667 
    5.688889-9.955556 2.844444-15.644444-2.844444-5.688889-7.111111-8.533333-12.8-8.533334h-85.333333c-8.533333 
    0-14.222222 5.688889-14.222222 14.222222s7.111111 14.222222 14.222222 14.222223z" p-id="3583"></path></svg>
  );

  StudySvg = () => (
    <svg width="1.5em" height="1.5em" fill="currentColor" viewBox="0 0 1024 1024"> 
    <path d="M758.518519 830.577778H265.481481c-10.42963 0-18.962963-8.533333-18.962962-18.962963s8.533333-18.962963 18.962962-18.962963h493.037038c10.42963 0 18.962963 8.533333 18.962962 18.962963s-8.533333 18.962963-18.962962 18.962963z" fill="#FAC858" p-id="1903"></path><path d="M984.367407 203.472593c0-20.859259-17.066667-37.925926-37.925926-37.925926s-37.925926 17.066667-37.925925 37.925926V813.131852c0 52.337778-50.062222 94.814815-111.691852 94.814815H224.331852c-61.62963 0-111.691852-42.477037-111.691852-94.814815s50.062222-94.814815 111.691852-94.814815h587.662222c20.859259 0 37.925926-17.066667 37.925926-37.925926V77.558519c0-20.859259-17.066667-37.925926-37.925926-37.925926H261.878519c-124.017778 0-224.900741 100.882963-224.900741 224.90074v548.598519c0 94.056296 84.195556 170.666667 187.543703 170.666667h572.491852c103.348148 0 187.543704-76.61037 187.543704-170.666667v-0.379259-609.28z m-722.488888-87.988149h512.189629v526.980741H224.331852c-41.908148 0-80.402963 12.705185-111.691852 33.943704V264.533333c0.18963-82.10963 66.939259-149.048889 149.238519-149.048889z" fill="#FAC858" p-id="1904"></path></svg>
  )

  ExerciseSvg = () => (
    <svg width="1.5em" height="1.5em" fill="currentColor" viewBox="0 0 1024 1024"> 
    <path d="M640 192c53.02 0 96-42.98 96-96S693.02 0 640 0s-96 42.98-96 96 42.98 96 96 96zM323.38 634.94l-29.6 69.04H160c-35.34 0-64 28.66-64 64s28.66 64 64 64h154.9c38.5 0 73.16-22.88 88.22-58.18l17.58-41.04-21.34-12.6c-34.64-20.46-60.12-50.74-75.98-85.22zM864 447.98h-88.06l-52.12-106.5c-25-51.1-70.9-88.46-123.56-101.88L458.1 197.32c-56.6-13.6-115.54-1.1-161.68 34.28l-79.34 60.82c-28.06 21.5-33.38 61.66-11.84 89.72s61.68 33.32 89.72 11.84l79.38-60.82c15.34-11.78 34.88-16 50.54-12.28l29.4 8.74-74.92 174.78c-25.24 58.96-2.62 128.02 52.6 160.62l169.96 100.34-54.94 175.46c-10.56 33.72 8.22 69.62 41.94 80.18 6.38 2 12.82 2.96 19.16 2.96 27.22 0 52.46-17.54 61.04-44.9l63.28-202.12c11.82-41.54-5.78-86.16-43.28-108.78l-122.48-72.28 62.62-156.56 40.54 82.86c16 32.68 49.84 53.78 86.22 53.78H864c35.34 0 64-28.66 64-64s-28.66-63.98-64-63.98z" p-id="7628"></path></svg>
  )

  EntertainmentSvg = () => (
    <svg width="1.5em" height="1.5em" fill="currentColor" viewBox="0 0 1024 1024"> 
    <path d="M690.603259 197.695594c-130.6015 63.541175-217.283722 58.476833-352.33558-1.032516-236.486062 0-372.078227 626.730021-195.176215 626.730021 149.263535 0 169.351036-183.255721 373.770775-183.255721 165.317163 0 262.342963 180.992167 372.618533 180.992167C1066.279431 821.084521 886.692263 197.695594 690.603259 197.695594L690.603259 197.695594zM339.797521 509.998413c-65.443501 0-118.522394-52.281737-118.522394-116.705002 0-64.34754 53.078893-116.678396 118.522394-116.678396 65.442478 0 118.503974 52.312436 118.503974 116.678396C458.288193 457.69928 405.238976 509.998413 339.797521 509.998413L339.797521 509.998413zM636.535853 405.341818c-19.346627-5.934153-30.097482-26.229384-23.983227-45.297672 5.997598-18.989493 26.609031-29.588899 45.927005-23.62507 19.351744 5.906523 30.191626 26.145473 24.044626 45.178969C676.529729 400.799362 655.918295 411.280064 636.535853 405.341818L636.535853 405.341818zM822.5545 435.8169c-6.149047 19.063171-26.638707 29.618575-45.985334 23.681352-19.295462-5.92085-30.099529-26.199709-24.057929-45.387723 6.113231-19.050891 26.755364-29.557176 45.955658-23.698748C817.836035 396.469754 828.642149 416.690284 822.5545 435.8169L822.5545 435.8169zM775.322779 351.141382c-6.17463 19.094894-26.691919 29.632901-46.016033 23.743774-19.262716-5.939269-30.128181-26.229384-24.088628-45.373397 6.118348-19.064194 26.727735-29.588899 45.985334-23.726378C770.616594 311.85768 781.362332 332.046488 775.322779 351.141382L775.322779 351.141382zM726.055702 463.348953c-6.236028 19.113313-26.723641 29.65132-46.077432 23.717168-19.261693-5.938246-30.067806-26.189476-24.058952-45.341674 6.118348-19.024286 26.756387-29.607318 45.957705-23.730471C721.224674 424.020226 732.006228 444.223361 726.055702 463.348953L726.055702 463.348953zM399.691633 395.060661c0 33.262568-27.279297 60.183707-61.002352 60.183707-33.789571 0-61.068867-26.921139-61.068867-60.183707 0-33.155121 27.279297-60.107983 61.068867-60.107983C372.412336 334.952678 399.691633 361.90554 399.691633 395.060661L399.691633 395.060661zM399.691633 395.060661" p-id="2905" fill="#DA6666"></path></svg>
  )

  OtherSvg = () => (
    <svg width="1.5em" height="1.5em" fill="currentColor" viewBox="0 0 1024 1024"> 
    <path d="M127.6416 489.1136m-93.8496 0a1.833 1.833 0 1 0 187.6992 0 1.833 1.833 0 1 0-187.6992 0Z" p-id="8527"></path><path d="M497.408 489.1136m-93.8496 0a1.833 1.833 0 1 0 187.6992 0 1.833 1.833 0 1 0-187.6992 0Z" p-id="8528"></path><path d="M867.1744 489.1136m-93.8496 0a1.833 1.833 0 1 0 187.6992 0 1.833 1.833 0 1 0-187.6992 0Z" p-id="8529"></path></svg>
  )

  SleepIcon = props => <Icon component={this.SleepSvg} {...props}/>;
  ExerciseIcon = props => <Icon component={this.ExerciseSvg} {...props} />;
  StudyIcon = props => <Icon component={this.StudySvg} {...props} />;
  EntertainmentIcon = props => <Icon component={this.EntertainmentSvg} {...props} />;
  OtherIcon = props => <Icon component={this.OtherSvg} {...props} />;
  render() {
    return (
      <Space direction="vertical" className="MyTimeCollect">
        <Space size="large" align="center">
            <Button icon={<this.SleepIcon />} style={{ color: '#436D96', height
            :50,  width: 50 }} shape="circle" type="link"/>
          <Input id='sleep' value={this.state.sleep.toString()}
            onChange={this.sleepChange}  bordered={false} style={{ color: '#436D96', height
            :50,  width: 40, alignItems: "center" }} size="large"/>
            <Button icon={<MinusCircleOutlined />} style={{ color: '#436D96', height
            :50,  width: 50 }} shape="circle"  type="link" onClick={
              ()=> this.sleepChange({target: {value: this.state.sleep - 1}})
              } disabled={this.state.sleep <= 0}/>
            <Button icon={<PlusCircleOutlined />} style={{ color: '#436D96', height
            :50,  width: 50 }} shape="circle"  type="link" onClick={
              ()=> this.sleepChange({target: {value: this.state.sleep + 1}})
              }/>
        </Space>
        
        <Space size="large" align="center">
            <Button icon={<this.ExerciseIcon />} style={{ color: '#1CE29F', height
            :50,  width: 50 }} shape="circle" type="link"/>
          <Input id='exercise'value={this.state.exercise.toString()}
            onChange={this.exerciseChange}  bordered={false} style={{ color: '#1CE29F', height
            :50,  width: 40, alignItems: "center" }} size="large"/>
            <Button icon={<MinusCircleOutlined />} style={{ color: '#1CE29F', height
            :50,  width: 50 }} shape="circle"  type="link" onClick={
              ()=> this.exerciseChange({target: {value: this.state.exercise - 1}})
              } disabled={this.state.exercise <= 0}/>
            <Button icon={<PlusCircleOutlined />} style={{ color: '#1CE29F', height
            :50,  width: 50 }} shape="circle"  type="link" onClick={
              ()=> this.exerciseChange({target: {value: this.state.exercise + 1}})
              } />
        </Space>

        <Space size="large" align="center">
            <Button icon={<this.StudyIcon />} style={{ color: '#FAC858', height
            :50,  width: 50 }} shape="circle" type="link"/>
          <Input id='study'value={this.state.study.toString()}
            onChange={this.studyChange}  bordered={false} style={{ color: '#FAC858', height
            :50,  width: 40, alignItems: "center" }} size="large"/>
            <Button icon={<MinusCircleOutlined />} style={{ color: '#FAC858', height
            :50,  width: 50 }} shape="circle"  type="link" onClick={
              ()=> this.studyChange({target: {value: this.state.study - 1}})
              } disabled={this.state.study <= 0}/>
            <Button icon={<PlusCircleOutlined />} style={{ color: '#FAC858', height
            :50,  width: 50 }} shape="circle"  type="link" onClick={
              ()=> this.studyChange({target: {value: this.state.study + 1}})
              } />
        </Space>

        <Space size="large" align="center">
            <Button icon={<this.EntertainmentIcon />} style={{ color: '#DA6666', height
            :50,  width: 50 }} shape="circle" type="link"/>
          <Input id='entertainment'value={this.state.entertainment.toString()}
            onChange={this.entertainmentChange}  bordered={false} style={{ color: '#DA6666', height
            :50,  width: 40, alignItems: "center" }} size="large"/>
            <Button icon={<MinusCircleOutlined />} style={{ color: '#DA6666', height
            :50,  width: 50 }} shape="circle"  type="link" onClick={
              ()=> this.entertainmentChange({target: {value: this.state.entertainment - 1}})
              } disabled={this.state.entertainment <= 0}/>
            <Button icon={<PlusCircleOutlined />} style={{ color: '#DA6666', height
            :50,  width: 50 }} shape="circle"  type="link" onClick={
              ()=> this.entertainmentChange({target: {value: this.state.entertainment + 1}})
              } />
        </Space>

        <Space size="large" align="center">
            <Button icon={<this.OtherIcon />} style={{ color: '#73C0DE', height
            :50,  width: 50 }} shape="circle" type="link"/>
          <Input id='other'value={this.state.other.toString()}
            onChange={this.otherChange}  bordered={false} style={{ color: '#73C0DE', height
            :50,  width: 40, alignItems: "center" }} size="large"/>
            <Button icon={<MinusCircleOutlined />} style={{ color: '#73C0DE', height
            :50,  width: 50 }} shape="circle"  type="link" onClick={
              ()=> this.otherChange({target: {value: this.state.other - 1}})
              } disabled={this.state.other <= 0}/>
            <Button icon={<PlusCircleOutlined />} style={{ color: '#73C0DE', height
            :50,  width: 50 }} shape="circle"  type="link" onClick={
              ()=> this.otherChange({target: {value: this.state.other + 1}})
              } />
        </Space>
      </Space >
    );
  }
}

export default Times;