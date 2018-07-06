"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = require("events");
var get_1 = require("./get");
var settings_1 = __importDefault(require("../constants/settings"));
function live(endpoint, params) {
    var _this = this;
    var results = [], keys = [], emitter = new events_1.EventEmitter();
    function fetch() {
        return __awaiter(this, void 0, void 0, function () {
            var incoming, newItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, get_1.get(endpoint, params)];
                    case 1:
                        incoming = _a.sent(), newItems = incoming.filter(function (e, i) { return keys.indexOf(JSON.stringify(e)) === -1; });
                        newItems.forEach(function (item) { return emitter.emit("item", item); });
                        results = incoming;
                        keys = incoming.map(function (a) { return JSON.stringify(a); });
                        emitter.emit("fetch", newItems);
                        return [2, true];
                }
            });
        });
    }
    var poll = setInterval(fetch, settings_1.default.live.pollTime);
    setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!params.prefetch)
                        return [2];
                    return [4, get_1.get(endpoint, params)];
                case 1:
                    (results = _a.sent()),
                        (keys = results.map(function (a) { return JSON.stringify(a); }));
                    emitter.emit("prefetch", results);
                    return [2];
            }
        });
    }); }, 0);
    emitter.on("close", function () { return clearInterval(poll); });
    return Object.assign(emitter, {
        close: function () {
            emitter.emit("close");
        },
        params: function (p) {
            return (params = Object.assign(params, p));
        },
        current: function () {
            return results;
        },
        fetch: fetch
    });
}
exports.live = live;