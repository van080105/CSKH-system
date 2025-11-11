USE CSKH19
GO

-- Notification-- 
INSERT INTO Notification (NoID, Content, SentDate) VALUES
(1, N'Cảm ơn bạn đã quan tâm đến iPhone! Khám phá ngay các ưu đãi đặc biệt dành riêng cho bạn.', '2025-09-20 09:30:00'),
(2, N'Đơn hàng iPhone 15 Pro của bạn đã được xác nhận và đang được chuẩn bị. Theo dõi đơn hàng tại đây.', '2025-09-24 12:20:00'),
(3, N'iPhone 14 Pro Max đang có chương trình giảm giá 10% cho khách hàng thân thiết. Mua ngay kẻo lỡ!', '2025-10-08 11:00:00'),
(4, N'Đơn hàng iPhone của bạn đã được giao thành công. Cảm ơn bạn đã tin tưởng và ủng hộ chúng tôi!', '2025-10-08 16:45:00'),
(5, N'Phụ kiện chính hãng Apple đang được giảm giá sốc khi mua kèm iPhone. Khám phá ngay!', '2025-09-27 10:15:00'),
(6, N'Đơn hàng của bạn đang trên đường vận chuyển. Dự kiến giao hàng trong 24h tới.', '2025-10-05 13:30:00'),
(7, N'Chào mừng bạn đến với cộng đồng người dùng iPhone! Nhận ngay voucher 500K cho lần mua tiếp theo.', '2025-10-11 15:20:00'),
(8, N'Đơn hàng iPhone của bạn đã được xử lý thành công. Cảm ơn bạn là khách hàng thân thiết của chúng tôi!', '2025-10-10 08:45:00'),
(9, N'Bảo hành mở rộng Apple Care+ đang có ưu đãi đặc biệt cho người dùng iPhone mới.', '2025-09-28 12:10:00'),
(10, N'Đơn hàng iPhone 15 của bạn đã sẵn sàng để giao. Vui lòng chuẩn bị đủ số tiền để nhận hàng.', '2025-10-08 17:00:00');


--Account--
INSERT INTO Account (ID, PasswordAcc, Email, Fullname, AddressAcc) VALUES
(1,  N'nguyenvana123',     N'nguyenvana@gmail.com',      N'Nguyễn Văn A',       N'Hà Nội'),
(2,  N'tranthib123',       N'tranthib@gmail.com',        N'Trần Thị B',         N'Hà Nội'),
(3,  N'levanc123',         N'levanc@gmail.com',          N'Lê Văn C',           N'Hà Nội'),
(4,  N'phamthid123',       N'phamthid@gmail.com',        N'Phạm Thị D',         N'Hà Nội'),
(5,  N'vominhe123',        N'vominhe@gmail.com',         N'Võ Minh E',          N'Hà Nội'),

(6,  N'nguyenthif123',     N'nguyenthif@gmail.com',      N'Nguyễn Thị F',       N'Hồ Chí Minh'),
(7,  N'tranquocg123',      N'tranquocg@gmail.com',       N'Trần Quốc G',        N'Hồ Chí Minh'),
(8,  N'lythih123',         N'lythih@gmail.com',          N'Lý Thị H',           N'Hồ Chí Minh'),
(9,  N'dangvani123',       N'dangvani@gmail.com',        N'Đặng Văn I',         N'Hồ Chí Minh'),
(10, N'phanthik123',       N'phanthik@gmail.com',        N'Phan Thị K',         N'Hồ Chí Minh'),

(11, N'luuvanl123',        N'luuvanl@gmail.com',         N'Lưu Văn L',          N'Đà Nẵng'),
(12, N'ngothim123',        N'ngothim@gmail.com',         N'Ngô Thị M',          N'Đà Nẵng'),
(13, N'vuducn123',         N'vuducn@gmail.com',          N'Vũ Đức N',           N'Đà Nẵng'),
(14, N'buiithio123',       N'buiithio@gmail.com',        N'Bùi Thị O',          N'Đà Nẵng'),
(15, N'hoangvanp123',      N'hoangvanp@gmail.com',       N'Hoàng Văn P',        N'Đà Nẵng'),

(16, N'phamthiq123',       N'phamthiq@gmail.com',        N'Phạm Thị Q',         N'Hà Nội'),
(17, N'nguyenvanr123',     N'nguyenvanr@gmail.com',      N'Nguyễn Văn R',       N'Hà Nội'),
(18, N'lethis123',         N'lethis@gmail.com',          N'Lê Thị S',           N'Hà Nội'),
(19, N'dovant123',         N'dovant@gmail.com',          N'Đỗ Văn T',           N'Hà Nội'),
(20, N'phanthiu123',       N'phanthiu@gmail.com',        N'Phan Thị U',         N'Hà Nội'),

(21, N'vuvanv123',         N'vuvanv@gmail.com',          N'Vũ Văn V',           N'Hồ Chí Minh'),
(22, N'trinhthiw123',      N'trinhthiw@gmail.com',       N'Trịnh Thị W',        N'Hồ Chí Minh'),
(23, N'lamvanx123',        N'lamvanx@gmail.com',         N'Lâm Văn X',          N'Hồ Chí Minh'),
(24, N'dangthiy123',       N'dangthiy@gmail.com',        N'Đặng Thị Y',         N'Hồ Chí Minh'),
(25, N'luongvanz123',      N'luongvanz@gmail.com',       N'Lương Văn Z',        N'Hồ Chí Minh'),

(26, N'nguyenhuukhang123', N'nguyenhuukhang@gmail.com',  N'Nguyễn Hữu Khang',   N'Đà Nẵng'),
(27, N'tranthihanh123',    N'tranthihanh@gmail.com',     N'Trần Thị Hạnh',      N'Đà Nẵng'),
(28, N'lethanhlong123',    N'lethanhlong@gmail.com',     N'Lê Thanh Long',      N'Đà Nẵng'),
(29, N'phamthituyet123',   N'phamthituyet@gmail.com',    N'Phạm Thị Tuyết',     N'Đà Nẵng'),
(30, N'vominhtri123',      N'vominhtri@gmail.com',       N'Võ Minh Trí',        N'Đà Nẵng'),

(31, N'nguyenthinhung123', N'nguyenthinhung@gmail.com',  N'Nguyễn Thị Nhung',   N'Hà Nội'),
(32, N'tranvanhau123',     N'tranvanhau@gmail.com',      N'Trần Văn Hậu',       N'Hà Nội'),
(33, N'lythimai123',       N'lythimai@gmail.com',        N'Lý Thị Mai',         N'Hà Nội'),
(34, N'dothanhbinh123',    N'dothanhbinh@gmail.com',     N'Đỗ Thanh Bình',      N'Hà Nội'),
(35, N'phanhoangnam123',   N'phanhoangnam@gmail.com',    N'Phan Hoàng Nam',     N'Hà Nội'),

(36, N'nguyenlananh123',   N'nguyenlananh@gmail.com',    N'Nguyễn Lan Anh',     N'Hồ Chí Minh'),
(37, N'tranthimy123',      N'tranthimy@gmail.com',       N'Trần Thị Mỹ',        N'Hồ Chí Minh'),
(38, N'levandat123',       N'levandat@gmail.com',        N'Lê Văn Đạt',         N'Hồ Chí Minh'),
(39, N'phamthihoa123',     N'phamthihoa@gmail.com',      N'Phạm Thị Hoa',       N'Hồ Chí Minh'),
(40, N'vominhtuan123',     N'vominhtuan@gmail.com',      N'Võ Minh Tuấn',       N'Hồ Chí Minh'),

(41, N'nguyenthihien123',  N'nguyenthihien@gmail.com',   N'Nguyễn Thị Hiền',    N'Đà Nẵng'),
(42, N'tranquocbao123',    N'tranquocbao@gmail.com',     N'Trần Quốc Bảo',      N'Đà Nẵng'),
(43, N'lythithu123',       N'lythithu@gmail.com',        N'Lý Thị Thu',         N'Đà Nẵng'),
(44, N'dangvanthang123',   N'dangvanthang@gmail.com',    N'Đặng Văn Thắng',     N'Đà Nẵng'),
(45, N'phanthihong123',    N'phanthihong@gmail.com',     N'Phan Thị Hồng',      N'Đà Nẵng'),

(46, N'vuvankhanh123',     N'vuvankhanh@gmail.com',      N'Vũ Văn Khánh',       N'Hà Nội'),
(47, N'buithitrang123',    N'buithitrang@gmail.com',     N'Bùi Thị Trang',      N'Hà Nội'),
(48, N'hoanganhdung123',   N'hoanganhdung@gmail.com',    N'Hoàng Anh Dũng',     N'Hà Nội'),
(49, N'nguyenvanson123',   N'nguyenvanson@gmail.com',    N'Nguyễn Văn Sơn',     N'Hà Nội'),
(50, N'tranthiyen123',     N'tranthiyen@gmail.com',      N'Trần Thị Yến',       N'Hà Nội'),

(51, N'leminhhoa123',      N'leminhhoa@gmail.com',       N'Lê Minh Hòa',        N'Hồ Chí Minh'),
(52, N'phamthilinh123',    N'phamthilinh@gmail.com',     N'Phạm Thị Linh',      N'Hồ Chí Minh'),
(53, N'nguyenvantai123',   N'nguyenvantai@gmail.com',    N'Nguyễn Văn Tài',     N'Hồ Chí Minh'),
(54, N'tranthihao123',     N'tranthihao@gmail.com',      N'Trần Thị Hảo',       N'Hồ Chí Minh'),
(55, N'lyvancuong123',     N'lyvancuong@gmail.com',      N'Lý Văn Cường',       N'Hồ Chí Minh'),

(56, N'dangthithanh123',   N'dangthithanh@gmail.com',    N'Đặng Thị Thanh',     N'Đà Nẵng'),
(57, N'phanvandung123',    N'phanvandung@gmail.com',     N'Phan Văn Dũng',      N'Đà Nẵng'),
(58, N'vothinga123',       N'vothinga@gmail.com',        N'Võ Thị Nga',         N'Đà Nẵng'),
(59, N'taothimai123',      N'taothimai@gmail.com',       N'Tào Thị Mai',        N'Đà Nẵng'),
(60, N'voquoctuan123',     N'voquoctuan@gmail.com',      N'Võ Quốc Tuấn',       N'Đà Nẵng');




-- ReceiveNotification--
INSERT INTO ReceiveNotification (NoID, AccountID) VALUES
(1, 21), (1, 24), (1, 27), (1, 30), (1, 33), (1, 36), (1, 39), (1, 42), (1, 45), (1, 48), (1, 51), (1, 54), (1, 57), (1, 60),
(2, 60), 
(3, 21), (3, 23), (3, 24), (3, 26), (3, 27), (3, 29), (3, 30), (3, 32), (3, 33), (3, 35), (3, 36), (3, 38), (3, 39), (3, 41),
(3, 42), (3, 44), (3, 45), (3, 47), (3, 48), (3, 50), (3, 51), (3, 53), (3, 54), (3, 56), (3, 57), (3, 59), (3, 60),
(4, 38),
(5, 22), (5, 25), (5, 28), (5, 31), (5, 34), (5, 37), (5, 40), (5, 43), (5, 46), (5, 49), (5, 52), (5, 55), (5, 58),
(6, 44),
(7, 22), (7, 25), (7, 28), (7, 31), (7, 34), (7, 37), (7, 40), (7, 43), (7, 46), (7, 49), (7, 52), (7, 55), (7, 58),
(8, 28),
(9, 22), (9, 25), (9, 28), (9, 31), (9, 34), (9, 37), (9, 40), (9, 43), (9, 46), (9, 49), (9, 52), (9, 55), (9, 58),
(10, 40);


--Admin---
INSERT INTO Admin (AdminID, Privilege) VALUES
(1, N'Quản lý chatbot'),
(2, N'Quản lý khách hàng'),
(3, N'Quản lý nhân viên'),
(4, N'Quản lý form'),
(5, N'Hỗ trợ kỹ thuật');

--CUSTOMER--
INSERT INTO Customer (CustomerID, Membership) VALUES
(21, N'Vàng'), (22, N'Đồng'), (23, N'Bạc'), (24, N'Vàng'), (25, N'Đồng'), (26, N'Bạc'), (27, N'Vàng'), (28, N'Đồng'), (29, N'Bạc'), (30, N'Vàng'), 
(31, N'Đồng'), (32, N'Bạc'), (33, N'Vàng'), (34, N'Đồng'), (35, N'Bạc'), (36, N'Vàng'), (37, N'Đồng'), (38, N'Bạc'), (39, N'Vàng'), (40, N'Đồng'), 
(41, N'Bạc'), (42, N'Vàng'), (43, N'Đồng'), (44, N'Bạc'), (45, N'Vàng'), (46, N'Đồng'), (47, N'Bạc'), (48, N'Vàng'), (49, N'Đồng'), (50, N'Bạc'), 
(51, N'Vàng'), (52, N'Đồng'), (53, N'Bạc'), (54, N'Vàng'), (55, N'Đồng'), (56, N'Bạc'), (57, N'Vàng'), (58, N'Đồng'), (59, N'Bạc'), (60, N'Vàng');

--Form--
INSERT INTO Form (FormID, Title, Content, Stt, Typ, SentDate) VALUES
(1, N'iPhone 14 có những màu nào?', N'Tôi muốn hỏi iPhone 14 hiện có bao nhiêu màu và màu nào đang được bán chạy nhất?', N'Chưa trả lời', N'iPhone 14 Series', '2025-04-01'),
(2, N'iPhone 14 Pro Max có hỗ trợ eSIM không?', N'Tôi đang dùng eSIM, không biết iPhone 14 Pro Max có hỗ trợ dùng eSIM không?', N'Đã trả lời', N'iPhone 14 Series', '2025-04-02'),
(3, N'iPhone 14 và 14 Plus khác nhau điểm nào?', N'Tôi phân vân giữa iPhone 14 và iPhone 14 Plus, cho tôi hỏi sự khác biệt chính giữa hai máy?', N'Chưa trả lời', N'iPhone 14 Series', '2025-04-03'),
(4, N'iPhone 14 Pro quay video 4K có giới hạn thời gian không?', N'Tôi muốn quay video 4K để làm vlog, cho tôi hỏi iPhone 14 Pro có bị giới hạn thời gian quay không?', N'Chưa trả lời', N'iPhone 14 Series', '2025-04-04'),
(5, N'Dung lượng pin iPhone 14 Pro Max bao nhiêu mAh?', N'Tôi cần biết thông số pin của iPhone 14 Pro Max để so sánh với mẫu máy đang dùng.', N'Đã trả lời', N'iPhone 14 Series', '2025-04-05'),

(6, N'iPhone 15 có cổng USB-C chưa?', N'Tôi nghe nói iPhone 15 đã chuyển sang cổng USB-C, thông tin này có đúng không?', N'Đã trả lời', N'iPhone 15 Series', '2025-04-06'),
(7, N'iPhone 15 Pro có hỗ trợ quay video ProRes không?', N'Tôi muốn quay phim chất lượng cao nên muốn hỏi iPhone 15 Pro có quay được ProRes không?', N'Chưa trả lời', N'iPhone 15 Series', '2025-04-07'),
(8, N'Sự khác nhau giữa iPhone 15 và iPhone 15 Pro là gì?', N'Tôi đang phân vân giữa 2 mẫu này. Nhờ cửa hàng giải thích giúp khác biệt chính về hiệu năng và camera.', N'Chưa trả lời', N'iPhone 15 Series', '2025-04-08'),
(9, N'Titanium trên iPhone 15 Pro có dễ trầy không?', N'Chất liệu titanium mới trên iPhone 15 Pro có bền không và có dễ bị trầy xước không?', N'Chưa trả lời', N'iPhone 15 Series', '2025-04-09'),
(10, N'iPhone 15 Pro Max có Zoom quang học bao nhiêu lần?', N'Tôi hay chụp ảnh du lịch, muốn hỏi iPhone 15 Pro Max có zoom quang học tối đa bao nhiêu lần?', N'Đã trả lời', N'iPhone 15 Series', '2025-04-10'),

(11, N'iPhone 16 có hỗ trợ sạc không dây nhanh?', N'Cho tôi hỏi iPhone 16 có công nghệ sạc không dây nhanh và công suất tối đa là bao nhiêu?', N'Chưa trả lời', N'iPhone 16 Series', '2025-04-11'),
(12, N'iPhone 16 pin có dung lượng bao nhiêu?', N'Tôi muốn biết thông số pin của iPhone 16 để cân nhắc nâng cấp.', N'Đã trả lời', N'iPhone 16 Series', '2025-04-12'),
(13, N'iPhone 16 Pro có quay video 8K được không?', N'Camera của iPhone 16 Pro có hỗ trợ quay video 8K hay không và chất lượng ra sao?', N'Chưa trả lời', N'iPhone 16 Series', '2025-04-13'),
(14, N'Hiệu năng iPhone 16 mạnh hơn iPhone 15 nhiều không?', N'Tôi đang dùng iPhone 15, muốn biết iPhone 16 có nâng cấp nhiều về hiệu năng không?', N'Chưa trả lời', N'iPhone 16 Series', '2025-04-14'),
(15, N'iPhone 16 Pro Max có thay đổi thiết kế gì mới?', N'Tôi muốn tìm hiểu xem mẫu iPhone 16 Pro Max có nâng cấp đặc biệt về thiết kế không?', N'Đã trả lời', N'iPhone 16 Series', '2025-04-15'),

(16, N'iPhone 17 có thay đổi camera trước không?', N'Camera selfie của iPhone 17 có được nâng cấp gì về độ phân giải và góc nhìn không?', N'Đã trả lời', N'iPhone 17 Series', '2025-04-16'),
(17, N'iPhone 17 dùng chip gì?', N'Cho tôi hỏi cấu hình chip xử lý của iPhone 17 có mạnh hơn đời trước nhiều không?', N'Chưa trả lời', N'Dòng sản phẩm', '2025-04-17'),
(18, N'iPhone 17 Pro có tính năng quay không gian (Spatial Video) mới không?', N'Tôi quan tâm tính năng quay video 3D trên mẫu mới, cửa hàng có thông tin chi tiết không?', N'Chưa trả lời', N'iPhone 17 Series', '2025-04-18'),
(19, N'iPhone 17 có mấy phiên bản dung lượng?', N'Tôi muốn hỏi iPhone 17 có các phiên bản dung lượng bao nhiêu GB?', N'Chưa trả lời', N'Dòng sản phẩm', '2025-04-19'),
(20, N'Màn hình iPhone 17 Pro Max sáng tối đa bao nhiêu nits?', N'Tôi cần biết độ sáng tối đa của màn hình để đánh giá khả năng hiển thị ngoài trời.', N'Đã trả lời', N'iPhone 17 Series', '2025-04-20'),

(21, N'Ốp lưng cho iPhone 15 có kháng khuẩn không?', N'Cho tôi hỏi cửa hàng có bán loại ốp lưng kháng khuẩn dành cho iPhone 15 không?', N'Đã trả lời', N'Phụ kiện', '2025-04-21'),
(22, N'AirPods Pro 2 có chống ồn tốt không?', N'Tôi muốn tìm tai nghe chống ồn tốt để đi máy bay, AirPods Pro 2 có phù hợp không?', N'Chưa trả lời', N'Phụ kiện', '2025-04-22'),
(23, N'Cáp sạc USB-C cho iPhone có bền không?', N'Tôi cần mua cáp sạc USB-C chính hãng cho iPhone, độ bền có cao không?', N'Đang xử lý', N'Phụ kiện', '2025-04-23'),
(24, N'Cường lực nào tốt nhất cho iPhone 16 Pro Max?', N'Tôi đang tìm miếng dán cường lực bảo vệ màn hình, loại nào tốt và khó vỡ?', N'Chưa trả lời', N'Phụ kiện', '2025-04-24'),
(25, N'Tôi có thể mua sạc 30W cho iPhone 14 ở đây không?', N'Điện thoại tôi hỗ trợ sạc nhanh, không biết cửa hàng có bán sạc 30W chính hãng không?', N'Đã trả lời', N'Phụ kiện', '2025-04-25'),

(26, N'iPhone mua tại cửa hàng được bảo hành bao lâu?', N'Tôi muốn hỏi chính sách bảo hành của iPhone mua tại hệ thống là bao nhiêu tháng?', N'Đã trả lời', N'Bảo hành', '2025-04-26'),
(27, N'Bảo hành pin iPhone có bao gồm chai pin không?', N'Pin iPhone sau một thời gian bị chai liệu có được bảo hành không?', N'Chưa trả lời', N'Bảo hành', '2025-04-27'),
(28, N'Tôi bị rơi iPhone, có được bảo hành không?', N'Máy tôi bị rơi vỡ kính sau. Trường hợp này có được hỗ trợ bảo hành không?', N'Chưa trả lời', N'Bảo hành', '2025-04-28'),
(29, N'Bảo hành có cần giữ hóa đơn không?', N'Nếu tôi làm mất hóa đơn bán hàng thì có được bảo hành hay không?', N'Chưa trả lời', N'Bảo hành', '2025-04-29'),
(30, N'iPhone lỗi nguồn có được đổi máy mới không?', N'Nếu máy bị lỗi nguồn do nhà sản xuất trong thời gian bảo hành thì tôi có được đổi máy mới không?', N'Đã trả lời', N'Bảo hành', '2025-04-30'),

(31, N'Thay màn hình iPhone 14 giá bao nhiêu?', N'Màn hình iPhone 14 của tôi bị nứt, không biết chi phí thay thế khoảng bao nhiêu?', N'Chưa trả lời', N'Sửa chữa', '2025-05-01'),
(32, N'Sửa Face ID iPhone 15 Pro có đảm bảo không?', N'Face ID máy tôi bị lỗi, nếu sửa có ảnh hưởng đến khả năng bảo mật không?', N'Chưa trả lời', N'Sửa chữa', '2025-05-02'),
(33, N'Thay pin iPhone 16 có mất chống nước không?', N'Nếu thay pin tại cửa hàng thì máy có còn chống nước như ban đầu không?', N'Đã trả lời', N'Sửa chữa', '2025-05-03'),
(34, N'Loa iPhone 15 nghe bị rè có sửa được không?', N'Loa trong khi gọi bị rè, không biết đây có phải lỗi phần cứng và chi phí sửa thế nào?', N'Chưa trả lời', N'Sửa chữa', '2025-05-04'),
(35, N'Camera iPhone 17 Pro bị mờ sau khi rơi', N'Camera sau bị mờ như có hơi nước bên trong, trường hợp này có sửa được không?', N'Đã trả lời', N'Sửa chữa', '2025-05-05'),

(36, N'iPhone 14 thu cũ đổi mới được bao nhiêu?', N'Tôi có iPhone 14 còn tốt, cửa hàng thu lại giá bao nhiêu nếu tôi đổi lên iPhone mới?', N'Chưa trả lời', N'Chính sách đổi trả', '2025-05-06'),
(37, N'Thu cũ đổi mới có cần hộp và phụ kiện không?', N'Điện thoại của tôi không còn hộp và phụ kiện, có được tham gia chương trình thu cũ đổi mới không?', N'Đã trả lời', N'Chính sách đổi trả', '2025-05-07'),
(38, N'Máy bị trầy có được thu cũ không?', N'iPhone của tôi có vài vết trầy xước nhẹ, trường hợp này có được tham gia thu cũ đổi mới không?', N'Chưa trả lời', N'Chính sách đổi trả', '2025-05-08'),
(39, N'Thu cũ đổi mới có áp dụng cho mua trả góp không?', N'Tôi muốn đổi lên iPhone mới nhưng dùng trả góp, chương trình có hỗ trợ không?', N'Chưa trả lời', N'Chính sách đổi trả', '2025-05-09'),
(40, N'Thu cũ đổi mới có cần kiểm tra máy trước không?', N'Khi mang máy đến đổi thì có phải kiểm tra chất lượng trước khi định giá không?', N'Đã trả lời', N'Chính sách đổi trả', '2025-05-10'),

(41, N'Điện thoại bị lỗi trong 7 ngày có được đổi mới không?', N'Nếu iPhone tôi mua bị lỗi nhà sản xuất trong 7 ngày thì có được đổi mới 1:1 không?', N'Đã trả lời', N'Chính sách đổi trả', '2025-05-11'),
(42, N'Đổi trả khi không thích sản phẩm có được không?', N'Tôi mua máy nhưng không còn nhu cầu sử dụng nữa, không biết có thể trả lại không?', N'Chưa trả lời', N'Chính sách đổi trả', '2025-05-12'),
(43, N'Đổi trả có cần đầy đủ phụ kiện không?', N'Tôi làm mất khay sim thì có được đổi trả sản phẩm hay không?', N'Chưa trả lời', N'Chính sách đổi trả', '2025-05-13'),
(44, N'Thời gian đổi trả tối đa là bao lâu?', N'Cửa hàng cho phép đổi trả trong bao nhiêu ngày kể từ khi mua?', N'Chưa trả lời', N'Chính sách đổi trả', '2025-05-14'),
(45, N'Hóa đơn điện tử có dùng để đổi trả được không?', N'Tôi chỉ có hóa đơn điện tử, vậy có hợp lệ để đổi trả không?', N'Đã trả lời', N'Chính sách đổi trả', '2025-05-15'),

(46, N'Cửa hàng hỗ trợ thanh toán bằng thẻ tín dụng không?', N'Tôi muốn thanh toán bằng thẻ Visa, không biết cửa hàng có hỗ trợ không?', N'Đã trả lời', N'Hỗ trợ thanh toán', '2025-05-16'),
(47, N'Có thể thanh toán trả góp qua ngân hàng nào?', N'Nếu tôi muốn mua trả góp thì có những ngân hàng nào liên kết?', N'Chưa trả lời', N'Hỗ trợ thanh toán', '2025-05-17'),
(48, N'Thanh toán qua ví điện tử có khuyến mãi không?', N'Nếu tôi thanh toán qua Momo hoặc ZaloPay thì có ưu đãi gì không?', N'Chưa trả lời', N'Hỗ trợ thanh toán', '2025-05-18'),
(49, N'Thanh toán khi nhận hàng có được kiểm tra máy trước không?', N'Khi thanh toán COD, tôi có được mở hộp kiểm tra sản phẩm trước khi trả tiền không?', N'Chưa trả lời', N'Hỗ trợ thanh toán', '2025-05-19'),
(50, N'Tôi có thể xuất hóa đơn công ty khi mua iPhone không?', N'Công ty tôi cần hóa đơn đỏ, không biết cửa hàng có thể xuất hóa đơn VAT không?', N'Đã trả lời', N'Hỗ trợ thanh toán', '2025-05-20'),

(51, N'Làm sao để đặt hàng online trên website?', N'Tôi lần đầu mua online, bạn có thể hướng dẫn tôi cách đặt hàng trên website không?', N'Đã trả lời', N'Hỗ trợ đặt hàng', '2025-05-21'),
(52, N'Đặt hàng online có cần đặt cọc không?', N'Nếu tôi đặt hàng iPhone thì có phải thanh toán trước hay đặt cọc gì không?', N'Chưa trả lời', N'Hỗ trợ đặt hàng', '2025-05-22'),
(53, N'Bao lâu thì giao hàng sau khi đặt?', N'Tôi muốn biết thời gian giao hàng dự kiến sau khi đặt mua iPhone.', N'Chưa trả lời', N'Hỗ trợ đặt hàng', '2025-05-23'),
(54, N'Có thể đặt giữ máy và ra cửa hàng nhận không?', N'Tôi muốn đặt giữ máy online rồi ra cửa hàng trải nghiệm và thanh toán trực tiếp được chứ?', N'Chưa trả lời', N'Hỗ trợ đặt hàng', '2025-05-24'),
(55, N'Tôi có thể hủy đơn hàng đã đặt không?', N'Nếu tôi đổi ý sau khi đặt hàng thì có thể hủy đơn không và có mất phí gì không?', N'Đã trả lời', N'Hỗ trợ đặt hàng', '2025-05-25');

	
--FeedbackForm--
INSERT INTO FeedbackForm (FormID, CustomerID, Rating, Content, SentDate)
VALUES
(1, 21, 4, N'Dịch vụ chăm sóc khách hàng nhanh và chuyên nghiệp.', '2025-12-02'),
(2, 22, 5, N'Nhân viên tư vấn rất tận tâm và chính xác.', '2025-12-03'),
(3, 23, 3, N'Thỉnh thoảng phải chờ phản hồi khá lâu.', '2025-12-04'),
(4, 24, 5, N'Rất hài lòng với cách hỗ trợ qua điện thoại.', '2025-12-05'),
(5, 25, 4, N'Tư vấn rõ ràng và dễ hiểu.', '2025-12-06'),
(6, 26, 2, N'Cần cải thiện thái độ khi hỗ trợ khách hàng.', '2025-12-07'),
(7, 27, 5, N'Dịch vụ vượt mong đợi của tôi.', '2025-12-08'),
(8, 28, 4, N'Hỗ trợ khách hàng rất nhiệt tình.', '2025-12-09'),
(9, 29, 3, N'Cần cung cấp thêm thông tin rõ ràng hơn.', '2025-12-10'),
(10, 30, 5, N'Nhân viên thân thiện và hỗ trợ tốt.', '2025-12-11'),
(11, 31, 5, N'Tốc độ xử lý yêu cầu rất nhanh.', '2025-12-12'),
(12, 32, 4, N'Tư vấn đúng nhu cầu của tôi.', '2025-12-13'),
(13, 33, 2, N'Thông tin cung cấp chưa đầy đủ.', '2025-12-14'),
(14, 34, 3, N'Chưa nắm rõ yêu cầu của khách.', '2025-12-15'),
(15, 35, 5, N'Trải nghiệm dịch vụ tuyệt vời.', '2025-12-16'),
(16, 36, 4, N'Tiếp nhận yêu cầu nhanh.', '2025-12-17'),
(17, 37, 5, N'Nhân viên hỗ trợ rất thân thiện.', '2025-12-18'),
(18, 38, 3, N'Tư vấn hơi chậm vào giờ cao điểm.', '2025-12-19'),
(19, 39, 5, N'Tôi cảm thấy được hỗ trợ rất tốt.', '2025-12-20'),
(20, 40, 4, N'Hữu ích và hỗ trợ kịp thời.', '2025-12-21'),
(21, 41, 4, N'Hướng dẫn thực hiện nhanh và dễ.', '2025-12-22'),
(22, 42, 5, N'Chăm sóc khách hàng rất chuyên nghiệp.', '2025-12-23'),
(23, 43, 4, N'Nhân viên hiểu vấn đề nhanh.', '2025-12-24'),
(24, 44, 3, N'Cần cải thiện chất lượng phản hồi.', '2025-12-25'),
(25, 45, 2, N'Tư vấn sai thông tin vài lần.', '2025-12-26'),
(26, 46, 4, N'Hỗ trợ nhanh và chính xác.', '2025-12-27'),
(27, 47, 5, N'Dịch vụ chăm sóc khách hàng rất xuất sắc.', '2025-12-28'),
(28, 48, 4, N'Dễ trao đổi và nhận hỗ trợ.', '2025-12-29'),
(29, 49, 3, N'Thông tin hỗ trợ chưa thật sự chi tiết.', '2025-12-30'),
(30, 50, 5, N'Rất đáng tin cậy và chuyên nghiệp.', '2025-12-31'),
(31, 51, 5, N'Tư vấn chính xác nhu cầu mua hàng.', '2025-12-01'),
(32, 52, 4, N'Tương tác nhanh, dễ hiểu.', '2025-12-02'),
(33, 53, 3, N'Thi thoảng nhân viên phản hồi chậm.', '2025-12-03'),
(34, 54, 4, N'Dịch vụ tốt, vẫn có thể nâng cấp thêm.', '2025-12-04'),
(35, 55, 5, N'Không có gì để chê.', '2025-12-05'),
(36, 56, 4, N'Hỗ trợ tốt và kịp thời.', '2025-12-06'),
(37, 57, 5, N'Tôi sẽ tiếp tục sử dụng dịch vụ.', '2025-12-07'),
(38, 58, 4, N'Phản hồi nhanh chính xác.', '2025-12-08'),
(39, 59, 3, N'Thỉnh thoảng phản hồi chưa đúng trọng tâm.', '2025-12-09'),
(40, 60, 5, N'Tôi rất hài lòng với dịch vụ chăm sóc khách hàng.', '2025-12-10');




--Receiver--
INSERT INTO Receiver (ReceiverID) VALUES 
('R0'), ('R1'), ('R2'), ('R3'), ('R4'), ('R5'), ('R6'), ('R7'), ('R8'), ('R9'), ('R10'),
('R11'), ('R12'), ('R13'), ('R14'), ('R15');

--Message--
INSERT INTO Message1 (ID, Content, ReceiverID) VALUES
(0,  N'iPhone 15 camera chụp đêm thế nào?', 'R1'),
(1,  N'iPhone 15 có hỗ trợ sạc nhanh tối đa bao nhiêu W?', 'R1'),
(2,  N'iPhone 16 Pro có Always-On Display không?', 'R4'),
(3,  N'iPhone 15 có chống nước IP68 không?', 'R4'),
(4,  N'iPhone 16 Pro có Always-On Display không?', 'R6'),
(5,  N'iPhone 16 có khác gì nhiều so với iPhone 15?', 'R6'),
(6,  N'Tôi cần biết dung lượng pin của iPhone 15 Pro Max.', 'R9'),
(7,  N'iPhone 14 quay Cinematic Mode có tốt không?', 'R9'),
(8,  N'iPhone 15 Plus dùng chip gì?', 'R11'),
(9,  N'Tôi muốn hỏi về camera của iPhone 16 Pro Max.', 'R11'),
(10, N'Màn hình iPhone 14 có tần số quét 120Hz không?', 'R14'),
(11, N'iPhone 14 Pro Max có quay 4K 60fps không?', 'R14'),
(12, N'iPhone 16 Pro dung lượng tối đa bao nhiêu?', 'R0'),
(13, N'iPhone 17 có Dynamic Island không?', 'R0'),
(14, N'Tôi muốn tư vấn về iPhone 16 Pro, bản 128GB có màu gì?', 'R0'),
(15, N'iPhone 17 có màu mới nào đặc biệt?', 'R0'),

(16, N'Thay mặt kính iPhone 15 giá bao nhiêu?', 'R2'),
(17, N'Sửa camera iPhone 17 có mất chống nước không?', 'R2'),
(18, N'Thay loa iPhone 14 có bảo hành không', 'R2'),
(19, N'Nếu thay khung viền thì có ảnh hưởng chất lượng máy không?', 'R7'),
(20, N'Điện thoại tôi chết nguồn có lấy lại được dữ liệu không?', 'R7'),
(21, N'Tôi cần sửa nhanh, thời gian làm dịch vụ khoảng bao lâu?', 'R7'),
(22, N'Thay pin iPhone 17 chính hãng giá bao nhiêu?', 'R12'),
(23, N'Sửa loa ngoài iPhone 16 có chờ lấy liền không?', 'R12'),
(24, N'Thay camera iPhone 15 Pro có ảnh hưởng chống rung không?', 'R12'),
(25, N'Máy tôi còn bảo hành chính hãng, sửa có mất phí không?', 'R0'),
(26, N'Vệ sinh khoang loa có mất phí không?', 'R0'),
(27, N'Sau khi ép kính liệu Face ID có hoạt động bình thường?', 'R0'),
(28, N'Tôi muốn trò chuyện với nhân viên thay vì chatbot.', 'R0'),
(29, N'Điện thoại không nhận sạc, có cần thay IC nguồn không?', 'R0'),
(30, N'Tôi muốn mang máy đến kiểm tra trước khi sửa có mất phí không?', 'R0'),

(31, N'Có hỗ trợ chuyển dữ liệu từ Android sang iPhone không?', 'R3'),
(32, N'Có hỗ trợ trả góp online không?', 'R3'),
(33, N'Hỗ trợ cài bảo mật và chống trộm cho iPhone?', 'R5'),
(34, N'Tình trạng đơn hàng của tôi 3 ngày nay không cập nhật, vui lòng kiểm tra.', 'R5'),
(35, N'Có hỗ trợ giao hàng nhanh 2 giờ không?', 'R8'),
(36, N'Có hỗ trợ in hóa đơn VAT sau khi mua không?', 'R8'),
(37, N'Có hỗ trợ gói trả góp 0% lãi suất không?', 'R8'),
(38, N'Hỗ trợ hướng dẫn sử dụng tính năng mới trên iOS', 'R13'),
(39, N'Khi nào đơn hàng của tôi sẽ được giao chính xác? Xin cung cấp thời gian dự kiến.', 'R13'),
(40, N'Làm thế nào để nâng cấp iOS lên phiên bản mới nhất mà không mất dữ liệu?', 'R0'),
(41, N'Xin cho biết chính sách bảo mật thông tin khách hàng khi mua hàng online.', 'R0'),
(42, N'Tôi muốn thay đổi địa chỉ giao hàng cho đơn số 1029, vui lòng hỗ trợ nhanh.', 'R15'),
(43, N'Địa chỉ mới của tôi: 456 Phố Tràng Tiền, Quận Hoàn Kiếm, Hà Nội. Hãy cập nhật giúp tôi.', 'R15'),
(44, N'Tôi muốn được hỗ trợ đồng bộ dữ liệu', 'R0'),
(45, N'Tôi muốn nhân viên tư vấn giúp chọn máy phù hợp công việc.', 'R0'),

(46, N'Đổi trả cần mang theo những giấy tờ gì?', 'R3'),
(47, N'Bảo hành còn bao nhiêu ngày thì xem ở đâu?', 'R3'),
(48, N'Sản phẩm online có đổi trả ngay tại cửa hàng được không?', 'R5'),
(49, N'Nếu màn hình bị sọc ngang trong lúc sử dụng có được miễn phí bảo hành không?', 'R5'),
(50, N'Nếu máy đang giảm giá thì chính sách đổi trả thế nào?', 'R8'),
(51, N'Đã kích hoạt bảo hành có đổi trả được nữa không?', 'R8'),
(52, N'Tai nghe, cáp sạc có thời gian bảo hành bao lâu?', 'R13'),
(53, N'Nếu mua trả góp thì điều kiện đổi trả thế nào?', 'R13'),
(54, N'Bảo hành có áp dụng lỗi phần mềm không?', 'R15'),
(55, N'Hàng tặng kèm có phải trả lại khi đổi trả không?', 'R15'),
(56, N'Nếu máy bị trầy nhẹ thì có ảnh hưởng đến quyền đổi trả không?', 'R0'),
(57, N'Hóa đơn điện tử có hợp lệ để đổi trả sản phẩm không?', 'R0'),
(58, N'Sản phẩm lỗi nhà sản xuất trong 7 ngày có được đổi mới 1:1 không?', 'R0'),
(59, N'Sản phẩm bảo hành hết hạn có được áp dụng ưu đãi đổi mới không?', 'R0'),
(60, N'Tôi muốn đổi máy sang màu khác, chính sách có hỗ trợ không?', 'R0');

--CUSTOMER SEND--
INSERT INTO CustomerSend (CustomerID, MessageID) VALUES
(21, 3),
(22, 18), (22, 27),
(23, 32), (23, 41),
(24, 33),
(25, 34), 
(26, 19),
(27, 5),
(28, 6),
(29, 7),
(30, 20), (30, 21),
(31, 8),
(32, 9), (32, 59),
(33, 10),
(34, 11),
(35, 22),
(36, 46), (36, 57),
(37, 47),
(38, 48),
(39, 49),
(40, 12), (40, 14),
(41, 35),
(42, 36),
(43, 37),
(44, 50),
(45, 13), (45, 15),
(46, 23),
(47, 24),
(48, 38), 
(49, 42), (49, 43), (49, 39),
(50, 54),
(51, 1),
(52, 2),
(53, 17),
(54, 28), (54, 31),
(55, 56),
(56, 4),
(58, 51),
(59, 60),
(60, 44);



--CUSTOMER CREATE--
INSERT INTO CustomerCreate (CustomerID, FormID) VALUES
(21, 1), (21, 36), (21, 38),
(22, 2), 
(23, 3),
(24, 4), (22, 37),
(25, 5),

(26, 9), (26, 45),
(27, 10),
(28, 11),
(29, 12),
(30, 13), (30, 46),

(31, 17), (31, 18), (31, 19),
(32, 20), (32, 21),
(33, 22), (33, 23), (33, 24),
(34, 28), (34, 33), 
(35, 34), 

(36, 6),
(37, 7),
(38, 8),
(39, 26), (39, 35), (39, 39),
(40, 31), (40, 29),

(41, 14),
(42, 15), (42, 48), (42, 49),
(43, 16), (43, 47),
(44, 43),
(45, 44),

(46, 50),
(47, 51),
(48, 52),
(49, 53),
(50, 54);

INSERT INTO Agent (AgentID, ReceiverID, Stt, ResponsibleField) VALUES
(6,  'R1',  N'Đang hoạt động', N'Tư vấn sản phẩm iPhone'),
(7,  'R2',  N'Đang hoạt động', N'Dịch vụ bảo hành & sửa chữa'),
(8,  'R3',  N'Đang hoạt động', N'Chính sách & hỗ trợ khách hàng'),
(9,  'R4',  N'Đang hoạt động', N'Tư vấn sản phẩm iPhone'),
(10, 'R5',  N'Đang hoạt động', N'Chính sách & hỗ trợ khách hàng'),

(11, 'R6',  N'Đang hoạt động', N'Tư vấn sản phẩm iPhone'),
(12, 'R7',  N'Đang hoạt động', N'Dịch vụ bảo hành & sửa chữa'),
(13, 'R8',  N'Đang hoạt động', N'Chính sách & hỗ trợ khách hàng'),
(14, 'R9',  N'Đang hoạt động', N'Tư vấn sản phẩm iPhone'),
(15, 'R10', N'Không hoạt động', N'Chính sách & hỗ trợ khách hàng'),

(16, 'R11', N'Đang hoạt động', N'Tư vấn sản phẩm iPhone'),
(17, 'R12', N'Đang hoạt động', N'Dịch vụ bảo hành & sửa chữa'),
(18, 'R13', N'Đang hoạt động', N'Chính sách & hỗ trợ khách hàng'),
(19, 'R14', N'Đang hoạt động', N'Tư vấn sản phẩm iPhone'),
(20, 'R15', N'Đang hoạt động', N'Chính sách & hỗ trợ khách hàng');

INSERT INTO ReceiveForm(AgentID, FormID, resContent) VALUES
(6, 1, NULL), (9, 2, NULL), (6, 3, NULL), (9, 4, NULL), (6, 5, NULL), (9, 6, NULL), (6, 7, NULL), (9, 8, NULL), 
(11, 9, NULL), (14, 10, NULL), (11, 11, NULL), (14, 12, NULL), (11, 13, NULL), (14, 14, NULL), (11, 15, NULL), (14, 16, NULL),
(16, 17, NULL), (19, 18, NULL), (16, 19, NULL), (19, 20, NULL), (16, 21, NULL), (19, 22, NULL), (16, 23, NULL), (19, 24, NULL), (16, 25, NULL), 
(7, 26, NULL), (7, 31, NULL), (12, 27, NULL), (12, 32, NULL), (17, 28, NULL), (17, 33, NULL), (7, 29, NULL), (12, 30, NULL), (17, 34, NULL), (7, 35, NULL),
(8, 36, NULL), (8, 37, NULL), (8, 38, NULL), (10, 39, NULL), (10, 40, NULL), (10, 41, NULL), (10, 42, NULL), 
(13, 43, NULL), (13, 44, NULL), (13, 45, NULL), (13, 46, NULL), (13, 47, NULL), (13, 48, NULL), (13, 49, NULL),
(18, 50, NULL), (18, 51, NULL), (18, 52, NULL), (20, 53, NULL), (20, 54, NULL), (20, 55, NULL); 


--ClasifyTable--
-- Cấp 1: Nhóm chính
INSERT INTO ClassifyTable (TableID, NameTable, ParentTableID) VALUES
(1, N'Sản phẩm', NULL),
(2, N'Dịch vụ hậu mãi', NULL),
(3, N'Chính sách & hỗ trợ', NULL),
(4, N'Phân loại theo miền', NULL),
(5, N'Phân loại khách hàng', NULL),
-- Cấp 2: Nhóm con của "Sản phẩm"
(11, N'iPhone 14 Series', 1),
(12, N'iPhone 15 Series', 1),
(13, N'iPhone 16 Series', 1),
(14, N'iPhone 17 Series', 1),
(15, N'Phụ kiện', 1),
-- Cấp 2: Nhóm con của "Dịch vụ hậu mãi"
(21, N'Bảo hành', 2),
(22, N'Sửa chữa', 2),
-- Cấp 2: Nhóm con của "Chính sách & hỗ trợ"
(31, N'Chính sách đổi trả', 3),
(32, N'Hướng dẫn thanh toán', 3),
(33, N'Hướng dẫn đặt hàng', 3),
-- CẤP 2: Miền (thuộc nhóm "Phân loại theo miền")
(41, N'Miền Bắc', 4),
(42, N'Miền Trung', 4),
(43, N'Miền Nam', 4),
-- CẤP 3: Chi tiết theo tỉnh/thành (ví dụ thực tế)
(45, N'Hà Nội', 41),
(46, N'Đà Nẵng', 42),
(47, N'Hồ Chí Minh', 43),
-- CẤP 2: Loại thành viên khách hàng
(51, N'Đồng', 5),
(52, N'Bạc',  5),
(53, N'Vàng', 5);

--Assign--
INSERT INTO Assign (AgentID, TableID) VALUES
-- Nhóm 1: Tư vấn sản phẩm
(6, 11), (6, 12), (6, 13), (6, 14), (6, 15), (9, 11), (9, 12), (9, 13), (9, 14), (9, 15), 
(11, 11), (11, 12), (11, 13), (11, 14), (11, 15), (14, 11), (14, 12), (14, 13), (14, 14), (14, 15),
(16, 11), (16, 12), (16, 13), (16, 14), (16, 15), (19, 11), (19, 12), (19, 13), (19, 14), (19, 15), 
-- Nhóm 2: Bảo hành & Sửa chữa
(7, 21), (7, 22), 
(12, 21), (12, 22),
(17, 21), (17, 22),
-- Nhóm 3: Chính sách & Hỗ trợ
(8, 31), (8, 32), (8, 33), (10, 31), (10, 32), (10, 33), 
(13, 31), (13, 32), (13, 33), (15, 31), (15, 32), (15, 33), 
(18, 31), (18, 32), (18, 33), (20, 31), (20, 32), (20, 33);
-- Phân công theo khu vực
INSERT INTO Assign (AgentID, TableID) VALUES
(6, 43), (7, 43), (8, 43), (9, 43), (10, 43),   -- phụ trách Miền Nam
(11, 42), (12, 42), (13, 42), (14, 42), (15, 42), -- phụ trách Miền Trung
(16, 41), (17, 41), (18, 41), (19, 41), (20, 41); -- phụ trách Miền Bắc

-- Phân công phụ trách loại khách hàng (Cần xem lại)
INSERT INTO Assign (AgentID, TableID) VALUES
(6, 51), (9, 51), (11, 51), (14, 51), (16, 51), (19, 51), --Đồng
(7, 52), (10, 52), (12, 52), (15, 52), (17, 52), (20, 52), -- Bạc
(8, 53), (13, 53), (18, 52); --Vàng



--Chatbot--
INSERT INTO Chatbot(Vers,ReceiverID) VALUES('1.0','R0');

--Feedback Chatbot--
INSERT INTO FeedbackChatbot (CustomerID, Vers, Rating) VALUES
(21, '1.0', 3), (22, '1.0', 4), (23, '1.0', 5), (24, '1.0', 4), (25, '1.0', 5), (26, '1.0', 2), (27, '1.0', 4), (28, '1.0', 3), (29, '1.0', 5), (30, '1.0', 5),
(31, '1.0', 4), (32, '1.0', 5), (33, '1.0', 2), (34, '1.0', 4), (35, '1.0', 5), (36, '1.0', 1), (37, '1.0', 3), (38, '1.0', 5), (39, '1.0', 4), (40, '1.0', 5),
(41, '1.0', 4), (42, '1.0', 3), (43, '1.0', 2), (44, '1.0', 5), (45, '1.0', 5), (46, '1.0', 4), (47, '1.0', 4), (48, '1.0', 5), (49, '1.0', 3), (50, '1.0', 4),
(51, '1.0', 5), (52, '1.0', 5), (53, '1.0', 2), (54, '1.0', 4), (55, '1.0', 5), (56, '1.0', 3), (57, '1.0', 5), (58, '1.0', 4), (59, '1.0', 5), (60, '1.0', 5);

INSERT INTO Orders (OrderID, CustomerID, OrderDate, Stt, DeliveryAddress) VALUES
(1001, 21, '2025-10-10 09:00:00', N'Đã giao', N'123 Đường Cộng Hòa, Quận Tân Bình, TP Hồ Chí Minh'),
(1002, 22, '2025-10-10 09:15:30', N'Đang giao', N'456 Đường Nguyễn Văn Linh, Quận 7, TP Hồ Chí Minh'),
(1003, 23, '2025-10-10 09:30:45', N'Đang xử lý', N'789 Đường Điện Biên Phủ, Quận 3, TP Hồ Chí Minh'),
(1004, 24, '2025-10-10 09:45:10', N'Đã hủy', N'159 Đường Võ Văn Kiệt, Quận 1, TP Hồ Chí Minh'),
(1005, 25, '2025-10-09 18:30:00', N'Đã giao', N'202 Đường Trần Hưng Đạo, Quận 1, TP Hồ Chí Minh'),

(1006, 26, '2025-10-09 17:50:20', N'Chờ xử lý', N'303 Đường Bạch Đằng, Quận Hải Châu, TP Đà Nẵng'),
(1007, 27, '2025-10-09 15:40:15', N'Đang giao', N'404 Đường Nguyễn Văn Linh, Quận Thanh Khê, TP Đà Nẵng'),
(1008, 28, '2025-10-09 14:10:05', N'Đang xử lý', N'505 Đường Hoàng Diệu, Quận Hải Châu, TP Đà Nẵng'),
(1009, 29, '2025-10-08 11:20:00', N'Đã giao', N'606 Đường Lê Duẩn, Quận Thanh Khê, TP Đà Nẵng'),
(1010, 30, '2025-10-08 10:55:10', N'Đang giao', N'707 Đường Nguyễn Tất Thành, Quận Liên Chiểu, TP Đà Nẵng'),

(1011, 31, '2025-10-08 09:05:40', N'Đã giao', N'808 Đường Điện Biên Phủ, Quận Đống Đa, Hà Nội'),
(1012, 32, '2025-10-07 16:00:00', N'Đang xử lý', N'909 Đường Cầu Giấy, Quận Cầu Giấy, Hà Nội'),
(1013, 33, '2025-10-07 15:15:30', N'Đang giao', N'111 Đường Tràng Thi, Quận Hoàn Kiếm, Hà Nội'),
(1014, 34, '2025-10-07 14:40:20', N'Chờ xử lý', N'222 Đường Láng, Quận Đống Đa, Hà Nội'),
(1015, 35, '2025-10-06 12:00:00', N'Đã giao', N'333 Đường Lê Trọng Tấn, Quận Thanh Xuân, Hà Nội'),

(1016, 36, '2025-10-06 11:10:50', N'Đang giao', N'444 Đường Trường Sa, Quận Bình Thạnh, TP Hồ Chí Minh'),
(1017, 37, '2025-10-05 10:30:25', N'Đang xử lý', N'555 Đường Nguyễn Thị Minh Khai, Quận 3, TP Hồ Chí Minh'),
(1018, 38, '2025-10-05 08:00:00', N'Đã giao', N'666 Đường Võ Thị Sáu, Quận 3, TP Hồ Chí Minh'),
(1019, 39, '2025-10-04 17:30:10', N'Đã hủy', N'777 Đường Hoàng Sa, Quận 1, TP Hồ Chí Minh'),
(1020, 40, '2025-10-04 16:20:00', N'Đang giao', N'888 Đường Huỳnh Tấn Phát, Quận 7, TP Hồ Chí Minh'),

(1021, 41, '2025-10-03 14:05:30', N'Đã giao', N'999 Đường Nguyễn Văn Thoại, Quận Sơn Trà, TP Đà Nẵng'),
(1022, 42, '2025-10-03 12:50:40', N'Đang xử lý', N'110 Đường 2 Tháng 9, Quận Hải Châu, TP Đà Nẵng'),
(1023, 43, '2025-10-02 11:45:00', N'Chờ xử lý', N'220 Đường Lê Duẩn, Quận Thanh Khê, TP Đà Nẵng'),
(1024, 44, '2025-10-02 10:00:10', N'Đang giao', N'330 Đường Trần Cao Vân, Quận Thanh Khê, TP Đà Nẵng'),
(1025, 45, '2025-10-01 19:30:00', N'Đã giao', N'440 Đường Nguyễn Tất Thành, Quận Liên Chiểu, TP Đà Nẵng'),

(1026, 46, '2025-10-01 18:15:50', N'Đang xử lý', N'550 Đường Kim Ngưu, Quận Hai Bà Trưng, Hà Nội'),
(1027, 47, '2025-09-30 17:00:20', N'Đang giao', N'660 Đường Hoàng Quốc Việt, Quận Cầu Giấy, Hà Nội'),
(1028, 48, '2025-09-30 16:30:00', N'Đã giao', N'770 Đường Trần Phú, Quận Ba Đình, Hà Nội'),
(1029, 49, '2025-09-29 15:40:10', N'Chờ xử lý', N'880 Đường Nguyễn Chí Thanh, Quận Đống Đa, Hà Nội'),
(1030, 22, '2025-09-29 14:00:00', N'Đã giao', N'456 Đường Nguyễn Văn Linh, Quận 7, TP Hồ Chí Minh'),

(1031, 51, '2025-09-28 12:10:30', N'Đang xử lý', N'112 Đường Tôn Đức Thắng, Quận 1, TP Hồ Chí Minh'),
(1032, 52, '2025-09-28 10:50:00', N'Đang giao', N'223 Đường Lạc Long Quân, Quận 11, TP Hồ Chí Minh'),
(1033, 53, '2025-09-27 09:30:15', N'Đã giao', N'334 Đường Nguyễn Sơn, Quận Tân Phú, TP Hồ Chí Minh'),
(1034, 43, '2025-09-27 08:40:00', N'Đã hủy', N'220 Đường Lê Duẩn, Quận Thanh Khê, TP Đà Nẵng'),
(1035, 55, '2025-09-26 17:00:00', N'Đang xử lý', N'556 Đường Nguyễn Văn Cừ, Quận 5, TP Hồ Chí Minh'),

(1036, 56, '2025-09-26 16:10:20', N'Đã giao', N'667 Đường Lê Văn Hiến, Quận Ngũ Hành Sơn, TP Đà Nẵng'),
(1037, 57, '2025-09-25 15:00:00', N'Đang giao', N'778 Đường Phạm Văn Đồng, Quận Sơn Trà, TP Đà Nẵng'),
(1038, 58, '2025-09-25 14:30:10', N'Chờ xử lý', N'889 Đường Hà Huy Tập, Quận Cẩm Lệ, TP Đà Nẵng'),
(1039, 59, '2025-09-24 13:20:00', N'Đã giao', N'991 Đường Trung Nữ Vương, Quận Hải Châu, TP Đà Nẵng'),
(1040, 60, '2025-09-24 11:00:00', N'Đang xử lý', N'102 Đường Hoàng Thị Loan, Quận Liên Chiểu, TP Đà Nẵng');

INSERT INTO OrderItem (OrderItemID, Quantity, ProductName, UnitPrice) VALUES
(1, 10, N'iPhone 15 Pro Max', 30490000.00),
(2, 15, N'Apple AirTag', 790000.00),
(3, 30, N'Cáp sạc USB-C to USB-C 2m', 590000.00),
(4, 10, N'iPhone 15', 21990000.00),
(5, 20, N'Ốp lưng Silicon MagSafe', 1290000.00),
(6, 20, N'Apple Watch SE (GPS, 44mm)', 7990000.00),
(7, 10, N'iPhone 14 Plus', 21490000.00),
(8, 24, N'Củ sạc nhanh Apple 20W', 550000.00),
(9, 16, N'Tai nghe AirPods Pro (Thế hệ 2)', 5290000.00),
(10, 10, N'iPhone 15 Pro', 28990000.00),
(11, 10, N'iPhone 16e', 25990000.00),
(12, 10, N'iPhone 17 Pro', 35990000.00),
(13, 10, N'iPhone 17', 28990000.00),
(14, 10, N'iPhone 14', 17490000.00),
(15, 10, N'iPhone 14 Pro', 24990000.00),
(16, 10, N'iPhone 14 Pro Max', 26990000.00),
(17, 10, N'iPhone 16', 29990000.00);

INSERT INTO Belong(OrderID, OrderItemID) VALUES
(1001, 1), (1002, 3), (1003, 4), (1004, 6), (1005, 2), (1006, 17), (1007, 11), (1008, 12), (1009, 13), (1010, 14),
(1011, 15), (1012, 3), (1013, 16), (1014, 17), (1015, 1), (1016, 5), (1017, 4), (1018, 17), (1019, 2), (1020, 4),
(1021, 2), (1022, 7), (1023, 8), (1024, 9), (1025, 5), (1026, 13), (1027, 5), (1028, 1), (1029, 13), (1030, 6),
(1031, 17), (1032, 13), (1033, 7), (1034, 14), (1035, 15), (1036, 16), (1037, 13), (1038, 9), (1039, 10), (1040, 10);

--GUEST--
INSERT INTO Guest (ID0, Fullname, Email) VALUES
(01, N'Nguyễn Văn An', N'nguyenvanan@gmail.com'),
(02, N'Trần Thị Bình', N'tranthibinh@yahoo.com'),
(03, N'Lê Văn Cường', N'levancuong@hotmail.com'),
(04, N'Phạm Thị Duyên', N'phamthiduyen@gmail.com'),
(05, N'Hoàng Văn Em', N'hoangvanem@yahoo.com'),
(06, N'Đỗ Thị Phương', N'dothiphuong@hotmail.com'),
(07, N'Nguyễn Thị Gấm', N'nguyenthigam@gmail.com'),
(08, N'Trần Văn Hùng', N'tranvanhung@yahoo.com'),
(09, N'Lê Thị Yến', N'lethiyen@hotmail.com'),
(010, N'Phạm Văn Kiên', N'phamvankien@gmail.com');


--GUEST SEND--
INSERT INTO GuestSend (ID0, MessageID) VALUES 
(01, 0),
(02, 16),
(03, 29), (03, 30), 
(04, 26), (04, 25),
(05, 52),
(06, 53),
(08, 40),
(09, 45), (09, 55),
(010, 58);

--GUEST CREATE--
INSERT INTO GuestCreate (ID0, FormID) VALUES
(01, 40), (01, 41), 
(02, 55), (02, 25),
(03, 42), (04, 27), (05, 32), (06, 30);
--FAQ--
INSERT INTO FAQ (ID, Category, Question, Answer) VALUES
-- ===== SẢN PHẨM =====
(1, N'iphone 15 Series', N'iPhone 15 Pro Max có mấy màu?', N'Hiện có 4 màu: Titan tự nhiên, Titan xanh, Titan trắng và Titan đen.'),
(2, N'iphone 15 Series', N'iPhone 15 thường khác gì iPhone 15 Pro?', N'iPhone 15 Pro dùng khung titan, chip A17 Pro và có camera tele; iPhone 15 thường dùng chip A16 và khung nhôm.'),
(3, N'iphone 14 Series', N'iPhone 14 có hỗ trợ 5G không?', N'Có, toàn bộ dòng iPhone 14 đều hỗ trợ 5G tại Việt Nam.'),
(4, N'iphone 16 Series', N'iPhone 16 có chống nước không?', N'Có, đạt chuẩn IP68, chịu được độ sâu 6m trong 30 phút.'),
(5, N'iphone 17 Series', N'iPhone 17 có tín năng gì mới so với các series khác?', N'Có, camera có thể zoom tới 8x, màn hình 120Hz, thiết kế bằng khung nhôm với các màu sắc tươi mới.');
-- ===== BẢO HÀNH / DỊCH VỤ =====
INSERT INTO FAQ (ID, Category, Question, Answer) VALUES
(6, N'Bảo hành', N'iPhone được bảo hành bao lâu?', N'Tất cả sản phẩm iPhone chính hãng được bảo hành 12 tháng theo chính sách của Apple Việt Nam.'),
(7, N'Bảo hành', N'Tôi có thể kiểm tra thời hạn bảo hành ở đâu?', N'Bạn có thể kiểm tra tại trang web https://checkcoverage.apple.com bằng số serial của máy.'),
(8, N'Bảo hành', N'Nếu máy bị vào nước có được bảo hành không?', N'Không, Apple không bảo hành cho hư hại do nước hoặc rơi vỡ.'),
(9, N'Sửa chữa', N'Thay pin chính hãng mất bao lâu?', N'Thông thường từ 1-2 giờ nếu có sẵn linh kiện tại trung tâm bảo hành.'),
(10, N'Sửa chữa', N'Điện thoại không lên nguồn?', N'Vui lòng đưa đến chi nhánh gần nhất để được hỗ trợ sữa chữa hoặc bạn có thể thực hiện bấm tổ hợp phím tắt (nút nguồn + nút giảm âm lượng) để thử cài đặt lại điện thoại');
-- ===== CHÍNH SÁCH & HỖ TRỢ =====
INSERT INTO FAQ (ID, Category, Question, Answer) VALUES
(11, N'Hỗ trợ thanh toán', N'Cửa hàng có hỗ trợ trả góp không?', N'Có, hỗ trợ trả góp 0% qua thẻ tín dụng của nhiều ngân hàng.'),
(12, N'Hỗ trợ thanh toán', N'Tôi có thể thanh toán khi nhận hàng không?', N'Có, hỗ trợ thanh toán COD (nhận hàng rồi trả tiền).'),
(13, N'Chính sách đổi trả', N'Tôi có thể đổi trả hàng trong bao lâu?', N'Bạn có thể đổi trả trong 15 ngày nếu sản phẩm lỗi do nhà sản xuất.'),
(14, N'Chính sách đổi trả', N'Hàng lỗi do người dùng có được đổi không?', N'Không, chỉ sản phẩm lỗi kỹ thuật mới được đổi theo quy định.'),
(15, N'Hỗ trợ đặt hàng', N'Làm sao để liên hệ trung tâm chăm sóc khách hàng?', N'Bạn có thể gọi hotline 1800-1122 (miễn phí) hoặc chat trực tiếp trên website.'),
(16, N'Hỗ trợ thanh toán', N'Tôi muốn nhận hóa đơn điện tử thì làm sao?', N'Hóa đơn điện tử sẽ được gửi qua email sau khi đơn hàng được giao thành công.');

--BelongTo--
-- ===== SẢN PHẨM =====
INSERT INTO BelongTo (FAQ_ID, ClassifyTableID) VALUES
(1, 12),  -- iPhone 15 Pro Max có mấy màu? → iPhone 15 Series
(2, 12),  -- iPhone 15 thường khác gì iPhone 15 Pro? → iPhone 15 Series
(3, 11),  -- iPhone 14 có hỗ trợ 5G không? → iPhone 14 Series
(4, 13),  -- iPhone 16 có chống nước không? → iPhone 16 Series
(5, 14);   -- iPhone 17 có gì mới? -> iPhone 17 Series
-- ===== BẢO HÀNH / DỊCH VỤ =====
INSERT INTO BelongTo (FAQ_ID, ClassifyTableID) VALUES
(6, 21), -- iPhone được bảo hành bao lâu? → Bảo hành
(7, 21), -- Kiểm tra thời hạn bảo hành → Bảo hành
(8, 21), -- Vào nước có được bảo hành không? → Bảo hành
(9, 22), -- Thay pin chính hãng mất bao lâu? → Sửa chữa
(10, 22); -- điện thoại không lên nguồn
-- ===== CHÍNH SÁCH & HỖ TRỢ =====
INSERT INTO BelongTo (FAQ_ID, ClassifyTableID) VALUES
(11, 32), -- Trả góp 0% → Hướng dẫn thanh toán
(12, 32), -- Thanh toán khi nhận hàng → Hướng dẫn thanh toán
(13, 31), -- Đổi trả trong bao lâu → Chính sách đổi trả
(14, 31), -- Hàng lỗi do người dùng → Chính sách đổi trả
(15, 33),  -- Liên hệ trung tâm CSKH → Chính sách & hỗ trợ
(16, 32);  -- Hóa đơn điện tử → Chính sách & hỗ trợ

INSERT INTO Classify (FormID, TableID) VALUES
(1, 11), (2, 11), (3, 11), (4, 11), (5, 11),
(6, 12), (7, 12), (8, 12), (9, 12), (10, 12),
(11, 13), (12, 13), (13, 13), (14, 13), (15, 13),
(16, 14), (17, 14), (18, 14), (19, 14), (20, 14),
(21, 15), (22, 15), (23, 15), (24, 15), (25, 15),
(26, 21), (27, 21), (28, 21), (29, 21), (30, 21),
(31, 22), (32, 22), (33, 22), (34, 22), (35, 22),
(36, 31), (37, 31), (38, 31), (39, 31), (40, 31),
(41, 31), (42, 31), (43, 31), (44, 31), (45, 31),
(46, 32), (47, 32), (48, 32), (49, 32), (50, 32),
(51, 33), (52, 33), (53, 33), (54, 33), (55, 33);



