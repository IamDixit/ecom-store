import React, { useState } from "react";
import { Input, Popover, List, Avatar, Empty } from "antd";
import { SERVER } from "./config";

export default function SearchBox({ onSelect }) {
  const [results, setResults] = useState(null);
  const fetchProducts = (e) => {
    const searchKey = e.target.value;
    if (searchKey) {
      fetch(`${SERVER}/product/search?searchKey=${searchKey}`)
        .then((res) => res.json())
        .then((response) => setResults(response.data))
        .catch((err) => console.error(err));
    }
  };
  const content = (
    <div className="search-results">
      {Array.isArray(results) && results.length ? (
        <List
          itemLayout="horizontal"
          dataSource={results}
          renderItem={(item) => (
            <List.Item
              key={item._id}
              onClick={() => {
                onSelect(item._id);
                setResults(null);
              }}
            >
              <List.Item.Meta
                avatar={<Avatar src={item.image} />}
                title={item.title}
                description={`Category: ${item.category}, Source: ${item.source}`}
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty description="Product not available" />
      )}
    </div>
  );
  return (
    <div className="search-box">
      <Popover
        placement="bottom"
        open={Array.isArray(results)}
        title="Product search results"
        content={content}
        arrow={false}
      >
        <Input
          size="large"
          onChange={fetchProducts}
          placeholder="Search for products"
          style={{ width: "600px" }}
          autoFocus={true}
        />
      </Popover>
    </div>
  );
}
