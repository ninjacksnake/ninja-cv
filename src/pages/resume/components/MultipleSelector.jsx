import { Select } from 'antd';

const { Option } = Select;

const MultiSelectTech = ({ technologies, selectedTechnologies, onChange }) => {
  return (
    <Select
      mode="multiple"
      placeholder="Select technologies"
      style={{ width: '100%' }}
      value={selectedTechnologies}
      onChange={onChange}
    >
      {technologies.map((tech) => (
        <Option key={tech} value={tech}>
          {tech}
        </Option>
      ))}
    </Select>
  );
};

export default MultiSelectTech;