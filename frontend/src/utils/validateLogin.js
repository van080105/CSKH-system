/**
 * OWASP ASVS L2 – Enterprise Security
 */
export default async function validateLogin(formData) {
  const errors = {};

  const getIP = async () => {
    try {
      const res = await fetch("https://api.ipify.org?format=json");
      const data = await res.json();
      return data.ip || "unknown";
    } catch (_) {
      return "unknown";
    }
  };

  const getDeviceFingerprint = () => {
    return [
      navigator.platform,
      navigator.language,
      navigator.hardwareConcurrency,
      navigator.deviceMemory,
      screen.width + "x" + screen.height,
      navigator.userAgent
    ].join("|");
  };

  const currentIP = await getIP();
  const currentDevice = getDeviceFingerprint();

  // Phát hiện IP hoặc device thay đổi bất thường
  const lastDevice = localStorage.getItem("device_fp");
  const lastIP = localStorage.getItem("device_ip");

  if (lastDevice && lastDevice !== currentDevice) {
    errors.device = "Thiết bị lạ được phát hiện.";
  }
  if (lastIP && lastIP !== currentIP) {
    errors.ip = "Địa chỉ IP thay đổi bất thường.";
  }

  localStorage.setItem("device_fp", currentDevice);
  localStorage.setItem("device_ip", currentIP);

  /* ------------------------------------------------------------
    Ngăn ngừa bot (typing tốc độ quá nhanh)
  ------------------------------------------------------------ */
  const startTyping = Number(localStorage.getItem("typing_start") || Date.now());
  const duration = Date.now() - startTyping;

  if (duration < 500) {
    errors.bot = "Hệ thống nghi ngờ bot tự động đang cố đăng nhập.";
  }

  /* ------------------------------------------------------------
    Lọc Unicode độc hại + normalize
  ------------------------------------------------------------ */
  const removeDangerousUnicode = (str) =>
    str
      .normalize("NFKC")
      .replace(/[\u200B-\u200F\u202A-\u202E]/g, "") // Zero-width + RTL/LTR override
      .replace(/[\uFFF0-\uFFFF]/g, "") // vùng Unicode nguy hiểm
      .trim();

  const sanitize = (str) =>
    removeDangerousUnicode(
      str
        ?.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, "")
        ?.replace(/[\uFF02\uFF07]/g, "")
        ?.trim() || ""
    );

  let email = sanitize(formData.email || "");
  let password = sanitize(formData.password || "");

  /* ------------------------------------------------------------
    Decode thử (URL encode, Base64, hex)
  ------------------------------------------------------------ */
  const decodeAttempt = (value) => {
    let v = value;

    try { v = decodeURIComponent(v); } catch (_) {}
    try { const b64 = atob(v); if (/^[\x20-\x7E]+$/.test(b64)) v = b64; } catch (_) {}
    try {
      if (/^[0-9a-fA-F]+$/.test(v) && v.length % 2 === 0) {
        v = Buffer.from(v, "hex").toString();
      }
    } catch (_) {}

    return v;
  };

  email = decodeAttempt(email);
  password = decodeAttempt(password);

  /* ------------------------------------------------------------
    Bộ phát hiện tấn công
    (XSS, Polyglot, SQLi, NoSQL, Template Injection, Command)
  ------------------------------------------------------------ */
  const attackPatterns = [
    // XSS + Polyglot
    /<script.*?>.*?<\/script>/gi,
    /<.*?on\w+=.*?>/gi,
    /javascript:/gi,
    /data:text\/html/gi,
    /srcdoc=/gi,
    /<iframe/gi,
    /<svg.*?onload/gi,
    /document\.cookie/gi,
    /=>\s*{.*?}/gi,

    // Template Injection
    /\{\{.*?\}\}/g,
    /\${.*?}/g,
    /{%.*?%}/g,

    // SQL Injection
    /(\b)(or|and)\s+[\w'`"]+\s*=\s*[\w'`"]+/gi,
    /union\s+(all\s+)?select/gi,
    /sleep\(\d+\)/gi,
    /benchmark\(/gi,
    /order\s+by\s+\d+/gi,

    // NoSQL Injection
    /\$where|\$ne|\$gt|\$lt|\$regex|\$in/gi,
    /\{\s*\$.*?\}/gi,

    // Command Injection
    /[`;$|&<>]/g,
    /\b(cat|curl|wget|rm|ls|whoami)\b/gi,

    // HTML Injection
    /<\/?\w+.*?>/gi,

    // Prototype pollution
    /__proto__|constructor|prototype/gi,

    // Regex bombs / ReDoS
    /(.)\1{10,}/g,
  ];

  const detectAttack = (str) =>
    attackPatterns.some((pattern) => pattern.test(str));

  if (detectAttack(email)) errors.email = "Email chứa ký tự không hợp lệ.";
  if (detectAttack(password)) errors.password = "Mật khẩu chứa ký tự không hợp lệ.";

  /* ------------------------------------------------------------
    Giới hạn độ dài – chống DoS
  ------------------------------------------------------------ */
  if (email.length > 90) errors.email = "Email quá dài.";
  if (password.length > 90) errors.password = "Mật khẩu quá dài.";

  if (Object.keys(errors).length > 0) {
    return { valid: false, errors };
  }

  // Email
  if (!email) {
    errors.email = "Email không được để trống.";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = "Email không hợp lệ.";
    }
  }

  // Password
  if (!password) {
    errors.password = "Mật khẩu không được để trống.";
  } else {
    const demoPasswordRegex = /^(?=.*[a-z])(?=.*\d)[a-z\d]{6,}$/;
    if (!demoPasswordRegex.test(password)) {
      errors.password =
        "Mật khẩu phải có ít nhất 6 ký tự, bao gồm chữ thường và số.";
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}