import React, { useState } from "react";
import Page from "../components/Page";
import UserFilterSidebar from "../sections/users/UserFilterSidebar";
import UserTable from "../sections/users/UserTable";
import UserSearch from "../sections/users/UserSearch";
import UserButton from "../sections/users/UserButton";
import CreateUserModal from "../components/modal/CreateUserModal";

const Users = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return (
    <Page title="Quản lí người dùng">
      <CreateUserModal visible={isModalVisible} onClose={hideModal} />

      <div className="flex gap-6">
        <div className="w-[16%]">
          <UserFilterSidebar />
        </div>
        <div className="w-[84%] space-y-3">
          <div className="flex items-center justify-between gap-4 pb-1">
            <UserSearch />
            <UserButton onAddNewClick={showModal} />
          </div>
          <UserTable />
        </div>
      </div>
    </Page>
  );
};

export default Users;
