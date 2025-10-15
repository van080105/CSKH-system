--CREATE DATABASE CSKH
--USE CSKH
-- DROP DATABASE CSKH

-- Bảng Notification
CREATE TABLE [Notification] (
    NoID INT PRIMARY KEY,
    Content NVARCHAR(255) NOT NULL,
    SentDate DATETIME
);

-- Bảng Account
CREATE TABLE Account (
    ID INT PRIMARY KEY,
    [Password] NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL,
    Fullname NVARCHAR(100) NOT NULL,
    [Address] NVARCHAR(200)
);

-- Bảng ReceiveNotification
CREATE TABLE ReceiveNotification (
    NoID INT,
    AccountID INT,
    PRIMARY KEY (NoID, AccountID),
    FOREIGN KEY (NoID) REFERENCES Notification(NoID),
    FOREIGN KEY (AccountID) REFERENCES Account(ID)
);

-- Bảng Admin
CREATE TABLE [Admin] (
    AdminID INT PRIMARY KEY,
    Privilege NVARCHAR(50),
    FOREIGN KEY (AdminID) REFERENCES Account(ID)
);

-- Bảng Customer
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    Membership NVARCHAR(50),
    FOREIGN KEY (CustomerID) REFERENCES Account(ID)
);
-- Bảng Form
CREATE TABLE Form (
    FormID INT PRIMARY KEY,
    Title NVARCHAR(100) NOT NULL,
    Content NVARCHAR(255) NOT NULL,
    [Status] NVARCHAR(50),
    Typ NVARCHAR(50),
    SentDate DATETIME
);

-- Bảng FeedbackForm
CREATE TABLE FeedbackForm (
    FormID INT PRIMARY KEY,
    CustomerID INT,
    Rating INT,
    Content NVARCHAR(255),
    SentDate DATETIME,
    OrderID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
	FOREIGN KEY (FormID) REFERENCES Form(FormID)
);

-- Bảng Receiver
CREATE TABLE Receiver (
    ReceiverID VARCHAR(5) PRIMARY KEY
);

-- Bảng Message
CREATE TABLE Message1 (
    ID INT PRIMARY KEY,
    Content NVARCHAR(255) NOT NULL,
    SentDate DATETIME,
    ReceiverID VARCHAR(5) NOT NULL,
    FOREIGN KEY (ReceiverID) REFERENCES Receiver(ReceiverID)
);

-- Bảng CustomerSend
CREATE TABLE CustomerSend(
	CustomerID INT,
	MessageID INT PRIMARY KEY,
	FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
	FOREIGN KEY (MessageID) REFERENCES Message1(ID)
);

-- Bảng CustomerCreate
CREATE TABLE CustomerCreate(
	CustomerID INT,
	FormID INT PRIMARY KEY,
	FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
	FOREIGN KEY (FormID) REFERENCES Form(FormID)
);

-- Bảng Agent
CREATE TABLE Agent (
    AgentID INT PRIMARY KEY,
    ReceiverID VARCHAR(5),
    [Status] NVARCHAR(50),
    ResponsibleField NVARCHAR(100),
    FOREIGN KEY (AgentID) REFERENCES Account(ID),
	FOREIGN KEY (ReceiverID) REFERENCES Receiver(ReceiverID)
);

-- Bảng ClassifyTable
CREATE TABLE ClassifyTable (
    TableID INT PRIMARY KEY,
    NameTable NVARCHAR(100),
    Category NVARCHAR(100),
    ParentTableID INT,
	FOREIGN KEY (ParentTableID) REFERENCES ClassifyTable(TableID)
);

-- Bảng Assign
CREATE TABLE Assign (
    AgentID INT,
    TableID INT,
    PRIMARY KEY (AgentID, TableID),
    FOREIGN KEY (AgentID) REFERENCES Agent(AgentID),
	FOREIGN KEY (TableID) REFERENCES ClassifyTable(TableID)
);

-- Bảng Chatbot
CREATE TABLE Chatbot (
    Vers NVARCHAR(50) PRIMARY KEY,
    ReceiverID VARCHAR(5),
    FOREIGN KEY (ReceiverID) REFERENCES Receiver(ReceiverID)
);

-- Bảng FeedbackChatbot
CREATE TABLE FeedbackChatbot (
    CustomerID INT PRIMARY KEY,
    Vers NVARCHAR(50),
	Rating INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (Vers) REFERENCES Chatbot(Vers)
);


-- Bảng Order
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT NOT NULL,
    OrderDate DATETIME,
    [Status] NVARCHAR(50),
    DeliveryAddress NVARCHAR(200),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

-- Bảng OrderItem
CREATE TABLE OrderItem (
    OrderItemID INT PRIMARY KEY,
    OrderID INT NOT NULL,
    Quantity INT NOT NULL,
    ProductName NVARCHAR(100),
    UnitPrice DECIMAL(10,2),
    FOREIGN KEY (OrderID) REFERENCES Orders(OrderID)
);

-- Bảng Guest
CREATE TABLE Guest (
    ID0 INT PRIMARY KEY,
    Fullname NVARCHAR(100),
    Email NVARCHAR(100)
);


-- Bảng GuestSend
CREATE TABLE GuestSend (
    ID0 INT,
    MessageID INT PRIMARY KEY,
    FOREIGN KEY (ID0) REFERENCES Guest(ID0),
    FOREIGN KEY (MessageID) REFERENCES Message1(ID)
);

-- Bảng GuestCreate
CREATE TABLE GuestCreate (
    ID0 INT,
    FormID INT PRIMARY KEY,
    FOREIGN KEY (ID0) REFERENCES Guest(ID0),
    FOREIGN KEY (FormID) REFERENCES Form(FormID)
);


-- Bảng FAQ
CREATE TABLE FAQ (
    ID INT PRIMARY KEY,
    Category NVARCHAR(50),
    Question NVARCHAR(255),
    Answer NVARCHAR(255)
);

-- Bảng BelongTo
CREATE TABLE BelongTo (
    FAQ_ID INT,
    ClassifyTableID INT,
    PRIMARY KEY (FAQ_ID, ClassifyTableID),
    FOREIGN KEY (FAQ_ID) REFERENCES FAQ(ID),
	FOREIGN KEY (ClassifyTableID) REFERENCES ClassifyTable(TableID)
);


-- Bảng Classify
CREATE TABLE Classify (
    FormID INT,
    TableID INT,
    PRIMARY KEY (FormID, TableID),
    FOREIGN KEY (FormID) REFERENCES Form(FormID),
	FOREIGN KEY (TableID) REFERENCES ClassifyTable(TableID)

);
--Account--
INSERT INTO Account (ID, [Password], Email, Fullname, [Address]) VALUES
(1,  N'nguyenvana123',     N'nguyenvana@gmail.com',      N'Nguyễn Văn A',       N'Hà Nội'),
(2,  N'tranthib123',       N'tranthib@gmail.com',        N'Trần Thị B',         N'Hồ Chí Minh'),
(3,  N'levanc123',         N'levanc@gmail.com',          N'Lê Văn C',           N'Đà Nẵng'),
(4,  N'phamthid123',       N'phamthid@gmail.com',        N'Phạm Thị D',         N'Hải Phòng'),
(5,  N'vominhe123',        N'vominhe@gmail.com',         N'Võ Minh E',          N'Cần Thơ'),
(6,  N'nguyenthif123',     N'nguyenthif@gmail.com',      N'Nguyễn Thị F',       N'Bình Dương'),
(7,  N'tranquocg123',      N'tranquocg@gmail.com',       N'Trần Quốc G',        N'Hà Nam'),
(8,  N'lythih123',         N'lythih@gmail.com',          N'Lý Thị H',           N'Nam Định'),
(9,  N'dangvani123',       N'dangvani@gmail.com',        N'Đặng Văn I',         N'Hưng Yên'),
(10, N'phanthik123',       N'phanthik@gmail.com',        N'Phan Thị K',         N'Thái Bình'),
(11, N'luuvanl123',        N'luuvanl@gmail.com',         N'Lưu Văn L',          N'Ninh Bình'),
(12, N'ngothim123',        N'ngothim@gmail.com',         N'Ngô Thị M',          N'Hòa Bình'),
(13, N'vuducn123',         N'vuducn@gmail.com',          N'Vũ Đức N',           N'Hải Dương'),
(14, N'buiithio123',       N'buiithio@gmail.com',        N'Bùi Thị O',          N'Hà Tĩnh'),
(15, N'hoangvanp123',      N'hoangvanp@gmail.com',       N'Hoàng Văn P',        N'Bắc Ninh'),
(16, N'phamthiq123',       N'phamthiq@gmail.com',        N'Phạm Thị Q',         N'Lào Cai'),
(17, N'nguyenvanr123',     N'nguyenvanr@gmail.com',      N'Nguyễn Văn R',       N'Quảng Ninh'),
(18, N'lethis123',         N'lethis@gmail.com',          N'Lê Thị S',           N'Tuyên Quang'),
(19, N'dovant123',         N'dovant@gmail.com',          N'Đỗ Văn T',           N'Thái Nguyên'),
(20, N'phanthiu123',       N'phanthiu@gmail.com',        N'Phan Thị U',         N'Bắc Giang'),
(21, N'vuvanv123',         N'vuvanv@gmail.com',          N'Vũ Văn V',           N'Yên Bái'),
(22, N'trinhthiw123',      N'trinhthiw@gmail.com',       N'Trịnh Thị W',        N'Phú Thọ'),
(23, N'lamvanx123',        N'lamvanx@gmail.com',         N'Lâm Văn X',          N'Vĩnh Phúc'),
(24, N'dangthiy123',       N'dangthiy@gmail.com',        N'Đặng Thị Y',         N'Nghệ An'),
(25, N'luongvanz123',      N'luongvanz@gmail.com',       N'Lương Văn Z',        N'Quảng Bình'),
(26, N'nguyenhuukhang123', N'nguyenhuukhang@gmail.com',  N'Nguyễn Hữu Khang',   N'Kon Tum'),
(27, N'tranthihanh123',    N'tranthihanh@gmail.com',     N'Trần Thị Hạnh',      N'Gia Lai'),
(28, N'lethanhlong123',    N'lethanhlong@gmail.com',     N'Lê Thanh Long',      N'Bình Thuận'),
(29, N'phamthituyet123',   N'phamthituyet@gmail.com',    N'Phạm Thị Tuyết',     N'An Giang'),
(30, N'vominhtri123',      N'vominhtri@gmail.com',       N'Võ Minh Trí',        N'Đồng Nai'),
(31, N'nguyenthinhung123', N'nguyenthinhung@gmail.com',  N'Nguyễn Thị Nhung',   N'Tiền Giang'),
(32, N'tranvanhau123',     N'tranvanhau@gmail.com',      N'Trần Văn Hậu',       N'Bến Tre'),
(33, N'lythimai123',       N'lythimai@gmail.com',        N'Lý Thị Mai',         N'Cà Mau'),
(34, N'dothanhbinh123',    N'dothanhbinh@gmail.com',     N'Đỗ Thanh Bình',      N'Kiên Giang'),
(35, N'phanhoangnam123',   N'phanhoangnam@gmail.com',    N'Phan Hoàng Nam',     N'Sóc Trăng'),
(36, N'nguyenlananh123',   N'nguyenlananh@gmail.com',    N'Nguyễn Lan Anh',     N'Bạc Liêu'),
(37, N'tranthimy123',      N'tranthimy@gmail.com',       N'Trần Thị Mỹ',        N'Đắk Lắk'),
(38, N'levandat123',       N'levandat@gmail.com',        N'Lê Văn Đạt',         N'Lâm Đồng'),
(39, N'phamthihoa123',     N'phamthihoa@gmail.com',      N'Phạm Thị Hoa',       N'Khánh Hòa'),
(40, N'vominhtuan123',     N'vominhtuan@gmail.com',      N'Võ Minh Tuấn',       N'Ninh Thuận'),
(41, N'nguyenthihien123',  N'nguyenthihien@gmail.com',   N'Nguyễn Thị Hiền',    N'Bình Định'),
(42, N'tranquocbao123',    N'tranquocbao@gmail.com',     N'Trần Quốc Bảo',      N'Quảng Nam'),
(43, N'lythithu123',       N'lythithu@gmail.com',        N'Lý Thị Thu',         N'Quảng Ngãi'),
(44, N'dangvanthang123',   N'dangvanthang@gmail.com',    N'Đặng Văn Thắng',     N'Huế'),
(45, N'phanthihong123',    N'phanthihong@gmail.com',     N'Phan Thị Hồng',      N'Đà Lạt'),
(46, N'vuvankhanh123',     N'vuvankhanh@gmail.com',      N'Vũ Văn Khánh',       N'Long An'),
(47, N'buithitrang123',    N'buithitrang@gmail.com',     N'Bùi Thị Trang',      N'Vĩnh Long'),
(48, N'hoanganhdung123',   N'hoanganhdung@gmail.com',    N'Hoàng Anh Dũng',     N'Trà Vinh'),
(49, N'nguyenvanson123',   N'nguyenvanson@gmail.com',    N'Nguyễn Văn Sơn',     N'Hậu Giang'),
(50, N'tranthiyen123',     N'tranthiyen@gmail.com',      N'Trần Thị Yến',       N'Bình Phước'),
(51, N'leminhhoa123',      N'leminhhoa@gmail.com',       N'Lê Minh Hòa',        N'Quảng Trị'),
(52, N'phamthilinh123',    N'phamthilinh@gmail.com',     N'Phạm Thị Linh',      N'Quảng Bình'),
(53, N'nguyenvantai123',   N'nguyenvantai@gmail.com',    N'Nguyễn Văn Tài',     N'Hà Giang'),
(54, N'tranthihao123',     N'tranthihao@gmail.com',      N'Trần Thị Hảo',       N'Cao Bằng'),
(55, N'lyvancuong123',     N'lyvancuong@gmail.com',      N'Lý Văn Cường',       N'Bắc Kạn'),
(56, N'dangthithanh123',   N'dangthithanh@gmail.com',    N'Đặng Thị Thanh',     N'Sơn La'),
(57, N'phanvandung123',    N'phanvandung@gmail.com',     N'Phan Văn Dũng',      N'Điện Biên'),
(58, N'vothinga123',       N'vothinga@gmail.com',        N'Võ Thị Nga',         N'Lai Châu'),
(59, N'taothimai123',	   N'taothimai@gmail.com',       N'Tào Thị Mai',        N'Hà Nội'),
(60, N'voquoctuan123',     N'voquoctuan@gmail.com',      N'Võ Quốc Tuấn',       N'Hồ Chí Minh');

--Admin---
INSERT INTO [Admin] (AdminID, Privilege)
VALUES
(1, N'Quản lý chatbot'),
(2, N'Quản lý khách hàng'),
(3, N'Quản lý nhân viên'),
(4, N'Quản lý form'),
(5, N'Hỗ trợ kỹ thuật');

INSERT INTO Receiver(ReceiverID) VALUES
('R0'),
('R1'),
('R2'),
('R3'),
('R4'),
('R5'),
('R6'),
('R7'),
('R8'),
('R9'),
('R10'),
('R11'),
('R12'),
('R13'),
('R14'),
('R15'),
('R16'),
('R17'),
('R18'),
('R19'),
('R20'),
('R21'),
('R22'),
('R23'),
('R24'),
('R25'),
('R26'),
('R27'),
('R28'),
('R29'),
('R30'),
('R31'),
('R32'),
('R33'),
('R34'),
('R35'),
('R36'),
('R37'),
('R38'),
('R39'),
('R40'),
('R41'),
('R42'),
('R43'),
('R44'),
('R45'),
('R46'),
('R47'),
('R48'),
('R49'),
('R50');

INSERT INTO Agent (AgentID, ReceiverID, Status, ResponsibleField)
VALUES
-- Nhóm 1: Tư vấn sản phẩm iPhone
(6,  'R1',  N'Đang hoạt động', N'Tư vấn sản phẩm iPhone'),
(7,  'R2',  N'Đang hoạt động', N'Tư vấn sản phẩm iPhone'),
(8,  'R3',  N'Đang hoạt động', N'Tư vấn sản phẩm iPhone'),
(9,  'R4',  N'Đang hoạt động', N'Tư vấn sản phẩm iPhone'),
(10, 'R5',  N'Không hoạt động', N'Tư vấn sản phẩm iPhone'),

-- Nhóm 2: Dịch vụ bảo hành & sửa chữa
(11, 'R6',  N'Đang hoạt động', N'Dịch vụ bảo hành & sửa chữa'),
(12, 'R7',  N'Đang hoạt động', N'Dịch vụ bảo hành & sửa chữa'),
(13, 'R8',  N'Đang hoạt động', N'Dịch vụ bảo hành & sửa chữa'),
(14, 'R9',  N'Đang hoạt động', N'Dịch vụ bảo hành & sửa chữa'),
(15, 'R10', N'Không hoạt động', N'Dịch vụ bảo hành & sửa chữa'),

-- Nhóm 3: Đặt hàng & thanh toán
(16, 'R11', N'Đang hoạt động', N'Đặt hàng & thanh toán'),
(17, 'R12', N'Đang hoạt động', N'Đặt hàng & thanh toán'),

-- Nhóm 4: Chính sách & hỗ trợ khách hàng
(18, 'R13', N'Đang hoạt động', N'Chính sách & hỗ trợ khách hàng'),
(19, 'R14', N'Đang hoạt động', N'Chính sách & hỗ trợ khách hàng'),
(20, 'R15', N'Đang hoạt động', N'Chính sách & hỗ trợ khách hàng');

-- ChatGPT
INSERT INTO Chatbot(Vers,ReceiverID) VALUES('1.0','R0');

-- Form
INSERT INTO Form (FormID, Title, Content, [Status], Typ, SentDate)
VALUES
(1, N'Khảo sát trải nghiệm chatbot', N'Đánh giá mức độ hài lòng về chatbot phiên bản 1.0', N'Đã gửi', N'Khảo sát', '2024-12-01'),
(2, N'Phản hồi chất lượng tư vấn', N'Xin đánh giá độ chính xác của câu trả lời từ chatbot', N'Đã gửi', N'Phản hồi', '2024-12-02'),
(3, N'Góp ý cải thiện giao diện', N'Bạn có thấy giao diện chatbot dễ dùng không?', N'Đã gửi', N'Góp ý', '2024-12-03'),
(4, N'Khảo sát tính năng mới', N'Bạn mong muốn chatbot có thêm tính năng nào?', N'Đã gửi', N'Khảo sát', '2024-12-04'),
(5, N'Đánh giá độ nhanh phản hồi', N'Chatbot phản hồi có nhanh không?', N'Đã gửi', N'Khảo sát', '2024-12-05'),
(6, N'Phản hồi tổng quát', N'Nhận xét chung về trải nghiệm sử dụng chatbot', N'Đã gửi', N'Phản hồi', '2024-12-06'),
(7, N'Góp ý ngôn ngữ tự nhiên', N'Bạn thấy câu trả lời có tự nhiên không?', N'Đã gửi', N'Góp ý', '2024-12-07'),
(8, N'Khảo sát hỗ trợ khách hàng', N'Bạn có nhận được hỗ trợ nhanh chóng không?', N'Đã gửi', N'Khảo sát', '2024-12-08'),
(9, N'Góp ý độ chính xác', N'Đánh giá mức độ chính xác của thông tin chatbot cung cấp', N'Đã gửi', N'Góp ý', '2024-12-09'),
(10, N'Khảo sát độ tin cậy', N'Bạn có tin tưởng vào chatbot khi mua hàng không?', N'Đã gửi', N'Khảo sát', '2024-12-10'),

(11, N'Góp ý âm thanh', N'Bạn có muốn chatbot hỗ trợ giọng nói?', N'Đã gửi', N'Góp ý', '2024-12-11'),
(12, N'Khảo sát giao diện tối', N'Bạn có thích chế độ tối (dark mode) không?', N'Đã gửi', N'Khảo sát', '2024-12-12'),
(13, N'Phản hồi trải nghiệm mua hàng', N'Chatbot có giúp bạn đặt hàng nhanh không?', N'Đã gửi', N'Phản hồi', '2024-12-13'),
(14, N'Khảo sát FAQ', N'Mục FAQ có giúp ích cho bạn không?', N'Đã gửi', N'Khảo sát', '2024-12-14'),
(15, N'Phản hồi dịch vụ bảo hành', N'Bạn có dễ dàng tìm được thông tin bảo hành không?', N'Đã gửi', N'Phản hồi', '2024-12-15'),
(16, N'Khảo sát độ tiện lợi', N'Bạn có thấy chatbot giúp tiết kiệm thời gian không?', N'Đã gửi', N'Khảo sát', '2024-12-16'),
(17, N'Góp ý độ thân thiện', N'Bạn thấy chatbot thân thiện chứ?', N'Đã gửi', N'Góp ý', '2024-12-17'),
(18, N'Khảo sát bảo mật', N'Bạn có yên tâm về bảo mật thông tin khi chat?', N'Đã gửi', N'Khảo sát', '2024-12-18'),
(19, N'Phản hồi hiệu quả hỗ trợ', N'Chatbot có giúp bạn giải quyết vấn đề nhanh không?', N'Đã gửi', N'Phản hồi', '2024-12-19'),
(20, N'Khảo sát cảm xúc người dùng', N'Bạn cảm thấy thế nào sau khi sử dụng chatbot?', N'Đã gửi', N'Khảo sát', '2024-12-20'),

(21, N'Góp ý bố cục tin nhắn', N'Tin nhắn có trình bày dễ đọc không?', N'Đã gửi', N'Góp ý', '2024-12-21'),
(22, N'Khảo sát tiện ích bổ sung', N'Bạn có muốn chatbot nhắc lịch hẹn không?', N'Đã gửi', N'Khảo sát', '2024-12-22'),
(23, N'Phản hồi chất lượng dữ liệu', N'Thông tin chatbot cung cấp có chính xác không?', N'Đã gửi', N'Phản hồi', '2024-12-23'),
(24, N'Khảo sát hình ảnh minh họa', N'Bạn có thích chatbot dùng ảnh minh họa không?', N'Đã gửi', N'Khảo sát', '2024-12-24'),
(25, N'Góp ý tốc độ hệ thống', N'Chatbot có phản hồi chậm không?', N'Đã gửi', N'Góp ý', '2024-12-25'),
(26, N'Khảo sát giao diện người dùng', N'Bạn có hài lòng với giao diện tổng thể không?', N'Đã gửi', N'Khảo sát', '2024-12-26'),
(27, N'Phản hồi chất lượng hỗ trợ', N'Chatbot có giải đáp đúng nhu cầu của bạn không?', N'Đã gửi', N'Phản hồi', '2024-12-27'),
(28, N'Khảo sát tiện ích tìm kiếm', N'Bạn có dễ dàng tìm thấy câu trả lời không?', N'Đã gửi', N'Khảo sát', '2024-12-28'),
(29, N'Góp ý độ hấp dẫn', N'Chatbot có khiến bạn muốn dùng lại không?', N'Đã gửi', N'Góp ý', '2024-12-29'),
(30, N'Khảo sát tổng thể', N'Bạn có giới thiệu chatbot cho người khác không?', N'Đã gửi', N'Khảo sát', '2024-12-30'),

(31, N'Góp ý hình thức phản hồi', N'Bạn có muốn chatbot hiển thị biểu cảm không?', N'Đã gửi', N'Góp ý', '2025-01-01'),
(32, N'Khảo sát hỗ trợ đơn hàng', N'Chatbot có giúp bạn tra cứu đơn hàng tốt không?', N'Đã gửi', N'Khảo sát', '2025-01-02'),
(33, N'Phản hồi hướng dẫn bảo hành', N'Hướng dẫn bảo hành có dễ hiểu không?', N'Đã gửi', N'Phản hồi', '2025-01-03'),
(34, N'Khảo sát liên hệ nhân viên', N'Chatbot có kết nối bạn với nhân viên nhanh không?', N'Đã gửi', N'Khảo sát', '2025-01-04'),
(35, N'Phản hồi sản phẩm', N'Bạn có hài lòng với sản phẩm tư vấn qua chatbot không?', N'Đã gửi', N'Phản hồi', '2025-01-05'),
(36, N'Khảo sát phiên bản mới', N'Bạn có thấy phiên bản 1.1 tốt hơn không?', N'Đã gửi', N'Khảo sát', '2025-01-06'),
(37, N'Góp ý nội dung hướng dẫn', N'Nội dung trợ giúp có hữu ích không?', N'Đã gửi', N'Góp ý', '2025-01-07'),
(38, N'Khảo sát lỗi hệ thống', N'Bạn có gặp lỗi khi sử dụng chatbot không?', N'Đã gửi', N'Khảo sát', '2025-01-08'),
(39, N'Phản hồi mức độ hài lòng', N'Bạn hài lòng với chatbot ở mức nào?', N'Đã gửi', N'Phản hồi', '2025-01-09'),
(40, N'Khảo sát niềm tin thương hiệu', N'Chatbot có tăng niềm tin của bạn vào thương hiệu không?', N'Đã gửi', N'Khảo sát', '2025-01-10'),

(41, N'Góp ý thao tác', N'Các thao tác có dễ sử dụng không?', N'Đã gửi', N'Góp ý', '2025-01-11'),
(42, N'Khảo sát thông tin khuyến mãi', N'Bạn có muốn chatbot thông báo khuyến mãi?', N'Đã gửi', N'Khảo sát', '2025-01-12'),
(43, N'Phản hồi kênh liên hệ', N'Bạn có dễ dàng liên hệ hỗ trợ qua chatbot không?', N'Đã gửi', N'Phản hồi', '2025-01-13'),
(44, N'Khảo sát ngôn ngữ', N'Bạn muốn chatbot hỗ trợ thêm ngôn ngữ nào?', N'Đã gửi', N'Khảo sát', '2025-01-14'),
(45, N'Phản hồi xử lý lỗi', N'Chatbot có phản ứng tốt khi gặp lỗi không?', N'Đã gửi', N'Phản hồi', '2025-01-15'),
(46, N'Khảo sát phong cách trả lời', N'Bạn có thích phong cách trò chuyện hiện tại?', N'Đã gửi', N'Khảo sát', '2025-01-16'),
(47, N'Góp ý nội dung marketing', N'Bạn thấy nội dung chatbot quảng bá thế nào?', N'Đã gửi', N'Góp ý', '2025-01-17'),
(48, N'Khảo sát tốc độ phản hồi', N'Bạn có thấy chatbot trả lời nhanh hơn nhân viên không?', N'Đã gửi', N'Khảo sát', '2025-01-18'),
(49, N'Phản hồi tính năng tự động', N'Bạn có hài lòng với tính năng trả lời tự động không?', N'Đã gửi', N'Phản hồi', '2025-01-19'),
(50, N'Khảo sát hành vi người dùng', N'Bạn sử dụng chatbot chủ yếu để làm gì?', N'Đã gửi', N'Khảo sát', '2025-01-20'),

(51, N'Góp ý hiển thị lịch sử chat', N'Bạn có muốn xem lại lịch sử hội thoại?', N'Đã gửi', N'Góp ý', '2025-01-21'),
(52, N'Khảo sát tích hợp tài khoản', N'Bạn có muốn chatbot đăng nhập bằng Google?', N'Đã gửi', N'Khảo sát', '2025-01-22'),
(53, N'Phản hồi độ chính xác sản phẩm', N'Chatbot có tư vấn đúng sản phẩm bạn cần không?', N'Đã gửi', N'Phản hồi', '2025-01-23'),
(54, N'Khảo sát độ hài lòng tổng thể', N'Bạn chấm chatbot mấy sao?', N'Đã gửi', N'Khảo sát', '2025-01-24'),
(55, N'Phản hồi cá nhân hóa', N'Chatbot có gợi ý đúng nhu cầu cá nhân của bạn không?', N'Đã gửi', N'Phản hồi', '2025-01-25');

--INSERT INTO FeedbackForm (FormID, CustomerID, Rating, Content, SentDate, OrderID)
--VALUES
--(1, 21, 4, N'Chatbot rất hữu ích và dễ sử dụng.', '2024-12-02', 1001),
--(2, 22, 5, N'Tư vấn nhanh và chính xác.', '2024-12-03', 1002),
--(3, 23, 3, N'Giao diện hơi rối, cần cải thiện.', '2024-12-04', 1003),
--(4, 24, 5, N'Rất hài lòng với tính năng mới.', '2024-12-05', 1004),
--(5, 25, 4, N'Phản hồi nhanh, dễ hiểu.', '2024-12-06', 1005),
--(6, 26, 2, N'Đôi lúc chatbot hiểu sai câu hỏi.', '2024-12-07', 1006),
--(7, 27, 5, N'Tốt hơn cả mong đợi.', '2024-12-08', 1007),
--(8, 28, 4, N'Dịch vụ hỗ trợ rất nhiệt tình.', '2024-12-09', 1008),
--(9, 29, 3, N'Cần cập nhật thêm thông tin sản phẩm.', '2024-12-10', 1009),
--(10, 30, 5, N'Chatbot thân thiện và hữu ích.', '2024-12-11', 1010),

--(11, 31, 5, N'Rất hài lòng với tốc độ phản hồi.', '2024-12-12', 1011),
--(12, 32, 4, N'Tính năng tra cứu đơn hàng tốt.', '2024-12-13', 1012),
--(13, 33, 2, N'Chatbot cần thêm tính năng tư vấn sản phẩm.', '2024-12-14', 1013),
--(14, 34, 3, N'Chưa hiểu đúng yêu cầu của tôi.', '2024-12-15', 1014),
--(15, 35, 5, N'Hoàn toàn hài lòng với trải nghiệm.', '2024-12-16', 1015),
--(16, 36, 4, N'Tốc độ phản hồi nhanh.', '2024-12-17', 1016),
--(17, 37, 5, N'Dễ sử dụng, thân thiện.', '2024-12-18', 1017),
--(18, 38, 3, N'Chatbot đôi lúc trả lời chậm.', '2024-12-19', 1018),
--(19, 39, 5, N'Tốt hơn các chatbot khác tôi từng thử.', '2024-12-20', 1019),
--(20, 40, 4, N'Rất hữu ích cho việc mua hàng.', '2024-12-21', 1020),

--(21, 41, 4, N'Dễ thao tác và nhanh.', '2024-12-22', 1021),
--(22, 42, 5, N'Giao diện đẹp và hiện đại.', '2024-12-23', 1022),
--(23, 43, 4, N'Chatbot hiểu đúng ý.', '2024-12-24', 1023),
--(24, 44, 3, N'Cần cải thiện tốc độ.', '2024-12-25', 1024),
--(25, 45, 2, N'Đôi lúc phản hồi sai.', '2024-12-26', 1025),
--(26, 46, 4, N'Phản hồi nhanh và chính xác.', '2024-12-27', 1026),
--(27, 47, 5, N'Hài lòng tuyệt đối.', '2024-12-28', 1027),
--(28, 48, 4, N'Rất tốt, dễ dùng.', '2024-12-29', 1028),
--(29, 49, 3, N'Chưa có đủ thông tin tôi cần.', '2024-12-30', 1029),
--(30, 50, 5, N'Tuyệt vời, rất chuyên nghiệp.', '2025-01-01', 1030),

--(31, 51, 5, N'Tư vấn đúng sản phẩm tôi cần.', '2025-01-02', 1031),
--(32, 52, 4, N'Dễ hiểu và nhanh chóng.', '2025-01-03', 1032),
--(33, 53, 3, N'Thi thoảng chatbot bị lỗi.', '2025-01-04', 1033),
--(34, 54, 4, N'Tốt, nhưng có thể cải thiện thêm.', '2025-01-05', 1034),
--(35, 55, 5, N'Hoàn hảo, không có gì phàn nàn.', '2025-01-06', 1035),
--(36, 56, 4, N'Rất hữu ích và nhanh.', '2025-01-07', 1036),
--(37, 57, 5, N'Tôi sẽ giới thiệu cho bạn bè.', '2025-01-08', 1037),
--(38, 58, 4, N'Rất tốt, nhưng cần thêm hỗ trợ giọng nói.', '2025-01-09', 1038),
--(39, 59, 3, N'Đôi khi chatbot không hiểu câu hỏi.', '2025-01-10', 1039),
--(40, 60, 5, N'Tôi rất hài lòng.', '2025-01-11', 1040);

INSERT INTO FeedbackChatbot (CustomerID, Vers, Rating) VALUES
(21, '1.0', 3),
(22, '1.0', 4),
(23, '1.0', 5),
(24, '1.0', 4),
(25, '1.0', 5),
(26, '1.0', 2),
(27, '1.0', 4),
(28, '1.0', 3),
(29, '1.0', 5),
(30, '1.0', 5),

(31, '1.0', 4),
(32, '1.0', 5),
(33, '1.0', 2),
(34, '1.0', 4),
(35, '1.0', 5),
(36, '1.0', 1),
(37, '1.0', 3),
(38, '1.0', 5),
(39, '1.0', 4),
(40, '1.0', 5),

(41, '1.0', 4),
(42, '1.0', 3),
(43, '1.0', 2),
(44, '1.0', 5),
(45, '1.0', 5),
(46, '1.0', 4),
(47, '1.0', 4),
(48, '1.0', 5),
(49, '1.0', 3),
(50, '1.0', 4),

(51, '1.0', 5),
(52, '1.0', 5),
(53, '1.0', 2),
(54, '1.0', 4),
(55, '1.0', 5),
(56, '1.0', 3),
(57, '1.0', 5),
(58, '1.0', 4),
(59, '1.0', 5),
(60, '1.0', 5),

(61, '1.0', 4),
(62, '1.0', 5),
(63, '1.0', 3),
(64, '1.0', 4),
(65, '1.0', 2),
(66, '1.0', 5),
(67, '1.0', 4),
(68, '1.0', 3),
(69, '1.0', 5),
(70, '1.0', 4),
(71, '1.0', 5),
(72, '1.0', 3),
(73, '1.0', 4),
(74, '1.0', 2),
(75, '1.0', 5);

-- Cấp 1: Nhóm chính
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(1, N'Sản phẩm', N'Danh mục chính', NULL),
(2, N'Dịch vụ hậu mãi', N'Danh mục chính', NULL),
(3, N'Chính sách & hỗ trợ', N'Danh mục chính', NULL);

-- Cấp 2: Nhóm con của "Sản phẩm"
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(4, N'iPhone 15 Series', N'Dòng sản phẩm', 1),
(5, N'iPhone 14 Series', N'Dòng sản phẩm', 1),
(6, N'iPhone 13 Series', N'Dòng sản phẩm', 1);

-- Cấp 3: Chi tiết sản phẩm (biến thể)
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(7, N'iPhone 15 Pro Max', N'Mẫu máy', 4),
(8, N'iPhone 15 Pro', N'Mẫu máy', 4),
(9, N'iPhone 14 Plus', N'Mẫu máy', 5),
(10, N'iPhone 13 Mini', N'Mẫu máy', 6);

-- Cấp 2: Nhóm con của "Dịch vụ hậu mãi"
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(11, N'Bảo hành', N'Dịch vụ', 2),
(12, N'Sửa chữa', N'Dịch vụ', 2),
(13, N'Thu cũ đổi mới', N'Dịch vụ', 2);

-- Cấp 3: Chi tiết dịch vụ
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(14, N'Bảo hành chính hãng Apple', N'Hình thức bảo hành', 11),
(15, N'Gia hạn bảo hành thêm 12 tháng', N'Hình thức bảo hành', 11),
(16, N'Thay màn hình chính hãng', N'Hạng mục sửa chữa', 12),
(17, N'Thay pin chính hãng', N'Hạng mục sửa chữa', 12),
(18, N'Định giá thiết bị cũ', N'Thu cũ', 13);

-- Cấp 2: Nhóm con của "Chính sách & hỗ trợ"
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(19, N'Chính sách đổi trả', N'Chính sách', 3),
(20, N'Hướng dẫn thanh toán', N'Hỗ trợ', 3),
(21, N'Hướng dẫn đặt hàng', N'Hỗ trợ', 3);

-- Cấp 3: Chi tiết chính sách & hướng dẫn
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(22, N'Đổi trả trong 15 ngày nếu lỗi', N'Nội dung chính sách', 19),
(23, N'Hỗ trợ trả góp 0%', N'Nội dung thanh toán', 20),
(24, N'Hướng dẫn đặt hàng online', N'Nội dung hướng dẫn', 21);

-- CẤP 1: Nhóm phân loại mới
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(25, N'Phân loại theo miền', N'Danh mục chính', NULL),
(26, N'Phân loại khách hàng', N'Danh mục chính', NULL);

-- CẤP 2: Miền (thuộc nhóm "Phân loại theo miền")
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(27, N'Miền Bắc', N'Khu vực địa lý', 25),
(28, N'Miền Trung', N'Khu vực địa lý', 25),
(29, N'Miền Nam', N'Khu vực địa lý', 25);

-- CẤP 3: Chi tiết theo tỉnh/thành (ví dụ thực tế)
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(30, N'Hà Nội', N'Tỉnh/Thành phố', 27),
(31, N'Đà Nẵng', N'Tỉnh/Thành phố', 28),
(32, N'TP. Hồ Chí Minh', N'Tỉnh/Thành phố', 29);

-- CẤP 2: Loại thành viên khách hàng (thuộc nhóm "Phân loại khách hàng")
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(33, N'Khách hàng mới', N'Nhóm khách hàng', 26),
(34, N'Khách hàng thân thiết', N'Nhóm khách hàng', 26),
(35, N'Khách hàng VIP', N'Nhóm khách hàng', 26);

-- CẤP 3: Ưu đãi cụ thể theo nhóm khách hàng
INSERT INTO ClassifyTable (TableID, NameTable, Category, ParentTableID) VALUES
(36, N'Giảm 5% cho đơn đầu tiên', N'Ưu đãi', 33),
(37, N'Tặng 1 năm bảo hành thêm', N'Ưu đãi', 34),
(38, N'Giảm 10% & hỗ trợ đổi mới sớm', N'Ưu đãi', 35);

-- Nhóm 1: Tư vấn sản phẩm iPhone
INSERT INTO Assign (AgentID, TableID) VALUES
(6, 4), (6, 5), (6, 6),
(7, 4), (7, 5),
(8, 6), (8, 7),
(9, 8), (9, 9),
(10, 10),

-- Nhóm 2: Bảo hành & Sửa chữa
(11, 11), (11, 12),
(12, 13), (12, 14), (12, 15),
(13, 16), (13, 17),
(14, 18),
(15, 11), (15, 12),

-- Nhóm 3: Đặt hàng & Thanh toán
(16, 20), (16, 21),
(17, 20), (17, 21),

-- Nhóm 4: Chính sách & Hỗ trợ
(18, 19), (18, 3),
(19, 19), (19, 3),
(20, 19);

INSERT INTO FAQ (ID, Category, Question, Answer) VALUES
-- ===== SẢN PHẨM =====
(1, N'Sản phẩm', N'iPhone 15 Pro Max có mấy màu?', N'Hiện có 4 màu: Titan tự nhiên, Titan xanh, Titan trắng và Titan đen.'),
(2, N'Sản phẩm', N'iPhone 15 thường khác gì iPhone 15 Pro?', N'iPhone 15 Pro dùng khung titan, chip A17 Pro và có camera tele; iPhone 15 thường dùng chip A16 và khung nhôm.'),
(3, N'Sản phẩm', N'iPhone 14 có hỗ trợ 5G không?', N'Có, toàn bộ dòng iPhone 14 đều hỗ trợ 5G tại Việt Nam.'),
(4, N'Sản phẩm', N'iPhone 15 có chống nước không?', N'Có, đạt chuẩn IP68, chịu được độ sâu 6m trong 30 phút.');

-- ===== BẢO HÀNH / DỊCH VỤ =====
INSERT INTO FAQ (ID, Category, Question, Answer) VALUES
(5, N'Bảo hành', N'iPhone được bảo hành bao lâu?', N'Tất cả sản phẩm iPhone chính hãng được bảo hành 12 tháng theo chính sách của Apple Việt Nam.'),
(6, N'Bảo hành', N'Tôi có thể kiểm tra thời hạn bảo hành ở đâu?', N'Bạn có thể kiểm tra tại trang web https://checkcoverage.apple.com bằng số serial của máy.'),
(7, N'Bảo hành', N'Nếu máy bị vào nước có được bảo hành không?', N'Không, Apple không bảo hành cho hư hại do nước hoặc rơi vỡ.'),
(8, N'Sửa chữa', N'Thay pin chính hãng mất bao lâu?', N'Thông thường từ 1-2 giờ nếu có sẵn linh kiện tại trung tâm bảo hành.');

-- ===== ĐẶT HÀNG & THANH TOÁN =====
INSERT INTO FAQ (ID, Category, Question, Answer) VALUES
(9, N'Đặt hàng', N'Làm sao để đặt mua iPhone online?', N'Bạn có thể đặt trực tiếp trên website, chọn “Mua ngay” và làm theo hướng dẫn thanh toán.'),
(10, N'Đặt hàng', N'Tôi có thể huỷ đơn hàng sau khi đặt không?', N'Có, miễn là đơn chưa được xác nhận giao. Vui lòng liên hệ hotline để huỷ.'),
(11, N'Thanh toán', N'Cửa hàng có hỗ trợ trả góp không?', N'Có, hỗ trợ trả góp 0% qua thẻ tín dụng của nhiều ngân hàng.'),
(12, N'Thanh toán', N'Tôi có thể thanh toán khi nhận hàng không?', N'Có, hỗ trợ thanh toán COD (nhận hàng rồi trả tiền).');

-- ===== CHÍNH SÁCH & HỖ TRỢ =====
INSERT INTO FAQ (ID, Category, Question, Answer) VALUES
(13, N'Chính sách', N'Tôi có thể đổi trả hàng trong bao lâu?', N'Bạn có thể đổi trả trong 15 ngày nếu sản phẩm lỗi do nhà sản xuất.'),
(14, N'Chính sách', N'Hàng lỗi do người dùng có được đổi không?', N'Không, chỉ sản phẩm lỗi kỹ thuật mới được đổi theo quy định.'),
(15, N'Hỗ trợ', N'Làm sao để liên hệ trung tâm chăm sóc khách hàng?', N'Bạn có thể gọi hotline 1800-1122 (miễn phí) hoặc chat trực tiếp trên website.'),
(16, N'Hỗ trợ', N'Tôi muốn nhận hóa đơn điện tử thì làm sao?', N'Hóa đơn điện tử sẽ được gửi qua email sau khi đơn hàng được giao thành công.');



-- ===== SẢN PHẨM =====
INSERT INTO BelongTo (FAQ_ID, ClassifyTableID) VALUES
(1, 4),  -- iPhone 15 Pro Max có mấy màu? → iPhone 15 Series
(2, 4),  -- iPhone 15 thường khác gì iPhone 15 Pro? → iPhone 15 Series
(3, 5),  -- iPhone 14 có hỗ trợ 5G không? → iPhone 14 Series
(4, 4);  -- iPhone 15 có chống nước không? → iPhone 15 Series

-- ===== BẢO HÀNH / DỊCH VỤ =====
INSERT INTO BelongTo (FAQ_ID, ClassifyTableID) VALUES
(5, 11), -- iPhone được bảo hành bao lâu? → Bảo hành
(6, 11), -- Kiểm tra thời hạn bảo hành → Bảo hành
(7, 11), -- Vào nước có được bảo hành không? → Bảo hành
(8, 12); -- Thay pin chính hãng mất bao lâu? → Sửa chữa

-- ===== ĐẶT HÀNG & THANH TOÁN =====
INSERT INTO BelongTo (FAQ_ID, ClassifyTableID) VALUES
(9, 21), -- Đặt mua iPhone online → Hướng dẫn đặt hàng
(10, 21), -- Huỷ đơn hàng → Hướng dẫn đặt hàng
(11, 20), -- Trả góp 0% → Hướng dẫn thanh toán
(12, 20); -- Thanh toán khi nhận hàng → Hướng dẫn thanh toán

-- ===== CHÍNH SÁCH & HỖ TRỢ =====
INSERT INTO BelongTo (FAQ_ID, ClassifyTableID) VALUES
(13, 19), -- Đổi trả trong bao lâu → Chính sách đổi trả
(14, 19), -- Hàng lỗi do người dùng → Chính sách đổi trả
(15, 3),  -- Liên hệ trung tâm CSKH → Chính sách & hỗ trợ
(16, 3);  -- Hóa đơn điện tử → Chính sách & hỗ trợ