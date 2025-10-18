import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const initialFAQs = [
  {
    question: 'iPhone ở đây là hàng chính hãng hay xách tay?',
    answer: 'Tùy theo nhu cầu, cửa hàng có cung cấp cả hàng chính hãng (VN/A) và hàng xách tay quốc tế (LL/A, ZP/A...), đều là máy mới 100% và có đầy đủ bảo hành rõ ràng.',
  },
  {
    question: 'Có chương trình khuyến mãi, giảm giá hoặc ưu đãi nào không?',
    answer: 'Cửa hàng thường xuyên có các chương trình giảm giá, ưu đãi theo mùa, tặng phụ kiện, hoặc miễn phí cài đặt – giao hàng, v.v. Bạn có thể theo dõi tại mục Khuyến mãi.',
  },
  {
    question: 'Nếu máy có vấn đề thì bảo hành tại cửa hàng hay trung tâm Apple?',
    answer: 'Hàng chính hãng sẽ được bảo hành tại trung tâm ủy quyền Apple (AASP) trên toàn quốc. Hàng xách tay sẽ được bảo hành tại cửa hàng.',
  },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState(initialFAQs);
  const [openIndexes, setOpenIndexes] = useState([]); // Thay đổi để có thể mở nhiều câu hỏi

  const handleToggle = (index) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter(i => i !== index)); // Đóng câu hỏi
    } else {
      setOpenIndexes([...openIndexes, index]); // Mở câu hỏi
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    if (form.question.trim() && form.answer.trim()) {
      setFaqs([...faqs, form]);
      setForm({ question: '', answer: '' });
    }
  };

  const handleDelete = (index) => {
    const updatedFaqs = faqs.filter((_, i) => i !== index);
    setFaqs(updatedFaqs);
  };

  const [form, setForm] = useState({ question: '', answer: '' });
  const { t } = useTranslation();
  
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white text-gray-900 rounded-xl shadow-lg">
      <div className="faq-buttons mb-4 flex justify-between items-center">
        <button
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          onClick={handleAdd}
        >
          <Plus className="h-4 w-4" />
          {t("addFAQ")}
        </button>
      </div>

      <div className="faq-form mb-6">
        <input
          type="text"
          name="question"
          placeholder={t("question")}
          value={form.question}
          onChange={handleChange}
          className="w-full p-4 bg-gray-100 text-gray-900 rounded-lg mb-4 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="answer"
          placeholder={t("answer")}
          value={form.answer}
          onChange={handleChange}
          className="w-full p-4 bg-gray-100 text-gray-900 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="faq-list space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="faq-item bg-gray-50 rounded-xl p-4 shadow-md transition-all duration-300 hover:shadow-xl hover:bg-gray-100"
          >
            <div
              className="faq-question flex justify-between items-center cursor-pointer p-4" // Tăng padding ở đây
              onClick={() => handleToggle(index)}
            >
              <h4 className="text-lg font-semibold">{faq.question}</h4>
              <span className="text-2xl font-bold">{openIndexes.includes(index) ? '−' : '+'}</span>
            </div>
            {openIndexes.includes(index) && (
              <div className="faq-answer mt-4 text-gray-700 p-4">
                <p>{faq.answer}</p>
              </div>
            )}
            <div className="faq-actions mt-4 flex gap-4 justify-end">
              <button
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white font-semibold transition duration-300"
                onClick={() => {}}
              >
                {t("modify")}
              </button>
              <button
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-white font-semibold transition duration-300"
                onClick={() => handleDelete(index)}
              >
                {t("delete")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
