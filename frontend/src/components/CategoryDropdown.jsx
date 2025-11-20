const CategoryDropdown = ({ level, options, path, setPath, setFormData }) => {
  return (
    <div className="mt-2">
      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
        {`Danh mục cấp ${level + 1}`}
      </label>

      <select
        value={path[level] || ""}
        onChange={(e) => {
          const newValue = Number(e.target.value);
          const newPath = [...path.slice(0, level), newValue];

          setPath(newPath);

          // Nếu danh mục được chọn không có con nữa → đây là lá cuối
          const selected = options.find(o => o.TableID === newValue);
          if (!selected.children.length) {
            setFormData(prev => ({ ...prev, category: selected.NameTable }));
          }
        }}
        className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 
                   text-gray-900 dark:text-gray-100 px-4 py-2.5 text-sm 
                   focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
      >
        <option value="">-- Chọn danh mục --</option>

        {options.map(opt => (
          <option key={opt.TableID} value={opt.TableID}>
            {opt.NameTable}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;