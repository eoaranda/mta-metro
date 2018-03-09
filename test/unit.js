"use strict";
const chai = require('chai'),
    expect = chai.expect;

const mm = require('../lib');
const mta = new mm.mtaMetro('<YOU-API-KEY>');

describe('MTA API ', function() {  
    this.timeout(5000); // How long to wait for a response (ms)

    describe('#Load MTA Dictionary', function() {
        it('Should load Dictionary data for MN, LIRR', async () => { // no done
           expect(mm.dic).to.have.property('MN');
           expect(mm.dic.MN).to.have.property('LINES');
           expect(mm.dic.MN).to.have.property('STATIONS');
           expect(mm.dic).to.have.property('LIRR');
           expect(mm.dic.LIRR).to.have.property('LINES');
           expect(mm.dic.LIRR).to.have.property('STATIONS');
        });
    });


    describe('#Load mtaMetro Objects', function() {

        it('Should fail if not key', function () {
            expect(() => { new mm.mtaMetro(); }).to.throw();
        });

        it('Should return an object', function () {
            expect(mta).to.be.an.instanceof( Object );
        });

        it('Status Data prototype should exist', function () {
            expect(mta.statusData).to.be.ok;
        });

        it('Status Data prototype should return something', async () => {
            const data = await mta.statusData();
            expect(data).to.have.length.above(100);
        });

        it('Status prototype should exist', function () {
            expect(mta.status).to.be.ok;
        });

        it('Schedule prototype should exist', function () {
            expect(mta.schedule).to.be.ok;
        });

    });

    describe('#Service Status of lINES', function() {

        it('Should return valid status for some MTA Lines', async () => { 
            let lines = [mm.dic.MN.LINES.HUDSON,mm.dic.MN.LINES.DANBURY,mm.dic.LIRR.LINES.MONTAUK];
            let data = await mta.status(lines);
            expect(data).to.be.an( 'array' )
            expect(data).not.to.be.null;
            expect(data[0]).to.have.property('name','Hudson');
        });

        it('Should return status for ALL  Metro North & LIRR  Lines', async () => { 
            let data = await mta.status();
            expect(data).to.be.an( 'array' )
            expect(data).not.to.be.null;
            expect(data[0]).to.have.property('name','Hudson');
        });

    });

    describe('#Schedules of RR Services ', function() {

        it('Schedule prototype should exist', function () {
            expect(mta.schedule).to.be.ok;
        });

        it('Should return an error if not params sent', async () => { 
            let options = {
            }
            try{
                let data = await mta.schedule(options);
            }catch (e) {
                expect(e.message).to.equal('Missing from / to parameters.');
            }
        });

        it('Should return an error if param stations not from same service', async () => { 
            let options = {
                from: mm.dic.MN.STATIONS.GRANDCENTRAL, //station id
                to: mm.dic.LIRR.STATIONS.MONTAUK,
            }
            try{
                let data = await mta.schedule(options);
            }catch (e) {
                expect(e.message).to.equal('This stations dont belong to the same service.');
            }
        });

        it('Should return an error if incorrect params sent', async () => { 
            let options = {
                from:'GRANDCENTRAL', //station id
                to: 'MONTAUK',
            }
            try{
                let data = await mta.schedule(options);
            }catch (e) {
                expect(e.message).to.equal('No Railroad Service selected.');
            }
        });

        it('Should return something...', async () => { 
            let options = {
                from: mm.dic.MN.STATIONS.GRANDCENTRAL, //station id
                to: mm.dic.MN.STATIONS.BEACON, //station id
            }
            try{
                let data = await mta.schedule(options);
            }catch (e) {
                expect(e.message).not.to.be.null; 
            }
        });
    });
});