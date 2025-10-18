import { Document, Page, Text, View, StyleSheet, Font, Image } from '@react-pdf/renderer';
import dejavuFont from "../assets/fonts/DejaVuSans.ttf";
import { Buffer } from 'buffer';

window.Buffer = Buffer;

Font.register({
  family: 'DejaVu Sans',
  src: dejavuFont,
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
    fontFamily: 'DejaVu Sans',
  },
  header: {
    textAlign: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  chartImage: {
    marginTop: 10,
    width: "100%",
    height: 240,
    objectFit: "contain",
  },
  table: {
    display: "table",
    width: "auto",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 4,
    width: "33%",
  },
  footerText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 10,
  },
});

export const ReportPDF = ({
  year,
  staff,
  area,
  chartData,
  ticketChartImage,
  satisfactionChartImage
}) => {
  const now = new Date();
  const formattedDate = now.toLocaleString("vi-VN");
  const reportCode = `RC${now.getTime()}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>BÁO CÁO TỔNG HỢP</Text>
        </View>

        <View style={styles.section}>
          <Text>MockStack</Text>
          <Text>Ngày giờ: {formattedDate}</Text>
          <Text>Mã báo cáo: {reportCode}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Bộ lọc đã chọn:</Text>
          <Text>Năm: {year}</Text>
          <Text>Nhân viên: {staff}</Text>
          <Text>Khu vực: {area}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>TỔNG TICKET: 22,192</Text>
          <Text>↑ 37.8% so với 8/9/2025</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.label}>MỨC ĐỘ HÀI LÒNG: 89.31%</Text>
          <Text>↑ 3.6% so với 8/9/2025</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Biểu đồ dữ liệu (bảng thống kê)</Text>

          <Text style={styles.label}>Năm 2025</Text>
          <View style={[styles.table, styles.tableHeader]}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Tháng</Text>
              <Text style={styles.tableCell}>Tickets</Text>
              <Text style={styles.tableCell}>Hài lòng (%)</Text>
            </View>
          </View>

          <View style={styles.table}>
            {chartData.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.ticketData2025}</Text>
                <Text style={styles.tableCell}>{item.satisfactionData2025}%</Text>
              </View>
            ))}
          </View>

          <Text style={styles.label}>Năm 2024</Text>
          <View style={[styles.table, styles.tableHeader]}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCell}>Tháng</Text>
              <Text style={styles.tableCell}>Tickets</Text>
              <Text style={styles.tableCell}>Hài lòng (%)</Text>
            </View>
          </View>

          <View style={styles.table}>
            {chartData.map((item, index) => (
              <View style={styles.tableRow} key={index}>
                <Text style={styles.tableCell}>{item.name}</Text>
                <Text style={styles.tableCell}>{item.ticketData2024}</Text>
                <Text style={styles.tableCell}>{item.satisfactionData2024}%</Text>
              </View>
            ))}
          </View>

        </View>

        {/* Biểu đồ hình ảnh */}
        {ticketChartImage && (
          <View style={styles.section}>
            <Text style={styles.label}>Biểu đồ Tickets</Text>
            <Image src={ticketChartImage} style={styles.chartImage} />
          </View>
        )}

        {satisfactionChartImage && (
          <View style={styles.section}>
            <Text style={styles.label}>Biểu đồ Mức độ hài lòng</Text>
            <Image src={satisfactionChartImage} style={styles.chartImage} />
          </View>
        )}

        <Text style={styles.footerText}>
          Báo cáo được tạo từ hệ thống MockStack
        </Text>
      </Page>
    </Document>
  );
};
