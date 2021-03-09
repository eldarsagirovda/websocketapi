#!/usr/bin/env node
'use strict';

var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1",
});

function FillTable(docClient, tableName, itemsCount) {
  var randomWords = require("random-words");

  const words = randomWords(itemsCount);
  for (let index = 0; index < words.length; index++) {
      console.log(index)
    var params = {
      TableName: tableName,
      Item: {
        'id': index,
        'word': words[index],
      },
    };
    docClient.put(params, function (err, data) {
      if (err) console.log(err, err.stack);
      else console.log(data);
    });
  }
}


function main() {
    var cliArgs = process.argv.slice(2);
    var docClient = new AWS.DynamoDB.DocumentClient()
    const tableName = cliArgs[0]
    //CreateTable(dynamoClient, tableName)
    FillTable(docClient, tableName, 500)
}

main()