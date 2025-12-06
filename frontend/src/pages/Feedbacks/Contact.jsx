"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Loader2, CheckCircle, Mail, Sparkles} from "lucide-react"

import Particles, { initParticlesEngine } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"  

import { useTranslation } from "react-i18next"
import CategoryDropdown from "../../components/CategoryDropdown"
import { buildTree, getChildrenByPath } from "../../utils/workWithTree"
import playSound from "../../utils/playSound"

export default function Contact() {
  const { t } = useTranslation()
  const user = JSON.parse(localStorage.getItem("user"))
  const userRole = user?.role || "guest"
  const [formData, setFormData] = useState({
    fullName: userRole === "Customer" ? user.fullname : "", 
    email: userRole === "Customer" ? user.email : "",
    province: "",
    title: "",
    category: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    message: "",
    category: "",
  });
  const [init, setInit] = useState(false)

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title || formData.title.trim().length < 3) {
      newErrors.title = "Tiêu đề không được để trống hoặc ít hơn 3 kí tự"; 
    }

    if (!formData.message || formData.message.trim().length < 5) {
      newErrors.message = "Nội dung không được để trống hoặc ít hơn 5 kí tự";
    }

    if (!formData.category) {
      newErrors.category = "Vui lòng chọn danh mục";
    }

    setErrors(newErrors);

    // Nếu object errors rỗng → form hợp lệ
    return Object.keys(newErrors).length === 0;
};

  const [categoriesAPI, setCategoriesAPI] = useState([]);
  const [categoryPath, setCategoryPath] = useState([]); 

  const guestCreateForm = async () => {
    try{
      const res = await fetch("http://localhost:8080/guest/make_form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title : formData.title,
          content : formData.message,
          type : formData.category
        }),
      })
      if (!res.ok) {
        console.log("Cannot create form", res.statusText)
      }
    }
    catch(err){
      console.error("Error when guest create form:",err)
    }
  }

  const customerCreateForm = async () => {
    try{
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:8080/customer/make_form/${user.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json,", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({
          title : formData.title,
          content : formData.message,
          type : formData.category
        }),
      })
      if (!res.ok) throw new Error(res.statusText)
    }
    catch(err){
      console.error("Error when customer create form:",err)
    }
  }

  const fetchClassifyTables = async () => {
    try {
      const res = await fetch("http://localhost:8080/classifyTable");
      const data = await res.json();
      console.log(data)
      const tree = buildTree(data.data); 

      setCategoriesAPI(tree);
    } catch (err) {
      console.error("Error:", err);
    }
  };


  const [status, setStatus] = useState("idle")
  const [hint, setHint] = useState("")
  const [provinces, setProvinces] = useState([]);

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
    fetchProvinces();
    fetchClassifyTables();
  }, []);

  useEffect(() => {
    const { message } = formData
    if (!message) return setHint("")
    if (message.toLowerCase().includes("đăng nhập"))
      setHint(t("hint_login"))
    else if (message.toLowerCase().includes("thanh toán"))
      setHint(t("hint_payment"))
    else if (message.length > 80)
      setHint(t("hint_detail"))
    else setHint("")
  }, [formData.message, t])

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine) 
    }).then(() => setInit(true))
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus("sending")

    if (!validateForm()) {
      setStatus("idle")
      return;
    }

    try {
      if(userRole === "customer"){
        await customerCreateForm()
      }
      else{
        await guestCreateForm()
      }
      playSound(true)
      setStatus("success")
      setFormData({ fullName: "", email: "", title: "", message: "" })
      setErrors({});
    } catch {
      playSound(false)
      setStatus("idle")
    }
  }

  const resetForm = () => setStatus("idle")

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-950 dark:to-black overflow-hidden px-6 py-16">
      <Particles
        id="tsparticles"
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            color: { value: "#a78bfa" },
            links: { enable: false },
            move: {
              enable: true,
              speed: 0.3,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
            },
            number: { value: 60 },
            opacity: { value: 0.3 },
            shape: { type: "circle" },
            size: { value: { min: 0.5, max: 2 } },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />

      <motion.div
        className="absolute w-[700px] h-[700px] bg-gradient-to-r from-blue-400/20 to-cyan-500/20 rounded-full blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 35, ease: "linear" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-lg p-8 rounded-3xl border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 shadow-[0_8px_40px_rgba(0,0,0,0.1)] backdrop-blur-xl"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-3"
          >
            <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/40">
              <Mail className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </motion.div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {t("contact_us")}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {t("contact_description")}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-10"
            >
              <CheckCircle className="h-12 w-12 mx-auto text-green-500 mb-3 animate-bounce" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                {t("thank_you")}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {t("message_sent_success")}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetForm}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-600 hover:opacity-90 transition"
              >
                {t("send_another")}
              </motion.button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {[
                {
                  label: t("full_name"),
                  name: "fullName",
                  type: "text",
                  placeholder: "Nguyễn Văn A",
                },
                {
                  label: t("email"),
                  name: "email",
                  type: "email",
                  placeholder: "you@example.com",
                },
                {
                  label: t("address"),
                  name: "province",
                  type: "select",        
                  options: provinces, 
                },                
                {
                  label: t("subject"),
                  name: "title",
                  type: "text",
                  placeholder: t("subject_placeholder"),
                },
              ].map((f, i) => (
                <motion.div
                  key={f.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {f.label}
                  </label>

                  {f.type === "select" ? (
                    <select
                      name={f.name}
                      value={formData[f.name]}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    >
                      <option disabled>{">--- Chọn Tỉnh/Thành ---<"}</option>
                      {f.options.map((p) => (
                        <option key={p.code} value={p.name} className="text-gray-600 dark:text-gray-400">
                          {p.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type}
                      name={f.name}
                      value={formData[f.name]}
                      onChange={handleChange}
                      placeholder={f.placeholder}
                      required
                      readOnly={(userRole === "Customer" && f.name !== "title")}
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2.5 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
                    />
                  )}

                  {errors[f.name] && (
                    <p className="mt-1 text-sm text-red-500">{errors[f.name]}</p>
                  )}                  
                </motion.div>
              ))}

              {/* 🗂️ Danh mục (Category) */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
              >
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2 justify-center">
                  {t("category")}
                </label>

                <div className="space-y-4">
                  {/* Dropdown cấp 1 */}
                  <CategoryDropdown
                    level={0}
                    options={getChildrenByPath(categoriesAPI)}
                    path={categoryPath}
                    setPath={setCategoryPath}
                    setFormData={setFormData}
                  />
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">{errors.category}</p>
                  )}

                  {/* Dropdown cấp 2, 3, 4... hiển thị theo path đã chọn */}
                  {categoryPath.map((_, level) => {
                    const children = getChildrenByPath(categoriesAPI, categoryPath.slice(0, level + 1));
                    return children.length > 0 ? (
                      <CategoryDropdown
                        key={level + 1}
                        level={level + 1}
                        options={children}
                        path={categoryPath}
                        setPath={setCategoryPath}
                        setFormData={setFormData}
                      />
                    ) : null;
                  })}
                </div>

              </motion.div>

              {/* Nội dung */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {t("message")}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder={t("message_placeholder")}
                  required
                  className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2.5 text-sm resize-none focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 hover:shadow-[0_0_0_2px_rgba(99,102,241,0.1)]"
                ></textarea>

                {hint && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 mt-2 text-sm text-indigo-600 dark:text-indigo-400"
                  >
                    <Sparkles className="w-4 h-4" />
                    {hint}
                  </motion.div>
                )}

                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                )}               
              </motion.div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={status === "sending"}
                  onClick={() =>
                    setFormData({ 
                      fullName: (userRole === "Customer" ? user.fullname : ""), 
                      email: userRole === "Customer" ? user.email : "", 
                      title: "", 
                      message: "" 
                    })
                  }
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                >
                  {t("cancel")}
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={status === "sending"}
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-cyan-600 hover:opacity-90 transition disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> {t("sending")}
                    </>
                  ) : (
                    t("send_message")
                  )}
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
