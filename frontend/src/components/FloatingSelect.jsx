const FloatingSelect = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder = "Chọn..." 
}) => {
  
  // Hàm đọc value và label tương thích cả 2 dạng:
  // 1. "Admin"
  // 2. { value: "Admin", label: "Quản trị viên" }
  const getValue = (o) => (typeof o === "string" ? o : o?.value);
  const getLabel = (o) => (typeof o === "string" ? o : o?.label);

  return (
    <div className="relative pt-5">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full px-4 py-3 rounded-xl backdrop-blur
          bg-white/20 border border-white/40 text-white
          focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40
          outline-none peer transition-all appearance-none
        "
      >
        {/* Placeholder option */}
        <option value="" disabled hidden className="text-black bg-white">
          {placeholder}
        </option>

        {/* Render tất cả option */}
        {options.map((opt, i) => (
          <option 
            key={i} 
            value={getValue(opt)} 
            className="text-black bg-white"
          >
            {getLabel(opt)}
          </option>
        ))}
      </select>

      {/* Floating label */}
      <label
        className={`
          absolute left-4 top-0 text-sm transition-all pointer-events-none text-white/80
          ${
            value 
              ? "" 
              : "peer-focus:text-sm peer-focus:top-0 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base"
          }
        `}
      >
        {label}
      </label>

      {/* Caret icon */}
      <span
        className="
          absolute right-4 top-1/2 -translate-y-1/2 
          pointer-events-none text-white/60 text-lg
        "
      >
        ▼
      </span>
    </div>
  );
};

export default FloatingSelect;
