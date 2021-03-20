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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkgoRunner = exports.checkCRunner = exports.checkpyRunner = exports.checkJSRunner = void 0;
const axios_1 = __importDefault(require("axios"));
function checkJSRunner() {
    return __awaiter(this, void 0, void 0, function* () {
        const language = "js";
        const code = "console.log(\"Ashish\")";
        const input = "";
        const prom = yield axios_1.default({
            url: 'http://localhost:3000/api/newcode',
            method: 'POST',
            data: {
                input, code, language, forcerun: true
            }
        });
        return prom.data;
    });
}
exports.checkJSRunner = checkJSRunner;
function checkpyRunner() {
    return __awaiter(this, void 0, void 0, function* () {
        const language = "py";
        const code = "print(\"Ashish\")";
        const input = "";
        const prom = yield axios_1.default({
            url: 'http://localhost:3000/api/newcode',
            method: 'POST',
            data: {
                input, code, language, forcerun: true
            }
        });
        return prom.data;
    });
}
exports.checkpyRunner = checkpyRunner;
function checkCRunner() {
    return __awaiter(this, void 0, void 0, function* () {
        const language = "c";
        const code = "#include<stdio.h>\nint main(){\n  int a; scanf(\"%d\",&a); printf(\"Ashish %d\",a);}";
        const input = "5";
        const prom = yield axios_1.default({
            url: 'http://localhost:3000/api/newcode',
            method: 'POST',
            data: {
                input, code, language, forcerun: true
            }
        });
        return prom.data;
    });
}
exports.checkCRunner = checkCRunner;
function checkgoRunner() {
    return __awaiter(this, void 0, void 0, function* () {
        const language = "go";
        const code = "package main \n import \"fmt\" \n func main(){ \n var s string \nfmt.Scanf(\"%s\",&s) \n fmt.Printf(\"%s\",s)   \n }";
        const input = "Ashish";
        const prom = yield axios_1.default({
            url: 'http://localhost:3000/api/newcode',
            method: 'POST',
            data: {
                input, code, language, forcerun: true
            }
        });
        return prom.data;
    });
}
exports.checkgoRunner = checkgoRunner;