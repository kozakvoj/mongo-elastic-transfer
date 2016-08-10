# mongo-elastic-transfer

[![NPM](https://nodei.co/npm/mongo-elastic-transfer.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mongo-elastic-transfer/)

Simple Node.js module for fast transferring data from MongoDB to Elastic.

Data are streamed from MongoDB and inserted as a bulk to MongeDB. Bulk size is configurable and should be considered based on data size. You can read more about bulk size in the official documentation [https://www.elastic.co/guide/en/elasticsearch/guide/current/indexing-performance.html#_using_and_sizing_bulk_requests]().

## Usage

```javascript
mongoElasticTransfer.transfer({
        esClient    : esClient,
        mClient     : mClient,
        index       : index,
        type        : type,
        collection  : collection,
        [preserveIds: preserveIds],
        [bulkSize   : bulkSize]
    }, callback);
```

**esClient**
Instance of elasticsearch official module.

**mClient**
Instance of mongodb official module.

**index**
Elastic index name.

**type**
Elastic type.

**preserveIds**
Keeps the same ID as in MongoDB.

**collection**
Mongo collection name.