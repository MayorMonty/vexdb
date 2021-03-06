"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passableParams = exports.endpoints = exports.SkillsType = void 0;
var SkillsType;
(function (SkillsType) {
    SkillsType[SkillsType["Driver"] = 0] = "Driver";
    SkillsType[SkillsType["Programming"] = 1] = "Programming";
    SkillsType[SkillsType["Robot"] = 2] = "Robot";
})(SkillsType = exports.SkillsType || (exports.SkillsType = {}));
exports.endpoints = [
    "events",
    "teams",
    "matches",
    "rankings",
    "season_rankings",
    "awards",
    "skills",
];
exports.passableParams = {
    events: [
        "sku",
        "program",
        "date",
        "season",
        "city",
        "region",
        "team",
        "country",
        "status",
        "limit_number",
        "limit_start",
        "nodata",
    ],
    teams: [
        "team",
        "program",
        "organisation",
        "city",
        "region",
        "country",
        "grade",
        "is_registered",
        "sku",
        "limit_number",
        "limit_start",
        "nodata",
    ],
    matches: [
        "sku",
        "division",
        "team",
        "round",
        "instance",
        "matchnum",
        "scheduled",
        "field",
        "scored",
        "season",
        "limit_number",
        "limit_start",
        "nodata",
    ],
    rankings: [
        "sku",
        "division",
        "team",
        "rank",
        "season",
        "limit_number",
        "limit_start",
        "nodata",
    ],
    season_rankings: [
        "program",
        "season",
        "team",
        "vrating_rank",
        "limit_number",
        "limit_start",
        "nodata",
    ],
    awards: [
        "sku",
        "name",
        "team",
        "season",
        "limit_number",
        "limit_start",
        "nodata",
    ],
    skills: [
        "sku",
        "program",
        "type",
        "team",
        "season",
        "rank",
        "season_rank",
        "limit_number",
        "limit_start",
        "nodata",
    ],
};
