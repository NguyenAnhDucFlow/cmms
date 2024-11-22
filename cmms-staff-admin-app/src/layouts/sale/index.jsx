import React, { useEffect, useState } from "react";
import {
  Layout,
  Tabs,
  Input,
  Drawer,
  Pagination,
  Button,
  Tooltip,
  Select,
  Switch,
  Divider,
} from "antd";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import {
  SearchOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { RiTruckLine } from "react-icons/ri";
import { IoIosTime } from "react-icons/io";
import { FaCircleDot, FaPerson, FaLocationDot } from "react-icons/fa6";
import { CustomTabs, TabFooter } from "../../utils/Css-in-js";
import SearchBar from "./SearchBar";
import useStore from "../../store/posStore";
import OrderContent from "./OrderContent";

const { Content } = Layout;
const { TabPane } = Tabs;

const Sale = () => {
  const {
    orders,
    activeOrderId,
    addOrder,
    setActiveOrder,
    removeOrder,
    initializeStore,
    setOrderFooterTab,
  } = useStore();

  // Initialize store with default order if needed
  useEffect(() => {
    initializeStore();
  }, [initializeStore]);
  const activeOrder = orders.find((order) => order.id === activeOrderId);

  const [open, setOpen] = useState(false);
  const [codEnabled, setCodEnabled] = useState(true);
  const onClose = () => {
    setOpen(false);
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
            <div className="border-t border-gray-100 pt-2 space-y-3">
              <div className="flex items-center justify-between">
                <div className="font-bold flex items-center gap-4">
                  <div className="whitespace-nowrap">Khách thanh toán</div>
                  <Tooltip
                    title="Thanh toán nhiều phương thức"
                    color="blue"
                    placement="bottom"
                  >
                    <Button
                      icon={<MoreOutlined />}
                      onClick={() => setOpen(true)}
                    />
                  </Tooltip>
                </div>
                <div className="ml-2 font-medium border-b border-gray-200 pb-1">
                  20,000
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-between w-[44%]">
                  <div className="font-bold whitespace-nowrap">
                    Thu hộ tiền (COD)
                  </div>
                  <Switch
                    style={{ width: 35 }}
                    size="small"
                    checked={codEnabled}
                    onChange={(checked) => setCodEnabled(checked)}
                  />
                </div>
                <div className="font-medium w-fit text-right">
                  {codEnabled ? "290,000" : "0"}
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-[50%] flex-col h-full shadow-md rounded-md p-4 bg-white">
            <div className="flex items-center gap-2 justify-center border-b border-gray-200 pb-0.5">
              <LiaPeopleCarrySolid className="text-primary" size={24} />
              <div className="font-serif text-xl text-primary">
                Tự giao hàng
              </div>
            </div>
            <div className="flex flex-col h-full justify-between mt-8">
              <div className="flex items-center justify-between">
                <div className="w-1/3 whitespace-nowrap">
                  Đối tác giao hàng:
                </div>
                <div className="w-2/3">
                  <Select className="w-full" />
                </div>
              </div>

              <Button size="large" type="primary" className="w-full h-[50px]">
                Thanh toán
              </Button>
            </div>
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
          <div className="w-full">
            <SearchBar />
          </div>

          <div className="absolute left-[28%] bottom-0">
            <CustomTabs
              type="editable-card"
              activeKey={activeOrderId?.toString()}
              onChange={(key) => setActiveOrder(parseInt(key))}
              onEdit={(targetKey, action) => {
                if (action === "add") {
                  addOrder();
                } else if (orders.length > 1) {
                  removeOrder(parseInt(targetKey));
                }
              }}
              addIcon={
                <div className="rounded-full border border-white">
                  <PlusOutlined className="text-white w-3 h-3" />
                </div>
              }
            >
              {orders.map((order) => (
                <TabPane
                  tab={`Hóa đơn #${order.id}`}
                  key={order.id}
                  closable={orders.length > 1}
                />
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
          <OrderContent />
        </div>
        {/* Nội dung bên phải: Nội dung Tab Footer */}
        <div className="m-3">
          {
            footerTabs.find((tab) => tab.key === activeOrder?.footerTabKey)
              ?.content
          }
        </div>
      </Content>

      {/* Footer Section */}
      <footer className="bg-white flex justify-between items-center px-4">
        <div className="ml-2">
          <TabFooter
            tabPosition="bottom"
            activeKey={activeOrder?.footerTabKey}
            onChange={(key) => setOrderFooterTab(activeOrderId, key)}
          >
            {footerTabs.map((tab) => (
              <TabPane tab={tab.label} key={tab.key} />
            ))}
          </TabFooter>
        </div>
        <h6 className="flex items-center gap-2">
          <FaLocationDot />
          Chi nhánh trung tâm
        </h6>
      </footer>
    </Layout>
  );
};

export default Sale;
