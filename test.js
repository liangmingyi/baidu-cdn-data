/*global describe, it, beforeEach */

'use strict';
var assert = require('chai').assert;

describe('baidu-cdn-data', function () {
  beforeEach(function () {
    this.data = require('./index');
  });

  describe('jQuery libraries', function () {
    it('should include jquery 2.1.1', function () {
      assert.include(this.data.jquery.versions, '2.1.1');
    });

    it('should build jquery 2.1.1 url', function () {
      assert.equal(this.data.jquery.url('2.1.1'), 'http://apps.bdimg.com/libs/jquery/2.1.1/jquery.min.js');
    });
  });

  describe('jQuery UI libraries', function () {
    it('should include jquery-ui 1.10.4', function () {
      assert.include(this.data['jquery-ui'].versions, '1.10.4');
    });

    it('should build jquery-ui 1.10.4 url', function () {
      assert.equal(this.data['jquery-ui'].url('1.10.4'), 'http://apps.bdimg.com/libs/jqueryui/1.10.4/jquery-ui.min.js');
    });
  });

  describe('Dojo libraries', function () {
    it('should include dojo 1.8.3', function () {
      assert.include(this.data.dojo.versions, '1.8.3');
    });

    it('should build dojo 1.8.3 url', function () {
      assert.equal(this.data.dojo.url('1.8.3'), 'http://apps.bdimg.com/libs/dojo/1.8.3/dojo.js');
    });
  });

  describe('SWFObject libraries', function () {
    it('should include swfobject 2.2', function () {
      assert.include(this.data.swfobject.versions, '2.2');
    });

    it('should build swfobject 2.2 url', function () {
      assert.equal(this.data.swfobject.url('2.2'), 'http://apps.bdimg.com/libs/swfobject/2.2/swfobject.js');
    });
  });

  describe('AngularJS libraries', function () {
    it('should include angular 1.2.16', function () {
      assert.include(this.data.angular.versions, '1.2.16');
    });
    
    it('should include unstable angular 1.3.0-beta.8', function () {
      assert.include(this.data.angular.versions, '1.3.0-beta.8');
    });

    it('should include angular-animate 1.2.16', function () {
      assert.include(this.data['angular-animate'].versions, '1.2.16');
    });

    it('should include angular-cookies 1.2.16', function () {
      assert.include(this.data['angular-cookies'].versions, '1.2.16');
    });

    it('should include angular-loader 1.2.16', function () {
      assert.include(this.data['angular-loader'].versions, '1.2.16');
    });

    it('should include angular-resource 1.2.16', function () {
      assert.include(this.data['angular-resource'].versions, '1.2.16');
    });

    it('should include angular-route 1.2.16', function () {
      assert.include(this.data['angular-route'].versions, '1.2.16');
    });

    it('should include angular-sanitize 1.2.16', function () {
      assert.include(this.data['angular-sanitize'].versions, '1.2.16');
    });

    it('should include angular-touch 1.2.16', function () {
      assert.include(this.data['angular-touch'].versions, '1.2.16');
    });

    it('should build angular-resource 1.2.16 url', function () {
      assert.equal(this.data['angular-resource'].url('1.2.16'), 'http://apps.bdimg.com/libs/angular.js/1.2.16/angular-resource.min.js');
    });
  });
});