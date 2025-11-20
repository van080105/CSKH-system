// src/components/EditProfileForm.js
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import GlassmorphismModal from "./Modal/GlassMorphismModal";
import SuccessOverlay from "./Overlay/SuccessOverlay";
import FloatingInput from "./Form/FloatingInput";
import FloatingSelect from "./Form/FloatingSelect";

const EditProfileForm = ({ onClose, userData, onUpdate, extraInfo }) => {
  const [fullName, setFullName] = useState(userData?.Fullname || "");
  const [address, setAddress] = useState(userData?.AddressAcc || "");
  const [role] = useState(userData?.Role || "");
  const [email] = useState(userData?.Email || "");
  const [id] = useState(userData?.ID || "");

  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState(address);
  const [showSuccess, setShowSuccess] = useState(false);
  const { t } = useTranslation();

  const fetchProvinces = async () => {
    try {
      const res = await fetch("https://provinces.open-api.vn/api/v2/");
      const data = await res.json();
      setProvinces(data);
    } catch (error) {
      console.error("Lỗi tải danh sách tỉnh/thành:", error);
    }
  };

  useEffect(() => {
    setIsVisible(true);
    fetchProvinces();
  }, []);

  useEffect(() => {
    setFullName(userData?.Fullname || "");
    setAddress(userData?.AddressAcc || "");
  }, [userData]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 300);
  };

  const handleSubmit = async () => {
    if (!["Customer", "Agent"].includes(role)) {
      setErrorMsg("Chỉ Customer hoặc Agent mới có thể cập nhật thông tin.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    try {
      const token = localStorage.getItem("token");
      const body = {
        fullname: fullName,
        address: selectedProvince,
      };

      const res = await fetch("http://localhost:8080/api/accounts/my", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data?.message || "Cập nhật thất bại.");
        setLoading(false);
        return;
      }

      // Call callback của cha để update state
      if (onUpdate) onUpdate({ ...userData, Fullname: fullName, AddressAcc: selectedProvince });
      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
        handleClose();
      }, 1500);

    } catch (err) {
      console.error(err);
      setErrorMsg("Có lỗi xảy ra, vui lòng thử lại.");
      setLoading(false);
    }
  };

  return (
    <GlassmorphismModal onClose={handleClose}>
      {/* Title */}
      <h2 className="text-4xl font-semibold mb-10 tracking-tight drop-shadow-lg">
        {t("editProfile")}
      </h2>

      {/* Error Message */}
      {errorMsg && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 p-3 rounded-xl bg-red-500/30 backdrop-blur text-red-200 border border-red-400/40"
        >
          {errorMsg}
        </motion.div>
      )}

      {/* Form */}
      {loading ? (
        <div className="grid grid-cols-2 gap-8 animate-pulse">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 bg-white/20 rounded-xl shimmer" />
          ))}
        </div>
      ) : (
        <motion.div className="grid grid-cols-2 gap-8">
          <FloatingInput
            label={t("fullNameProfile")}
            value={fullName}
            onChange={setFullName}
          />

          <FloatingSelect
            label={t("address")}
            initValue={address}
            value={selectedProvince}
            onChange={setSelectedProvince}
            options={provinces.map((p) => ({
              value: p.name,
              label: p.name,
            }))}
          />

          {/* Read-only fields */}
          <FloatingInput label="Email" value={email} readOnly />
          <FloatingInput label="ID" value={id} readOnly />
        </motion.div>
      )}

      {/* Submit */}
      <div className="mt-10 flex justify-end">
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={handleSubmit}
          disabled={loading}
          className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 shadow-lg shadow-blue-500/30 hover:shadow-xl transition-all"
        >
          {loading ? "Đang cập nhật..." : "Xác nhận chỉnh sửa"}
        </motion.button>
      </div>

      {/* Success Overlay */}
      <SuccessOverlay showSuccess={showSuccess} />
    </GlassmorphismModal>
  );
};

export default EditProfileForm;
