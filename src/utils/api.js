import config from '../config/config.json';
// import { egmDataReducers } from '../store/reducers/egmReducer';


// Helpers
// import { getRandIP } from '../utils/helpers';
// const TEST_IP = getRandIP();



const AGENT_SERVER_URL = config.AGENT_SERVER_IP;
// const EGM_API_URL = 'http://localhost:8099'
// const EGM_API_URL = 'http://192.168.10.73:8099'


export const spin = async () => {
  const response = await fetch(`http://${config.EGM_IP}:8099/relayi2c`, {
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
  const response = await fetch(`${AGENT_SERVER_URL}/test/serviceBell`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ip: config.EGM_IP,
      // ip: TEST_IP,
      action: action,
    }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error('Could not fetch service bell');

  return data;
};
