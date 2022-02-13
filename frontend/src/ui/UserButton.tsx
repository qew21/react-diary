import { Dropdown, Menu } from "antd";
import React from "react";
import { UserOutlined } from '@ant-design/icons';
import exp from "constants";

const menu = (
    <Menu>
      <Menu.Item>
        <a href="/logout">
          Logout
        </a>
      </Menu.Item>
    </Menu>
  );

class UserButton extends React.Component {
    render() {
      return (
        <div style={{ textAlign: "right", width: '100%' }}>
          <Dropdown.Button overlay={menu} placement="bottomCenter" icon={<UserOutlined />}>
            {localStorage.name}
          </Dropdown.Button>
        </div>
      );
    }
  }

export default UserButton;