import { useState } from "react";

export default function MultiSelectIDGrid({ label, options, value, onChange }) {
  const [search, setSearch] = useState("");
  const [rangeStart, setRangeStart] = useState(null);
  const [rangeEnd, setRangeEnd] = useState(null);

  const toggle = (id) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id].sort((a, b) => a - b));
    }
  };

  const selectAll = () => onChange([...options]);
  const deselectAll = () => onChange([]);

  const selectRange = () => {
    if (rangeStart === null || rangeEnd === null) return;
    const range = options.filter((id) => id >= rangeStart && id <= rangeEnd);
    onChange([...new Set([...value, ...range])].sort((a, b) => a - b));
  };

  const filtered = options.filter((id) =>
    id.toString().includes(search.toString())
  );

  const idMax = options.length > 0 ? Math.max(...options) : 1;
  const rangeOptions = Array.from({ length: idMax }, (_, i) => i + 1);

  return (
    <div className="w-full">
      <p className="text-white/80 mb-2">{label}</p>

      {/* Search box */}
      <input
        type="text"
        placeholder="Tìm ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 mb-2 rounded-lg bg-white/20 text-white border border-white/30 backdrop-blur focus:ring-2 focus:ring-blue-400"
      />

      {/* Range select */}
      <div className="flex gap-2 mb-2 items-center">
        {/* Chọn cận dưới */}
        <select
          value={rangeStart ?? ""}
          onChange={(e) => {
            setRangeStart(Number(e.target.value));
            setRangeEnd(null); // reset cận trên mỗi lần chọn cận dưới
          }}
          className="w-1/2 px-2 py-1 rounded-lg bg-white/20 dark:bg-gray-600 border border-white/30 text-black dark:text-white"
        >
          <option value="" disabled>Chọn từ...</option>
          {rangeOptions.map((id) => (
            <option key={id} value={id}>{id}</option>
          ))}
        </select>

        {/* Chọn cận trên */}
        <select
          value={rangeEnd ?? ""}
          onChange={(e) => setRangeEnd(Number(e.target.value))}
          className="w-1/2 px-2 py-1 rounded-lg bg-white/20 dark:bg-gray-600 border border-white/30 text-black dark:text-white" 
          disabled={rangeStart === null} // chỉ cho chọn cận trên sau khi chọn cận dưới
        >
          <option value="" disabled>Đến...</option>
          {rangeOptions
            .filter((id) => rangeStart !== null && id > rangeStart)
            .map((id) => (
              <option key={id} value={id}>{id}</option>
            ))}
        </select>

        <button
          onClick={selectRange}
          disabled={rangeStart === null || rangeEnd === null}
          className={`px-3 py-1 rounded-lg text-white ${
            rangeStart !== null && rangeEnd !== null ? "bg-blue-500" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Chọn khoảng
        </button>
      </div>

      {/* Select / Deselect all */}
      <div className="flex gap-2 mb-3">
        <button
          onClick={selectAll}
          className="px-3 py-1 bg-green-500 text-white rounded-lg"
        >
          Chọn tất cả
        </button>
        <button
          onClick={deselectAll}
          className="px-3 py-1 bg-red-500 text-white rounded-lg"
        >
          Bỏ chọn tất cả
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-3 p-4 rounded-xl bg-white/10 backdrop-blur border border-white/20 max-h-60 overflow-y-auto">
        {filtered.map((id) => {
          const selected = value.includes(id);

          return (
            <button
              key={id}
              onClick={() => toggle(id)}
              className="relative group flex flex-col items-center"
            >
              <div
                className={`
                  w-10 h-8 rounded-t-lg transition-all duration-300 
                  flex items-center justify-center text-xs font-bold
                  shadow-md border
                  ${selected 
                    ? "bg-green-500 border-green-300 shadow-green-400 shadow-lg scale-105"  
                    : "bg-gray-300 border-gray-400 text-gray-700 group-hover:bg-gray-200"
                  }
                `}
              >
                {id}
              </div>

              <div
                className={`
                  w-10 h-2 rounded-b-md border-t transition-all duration-300
                  ${selected 
                    ? "bg-green-600 border-green-500" 
                    : "bg-gray-400 border-gray-500 group-hover:bg-gray-300"
                  }
                `}
              ></div>
            </button>
          );
        })}
      </div>
      
    </div>
  );
}
