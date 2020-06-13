"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
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
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = __importDefault(require("./request"));
var RequestObjects_1 = require("../constants/RequestObjects");
function get(endpoint, params) {
    return __awaiter(this, void 0, void 0, function () {
        var endpoints, passable, raw, filter, _a, _b, _c, key, value, response, final, _loop_1, _d, _e, result, e_1_1;
        var e_2, _f, e_1, _g;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    endpoints = Object.keys(RequestObjects_1.passableParams);
                    if (!endpoints.includes(endpoint)) {
                        return [2, Promise.reject(new Error("Endpoint \"" + endpoint + "\" is not valid. Valid endpoints are " + endpoints.join(", ")))];
                    }
                    passable = RequestObjects_1.passableParams[endpoint];
                    raw = {};
                    filter = [];
                    try {
                        for (_a = __values(Object.entries(params)), _b = _a.next(); !_b.done; _b = _a.next()) {
                            _c = __read(_b.value, 2), key = _c[0], value = _c[1];
                            if (passable.includes(key) && typeof value !== "function") {
                                raw[key] = value;
                            }
                            else {
                                filter.push([key, value]);
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_b && !_b.done && (_f = _a.return)) _f.call(_a);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    return [4, request_1.default(endpoint, raw)];
                case 1:
                    response = _h.sent();
                    if (!response.status) {
                        return [2, Promise.reject(response)];
                    }
                    final = [];
                    _loop_1 = function (result) {
                        var accept;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4, Promise.all(filter.map(function (_a) {
                                        var _b = __read(_a, 2), key = _b[0], fn = _b[1];
                                        return fn(result[key], result);
                                    }))];
                                case 1:
                                    accept = _a.sent();
                                    if (accept.every(function (r) { return r; })) {
                                        final.push(result);
                                    }
                                    return [2];
                            }
                        });
                    };
                    _h.label = 2;
                case 2:
                    _h.trys.push([2, 7, 8, 9]);
                    _d = __values(response.result), _e = _d.next();
                    _h.label = 3;
                case 3:
                    if (!!_e.done) return [3, 6];
                    result = _e.value;
                    return [5, _loop_1(result)];
                case 4:
                    _h.sent();
                    _h.label = 5;
                case 5:
                    _e = _d.next();
                    return [3, 3];
                case 6: return [3, 9];
                case 7:
                    e_1_1 = _h.sent();
                    e_1 = { error: e_1_1 };
                    return [3, 9];
                case 8:
                    try {
                        if (_e && !_e.done && (_g = _d.return)) _g.call(_d);
                    }
                    finally { if (e_1) throw e_1.error; }
                    return [7];
                case 9: return [2, final];
            }
        });
    });
}
exports.default = get;
