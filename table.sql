CREATE DATABASE CSKH
GO
USE CSKH
GO

-- Bảng Notification
CREATE TABLE Notification (
    NoID INT PRIMARY KEY,
    Content NVARCHAR(255),
    SentDate DATETIME
);

-- Bảng Account
CREATE TABLE Account (
    ID INT PRIMARY KEY,
    Password NVARCHAR(100),
    Email NVARCHAR(100),
    Fullname NVARCHAR(100),
    Address NVARCHAR(200)
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
CREATE TABLE Admin (
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
    Title NVARCHAR(100),
    Content NVARCHAR(255),
    Status NVARCHAR(50),
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
    Content NVARCHAR(255),
    SentDate DATETIME,
    ReceiverID VARCHAR(5),
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
    Status NVARCHAR(50),
    ResponsibleField NVARCHAR(100),
    FOREIGN KEY (AgentID) REFERENCES Account(ID),
	FOREIGN KEY (ReceiverID) REFERENCES Receiver(ReceiverID)
);

-- Bảng ClassifyTable
CREATE TABLE ClassifyTable (
    TableID INT PRIMARY KEY,
    NameTable NVARCHAR(100),
    Category NVARCHAR(100),
    ChildTableID INT,
	FOREIGN KEY (ChildTableID) REFERENCES ClassifyTable(TableID)
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
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID),
    FOREIGN KEY (Vers) REFERENCES Chatbot(Vers)
);

-- Bảng Order
CREATE TABLE Orders (
    OrderID INT PRIMARY KEY,
    CustomerID INT,
    OrderDate DATETIME,
    Status NVARCHAR(50),
    DeliveryAddress NVARCHAR(200),
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

-- Bảng OrderItem
CREATE TABLE OrderItem (
    OrderItemID INT PRIMARY KEY,
    OrderID INT,
    Quantity INT,
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
