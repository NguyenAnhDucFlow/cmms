import styled from "styled-components";
import { Select } from "antd";

export const CustomSelect = styled(Select)`
  && .ant-input-affix-wrapper {
    padding: 0 !important;
    border-radius: 0 !important;
  }
  .ant-select-selector {
    padding: 0 !important;
  }
`;
