
export const Sessions = {}; 
const TIMEOUT_MS = 10 * 60 * 1000; 
export function createSession(sessionId) {
    if (!Sessions[sessionId]) {
        Sessions[sessionId] = {
            customerType: "guest",
            agentId: null,
            lastActivity: Date.now(),
            timeout: null,
            messages: []
        };
    }
    resetTimeout(sessionId);
    return Sessions[sessionId];
}

export function attachAgent(sessionId, agentId) {
    if (!Sessions[sessionId]) return;
    Sessions[sessionId].agentId = agentId;
    Sessions[sessionId].lastActivity = Date.now();
    resetTimeout(sessionId);
}

export function addMessage(sessionId, from, msg) {
    if (!Sessions[sessionId]) return;
    Sessions[sessionId].messages.push({ from, msg, time: Date.now() });
    Sessions[sessionId].lastActivity = Date.now();
    resetTimeout(sessionId);
}

export function resetTimeout(sessionId) {
    if (!Sessions[sessionId]) return;

    if (Sessions[sessionId].timeout) clearTimeout(Sessions[sessionId].timeout);

    // Tự động đóng phiên sau 10 phút không hoạt động
    Sessions[sessionId].timeout = setTimeout(() => {
        console.log(`[SESSION CLOSED] ${sessionId} inactive > 10 minutes`);
        delete Sessions[sessionId];
    }, TIMEOUT_MS);
}

export function endSession(sessionId) {
    if (Sessions[sessionId]?.timeout) clearTimeout(Sessions[sessionId].timeout);
    delete Sessions[sessionId];
}

export function getSession(sessionId) {
    return Sessions[sessionId] || null;
}
