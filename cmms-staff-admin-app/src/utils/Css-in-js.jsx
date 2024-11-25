import styled from "styled-components";
import { InputNumber, Select, Tabs } from "antd";

export const CustomSelect = styled(Select)`
  && .ant-input-affix-wrapper {
    position: relative;
    display: inline-flex;
    width: 100%;
    min-width: 0;
    padding: 0px 0px !important;
    color: rgba(0, 0, 0, 0.88);
    font-size: 14px;
    line-height: 1.5714285714285714;
    border-radius: 0px !important;
    transition: all 0.2s;
  }
  .ant-select-selector {
    padding: 0 0px !important;
  }
`;

export const CustomTabs = styled(Tabs)`
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

export const TabFooter = styled(Tabs)`
  .ant-tabs-nav {
    margin-top: 0 !important;
  }
`;

export const CustomInput = styled(InputNumber)`
  .ant-input-number-input {
    border-radius: 0px !important;
  }
  .ant-input-number-input {
    padding: 4px 0px;
  }
`;
