import React from "react";
import { Button, Dropdown } from "antd";
import { AiOutlineMenu } from "react-icons/ai";
const items = [
  {
    label: <a href="https://www.antgroup.com">1st menu item</a>,
    key: "0",
  },
  {
    label: <a href="https://www.aliyun.com">2nd menu item</a>,
    key: "1",
  },
  {
    type: "divider",
  },
  {
    label: "3rd menu item",
    key: "3",
  },
];
const MenuDropdown = () => (
  <Dropdown
    menu={{
      items,
    }}
    trigger={["click"]}
  >
    <a onClick={(e) => e.preventDefault()}>
      <Button
        type="primary"
        shape="circle"
        icon={<AiOutlineMenu size={19} />}
      />
    </a>
  </Dropdown>
);
export default MenuDropdown;
