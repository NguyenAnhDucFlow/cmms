import React from "react";
import { TbPackageImport } from "react-icons/tb";
import { Timeline } from "antd";

const Notification = () => {
  return (
    <div className="card shadow-md bg-white rounded-md">
      <h3 className="font-bold text-sm px-4 pt-4 ">CÁC HOẠT ĐỘNG GẦN ĐÂY</h3>
      <div className="divider p-0 m-0"></div>
      <Timeline
        className="p-4"
        items={[
          {
            children: "Create a services site 2015-09-01",
          },
          {
            children: "Solve initial network problems 2015-09-01",
          },
          {
            dot: <TbPackageImport className="timeline-clock-icon" />,
            color: "red",
            children: "Technical testing 2015-09-01",
          },
          {
            children: "Network problems being solved 2015-09-01",
          },
        ]}
      />
    </div>
  );
};

export default Notification;
