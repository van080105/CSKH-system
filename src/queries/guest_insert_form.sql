DECLARE @tableID INT;
INSERT INTO Form (FormID, Title, Content, Stt, Typ, SentDate) values (@formID,@title,@content,N'Chưa trả lời',@type,GETDATE()) ;
SELECT @tableID = TableID from ClassifyTable where NameTable = @type;
INSERT INTO Classify (FormID,TableID) values (@formID, @tableID);
