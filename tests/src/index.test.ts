import {expect} from 'chai';
import {checkJSRunner,checkpyRunner,checkCRunner,checkgoRunner,checkCppRunner,checkCaching1,checkCaching2} from './runners'



describe('Testing all runners',function(){
    it("Checking JS RUNNER",async ()=>{
        const prom=await checkJSRunner();
        console.log(prom);
        expect(prom.output).to.be.equal("Ashish\n");
    });
    it("Checking Python RUNNER",async ()=>{
        const prom=await checkpyRunner();
        console.log(prom);
        expect(prom.output).to.be.equal("Ashish\n");
    });
    it("Checking C RUNNER",async ()=>{
        const prom=await checkCRunner();
        console.log(prom);
        expect(prom.output).to.be.equal("Ashish 5");
    })
    it("Checking go RUNNER",async ()=>{
        const prom=await checkgoRunner();
        console.log(prom);
        expect(prom.output).to.be.equal("Ashish");
    })
    it("Checking cpp RUNNER",async ()=>{
        const prom=await checkCppRunner();
        console.log(prom);
        expect(prom.output).to.be.equal("10");
    })
    it("Checking caching with python RUNNER",async ()=>{
        const prom=await checkCaching1();
        console.log(prom);
        expect(prom.output).to.be.equal("Ashish\n");
        this.timeout(100);
    })
    it("Checking caching with cpp RUNNER",async ()=>{
        const prom=await checkCaching2();
        console.log(prom);
        expect(prom.output).to.be.equal("10");
        this.timeout(100);
    })
})

