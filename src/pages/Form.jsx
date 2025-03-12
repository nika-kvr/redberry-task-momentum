import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { schema } from "./ValidationSchema";
import { useImage } from "./useImage";

const Form = () => {
  const navigate = useNavigate();
  const { imagePreview, imageError, handleImageChange, removeImage } =
    useImage();
  const [options] = useState(["Tbilisi", "Batumi", "Rustavi"]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    ["name", "email", "selectField"].forEach((key) => {
      const value = localStorage.getItem(key);
      if (value) setValue(key, value, { shouldValidate: true });
    });
  }, [setValue]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    localStorage.setItem(name, value);
    setValue(name, value, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    if (!imagePreview) {
      setImageError("Image is required");
      return;
    }

    console.log("Form submitted:", { ...data, image: imagePreview });
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => handleImageChange(acceptedFiles[0]),
    accept: "image/jpeg, image/png",
    maxSize: 2 * 1024 * 1024,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button onClick={() => navigate("/products")}>Products</button>
      <div>
        <label>Name:</label>
        <input
          {...register("name")}
          onChange={handleChange}
          className={errors.name ? "input-error" : ""}
        />
        <p style={{ color: "red" }}>{errors.name?.message}</p>
      </div>

      <div>
        <label>Email:</label>
        <input
          {...register("email")}
          onChange={handleChange}
          className={errors.email ? "input-error" : ""}
        />
        <p style={{ color: "red" }}>{errors.email?.message}</p>
      </div>

      <div>
        <label>Select Field:</label>
        <select
          {...register("selectField")}
          onChange={handleChange}
          className={errors.selectField ? "input-error" : ""}
        >
          <option value="">Select an option</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <p style={{ color: "red" }}>{errors.selectField?.message}</p>
      </div>

      <div className="image-upload">
        <label>Image (Max 2MB):</label>
        <div
          className={`dropzone ${imageError ? "dropzone-error" : ""}`}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <p>Drag & drop an image here, or click to select one</p>
        </div>
        <p style={{ color: "red" }}>{imageError}</p>
        {imagePreview && (
          <>
            <img src={imagePreview} alt="preview" width={100} />
            <button type="button" onClick={removeImage}>
              Remove Image
            </button>
          </>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Form;
