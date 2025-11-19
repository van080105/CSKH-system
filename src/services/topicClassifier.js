
import { loadTopics } from "./agentRepository.js";

export async function classifyTopicFromMessage(message) {
    const msg = message.toLowerCase();
    const topics = await loadTopics();

    function toInt(value) {
        const n = Number(value);
        return Number.isInteger(n) ? n : null;
    }

    const msgWords = msg.split(/\s+/);

    const serviceTopics = topics.filter(
        (t) => t.ParentTableID !== null && t.ParentTableID !== 1 && t.ParentTableID !== 5
    );

    for (const t of serviceTopics) {
        const nameLower = t.NameTable.toLowerCase();
        if (msg.includes(nameLower)) {
            return toInt(t.TableID);
        }
    }

    let bestService = null;
    let bestServiceScore = 0;

    for (const t of serviceTopics) {
        const topicWords = t.NameTable.toLowerCase().split(/\s+/);
        const matchCount = topicWords.filter((w) => msgWords.includes(w)).length;

        if (matchCount > bestServiceScore) {
            bestServiceScore = matchCount;
            bestService = toInt(t.TableID);
        }
    }

    if (bestService !== null && bestServiceScore > 0) {
        return bestService;
    }


    for (const t of topics) {
        const nameLower = t.NameTable.toLowerCase();
        if (msg.includes(nameLower)) {
            return toInt(t.TableID);
        }
    }

    let bestMatch = null;
    let bestScore = 0;

    for (const t of topics) {
        const topicWords = t.NameTable.toLowerCase().split(/\s+/);
        const matchCount = topicWords.filter((w) => msgWords.includes(w)).length;

        if (matchCount > bestScore) {
            bestScore = matchCount;
            bestMatch = toInt(t.TableID);
        }
    }

    if (bestMatch !== null && bestScore > 0) {
        return bestMatch;
    }


    return null;
}
