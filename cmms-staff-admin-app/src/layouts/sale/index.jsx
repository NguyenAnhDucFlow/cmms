import React, { useState } from "react";
import {
  Layout,
  Tabs,
  Input,
  Drawer,
  Pagination,
  Button,
  Flex,
  Tooltip,
  Select,
  DatePicker,
  Switch,
  Divider,
} from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import {
  PhoneOutlined,
  UserOutlined,
  EnvironmentOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { FaCircleDot } from "react-icons/fa6";
import { RiTruckLine } from "react-icons/ri";
import { IoIosTime } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import styled from "styled-components";

const CustomTabs = styled(Tabs)`
  .ant-tabs-nav {
    margin: 0 !important;
    background: unset !important;
    border: unset !important;
  }
  .ant-tabs-tab-active {
    background: #f3f4f6 !important;
    border-bottom-color: #f3f4f6 !important;
  }
  .ant-tabs-nav-add {
    border: unset !important;
    border-radius: unset !important;
  }
  .ant-tabs-nav .ant-tabs-tab {
    border: unset !important;
  }
`;

const TabFooter = styled(Tabs)`
  .ant-tabs-nav {
    margin-top: 0 !important;
  }
`;

const { Content } = Layout;
const { TabPane } = Tabs;

const Sale = () => {
  const [tabs, setTabs] = useState([{ key: "1", title: "Hóa đơn 1" }]); // Danh sách hóa đơn
  const [activeKey, setActiveKey] = useState("1"); // Hóa đơn đang được chọn
  const [activeFooterTabKey, setActiveFooterTabKey] = useState("1"); // Tab footer đang chọn
  const [open, setOpen] = useState(false);
  const [codEnabled, setCodEnabled] = useState(true);

  const onClose = () => {
    setOpen(false);
  };

  // Xử lý thêm hóa đơn mới
  const addNewTab = () => {
    const newKey = (tabs.length + 1).toString();
    setTabs([...tabs, { key: newKey, title: `Hóa đơn ${newKey}` }]);
    setActiveKey(newKey);
  };

  // Xử lý đóng hóa đơn
  const removeTab = (targetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;

    const newTabs = tabs.filter((tab, index) => {
      if (tab.key === targetKey) {
        lastIndex = index - 1;
      }
      return tab.key !== targetKey;
    });

    if (newTabs.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newTabs[lastIndex].key;
      } else {
        newActiveKey = newTabs[0].key;
      }
    }

    setTabs(newTabs);
    setActiveKey(newActiveKey);
  };

  const footerTabs = [
    {
      key: "1",
      label: (
        <div className="flex items-center gap-2">
          <IoIosTime size={24} /> Bán thường
        </div>
      ),
      content: (
        <div className="w-[542px] h-full shadow-md rounded-md bg-white p-4">
          <div className="flex flex-col justify-between h-full">
            <div className="flex items-center gap-8">
              <Input
                className="w-full"
                placeholder="Tìm khách hàng"
                prefix={<SearchOutlined />}
                style={{ background: "#f3f4f6" }}
              />
              <Tooltip
                title="Lọc theo nhóm hàng"
                color="blue"
                placement="bottom"
              >
                <Button
                  shape="circle"
                  icon={<UnorderedListOutlined />}
                  onClick={() => setOpen(true)}
                />
              </Tooltip>
            </div>
            <div className="flex items-center justify-between ">
              <Pagination size="small" simple defaultCurrent={2} total={50} />
              <Button
                size="large"
                type="primary"
                className="w-[300px] h-[50px]"
              >
                Thanh toán
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex items-center gap-2">
          <RiTruckLine size={24} /> Bán giao hàng
        </div>
      ),
      content: (
        <div className="w-[834px] h-full flex items-center gap-3">
          <div className="flex flex-col  w-[50%] h-full shadow-md rounded-md p-4 bg-white space-y-3">
            <div className="flex items-center gap-2">
              <FaPerson size={16} />
              <div>Nhân sale</div>
            </div>
            <Input
              style={{ background: "#f3f4f6" }}
              className="w-full "
              placeholder="Tìm khách hàng"
              prefix={<SearchOutlined />}
            />
            <div className="flex items-center gap-2 ">
              <FaCircleDot className="text-blue-500 text-lg " />
              <span className="font-mono text-base border-b border-gray-100 py-1 w-full">
                +840886856851
              </span>
            </div>

            <div className="mt-4 flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <FaLocationDot className="text-green-500 text-lg" />
                <Input placeholder="Tên người nhận" />
              </div>
              <div>
                <Input placeholder="Số điện thoại" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Địa chỉ chi tiết (Số nhà, ngõ, đường)"
                className="col-span-2"
              />
              <Input placeholder="Tỉnh/TP - Quận/Huyện" />
              <Input placeholder="Phường/Xã" />
            </div>

            <Divider />

            <Input.TextArea
              placeholder="Ghi chú cho bưu tá"
              className="mt-4"
              rows={2}
            />

            <Divider />

            {/* Payment Info */}
            <div className="flex items-center justify-between">
              <div>
                <span>Khách thanh toán:</span>
                <span className="ml-2 font-medium">20,000</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Thu hộ tiền (COD):</span>
                <Switch
                  checked={codEnabled}
                  onChange={(checked) => setCodEnabled(checked)}
                />
                <span className="font-medium">
                  {codEnabled ? "290,000" : "0"}
                </span>
              </div>
            </div>
          </div>
          <div className="flex w-[50%] flex-col justify-between h-full shadow-md rounded-md p-4 bg-white">
            <div className="flex items-center gap-8">
              <Input
                className="w-full"
                placeholder="Tìm khách hàng"
                prefix={<SearchOutlined />}
              />
              <Tooltip
                title="Lọc theo nhóm hàng"
                color="blue"
                placement="bottom"
              >
                <Button
                  shape="circle"
                  icon={<UnorderedListOutlined />}
                  onClick={() => setOpen(true)}
                />
              </Tooltip>
            </div>
            <Button size="large" type="primary" className="w-full h-[50px]">
              Thanh toán
            </Button>
          </div>
        </div>
      ),
    },
  ];

  return (
    <Layout className="h-screen bg-gray-100">
      <Drawer
        title="Lọc theo nhóm hàng"
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
        key="right"
      >
        <div className="flex items-center gap-4">
          <div className="font-semibold whitespace-nowrap">Nhóm hàng</div>
          <Input
            className="w-full"
            placeholder="Tìm nhóm hàng"
            prefix={<SearchOutlined />}
          />
        </div>
      </Drawer>

      {/* Header Section */}
      <div className="flex items-center justify-between bg-primary px-2 py-2 relative">
        <div className="w-[26%]">
          <Input
            size="large"
            className="w-full h-9"
            placeholder="Tìm hàng hóa "
            prefix={<SearchOutlined />}
          />
          <div className="absolute left-[28%] bottom-0">
            <CustomTabs
              style={{
                margin: 0,
              }}
              type="editable-card"
              activeKey={activeKey}
              onChange={(key) => setActiveKey(key)}
              onEdit={(key, action) =>
                action === "add" ? addNewTab() : removeTab(key)
              }
              addIcon={
                <div className="rounded-full border border-white ">
                  <PlusOutlined className="text-white w-3 h-3" />
                </div>
              }
              className="flex-1"
            >
              {tabs.map((tab) => (
                <TabPane tab={tab.title} key={tab.key} />
              ))}
            </CustomTabs>
          </div>
        </div>
        <div>
          <h1>Account</h1>
        </div>
      </div>

      {/* Main Content */}
      <Content className="flex ">
        {/* Nội dung sản phẩm */}
        <div className="flex-1 ">
          <h3 className="text-lg font-bold">
            Nội dung {tabs.find((tab) => tab.key === activeKey)?.title}
          </h3>
          <p>Thông tin sản phẩm chọn hiển thị tại đây...</p>
        </div>
        {/* Nội dung bên phải: Nội dung Tab Footer */}
        <div className="m-3">
          {footerTabs.find((tab) => tab.key === activeFooterTabKey)?.content ||
            "Chưa chọn tab nào"}
        </div>
      </Content>

      {/* Footer Section */}
      <footer className="bg-white flex justify-between items-center px-4">
        <div className="ml-2">
          <TabFooter
            tabPosition="bottom"
            activeKey={activeFooterTabKey}
            onChange={setActiveFooterTabKey}
          >
            {footerTabs.map((tab) => (
              <TabPane tab={tab.label} key={tab.key} />
            ))}
          </TabFooter>
        </div>
        <h2 className="flex items-center gap-2">
          <FaLocationDot />
          Chi nhánh trung tâm
        </h2>
      </footer>
    </Layout>
  );
};

export default Sale;
