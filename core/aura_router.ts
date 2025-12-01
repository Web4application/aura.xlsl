import { EngineMap } from "./aura_engine_map";
import { AuraError } from "./aura_error";

export function routeQuery(query: string) {
  const lower = query.toLowerCase();

  for (const [namespace, engine] of Object.entries(EngineMap)) {
    if (lower.startsWith(namespace)) {
      return engine;
    }
  }

  // Auto-detect when namespace is not explicitly given
  if (/integrate|solve|derivative|limit|matrix|algebra|calc/.test(lower))
    return EngineMap[".xlmath"];

  if (/print|function|class|var|const|let|import/.test(lower))
    return EngineMap[".xlcode"];

  if (/csv|table|data|row|column|df|dataset/.test(lower))
    return EngineMap[".xldata"];

  if (/quantum|qubit|gate|superposition|circuit/.test(lower))
    return EngineMap[".xlquantum"];

  if (/simulate|gpu|cpu|parallel/.test(lower))
    return EngineMap[".xlcompute"];

  return new AuraError("Cannot determine engine for query: " + query);
}
