import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import constant from '../const.js';

console.log(constant);

const client = new DynamoDBClient({
  region: 'us-east-1',
  endpoint: constant.DB_HOST_PORT,
  accessKeyId: constant.AWS_ACCESS_KEY,
  secretAccessKey: constant.AWS_SECRET_KEY,
});
const dynamoDB = DynamoDBDocumentClient.from(client);

export default dynamoDB;
