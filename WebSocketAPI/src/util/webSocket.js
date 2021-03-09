var AWS = require("aws-sdk");
module.exports = {
  sendMessage: async function (connectionId, payload, wsEndpointUrl) {
    const params = {
      ConnectionId: connectionId,
      Data: payload,
    };
    var apiGatewayManagementApiService = new AWS.ApiGatewayManagementApi({
      endpoint: wsEndpointUrl,
    });
    try {
      console.log(
        `Sending websocket message to a connection with ID ${connectionId}`
      );
      await apiGatewayManagementApiService.postToConnection(params).promise();
    } catch (err) {
      if (err.statusCode === 410) {
        console.log(`Found stale connection: ${connectionId}`);
      } else {
        throw err;
      }
    }
  },
};
