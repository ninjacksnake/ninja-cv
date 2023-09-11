import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Upload, message } from "antd";
import Modal from "antd/es/modal/Modal";
import imageCompression from "browser-image-compression";

const getBase64 = (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
  });
};
const ImageUploader = ({ getImageBynaries }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const compressImage = async (file) => {
    if (file === "") {
      return message.error("Please select an image for your resume");
    }
    const options = {
      maxSizeMB: 1,
      MaxWidthOrHeight: 1920,
      alwaysKeepResolution:true
    };
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        "Compressed file size is :",
        compressedFile.size / 1024 / 1024
      );
      return compressedFile;
    } catch (err) {
      console.log(err);
    }
  };

  const handleCancel = () => setPreviewOpen(false);

  const beforeUpload = (file) => {
    //console.log(file);
    return false;
  };
  
  const handlePreview = async (file) => {
    // console.log(file.originFileObj)
    if (!file.url || !file.preview) {
      file.preview = await compressImage(file.originFileObj);
      file.preview = await getBase64(file.preview);
    }
    setPreviewImage(file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };
  
  const handleChange = async ( file ) => {
    try {
      setFileList(x => file.fileList);
      if (file?.fileList[0]?.originFileObj) {
        const compressedImage = await compressImage(file?.fileList[0]?.originFileObj) 
         const base64Image = await getBase64(compressedImage);  
        getImageBynaries(base64Image);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-circle"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        beforeUpload={beforeUpload}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default ImageUploader;
