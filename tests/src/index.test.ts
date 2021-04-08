import {expect} from 'chai';
import {checkJSRunner,checkpyRunner,checkCRunner,checkgoRunner,checkCppRunner,checkCaching1,checkCaching2,checkTimeout} from './runners'



describe('Testing all runners',function(){
    it("Checking JS RUNNER",async ()=>{
        const prom=await checkJSRunner();
        expect(prom.output).to.be.equal("Ashish\n");
    });
    it("Checking Python RUNNER",async ()=>{
        const prom=await checkpyRunner();
        expect(prom.output).to.be.equal("Ashish\n");
    });
    it("Checking C RUNNER",async ()=>{
        const prom=await checkCRunner();
        expect(prom.output).to.be.equal("Ashish 5");
    })
    it("Checking go RUNNER",async ()=>{
        const prom=await checkgoRunner();
        expect(prom.output).to.be.equal("Ashish");
    })
    it("Checking cpp RUNNER",async ()=>{
        const prom=await checkCppRunner();
        expect(prom.output).to.be.equal("10");
    })
})

describe("Testing caching on mongodb and redis",function(){
    it("Checking caching with python RUNNER",async ()=>{
        const prom=await checkCaching1();
        expect(prom.output).to.be.equal("Ashish\n");
    })
    it("Checking caching with cpp RUNNER",async ()=>{
        const prom=await checkCaching2();
        expect(prom.output).to.be.equal("10");
    })
})

describe("Testing Timeouts",function(){
    it("Checking caching with cpp RUNNER",async ()=>{
        const prom=await checkTimeout();
        expect(prom.error).to.be.equal("Time limit exceeded");
    })
})