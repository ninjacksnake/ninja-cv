import React from "react";
import "./responsiveCardList.css";
import { List, Card } from "antd";
import {
  EditOutlined,
  DeleteFilled,
  EyeFilled,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

const ResponsiveCardList = ({
  data,
  handleDelete,
  handleUpdate,
  handleView,
  cardType,
}) => {
  return (
   
    <List
      grid={{
        gutter: 10,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        xxl: 4,
      }}
      dataSource={data}
      renderItem={(item, index) => (
     
        <List.Item>
          <Card
            title={ item.company ?  item.company: ""}
            actions={[
              <EyeFilled
                key="setting"
                onClick={() => handleView(item._id)}
                className="eyeActionIcon"
              />,
              <EditOutlined
                key="edit"
                onClick={() => handleUpdate(item._id)}
                style={{ color: "green" }}
              />,
              <DeleteFilled
                key="delete"
                onClick={() => handleDelete(item._id, index)}
                style={{ color: "red" }}
              />,
            ]}
          >
            {
            
            cardType === "education" ? (
              <Meta
                title={item.educationType}
                description={item.institutionName}
              />
            ) : cardType === "job" ? (
              <Meta
                title={item.title}
                description={item.technologiesUsed                                                                                                                                                                                                                                                                                 
                }
              />
            ) : cardType === "projects" ? (
              <Meta
                title= <h2>{item.name}</h2>
                description= <a href="item.url">{item.url}</a>
              />
            ) : (
              <Meta
                title={item.educationType}
                description={item.institutionName}
              />
            )}

            <ul>
              <li>
                {" "}
                <b>Start date:</b>{" "}
                {new Date(item.startDate).toLocaleDateString()}
              </li>
              <li>
                <b>End date:</b> {new Date(item.endDate).toLocaleDateString()}
              </li>
              <li>
                {cardType === "education"
                  ? `Status ${item.status}`
                  : cardType === "job"
                  ? `Title : ${item.title}`
                  : cardType === "projects"
                  ? `Description : ${item.description}.`
                  : ""}
              </li>
            </ul>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ResponsiveCardList;
