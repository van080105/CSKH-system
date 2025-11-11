export const errorHandler = (err, req, res, next) => {
  console.error(err.message); 

  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "Token không hợp lệ" });
  }


  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "Token đã hết hạn" });
  }


  return res.status(500).json({ error: err.message || "Lỗi hệ thống" });
};
