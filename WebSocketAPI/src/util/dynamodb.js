module.exports = {
  getRandomInt: function (max) {
    return Math.floor(Math.random() * Math.floor(max));
  },

  GetItemCount: async function (docClient, dynamoClient, tableName) {
    try {
      var describeParams = {
        TableName: tableName,
      };
      var describeResult = await dynamoClient
        .describeTable(describeParams)
        .promise();

      if (describeResult.Table.ItemCount == 0) {
        var params = {
          TableName: tableName,
          Select: "COUNT",
        };
        var scanResult = await docClient.scan(params).promise();
        return scanResult.Count;
      } else {
        return describeResult.Table.ItemCount;
      }
    } catch (error) {
      console.error(error);
    }
  },

  GetRandomItem: async function (docClient, itemCount, tableName) {
    try {
      var itemId = this.getRandomInt(itemCount);
      var params = {
        TableName: tableName,
        Key: {
          id: itemId,
        },
      };
      var result = await docClient.get(params).promise();
      return result.Item.word;
    } catch (error) {
      console.error(error);
    }
  },
};
