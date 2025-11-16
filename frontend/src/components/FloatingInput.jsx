const FloatingInput = ({ label, value, onChange, readOnly }) => {
  return (
    <div className="relative pt-5">
      <input
        value={value}
        readOnly={readOnly}
        placeholder=" "
        onChange={(e) => onChange?.(e.target.value)}
        className={`
          w-full px-4 py-3 rounded-xl backdrop-blur
          peer outline-none transition-all
          ${
            readOnly
              ? "bg-white/10 border border-white/20 text-white/40 cursor-not-allowed"
              : "bg-white/20 border border-white/40 text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-500/40"
          }
        `}
      />
      <label
        className={`
          absolute left-4 top-0 text-sm transition-all pointer-events-none 
          ${readOnly ? "text-white/40" : "text-white/80"}
          peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
          peer-focus:top-0 peer-focus:text-sm
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingInput;