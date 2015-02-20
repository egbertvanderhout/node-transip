var Promise = require( 'bluebird' ),
    sinon = require('sinon'),
    parseString = require('xml2js').parseString;

var TransIP = require( '../transip' );

describe('I:TransIP:domainService', function() {
  'use strict';

  /*describe( 'setNameservers', function() {
    var transipInstance;
    beforeEach(function() {
      transipInstance = new TransIP();
    });

    it( 'should update nameservers', function(done) {
      this.timeout(30000);
      return transipInstance.domainService.setNameservers('nandlal.nl', 'ns01.dualdev.com', 'ns02.dualdev.com', 'ns03.dualdev.com').then(function(body) {
        // The check for promise.resolve is actually enough, but let's make sure the API isn't doing any crazy stuff 
        parseString(body[1], function (err, result) {
          expect(result['SOAP-ENV:Envelope']['SOAP-ENV:Body']).to.be.ok();
        });
      }).then(done, done);
    });

    it( 'should throw error without nameservers', function(done) {
      this.timeout(30000);
      return transipInstance.domainService.setNameservers('nandlal.nl').catch(function(err) {
        expect(err.message).to.eql('403');
      }).then(done, done);
    });

    it( 'should throw error without domain (or any arguments for that matter)', function(done) {
      this.timeout(30000);
      return transipInstance.domainService.setNameservers().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });*/

  describe( 'batchCheckAvailability', function() {
    var transipInstance;
    beforeEach(function() {
      transipInstance = new TransIP();
    });

    it( 'should check availability of domains', function(done) {
      this.timeout(30000);
      return transipInstance.domainService.batchCheckAvailability(['dualdev.com', 'hjabsdjhasdbjkhDBHWJBKjbwejhkjawefvghefbawfewej.nl']).then(function(domains) {
        expect(domains.length).to.eql(2);
        expect(domains[0].name).to.eql('dualdev.com');
        expect(domains[0].status).to.eql('unavailable');
        expect(domains[0].actions[0]).to.eql('internalpull');
        expect(domains[0].actions[1]).to.eql('internalpush');
        expect(domains[1].name).to.eql('hjabsdjhasdbjkhDBHWJBKjbwejhkjawefvghefbawfewej.nl'.toLowerCase());
        expect(domains[1].status).to.eql('free');
        expect(domains[1].actions[0]).to.eql('register');
      }).then(done, done);
    });

    it( 'should throw error without any domains', function(done) {
      this.timeout(30000);
      return transipInstance.domainService.batchCheckAvailability([]).catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });

    it( 'should throw error without any arguments', function(done) {
      this.timeout(30000);
      return transipInstance.domainService.batchCheckAvailability().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });

  describe( 'checkAvailability', function() {
    var transipInstance;
    beforeEach(function() {
      transipInstance = new TransIP();
    });

    it( 'should check availability of a registered domain', function(done) {
      this.timeout(30000);
      return transipInstance.domainService.checkAvailability('dualdev.com').then(function(domain) {
        expect(domain.status).to.eql('unavailable');
      }).then(done, done);
    });

    it( 'should check availability of a free domain', function(done) {
      this.timeout(30000);
      return transipInstance.domainService.checkAvailability('dualdev-asdjkakffaeksufhusafhaskejfeawjksfhbeajvbwejgwfhjaew.com').then(function(domain) {
        expect(domain.status).to.eql('free');
      }).then(done, done);
    });

    it( 'should throw error when there is no domain', function(done) {
      this.timeout(30000);
      return transipInstance.domainService.checkAvailability('').catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });

    it( 'should throw error when there are no arguments', function(done) {
      this.timeout(30000);
      return transipInstance.domainService.checkAvailability().catch(function(err) {
        expect(err.message).to.eql('404');
      }).then(done, done);
    });
  });
});