const normalize = (str) =>
(str || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "") // loại bỏ dấu
      .trim();

export default normalize;