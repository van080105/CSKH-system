import { useEffect, useState, useRef } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { PDFDownloadLink } from '@react-pdf/renderer'
import { ReportPDF } from './ReportPDF'
import { toPng } from 'html-to-image'
import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver'
import { useTranslation } from "react-i18next"

const chartData = [
  { name: "T1", ticketData2025: 10000, ticketData2024: 8000, satisfactionData2025: 75, satisfactionData2024: 70 },
  { name: "T3", ticketData2025: 15000, ticketData2024: 12000, satisfactionData2025: 80, satisfactionData2024: 75 },
  { name: "T5", ticketData2025: 18000, ticketData2024: 14000, satisfactionData2025: 85, satisfactionData2024: 78 },
  { name: "T7", ticketData2025: 22000, ticketData2024: 16000, satisfactionData2025: 88, satisfactionData2024: 82 },
  { name: "T9", ticketData2025: 21000, ticketData2024: 18000, satisfactionData2025: 90, satisfactionData2024: 85 },
  { name: "T11", ticketData2025: 23000, ticketData2024: 19000, satisfactionData2025: 89.31, satisfactionData2024: 87 },
];

export function ReportForm({ onClose }) {
  const [visible, setVisible] = useState(false)
  const [year, setYear] = useState("2025")
  const [staff, setStaff] = useState("Nhân viên")
  const [area, setArea] = useState("Khu vực")
  
  const [ticketChartImage, setTicketChartImage] = useState(null)
  const [satisfactionChartImage, setSatisfactionChartImage] = useState(null)

  const reportRef = useRef();
  const ticketsChartRef = useRef();
  const satisfactionChartRef = useRef();
  const { t } = useTranslation()
  
  const exportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Báo cáo");

    // Thêm tiêu đề cột từ khóa của đối tượng đầu tiên trong chartData
    const columns = Object.keys(chartData[0]).map((key) => ({
      header: key.toUpperCase(),
      key: key,
      width: 15,
    }));

    worksheet.columns = columns;

    // Thêm dữ liệu
    chartData.forEach((item) => {
      worksheet.addRow(item);
    });

    // Style cho hàng đầu tiên (header)
    worksheet.getRow(1).font = { bold: true };

    // Ghi ra blob và tải xuống
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, `BaoCao-${year}.xlsx`);
  };


  // Wait for render complete by checking after a delay
  useEffect(() => {
    setVisible(true);

    const waitForRenderComplete = () => {
      // Delay chụp ảnh để đợi biểu đồ render hoàn tất
      setTimeout(() => {
        if (ticketsChartRef.current) {
          toPng(ticketsChartRef.current).then(setTicketChartImage);
        }
        if (satisfactionChartRef.current) {
          toPng(satisfactionChartRef.current).then(setSatisfactionChartImage);
        }
      }, 3000); // Đợi 3s sau khi biểu đồ được render
    };

    // Call the function to wait for render complete
    waitForRenderComplete();

  }, []);

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => onClose(), 300)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      ></div>

      <div
        ref={reportRef}
        className={`relative z-10 bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-y-auto p-8 transition-all duration-300 transform ${visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
      >
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white text-2xl"
        >
          &times;
        </button>

        <div className="mb-8 text-center mt-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            MOCK<span className="text-blue-600">STACK</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Số 1 Nguyễn Đình Chiểu, Phường Sài Gòn,<br />TP.HCM
          </p>
        </div>

        <div className="mb-8 border-t-2 border-gray-300 dark:border-gray-700" />

        <div className="mb-8 flex gap-4">
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white px-4 py-2 rounded"
          >
            <option>Năm</option>
            <option>2024</option>
            <option>2025</option>
          </select>

          {/* Dropdown cho phòng ban */}
          <select className="px-3 py-1.5 w-32 border border-gray-300 dark:border-gray-600 rounded-lg text-sm dark:bg-gray-800 dark:text-white">
            <option>{t("selectDepartment")}</option>
            <option>Sales</option>
            <option>Support</option>
            <option>Marketing</option>
            <option>Development</option>
          </select>

          <select
            value={staff}
            onChange={(e) => setStaff(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white px-4 py-2 rounded"
          >
            <option>Nhân viên</option>
          </select>

          <select
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white px-4 py-2 rounded"
          >
            <option>Khu vực</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* TICKETS */}
          <div className="border border-gray-200 dark:border-gray-700 p-6 rounded dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">TICKETS</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Tổng ticket</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">22,192 tickets</p>
            <p className="text-sm text-green-600 mb-4">↑ 37.8% so với 8/9/2025</p>
            <div ref={ticketsChartRef}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="name" stroke="#ccc" fontSize={12} />
                  <YAxis stroke="#ccc" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937", // dark bg
                      color: "#fff",
                      borderRadius: "6px",
                      border: "none"
                    }}
                    labelStyle={{ color: "#9ca3af" }}
                  />
                  <Line type="monotone" dataKey="ticketData2025" stroke="#3B82F6" />
                  <Line type="monotone" dataKey="ticketData2024" stroke="#FCA5A5" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">1/1-31/11, 2025</p>
          </div>

          {/* SATISFACTION */}
          <div className="border border-gray-200 dark:border-gray-700 p-6 rounded dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">MỨC ĐỘ HÀI LÒNG</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">Mức độ hài lòng của khách</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mb-2">89.31 %</p>
            <p className="text-sm text-green-600 mb-4">↑ 3.6% so với 8/9/2025</p>
            <div ref={satisfactionChartRef}>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#555" />
                  <XAxis dataKey="name" stroke="#ccc" fontSize={12} />
                  <YAxis stroke="#ccc" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      color: "#fff",
                      borderRadius: "6px",
                      border: "none"
                    }}
                    labelStyle={{ color: "#9ca3af" }}
                  />
                  <Line type="monotone" dataKey="satisfactionData2025" stroke="#3B82F6" />
                  <Line type="monotone" dataKey="satisfactionData2024" stroke="#FCA5A5" strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">1/1-31/11, 2025</p>
          </div>
        </div>

        {/* BUTTONS */}
        <div className="mt-8 flex justify-end gap-4">
          <PDFDownloadLink
            document={
              <ReportPDF
                year={year}
                staff={staff}
                area={area}
                chartData={chartData}
                ticketChartImage={ticketChartImage}
                satisfactionChartImage={satisfactionChartImage}
              />
            }
            fileName={`BaoCao-${year}.pdf`}
          >
            {({ loading }) => (
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-300">
                {loading ? "Đang tải..." : "Tải báo cáo PDF"}
              </button>
            )}
          </PDFDownloadLink>

          <button
            onClick={exportExcel}
            className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-green-700 transition duration-300"
          >
            Tải báo cáo Excel
          </button>
        </div>
      </div>
    </div>
  )
}
