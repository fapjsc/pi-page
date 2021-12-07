import config from '../config/config.json';

// Helpers
import { getRandIP } from '../utils/helpers';
const TEST_IP = getRandIP();

const SERVER = config.AGENT_SERVER_IP;

export const spin = async () => {
  const response = await fetch(`http://localhost:8099/relayi2c`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      PlayAuto: '1',
    }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error('access egm fail');

  console.log(data);
};

// action: 'action' or 'cancel'
export const serviceCall = async action => {
  const response = await fetch(`${SERVER}/test/serviceBell`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      // ip: config.LOCAL_IP,
      ip: TEST_IP,
      action: action,
    }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error('Could not fetch service bell');

  return data;
};
