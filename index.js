(function () {
    'use strict';

    const mongoElasticTransfer = {};

    var winston = require('winston'),
        logger  = new winston.Logger({
            level     : 'debug',
            transports: [new (winston.transports.Console)()]
        });

    mongoElasticTransfer.transfer = (opts, callback) => {
        const {esClient, mClient, index, type, collection} = opts;
        const bulkSize = opts.bulkSize || 10000;
        let bulk;

        const onData = (() => {
            let bulk = [];

            return (data, clear) => {
                if (clear) {
                    bulk = [];
                } else {
                    bulk.push({index: {_index: index, _type: type}});
                    delete data._id;
                    bulk.push(data);
                }

                return bulk;
            };
        })();

        const stream = mClient.collection(collection).find().stream();
        stream.on('error', err => callback(err, null));
        stream.on('data', data => {
            bulk = onData(data, false);
            if (isBulkLongEnough(bulk, bulkSize)) {
                stream.pause();
                onData(null, true);
                logger.debug(`Inserting bulk to elastic`);
                insertBulkToElastic(esClient, bulk, () => stream.resume());
            }
        });
        stream.on('end', () => {
            logger.debug("Inserting last bulk to elastic");
            insertBulkToElastic(esClient, bulk, callback);
        });
    };

    function isBulkLongEnough(bulk, bulkSize) {
        return bulk.length % bulkSize * 2 === 0;
    }

    function insertBulkToElastic(esClient, bulk, callback) {
        esClient.bulk({body: bulk}, callback);
    }

    module.exports = mongoElasticTransfer;
})();