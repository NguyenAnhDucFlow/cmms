import React, { useState } from "react";
import { Drawer, Button, Row, Col } from "antd";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => {
  const [visible, setVisible] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [groupName, setGroupName] = useState("");

  // Hàm nhóm sản phẩm theo tên
  const groupProductsByName = (data) => {
    return data.reduce((acc, product) => {
      if (!acc[product.name]) {
        acc[product.name] = [];
      }
      acc[product.name].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupProductsByName(products);

  const showDrawer = (name, productList) => {
    setGroupName(name);
    setSelectedGroup(productList);
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="mt-4">
      <div className="flex flex-wrap gap-9">
        {Object.entries(groupedProducts).map(([name, productList]) => (
          <div span={8} key={name}>
            {productList.length > 1 ? (
              <div onClick={() => showDrawer(name, productList)}>
                <ProductCard product={productList[0]} />
              </div>
            ) : (
              <div>
                <ProductCard product={productList[0]} />
              </div>
            )}
          </div>
        ))}
      </div>

      <Drawer
        title={groupName}
        placement="right"
        onClose={onClose}
        open={visible}
        width={500}
      >
        <div className="flex gap-4">
          {selectedGroup.map((product) => (
            <div key={product.materialCode}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default ProductList;
