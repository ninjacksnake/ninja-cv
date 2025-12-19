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
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString(undefined, {
      month: "short",
      year: "numeric",
    });
  };

  const renderCardContent = (item) => {
    if (cardType === "education") {
      return (
        <div className="card-content">
          <Meta
            title={item.degree || item.educationType}
            description={item.institution || item.institutionName}
          />
          <div className="card-details">
            <p className="card-date">
              {formatDate(item.startDate)} - {item.status === "In Progress" ? "Present" : formatDate(item.endDate)}
            </p>
            {item.status && <p className="card-status">{item.status}</p>}
          </div>
        </div>
      );
    } else if (cardType === "job") {
      return (
        <div className="card-content">
          <Meta
            title={item.title}
            description={item.company}
          />
          <div className="card-details">
            <p className="card-date">
              {formatDate(item.startDate)} - {item.current ? "Present" : formatDate(item.endDate)}
            </p>
            {item.technologiesUsed && (
              <p className="card-tech">
                {item.technologiesUsed}
              </p>
            )}
          </div>
        </div>
      );
    } else if (cardType === "projects") {
      return (
        <div className="card-content">
          <Meta
            title={item.name}
            description={
              item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()}>
                  {item.url}
                </a>
              ) : null
            }
          />
          <div className="card-details">
            <p className="card-date">
              {formatDate(item.startDate)} - {formatDate(item.endDate)}
            </p>
            <p className="card-description" title={item.description}>
              {item.description}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 3,
        xxl: 3,
      }}
      dataSource={data}
      renderItem={(item, index) => (
        <List.Item>
          <Card
            className="custom-card"
            actions={[
              <EyeFilled
                key="setting"
                onClick={() => handleView(item)}
                className="eyeActionIcon action-icon"
              />,
              <EditOutlined
                key="edit"
                onClick={() => handleUpdate(item)}
                className="editActionIcon action-icon"
                style={{ color: "green" }}
              />,
              <DeleteFilled
                key="delete"
                onClick={() => handleDelete(item._id, index)}
                className="deleteActionIcon action-icon"
                style={{ color: "red" }}
              />,
            ]}
          >
            {renderCardContent(item)}
          </Card>
        </List.Item>
      )}
    />
  );
};

export default ResponsiveCardList;
