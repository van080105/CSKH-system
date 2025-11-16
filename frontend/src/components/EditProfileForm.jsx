import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "framer-motion"
import FloatingInput from "./FloatingInput";
import FloatingSelect from "./FloatingSelect";

const EditProfileForm = ({ onClose, userData, onUpdate, extraInfo }) => {
  // Khởi tạo form từ userData
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
        address : selectedProvince,
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
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 18, stiffness: 220 }}
            className="
              relative w-full max-w-3xl p-10 rounded-3xl
              bg-white/20 dark:bg-gray-900/20
              backdrop-blur-xl border border-white/30 dark:border-gray-700/40 
              shadow-[0_8px_40px_rgba(0,0,0,0.25)]
              text-white
            "
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-4xl font-semibold mb-10 tracking-tight drop-shadow-lg">
              {t("editProfile")}
            </h2>

            {/* Error */}
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-red-500/30 backdrop-blur text-red-200 border border-red-400/40"
              >
                {errorMsg}
              </motion.div>
            )}

            {/* Content */}
            {loading ? (
              <div className="grid grid-cols-2 gap-8 animate-pulse">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-white/20 rounded-xl shimmer"
                  />
                ))}
              </div>
            ) : (
              <motion.div
                
                className="grid grid-cols-2 gap-8"
              >
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

                <AnimatePresence>
                  {role === "Admin" && extraInfo?.Privilege && (
                    <motion.div
                      
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <FloatingInput
                        label="Quyền hạn"
                        value={extraInfo.Privilege}
                        readOnly
                      />
                    </motion.div>
                  )}

                  {role === "Agent" && (
                    <>
                      {extraInfo?.ReceiverID && (
                        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <FloatingInput
                            label={t("receiverID")}
                            value={extraInfo.ReceiverID}
                            readOnly
                          />
                        </motion.div>
                      )}

                      {extraInfo?.Status && (
                        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <FloatingInput
                            label={t("status")}
                            value={extraInfo.Status}
                            readOnly
                          />
                        </motion.div>
                      )}

                      {extraInfo?.ResponsibleField && (
                        <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <FloatingInput
                            label={t("responsibleField")}
                            value={extraInfo.ResponsibleField}
                            readOnly
                          />
                        </motion.div>
                      )}
                    </>
                  )}

                  {role === "Customer" && extraInfo?.Membership && (
                    <motion.div layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <FloatingInput
                        label="Membership"
                        value={extraInfo.Membership}
                        readOnly
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Submit */}
            <div className="mt-10 flex justify-end">
              <motion.button
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                onClick={handleSubmit}
                disabled={loading}
                className="
                  px-8 py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700
                  shadow-lg shadow-blue-500/30 hover:shadow-xl
                  transition-all
                "
              >
                {loading ? "Đang cập nhật..." : "Xác nhận chỉnh sửa"}
              </motion.button>
            </div>
          </motion.div>

          {/* Success popup */}
          <AnimatePresence>
            {showSuccess && (
              <motion.div
                key="success-overlay"
                className="fixed inset-0 z-[100] flex items-center justify-center 
                          bg-black/40 backdrop-blur-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              >
                <motion.div
                  key="success-box"
                  initial={{ scale: 0.8, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.85, opacity: 0, y: -10 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="
                    p-12 bg-white/25 backdrop-blur-2xl rounded-3xl 
                    border border-white/30 shadow-xl text-white text-center
                    flex flex-col items-center justify-center
                  "
                >
                  <div className="w-20 h-20 mb-6 flex items-center justify-center 
                                  bg-green-500 rounded-full text-4xl mx-auto shadow-lg">
                    ✓
                  </div>

                  <h2 className="text-3xl font-semibold">Cập nhật thành công!</h2>
                  <p className="mt-2 opacity-90">Thông tin của bạn đã được lưu lại.</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
 
};

export default EditProfileForm;
