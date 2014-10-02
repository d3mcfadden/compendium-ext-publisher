var assert = require("assert");
var sinon = require("sinon");
var Payload = require("../payload");
var publisher = require("../publisher");
var db = require("../db");

var stub = function() {};


var PAYLOADS = {

	ID: "46cad558-8a60-4fad-9285-0caf7b0f726e",

    publish: {
        "content": {
            "approved_version_exists": "",
            "author": {
                "email": "amorin@compendium.com",
                "id": "c74f7c05-a39e-4737-bb4d-606506f2d59e",
                "name": "Andrew M Admin",
                "username": "andrewmadmin",
                "url": "https://app.compendium.com/app/user/c74f7c05-a39e-4737-bb4d-606506f2d59e"
            },
            "blog": {
                "id": "cedcd2e0-b622-4c57-969c-7ec476c4e86b",
                "title": "Andrew M Admin blog"
            },
            "campaign": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "October Project",
                "url": "https://app.compendium.com/api/campaigns/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "categories": [{
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "User Tips",
                "url": "https://app.compendium.com/app/blogs/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            }],
            "content_type": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "Text",
                "url": "https://app.compendium.com/api/content_types/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "custom_properties": [],
            "featured_image": "",
            "funnel_stage": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "Engagement",
                "url": "https://app.compendium.com/api/funnel_stages/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "id": "46cad558-8a60-4fad-9285-0caf7b0f726e",
            "persona": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "Sue",
                "url": "https://app.compendium.com/api/personas/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "post_date": "2014-09-25T18:32:08+00:00",
            "post_properties": [],
            "post_text": "<p>User tips for the month of October</p>",
            "publish_date": "2015-04-01T09:00:00+00:00",
            "remote_id": "<remote_id>",
            "remote_url": "<remote_url>",
            "title": "October User Tips",
            "url": "https://app.compendium.com/api/posts/46cad558-8a60-4fad-9285-0caf7b0f726e",
            "workflow_stage": {
                "color": "666666",
                "id": "2685ae8f-9cf3-4cdb-a3ff-23110363b633",
                "name": "Draft",
                "type": "start",
                "url": "https://app.compendium.com/api/workflow_stages/2685ae8f-9cf3-4cdb-a3ff-23110363b633"
            }
        },
        "nonce": "542ab6018937c2.13739784",
        "state": "published",
        "timestamp": 1412085249
    },

    unpublish: {
        "content": {
            "approved_version_exists": "",
            "author": {
                "email": "amorin@compendium.com",
                "id": "c74f7c05-a39e-4737-bb4d-606506f2d59e",
                "name": "Andrew M Admin",
                "username": "andrewmadmin",
                "url": "https://app.compendium.com/app/user/c74f7c05-a39e-4737-bb4d-606506f2d59e"
            },
            "blog": {
                "id": "cedcd2e0-b622-4c57-969c-7ec476c4e86b",
                "title": "Andrew M Admin blog"
            },
            "campaign": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "October Project",
                "url": "https://app.compendium.com/api/campaigns/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "categories": [{
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "User Tips",
                "url": "https://app.compendium.com/app/blogs/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            }],
            "content_type": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "Text",
                "url": "https://app.compendium.com/api/content_types/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "custom_properties": [],
            "featured_image": "",
            "funnel_stage": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "Engagement",
                "url": "https://app.compendium.com/api/funnel_stages/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "id": "46cad558-8a60-4fad-9285-0caf7b0f726e",
            "persona": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "Sue",
                "url": "https://app.compendium.com/api/personas/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "post_date": "2014-09-25T18:32:08+00:00",
            "post_properties": [],
            "post_text": "<p>User tips for the month of October</p>",
            "publish_date": "2015-04-01T09:00:00+00:00",
            "remote_id": "<remote_id>",
            "remote_url": "<remote_url>",
            "title": "October User Tips",
            "url": "https://app.compendium.com/api/posts/46cad558-8a60-4fad-9285-0caf7b0f726e",
            "workflow_stage": {
                "color": "666666",
                "id": "2685ae8f-9cf3-4cdb-a3ff-23110363b633",
                "name": "Draft",
                "type": "start",
                "url": "https://app.compendium.com/api/workflow_stages/2685ae8f-9cf3-4cdb-a3ff-23110363b633"
            }
        },
        "nonce": "542ab6018937c2.13739784",
        "state": "unpublished",
        "timestamp": 1412085249
    },

    null_publish_date: {
        "content": {
            "approved_version_exists": "",
            "author": {
                "email": "amorin@compendium.com",
                "id": "c74f7c05-a39e-4737-bb4d-606506f2d59e",
                "name": "Andrew M Admin",
                "username": "andrewmadmin",
                "url": "https://app.compendium.com/app/user/c74f7c05-a39e-4737-bb4d-606506f2d59e"
            },
            "blog": {
                "id": "cedcd2e0-b622-4c57-969c-7ec476c4e86b",
                "title": "Andrew M Admin blog"
            },
            "campaign": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "October Project",
                "url": "https://app.compendium.com/api/campaigns/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "categories": [{
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "User Tips",
                "url": "https://app.compendium.com/app/blogs/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            }],
            "content_type": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "Text",
                "url": "https://app.compendium.com/api/content_types/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "custom_properties": [],
            "featured_image": "",
            "funnel_stage": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "Engagement",
                "url": "https://app.compendium.com/api/funnel_stages/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "id": "46cad558-8a60-4fad-9285-0caf7b0f726e",
            "persona": {
                "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
                "name": "Sue",
                "url": "https://app.compendium.com/api/personas/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            },
            "post_date": "2014-09-25T18:32:08+00:00",
            "post_properties": [],
            "post_text": "<p>User tips for the month of October</p>",
            "publish_date": null,
            "remote_id": "<remote_id>",
            "remote_url": "<remote_url>",
            "title": "October User Tips",
            "url": "https://app.compendium.com/api/posts/46cad558-8a60-4fad-9285-0caf7b0f726e",
            "workflow_stage": {
                "color": "666666",
                "id": "2685ae8f-9cf3-4cdb-a3ff-23110363b633",
                "name": "Draft",
                "type": "start",
                "url": "https://app.compendium.com/api/workflow_stages/2685ae8f-9cf3-4cdb-a3ff-23110363b633"
            }
        },
        "nonce": "542ab6018937c2.13739784",
        "state": "published",
        "timestamp": 1412085249
    }

};

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
		this.publisher = publisher(this.db);
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
