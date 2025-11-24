import { getPool } from '../../config/db.js';
import fs from 'fs';
import sql from 'mssql';
const get_order = async(req,res) =>
{ try{
  const customerID = req.user.id;
  if (!customerID)
  {
    return res.status(400).json({message:'CustomerID is required'});
  }
  const pool = await getPool()
  const result = await pool.request().input('CustomerID',sql.Int,customerID).query(`select o.OrderID, o.OrderDate, o.Stt, o.DeliveryAddress, oi.OrderItemID, oi.quantity, oi.ProductName, oi.UnitPrice, sum(quantity*UnitPrice) as OrderPrice
from Orders o join Belong b on o.OrderID = b.OrderID join OrderItem oi on b.OrderItemID = oi.OrderItemID
where CustomerID = @CustomerID
group by o.OrderID, o.OrderDate, o.Stt, o.DeliveryAddress, oi.OrderItemID, oi.quantity, oi.ProductName, oi.UnitPrice`)
  if (result.recordset.length === 0)
  {
    return res.status(404).json({message:'Customer not found'});
  }
  res.json(result.recordset[0]);}
catch (err)
{ console.error('Error in get_form controller:', err.message);
  res.status(500).json({ message:'Internal Server Error' })}

}
const post_order = async(req, res) =>
{ const customerID = req.user.id
  const { address, items} = req.body
  if ( !customerID || !items || !address )
  {
    res.status(400).json({message: 'Some fields are missing'})
  }
  const pool = await getPool()
  const getId = await pool.request().query(`select max(OrderID) as orderid from Orders;
    select max(OrderItemID) as orderitemID from OrderItem`)
  const orderid = getId.recordsets[0][0].orderid+2
  let orderitemID = getId.recordsets[1][0].orderitemID+2
  console.log(orderitemID)
  const transaction = new sql.Transaction(pool);
  try {
    await transaction.begin();

    const orderReq = transaction.request();
    await orderReq
      .input('OrderID', sql.Int, orderid)
      .input('CustomerID', sql.Int, customerID)
      .input('address', sql.NVarChar, address)
      .query(`INSERT INTO Orders(OrderID,CustomerID,OrderDate,Stt,DeliveryAddress)
              VALUES(@OrderID,@CustomerID,GETDATE(),'Đang xử lý',@address)`);
    for (const item of items) {
      const itemReq = transaction.request();
      orderitemID = orderitemID+1;
      await itemReq
        .input('OrderItemID', sql.Int, orderitemID)
        .input('OrderID', sql.Int, orderid)
        .input('Quantity', sql.Int, item.quantity)
        .input('ProductName', sql.NVarChar, item.productName)
        .input('UnitPrice', sql.Decimal(18,2), item.Price)
        .query(`INSERT INTO OrderItem(OrderItemID,Quantity,ProductName,UnitPrice)
                VALUES(@OrderItemID,@Quantity,@ProductName,@UnitPrice);
                INSERT INTO Belong(OrderID,OrderItemID) VALUES(@OrderID,@OrderItemID)`);
    }

    await transaction.commit();
    res.status(201).json({ message: 'Order created successfully', orderid });
  } catch (err) {
    try {
      await transaction.rollback(); // rollback chỉ khi tất cả request đã hoàn thành
    } catch (rollbackErr) {
      console.error('Rollback failed:', rollbackErr);
    }
    console.error('Error creating order:', err);
    res.status(500).json({ message: 'Error creating order', error: err.message });
  }

}
export default {get_order, post_order}