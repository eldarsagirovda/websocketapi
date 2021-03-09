'use strict';
var AWS = require("aws-sdk");
var dynamoDbUtils = require("../util/dynamodb")
var webSocketUtils = require("../util/webSocket")
const tableName = process.env.TABLE_NAME;
const wsEndpointUrl = process.env.WS_ENDPOINT_URL;
const success = {
  statusCode: 200
}

AWS.config.update({
  region: "eu-west-1",
});

exports.handler = async function(event, context, callback) {
    console.log(event)
    console.log(context)
    var docClient = new AWS.DynamoDB.DocumentClient();
    var dynamoClient = new AWS.DynamoDB();
    var connectionId = event.requestContext.connectionId


    var itemCount = await dynamoDbUtils.GetItemCount(docClient, dynamoClient, tableName);
    var randomItem = await dynamoDbUtils.GetRandomItem(docClient, itemCount, tableName);
    console.log(randomItem)
    webSocketUtils.sendMessage(connectionId, randomItem, wsEndpointUrl)
    return callback(null, success);
};
