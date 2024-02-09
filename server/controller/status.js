import dynamoDB from '../config/db.js';
import { ScanCommand } from '@aws-sdk/lib-dynamodb';

const getAllStatus = async () => {
  try {
    const command = new ScanCommand({
      TableName: 'status',
    });
    const data = await dynamoDB.send(command);
    return data.Items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default { getAllStatus };
