# Node External Publisher

External publisher implementation for Oracle Content Marketing written
in node.


## Install / Usage

* install deps

Redis and node are required deps. If you do not have redis or node
install using the following:

```
brew install redis;
npm install;
```


* start redis

```
redis-server
```


* start app

```
node app.js
```

### Inserting data - Callback Endpoint

When the node app comes it it will be running on http://127.0.0.1. It
has a callback route that excepts payloads from Compendium. The default
URL to this route is http://127.0.0.1/callback. 

This endpoint expects to see a JSON payload that adhears to the spec: https://github.com/CompendiumSoftware/padrino_api/blob/publishers-rewrites/docs/extras/External%20Connection%20Publisher.md

There is an examples/payloads directory included which contains a shell
script to generate a payload based on your corrent env.

#### Examples:

* generate the default payload (state=published)

```
./examples/payloads/gen_payload.sh
```

* generate a unpublished state payload

```
/usr/bin/env STATE=unpublished ./examples/payloads/gen_payload.sh
```

* generate some random data with uuidgen and fortune 

```
/usr/bin/env ID=$(uuidgen) POST_DATE="2014-08-25T18:32:08+00:00" PUBLISH_DATE="2014-06-25T18:32:08+00:00" TITLE="$(fortune | tr -d '\012' | tr -d '"')" BODY="$(fortune | tr -d '\012' | tr -d '"')" STATE=published  src/node-publisher/examples/payloads/gen_payload.sh
```

The following env variables can be used

```
* $AUTHOR_ID
* $AUTHOR_NAME
* $AUTHOR_USERNAME
* $ID
* $TITLE
* $TEXT
* $CONTENT_DATE
* $PUBLISH_DATE
* $STATE
```


The output of the command can be piped into curl using the following
method:

```
curl -H"Request-Signature: <bogus>" -H"Content-Type: application/json" -d @- http://127.0.0.1:3000/callback
```


### Rendering data

http://127.0.0.1/render will show a listing page of published content.
