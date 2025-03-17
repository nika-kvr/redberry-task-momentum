import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "../../assets/Modal.css";
import closeBtnPng from "../../assets/images/closeBtnPng.png";
import dropzoneImg from "../../assets/images/dropzoneImg.png";
import SelectField from "../components/Selectfield.jsx";
import "../../assets/Selectfield.css";
import imgDelete from "../../assets/images/imgDelete.png";
import { departments, PostEmployee } from "./Requests.jsx";

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[a-zA-Zა-ჰ]+$/, "მარტო ლათინური და ქართული სიმბოლოები")
    .min(2, "მინიმუმ 2 სიმბოლო")
    .max(255, "მინიმუმ 2 სიმბოლო")
    .required("სავალდებულო"),
  surname: yup
    .string()
    .matches(/^[a-zA-Zა-ჰ]+$/, "მარტო ლათინური და ქართული სიმბოლოები")
    .min(2, "მინიმუმ 2 სიმბოლო")
    .required("სავალდებულო")
    .max(255, "მინიმუმ 2 სიმბოლო"),
  avatar: yup
    .mixed()
    .required("სავალდებულოა")
    .test(
      "fileSize",
      "ფაილის ზომა არ უნდა აღემატებოდეს 600KB",
      (value) => value && value.size <= 600000
    )
    .test(
      "fileType",
      "მხარდამჭერ ტიპებს: PNG ან JPEG",
      (value) =>
        value && (value.type === "image/jpeg" || value.type === "image/png")
    ),
  department_id: yup.number().required("Department is required"),
});

const EmployeeForm = ({ show, onClose }) => {
  if (!show) return null;
  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    shouldFocusError: false,
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [dropzoneDisabled, setDropzoneDisabled] = useState(false);

  const [nameMinError, setNameMinError] = useState(null);
  const [nameMaxError, setNameMaxError] = useState(null);
  const [nameCharsError, setNameCharsError] = useState(null);

  const [snameMinError, setSNameMinError] = useState(null);
  const [snameMaxError, setSNameMaxError] = useState(null);
  const [snameCharsError, setSNameCharsError] = useState(null);

  const [isImgValid, setIsImgValid] = useState(true);
  const [imgErrorSize, setImgErrorSize] = useState(null);

  const handleNameChange = (e) => {
    isMinValid(e);
    isMaxValid(e);
    isCharsValid(e);
  };
  const handleSNameChange = (e) => {
    isMinValidS(e);
    isMaxValidS(e);
    isCharsValidS(e);
  };

  const isMinValidS = (input) => {
    const value = input.target.value;
    value && value.length >= 2
      ? setSNameMinError(false)
      : setSNameMinError(true);
    return value && value.length >= 2;
  };

  const isCharsValidS = (input) => {
    const value = input.target.value;
    /^[a-zA-Zა-ჰ]+$/.test(value)
      ? setSNameCharsError(false)
      : setSNameCharsError(true);
    return /^[a-zA-Zა-ჰ]+$/.test(value);
  };

  const isMaxValidS = (input) => {
    const value = input.target.value;
    value.length <= 255 ? setSNameMaxError(false) : setSNameMaxError(true);
    return value.length <= 255;
  };
  const isMinValid = (input) => {
    const value = input.target.value;
    value && value.length >= 2 ? setNameMinError(false) : setNameMinError(true);
    return value && value.length >= 2;
  };

  const isMaxValid = (input) => {
    const value = input.target.value;
    value.length <= 255 ? setNameMaxError(false) : setNameMaxError(true);
    return value.length <= 255;
  };

  const isCharsValid = (input) => {
    const value = input.target.value;
    /^[a-zA-Zა-ჰ]+$/.test(value)
      ? setNameCharsError(false)
      : setNameCharsError(true);
    return /^[a-zA-Zა-ჰ]+$/.test(value);
  };

  const handleImageUpload = (file) => {
    if (file.size > 600000) {
      setImgErrorSize(true);
      setIsImgValid(false);
      return;
    }

    setImgErrorSize(false);
    setIsImgValid(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);
      setValue("avatar", file);
      setDropzoneDisabled(true);
      trigger();
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      if (file.size > 600000) {
        setImgErrorSize(true);
        return;
      }

      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        console.log("Invalid file type. Only PNG and JPEG are allowed.");
        return;
      }

      handleImageUpload(file);
    }
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDepartmentChange = (option) => {
    setValue("department_id", option.id);
    trigger();
  };

  const handleImageDelete = () => {
    setImgErrorSize(true);
    setImagePreview(null);
    setDropzoneDisabled(false);
    setValue("avatar", null);
    setIsImgValid(false);
    trigger();
  };

  const handleClick = () => {
    if (!dropzoneDisabled) {
      document.getElementById("fileInput").click();
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("surname", data.surname);
      formData.append("avatar", data.avatar);
      formData.append("department_id", data.department_id);

      await PostEmployee(formData);
    } catch (error) {
      console.error("Error uploading employee:", error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="close-btn-div">
          <button className="close-btn" onClick={onClose}>
            <img src={closeBtnPng} />
          </button>
        </div>
        <div className="modal-form">
          <h1>თანამშრომლის დამატება</h1>
          <div className="employee-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-name-div">
                <div className="inside-form-div">
                  <h3>სახელი*</h3>
                  <input
                    {...register("name")}
                    name="name"
                    className="form-input"
                    type="text"
                    onChange={handleNameChange}
                    style={{
                      borderColor:
                        nameMinError || nameMaxError || nameCharsError
                          ? "red"
                          : "#CED4DA",
                    }}
                  />
                  <span
                    style={{
                      color: nameMinError
                        ? "red"
                        : nameMinError === null
                        ? "gray"
                        : "green",
                    }}
                  >
                    მინიმუმ 2 სიმბოლო
                  </span>
                  <span
                    style={{
                      color: nameMaxError
                        ? "red"
                        : nameMaxError === null
                        ? "gray"
                        : "green",
                    }}
                  >
                    მაქსიმუმ 255 სიმბოლო
                  </span>
                  <span
                    style={{
                      color: nameCharsError
                        ? "red"
                        : nameCharsError === null
                        ? "gray"
                        : "green",
                    }}
                  >
                    მარტო ლათინური და ქართული სიმბოლოები
                  </span>
                </div>
                <div className="inside-form-div">
                  <h3>გვარი*</h3>
                  <input
                    {...register("surname")}
                    name="surname"
                    className="form-input"
                    onChange={handleSNameChange}
                    type="text"
                    style={{
                      borderColor:
                        snameMinError || snameMaxError || snameCharsError
                          ? "red"
                          : "#CED4DA",
                    }}
                  />
                  <span
                    style={{
                      color: snameMinError
                        ? "red"
                        : snameMinError === null
                        ? "gray"
                        : "green",
                    }}
                  >
                    მინიმუმ 2 სიმბოლო
                  </span>
                  <span
                    style={{
                      color: snameMaxError
                        ? "red"
                        : snameMaxError === null
                        ? "gray"
                        : "green",
                    }}
                  >
                    მაქსიმუმ 255 სიმბოლო
                  </span>
                  <span
                    style={{
                      color: snameCharsError
                        ? "red"
                        : snameCharsError === null
                        ? "gray"
                        : "green",
                    }}
                  >
                    მარტო ლათინური და ქართული სიმბოლოები
                  </span>
                </div>
              </div>
              <div className="inside-form-div">
                <h3>ავატარი*</h3>
                <div
                  className={`dropzone ${dropzoneDisabled ? "disabled" : ""}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={handleClick}
                  style={{ borderColor: isImgValid ? "#CED4DA" : "red" }}
                >
                  {!imagePreview ? (
                    <div className="upload-img-div">
                      <img className="dropzone-img" src={dropzoneImg} />
                      <h3>ატვირთე ფოტო</h3>
                    </div>
                  ) : (
                    <div className="img-preview">
                      <img
                        className="img-preview"
                        src={imagePreview}
                        alt="Avatar Preview"
                      />
                      <button
                        className="img-delete"
                        type="button"
                        onClick={handleImageDelete}
                      >
                        <img className="img-delete" src={imgDelete} />
                      </button>
                    </div>
                  )}
                </div>
                <p
                  style={{
                    color: imgErrorSize
                      ? "red"
                      : imgErrorSize === null
                      ? "gray"
                      : "green",
                  }}
                >
                  მაქსიმუმ 600kb ზომაში
                </p>

                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  accept="image/png, image/jpeg"
                  {...register("avatar")}
                  onChange={(e) => handleImageUpload(e.target.files[0])}
                />
              </div>
              <div className="inside-form-div">
                <h3>დეპარტამენტი*</h3>
                <SelectField
                  options={departments}
                  onChange={handleDepartmentChange}
                />
                <input type="hidden" {...register("department_id")} />
              </div>
              <div className="form-name-div form-btns">
                <button className="white-btn" onClick={onClose}>
                  გაუქმება
                </button>
                <button
                  style={{
                    backgroundColor: !isValid ? "#B588F4" : "#8338EC",
                    borderColor: !isValid ? "#B588F4" : "#8338EC",
                    cursor: !isValid ? "auto" : "pointer",
                  }}
                  type="submit"
                  className="purple-btn"
                >
                  დაამატე თანამშრომელი
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
