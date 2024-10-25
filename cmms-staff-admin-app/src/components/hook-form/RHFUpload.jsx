import { Upload, Image, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

// Hàm lấy base64 cho file preview
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

// Component RHFUpload
export default function RHFUpload({ name, label, maxFiles = 4, ...other }) {
  const { control } = useFormContext();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <>
          <Upload
            listType="picture-card"
            fileList={field.value || []}
            onPreview={handlePreview}
            onChange={({ fileList: newFileList }) =>
              field.onChange(newFileList)
            }
            beforeUpload={(file) => {
              field.onChange([...(field.value || []), file]);
              return false;
            }}
            {...other}
          >
            {(field.value || []).length >= maxFiles ? null : uploadButton}
          </Upload>
          {previewImage && (
            <Image
              wrapperStyle={{ display: "none" }}
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage(""),
              }}
              src={previewImage}
            />
          )}
        </>
      )}
    />
  );
}

RHFUpload.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  maxFiles: PropTypes.number,
};
