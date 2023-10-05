import { List, Card } from "antd";
import "./elementList.css";

const ElementList = ({ elements }) => {
  return (
    <List
      itemLayout="horizontal"
      dataSource={elements}
      renderItem={(element) => (
        <>
          <ul className="elementList">
            <li>
              <b>{element.name}</b>
              <p className="justified-text"> {element.description}</p>
              <p className="justified-text">
                {new Date(element.startDate).toDateString()}
              </p>
              {element.url ? (
                <a
                  href={element.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="justified-text"
                >
                   {element.url}
                </a>
              ) : (
                ""
              )}
            </li>
          </ul>
          <br />
        </>
      )}
    />
  );
};

export default ElementList;
