var pubsub = {};

(function (q) {

    var topics = {};
    var subUid = -1;

    q.publish = function (topic, args) {
        if (!topics[topic]) {
            return false;
        }

        var subscribers = topics[topic];
        var len = subscribers ? subscribers.length : 0;

        while (len--) {
            subscribers[len].func(topic, args);
        }
    }

    q.subscribe = function (topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }

        var token = (++subUid).toString();
        topics[topic].push({token: token, func: func});
        return token;
    }

    q.unsubscribe = function (token) {
        for (var m in topics) {
            if (topics[m]) {
                for (var i = 0, j = topics[m].length; i < j; i++) {
                    if (topics[m][i].token === token) {
                        topics[m].splice(i, 1);
                        return token;
                    }
                }
            }
            return this;
        }
    }
})(pubsub);


//usage
var testHandler = function(topics, data) {
    console.log(topics + ":" + data);
}


var testSubscription = pubsub.subscribe('exampleTopic', testHandler);

pubsub.publish('exampleTopic', 'hello world');
pubsub.unsubscribe(testSubscription);
pubsub.publish('exampleTopic', 'this will fail');