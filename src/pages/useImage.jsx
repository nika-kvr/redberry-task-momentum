import { useState } from "react";

export const useImage = () => {
  const [imagePreview, setImagePreview] = useState(
    localStorage.getItem("image") || null
  );
  const [imageError, setImageError] = useState("");

  const handleImageChange = (file) => {
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setImageError("Only JPEG and PNG formats are allowed.");
      setImagePreview(null);
      localStorage.removeItem("image");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setImageError("Image must be less than 2MB.");
      setImagePreview(null);
      localStorage.removeItem("image");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);
      localStorage.setItem("image", base64Image);
      setImageError("");
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    localStorage.removeItem("image");
  };

  return {
    imagePreview,
    imageError,
    handleImageChange,
    removeImage,
  };
};
