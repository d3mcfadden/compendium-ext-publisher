#!/bin/bash

# generate a payload to stdout
# this script will pick up the following vars from the current env and use
# them in the payload
#
# $AUTHOR_ID
# $AUTHOR_NAME
# $AUTHOR_USERNAME
# $ID
# $TITLE
# $TEXT
# $CONTENT_DATE
# $PUBLISH_DATE
# $STATE

cat <<EOF
{
	"content": {
		"approved_version_exists": "",
		"author": {
			"email": "amorin@compendium.com",
			"id": "${AUTHOR_ID:-c74f7c05-a39e-4737-bb4d-606506f2d59e}",
			"name": "${AUTHOR_NAME:-Andrew Morin}",
			"username": "${AUTHOR_USERNAME:-andrewmadmin}",
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
		"id": "${ID:-46cad558-8a60-4fad-9285-0caf7b0f726e}",
		"persona": {
			"id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
			"name": "Sue",
			"url": "https://app.compendium.com/api/personas/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
		},
		"post_date": "${CONTENT_DATE:-2014-09-25T18:32:08+00:00}",
		"post_properties": [],
		"post_text": "${TEXT:-<p>User tips for the month of October</p>}",
		"publish_date": "${PUBLISH_DATE:-2015-04-01T09:00:00+00:00}",
		"title": "${TITLE:-October User Tips}",
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
	"state": "${STATE:-published}",
	"timestamp": $(date +%s)
}
EOF
