export const authorizeRole = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role; 
    console.log("User Role:", userRole); 

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ error: "Forbidden" });
    }
    next(); 
  };
};
