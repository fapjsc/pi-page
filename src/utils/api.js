import { findRenderedComponentWithType } from 'react-dom/test-utils';

const EGM_IP = 'http://192.168.10.74:8099/relayi2c';

export const spin = async () => {
  const response = await fetch(EGM_IP, {
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
