import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { HiOutlinePencilSquare } from "react-icons/hi2";
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
  DatePicker,
} from "antd";
import { LiaPeopleCarrySolid } from "react-icons/lia";
import { FaShoppingBag } from "react-icons/fa";
import {
  SearchOutlined,
  PlusOutlined,
  UnorderedListOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { IoArrowUndo } from "react-icons/io5";
import { RiTruckLine } from "react-icons/ri";
import { IoIosTime } from "react-icons/io";
import { FaCircleDot, FaPerson, FaLocationDot } from "react-icons/fa6";
import { CustomSelect, CustomTabs, TabFooter } from "../../utils/Css-in-js";
import SearchBar from "./SearchBar";
import { useStore as Store } from "../../hooks/useStore";
import useStore from "../../store/posStore";
import OrderContent from "./OrderContent";
import { useData } from "../../hooks/useData";
import useRegionData from "../../hooks/useRegionData";
import MenuDropdown from "./MenuDropdown";
import axios from "../../utils/axios";
import ProductList from "./ProductList";
import ItemGroupsCategoryDrawer from "./ItemGroupsCategoryDrawer";
import useAuth from "../../hooks/useAuth";
import SearchCustomer from "./SearchCustomer";

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

  const { shippers } = useData();
  const { storeId, storeName } = Store();
  const [products, setProducts] = useState([]);
  const [totalElement, setTotalElement] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const { user } = useAuth();

  const { control, handleSubmit, reset, setValue, watch } = useForm();
  const { provinces, districts, wards, fetchDistricts, fetchWards } =
    useRegionData();

  const selectedProvinceCode = watch("provinceCode");
  const selectedDistrictCode = watch("districtCode");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {
          storeId,
          size: 6,
          page: currentPage - 1,
        };

        if (selectedGroups && selectedGroups.length > 0) {
          params.categories = selectedGroups.join(",");
        }

        const response = await axios.get(`/materials/search`, { params });
        setProducts(response.data.data);
        setProducts(response.data.data);
        setTotalElement(response.data.totalElements);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, [currentPage, selectedGroups]);

  useEffect(() => {
    if (selectedProvinceCode) {
      fetchDistricts(selectedProvinceCode);
      setValue("district", "");
      setValue("ward", "");
    }
  }, [selectedProvinceCode]);

  useEffect(() => {
    if (selectedDistrictCode) {
      fetchWards(selectedDistrictCode);
      setValue("ward", "");
    }
  }, [selectedDistrictCode]);
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

  const handleFilterChange = (selected) => {
    setSelectedGroups(selected);
    onClose();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
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
            <ProductList products={products} />
            <div className="flex items-center justify-between ">
              <Pagination
                size="small"
                simple
                pageSize={6}
                total={totalElement}
                onChange={handlePageChange}
              />
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
          <div className="flex flex-col  w-[50%] h-full shadow-md rounded-md justify-between bg-white space-y-3  overflow-hidden">
            <div className=" p-4 space-y-3">
              <div className="flex items-center gap-2">
                <FaPerson size={16} />
                <div>Nhân sale</div>
              </div>
              <SearchCustomer />
              <div className="flex items-center gap-2 ">
                <FaCircleDot className="text-blue-500 text-lg " />
                <span className="font-mono text-base border-b border-gray-100 py-1 w-full">
                  {user?.store?.address || "Cửa hàng trung tâm"}
                </span>
              </div>

              <div className="mt-4 flex gap-4 items-center">
                <div className="flex items-center gap-2">
                  <FaLocationDot className="text-green-500 text-lg" />
                  <div className="border-b hover:border-primary ">
                    <Input
                      style={{ padding: "4px 0px" }}
                      placeholder="Tên người nhận"
                      variant="borderless"
                    />
                  </div>
                </div>
                <div className="border-b hover:border-primary ">
                  <Input
                    style={{ padding: "4px 0px" }}
                    placeholder="Số điện thoại"
                    variant="borderless"
                  />
                </div>
              </div>

              <div className="border-b hover:border-primary ml-6">
                <Input
                  style={{ padding: "4px 0px" }}
                  placeholder="Địa chỉ chi tiết (số nhà, ngõ, đường)"
                  variant="borderless"
                />
              </div>
              <div className="ml-6">
                <Controller
                  name="province"
                  control={control}
                  render={({ field }) => {
                    const [isFocused, setIsFocused] = useState(false);
                    return (
                      <CustomSelect
                        {...field}
                        className="w-full border-b"
                        style={{
                          borderColor: isFocused ? "#1E88E5" : undefined,
                          padding: 0,
                        }}
                        showSearch
                        optionFilterProp="label"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        variant="borderless"
                        options={provinces.map((prov) => ({
                          value: prov.code,
                          label: prov.name,
                        }))}
                        onChange={(value) => {
                          const selectedProvince = provinces.find(
                            (prov) => prov.code === value
                          );
                          field.onChange(selectedProvince?.name);
                          setValue("provinceCode", value);
                        }}
                      />
                    );
                  }}
                />
              </div>

              <div className="ml-6">
                <Controller
                  name="district"
                  control={control}
                  render={({ field }) => {
                    const [isFocused, setIsFocused] = useState(false);
                    return (
                      <CustomSelect
                        {...field}
                        className="w-full border-b"
                        style={{
                          borderColor: isFocused ? "#1E88E5" : undefined,
                          padding: 0,
                        }}
                        showSearch
                        optionFilterProp="label"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        variant="borderless"
                        options={districts.map((dist) => ({
                          value: dist.code,
                          label: dist.name,
                        }))}
                        disabled={!selectedProvinceCode}
                        onChange={(value) => {
                          const selectedDistrict = districts.find(
                            (dist) => dist.code === value
                          );
                          field.onChange(selectedDistrict?.name);
                          setValue("districtCode", value);
                        }}
                      />
                    );
                  }}
                />
              </div>

              <div className="ml-6">
                <Controller
                  name="ward"
                  control={control}
                  render={({ field }) => {
                    const [isFocused, setIsFocused] = useState(false);
                    return (
                      <CustomSelect
                        {...field}
                        className="w-full border-b"
                        style={{
                          borderColor: isFocused ? "#1E88E5" : undefined,
                          padding: 0,
                        }}
                        showSearch
                        optionFilterProp="label"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        variant="borderless"
                        options={wards.map((ward) => ({
                          value: ward.code,
                          label: ward.name,
                        }))}
                        disabled={!selectedDistrictCode}
                        onChange={(value) => {
                          const selectedWard = wards.find(
                            (ward) => ward.code === value
                          );
                          field.onChange(selectedWard?.name);
                        }}
                      />
                    );
                  }}
                />
              </div>
              <div className="border-b pb-2">
                <Input
                  placeholder="Ghi chú đơn hàng"
                  style={{ padding: 0 }}
                  size="large"
                  prefix={<HiOutlinePencilSquare className="mr-2" />}
                  variant="borderless"
                />
              </div>
            </div>

            {/* Payment Info */}
            <div className="border-t border-gray-100 pt-2  pb-8 space-y-3 p-4 ">
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
            <div className="flex items-center gap-2  border-b border-gray-200 pb-2">
              <LiaPeopleCarrySolid className="text-primary" size={24} />
              <div className=" text-[17px] text-primary">Tự giao hàng</div>
            </div>
            <div className="flex h-full flex-col justify-between">
              <div className="space-y-4 mt-8">
                <div className="flex items-center justify-between">
                  <div className="w-[40%] whitespace-nowrap">
                    Nhân viên giao hàng
                  </div>
                  <div className="w-[60%] border-b border-gray-200">
                    <Select
                      variant="borderless"
                      placeholder="Chọn nhân viên giao hàng"
                      className="w-full"
                      options={shippers?.map((shipper) => ({
                        value: shipper.id,
                        label: shipper.name,
                      }))}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-[40%] whitespace-nowrap">Mã vận đơn</div>
                  <div className="w-[60%] border-b border-gray-200"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="w-[40%] whitespace-nowrap">
                    Thời gian giao hàng
                  </div>
                  <div className="w-[60%] border-b border-gray-200">
                    <DatePicker
                      showTime
                      variant="borderless"
                      className="w-full"
                      placeholder=""
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="w-[40%] whitespace-nowrap">
                    Trạng thái giao hàng
                  </div>
                  <div className="w-[60%] pb-1 border-b text-gray-300 border-gray-200">
                    Chờ xử lý
                  </div>
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
      <ItemGroupsCategoryDrawer
        open={open}
        onClose={onClose}
        onFilterChange={handleFilterChange}
      />

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
        <div className="flex items-center gap-3">
          <Tooltip color="blue" title="Xử lý đặt hàng">
            <Button
              type="primary"
              shape="circle"
              icon={<FaShoppingBag size={19} />}
            />
          </Tooltip>
          <Tooltip color="blue" title="Trả hàng">
            <Button
              type="primary"
              shape="circle"
              icon={<IoArrowUndo size={19} />}
            />
          </Tooltip>
          <div className="font-bold text-white">{user?.username}</div>
          <MenuDropdown />
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
          {storeName}
        </h6>
      </footer>
    </Layout>
  );
};

export default Sale;
