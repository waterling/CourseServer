'use strict';

const amqp = require('amqplib/callback_api');


class NewsQueues {

    doResponseNews(newsId, data) {

        amqp.connect('amqp://localhost', function (err, conn) {

            conn.createChannel(function (err, ch) {

                const qName = 'news_' + newsId;


                ch.assertQueue(qName, {durable: false, autoDelete: true});

                ch.sendToQueue(qName, new Buffer(JSON.stringify(data)));

            })

        });

    };


}


module.exports = NewsQueues;