import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import constant from '../const.js';

const client = new DynamoDBClient({
  region: 'us-east-1',
  endpoint: 'http://localhost:8000',
  accessKeyId: constant.AWS_ACCESS_KEY,
  secretAccessKey: constant.AWS_SECRET_KEY,
});
const dynamoDB = DynamoDBDocumentClient.from(client);

export default dynamoDB;
