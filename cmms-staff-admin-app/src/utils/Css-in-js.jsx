import styled from "styled-components";
import { Select } from "antd";

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
