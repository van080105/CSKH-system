
import { getPool } from "../config/db.js";

export async function loadTopics() {
    const conn = await getPool();
    const result = await conn.request().query(`
        SELECT TableID, NameTable, ParentTableID
        FROM ClassifyTable
        WHERE ParentTableID IN (1,2,3)
    `);
    return result.recordset;
}

export async function loadAgentsWithTopics() {
    const conn = await getPool();

    const agentsRes = await conn.request().query(`
        SELECT 
            ag.AgentID,
            acc.Fullname,
            ag.Stt
        FROM Agent ag
        JOIN Account acc ON acc.ID = ag.AgentID
        WHERE ag.Stt IS NULL OR ag.Stt <> N'Không hoạt động'
    `);


    const assignTopicRes = await conn.request().query(`
        SELECT a.AgentID, a.TableID
        FROM Assign a
        JOIN ClassifyTable c ON c.TableID = a.TableID
        WHERE c.ParentTableID IN (1,2,3)
    `);

    const topicMap = {};
    assignTopicRes.recordset.forEach(r => {
        if (!topicMap[r.AgentID]) topicMap[r.AgentID] = [];
        topicMap[r.AgentID].push(r.TableID);
    });

    const loadRes = await conn.request().query(`
        SELECT AgentID, COUNT(*) AS LoadCount
        FROM ReceiveForm
        GROUP BY AgentID
    `);

    const loadMap = {};
    loadRes.recordset.forEach(r => {
        loadMap[r.AgentID] = r.LoadCount;
    });

    const levelRes = await conn.request().query(`
        SELECT a.AgentID, c.TableID AS LevelID, c.NameTable AS LevelName
        FROM Assign a
        JOIN ClassifyTable c ON c.TableID = a.TableID
        WHERE c.ParentTableID = 5;
    `);

    const levelMap = {};
    levelRes.recordset.forEach(r => {
        if (!levelMap[r.AgentID] || r.LevelID > levelMap[r.AgentID].LevelID) {
            levelMap[r.AgentID] = r;
        }
    });


    return agentsRes.recordset.map(a => ({
        id: a.AgentID,
        name: a.Fullname,
        topics: topicMap[a.AgentID] || [],
        load: loadMap[a.AgentID] || 0,
        levelID: levelMap[a.AgentID]?.LevelID || 51,
        levelName: levelMap[a.AgentID]?.LevelName || "Đồng"
    }));
}
