export const sliceZero = value => {
  let processedSentence = undefined;
  for (let index = 0; index < value.length; index++) {
    if (value[index] !== '0') {
      processedSentence = value.slice(index);
      return parseInt(processedSentence);
    }
  }
  return 0;
};

// 隨機IP
export const getRandIP = () => {
  let ip = [];
  for (let i = 0; i < 4; i++) {
    ip = ip + Math.floor(Math.random() * 256) + '.';
  }

  return ip;
};

// export const _getUserIP = onNewIP => {
//   //  onNewIp - your listener function for new IPs
//   //compatibility for firefox and chrome
//   var myPeerConnection =
//     window.RTCPeerConnection ||
//     window.mozRTCPeerConnection ||
//     window.webkitRTCPeerConnection;
//   var pc = new myPeerConnection({
//       iceServers: [],
//     }),
//     noop = function () {},
//     localIPs = {},
//     ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g,
//     key;

//   function iterateIP(ip) {
//     if (!localIPs[ip]) onNewIP(ip);
//     localIPs[ip] = true;
//   }

//   //create a bogus data channel
//   pc.createDataChannel('');

//   // create offer and set local description
//   pc.createOffer()
//     .then(function (sdp) {
//       sdp.sdp.split('\n').forEach(function (line) {
//         if (line.indexOf('candidate') < 0) return;
//         line.match(ipRegex).forEach(iterateIP);
//       });

//       pc.setLocalDescription(sdp, noop, noop);
//     })
//     .catch(function (reason) {
//       // An error occurred, so handle the failure to connect
//     });

//   //listen for candidate events
//   pc.onicecandidate = function (ice) {
//     if (
//       !ice ||
//       !ice.candidate ||
//       !ice.candidate.candidate ||
//       !ice.candidate.candidate.match(ipRegex)
//     )
//       return;
//     ice.candidate.candidate.match(ipRegex).forEach(iterateIP);
//   };
// };

// // Usage

// _getUserIP(function (ip) {
//   alert('Got IP! :' + ip);
// });
