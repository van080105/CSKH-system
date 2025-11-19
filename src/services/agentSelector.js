
import { loadAgentsWithTopics } from "./agentRepository.js";

export async function chooseBestAgent(topicId) {

    const agents = await loadAgentsWithTopics();

    const eligible = agents.filter(a => a.topics.includes(topicId));

    if (eligible.length === 0) return null;

    eligible.sort((a, b) => {
        if (a.load !== b.load) return a.load - b.load;
        return b.levelID - a.levelID;
    });

    return eligible[0];
}
