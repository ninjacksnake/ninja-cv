import { RedoOutlined } from "@ant-design/icons"
import './spinner.css'
const Spinner = () => {
  return (
    <>
    <div>
    <RedoOutlined spin className="spinner" />
    <h4>Wait a moment...</h4>
    </div>
    </>
  )
}

export default Spinner