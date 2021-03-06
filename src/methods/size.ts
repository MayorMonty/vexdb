import get from "./get";

import {
  TeamsRequestObject,
  EventsRequestObject,
  MatchesRequestObject,
  RankingsRequestObject,
  SeasonRankingsRequestObject,
  AwardsRequestObject,
  SkillsRequestObject,
} from "../constants/RequestObjects";

export default async function size(
  endpoint: "teams",
  params: TeamsRequestObject
): Promise<number>;

export default async function size(
  endpoint: "events",
  params: EventsRequestObject
): Promise<number>;

export default async function size(
  endpoint: "matches",
  params: MatchesRequestObject
): Promise<number>;

export default async function size(
  endpoint: "rankings",
  params: RankingsRequestObject
): Promise<number>;

export default async function size(
  endpoint: "season_rankings",
  params: SeasonRankingsRequestObject
): Promise<number>;

export default async function size(
  endpoint: "awards",
  params: AwardsRequestObject
): Promise<number>;

export default async function size(
  endpoint: "skills",
  params: SkillsRequestObject
): Promise<number>;

export default function size(endpoint, params) {
  return get(endpoint, { ...params, nodata: true }).then((r) => r.length);
}
