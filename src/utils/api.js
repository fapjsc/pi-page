import config from "../config/config.json";


const AGENT_SERVER_URL = config.AGENT_SERVER_IP;


export const spin = async () => {
  const url = `http://${config.EGM_IP}:8099/api/relayi2c`;
  // const url = `http://${config.EGM_IP}:8099/api/memberbonus`;
  // console.log(url)
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      PlayAuto: "1",
    }),
  });

  // console.log(response, "spin");

  const data = await response.json();

  if (!response.ok) throw new Error("access egm fail");

  return data;
};

// action: 'action' or 'cancel'
export const serviceCall = async (action) => {
  const response = await fetch(`${AGENT_SERVER_URL}/test/serviceBell`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ip: config.EGM_IP,
      // ip: TEST_IP,
      action: action,
    }),
  });

  const data = await response.json();

  if (!response.ok) throw new Error("Could not fetch service bell");

  return data;
};

//紅利提領
export const egmCashInOut = async () => {
  // if (!params) return;
  const url = `http://${config.EGM_IP}:8099/api/memberbonus`;
  // const url = 'http://192.168.10.76:8099/api/memberbonus'

  console.log(url);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      DelBonus: "delbonus",
    }),
  });

  // console.log(response, "紅利領取");

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Could not operation cash in or cash out");
  }
  if (data.status !== 200) {
    throw new Error(data.message || "cash in or cash out fail");
  }

  return data;
};
