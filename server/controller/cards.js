import dynamoDB from '../config/db.js';
import {
  ScanCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

const getAllCards = async () => {
  try {
    const command = new ScanCommand({
      TableName: 'card',
    });
    const data = await dynamoDB.send(command);
    return data.Items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const getAllCardsByStatus = async (status) => {
  try {
    const command = new ScanCommand({
      TableName: 'card',
      FilterExpression: `#ord_status = :a`,
      ExpressionAttributeValues: {
        ':a': status,
      },
      ExpressionAttributeNames: {
        '#ord_status': 'status',
      },
    });
    const data = await dynamoDB.send(command);
    return data.Items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

const updateCardStatus = async (id, status) => {
  try {
    const command = new UpdateCommand({
      TableName: 'card',
      Key: {
        id: id,
      },
      UpdateExpression: 'set #ord_status = :s',
      ExpressionAttributeValues: {
        ':s': status,
      },
      ExpressionAttributeNames: {
        '#ord_status': 'status',
      },
    });
    const data = await dynamoDB.send(command);
    return data.Items;
  } catch (err) {
    console.log(err);
    return [];
  }
};

export default { getAllCards, getAllCardsByStatus, updateCardStatus };
