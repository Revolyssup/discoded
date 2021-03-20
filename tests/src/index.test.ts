import {expect} from 'chai';
import {checkJSRunner,checkpyRunner,checkCRunner,checkgoRunner} from './runners'



describe('Testing all runners',()=>{
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
})

