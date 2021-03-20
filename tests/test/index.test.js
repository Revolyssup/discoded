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
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const runners_1 = require("./runners");
describe('Testing all runners', function () {
    it("Checking JS RUNNER", () => __awaiter(this, void 0, void 0, function* () {
        const prom = yield runners_1.checkJSRunner();
        console.log(prom);
        chai_1.expect(prom.output).to.be.equal("Ashish\n");
    }));
    // it("Checking Python RUNNER",async ()=>{
    //     const prom=await checkpyRunner();
    //     console.log(prom);
    //     expect(prom.output).to.be.equal("Ashish\n");
    // });
    it("Checking C RUNNER", () => __awaiter(this, void 0, void 0, function* () {
        const prom = yield runners_1.checkCRunner();
        console.log(prom);
        chai_1.expect(prom.output).to.be.equal("Ashish 5");
    }));
    it("Checking go RUNNER", () => __awaiter(this, void 0, void 0, function* () {
        const prom = yield runners_1.checkgoRunner();
        console.log(prom);
        chai_1.expect(prom.output).to.be.equal("Ashish");
    }));
    it("Checking cpp RUNNER", () => __awaiter(this, void 0, void 0, function* () {
        const prom = yield runners_1.checkCppRunner();
        console.log(prom);
        chai_1.expect(prom.output).to.be.equal("10");
    }));
    it("Checking caching with python RUNNER", () => __awaiter(this, void 0, void 0, function* () {
        const prom = yield runners_1.checkCaching1();
        console.log(prom);
        chai_1.expect(prom.output).to.be.equal("Ashish\n");
        this.timeout(100);
    }));
    it("Checking caching with cpp RUNNER", () => __awaiter(this, void 0, void 0, function* () {
        const prom = yield runners_1.checkCaching2();
        console.log(prom);
        chai_1.expect(prom.output).to.be.equal("10");
        this.timeout(100);
    }));
});
