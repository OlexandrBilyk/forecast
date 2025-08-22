import { useState, useEffect, useRef } from "react";

export default function Avatar({ className }) {
  const [avatar, setAvatar] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const savedAvatar = localStorage.getItem(`avatar${currentUser.username}`);
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result);
      localStorage.setItem(`avatar${currentUser.username}`, reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {avatar ? (
        <img
          src={avatar}
          alt="avatar"
          className={className}
          onClick={handleClick}
        />
      ) : (
        <img
          src="/images/public-profile-img.jpg"
          alt="profile image"
          className={className}
          onClick={handleClick}
        />
      )}

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleUpload}
        style={{ display: "none" }}
      />
    </>
  );
}
