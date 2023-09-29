import React from "react";
import { Card } from "antd";
import { SelectOutlined } from "@ant-design/icons";
const { Meta } = Card;

const DesignCard = ({ designInfo, index, handleClickDesignCard }) => {
  return (
    <>
      <Card className="carousel-content">
        <div className="carousel-content-header">
          <div className="carousel-header"></div>
        </div>
        <div className="carousel-content-body">
          <Card hoverable 
           cover={<img alt="example" src={designInfo.img} />}
          >
            <Meta title=<h3>{designInfo.title}</h3> />
            <Meta
            style={{cursor: "pointer", display: "flex", alignItems: "center", justifyContent:"center", padding: "4px"}}
           
              avatar={<SelectOutlined />}
              onClick={() => handleClickDesignCard(index)}
            />
          </Card>
        </div>
      </Card>
    </>
  );
};

export default DesignCard;
