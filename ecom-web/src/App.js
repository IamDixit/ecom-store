import React, { useState } from "react";
import "./style.css";
import SearchBox from "./SearchBox";
import { Typography, Card, Tooltip, Tag, Badge } from "antd";
import { SERVER } from "./config";

export default function App() {
  const [productInfo, setProductInfo] = useState(null);
  const getProductInfo = (id) => {
    console.log("ID", id);
    fetch(`${SERVER}/product/info/${id}`)
      .then((res) => res.json())
      .then((response) => setProductInfo(response.data))
      .catch((err) => console.error(err));
  };
  console.log(productInfo);
  return (
    <div className="container">
      <Typography.Title>Ecom Store</Typography.Title>
      <SearchBox onSelect={(productId) => getProductInfo(productId)} />
      {productInfo ? (
        <div className="result-results">
          <Badge.Ribbon text={productInfo.source}>
            <Card
              cover={
                <img src={productInfo.image} alt="Product Image" width={180} />
              }
              hoverable
              style={{ width: 500, marginTop: 24 }}
            >
              <Card.Meta
                title={
                  <Tooltip title={productInfo.title}>
                    {productInfo.title}
                  </Tooltip>
                }
                description={productInfo.description}
              />
              <div className="meta">
                <Tag color="volcano">Price: ${productInfo.price}</Tag>
                <Tag color="purple">Rating: {productInfo.rating.rate}</Tag>
              </div>
            </Card>
          </Badge.Ribbon>
        </div>
      ) : null}
    </div>
  );
}
