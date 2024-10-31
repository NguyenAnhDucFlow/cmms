import React from "react";
import { Select } from "antd";
import { IoStorefront } from "react-icons/io5";

const SelectedStore = () => {
  return (
    <Select
      showSearch
      placeholder="Select a person"
      optionFilterProp="label"
      suffixIcon={
        <IoStorefront style={{ color: "#1a1a1a", fontSize: "16px" }} />
      }
      defaultValue={"Cửa hàng trung tâm"}
      variant="borderless"
      options={[
        {
          value: "jack",
          label: "Cửa hàng trung tâm",
        },
        {
          value: "lucy",
          label: "Cửa hàng 1",
        },
        {
          value: "tom",
          label: "Cửa hàng",
        },
      ]}
    />
  );
};

export default SelectedStore;
