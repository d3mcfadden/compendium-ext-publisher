var assert = require("assert");
var sinon = require("sinon");
var Payload = require("../lib/payload");
var Publisher = require("../lib/publisher");
var db = require("../lib/db");
var PAYLOADS = require("./payloads");

var stub = function() {};

describe("publisher db", function() {

	beforeEach(function() {
		this.publisher = new PublisherDB(null);
	});

	it("should select a table", function() {
		assert.equal(null, this.publisher.table, "no table selected");

		this.publisher.use("FOO");
		assert.equal("FOO", this.publisher.table, "table selected");
	});

});

describe("payload", function() {

	it("should throw exception on invalid payload", function() {
		assert.throws(function() {
			Payload({});
		});
	});

	it("should compute a score based on publish date", function() {
		var payload = Payload(PAYLOADS.publish);
		assert.equal(1427878800000, payload.content.score());
	});

	it("should have zero score for null publish date", function() {
		var payload = Payload(PAYLOADS.null_publish_date);
		assert.equal(0, payload.content.score());
	});

});

describe("publisher", function() {

	beforeEach(function() {
		this.connection = {
			call: stub
		};
		this.db = new db.PublisherDB(this.connection);
		this.publisher = new Publisher(this.db);
	});

	describe("publishing", function() {

		it("should publish", function() {
			var insert = sinon.spy(this.db, "insert");

			this.publisher.process(Payload(PAYLOADS.publish));

			assert(insert.calledOnce, "insert was called");
			assert(insert.calledWith(PAYLOADS.ID), "called with correct ID");
		});

	});

	describe("unpublishing", function() {

		it("should unpublish", function() {
			var remove = sinon.spy(this.db, "remove");

			this.publisher.process(Payload(PAYLOADS.unpublish));

			assert(remove.calledOnce, "remove was called");
			assert(remove.calledWith(PAYLOADS.ID), "called with correct ID");
		});

	});

	describe("editing", function() {
	});

});

describe("HMAC validator", function() {

});
