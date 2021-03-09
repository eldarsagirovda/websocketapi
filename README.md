# websocketapi
## How To 
### Provision App
- Deploy CloudFormation Template ./Infrastructure/data-layer.yaml
- Fill the table with random words: 
```
cd Infrastructure/scripts
npm i 
./fillTable.js <TableName>
```
- Deploy web socket api from folder WebSocketAPI:
```
npm i
npx serverless deploy
```

### Connect and send message 
- Connect using wscat: `wscat -c <api url>`
- Send message in next format: '{"action": "GetRandomWord"}'
- You should recieve a random word.