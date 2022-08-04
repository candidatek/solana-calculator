import { Calculator } from './../target/types/calculator';
// import * as anchor from "@project-serum/anchor";
// import { Program } from "@project-serum/anchor";
// import { Calculator } from "../target/types/calculator";

// describe("calculator", () => {
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env());

//   const program = anchor.workspace.Calculator as Program<Calculator>;

//   it("Is initialized!", async () => {
//     // Add your test here.
//     const tx = await program.methods.initialize().rpc();
//     console.log("Your transaction signature", tx);
//   });
// });

const assert = require('assert')
const anchor = require('@project-serum/anchor')
const {SystemProgram} = anchor.web3;

describe('mycalculator app', () => {
    const provider =  anchor.AnchorProvider.local()
    anchor.setProvider(provider);

    const calculator = anchor.web3.Keypair.generate()
    console.log(anchor.workspace)
    const program = anchor.workspace.Calculator;

    it('Creates a calculator' , async() => {
        await program.rpc.create("Solana program", {
            accounts:{
                calculator: calculator.publicKey,
                user: provider.wallet.publicKey,
                systemProgram: SystemProgram.programId
            },
            signers:[calculator]
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.greeting === 'Solana program')
    })
    it('Adds Two numbers' , async() => {
        await program.rpc.add(new anchor.BN(3), new anchor.BN(4), {
            accounts:{
                calculator: calculator.publicKey,
            },
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(7)))
    })
    it('Substracts two numbers' , async() => {
        await program.rpc.substract(new anchor.BN(10), new anchor.BN(3), {
            accounts:{
                calculator: calculator.publicKey,
            },
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(7)))
    })
    it('Multiplies two numbers' , async() => {
        await program.rpc.multiply(new anchor.BN(10), new anchor.BN(3), {
            accounts:{
                calculator: calculator.publicKey,
            },
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(30)))
    })
    it('Divides two numbers' , async() => {
        await program.rpc.divide(new anchor.BN(10), new anchor.BN(3), {
            accounts:{
                calculator: calculator.publicKey,
            },
        })
        const account = await program.account.calculator.fetch(calculator.publicKey);
        assert.ok(account.result.eq(new anchor.BN(3)))
        assert.ok(account.remainder.eq(new anchor.BN(1)))
    })
})