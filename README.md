# mongo-elastic-transfer

## Usage

```javascript
mongoElasticTransfer.transfer({
        esClient  : esClient,
        mClient   : mClient,
        index     : index,
        type      : type,
        collection: collection,
        [bulkSize  : bulkSize]
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

**collection**
Mongo collection name.