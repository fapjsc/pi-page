export const sliceZero = (value) => {
  let processedSentence = undefined;
  for (let index = 0; index < value.length; index++) {
    if (value[index] !== "0") {
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
    ip = ip + Math.floor(Math.random() * 256) + ".";
  }

  return ip;
};

export const getIP = (callback) => {
  let recode = {};
  let RTCPeerConnection =
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection;
  // 如果不存在則使用一個iframe繞過
  // if (!RTCPeerConnection) {
  // 	// 因為這裡用到了iframe，所以在呼叫這個方法的script上必須有一個iframe標籤
  // 	// <iframe id="iframe" sandbox="allow-same-origin" style="display:none;"></iframe>
  // 	let win = iframe.contentWindow;
  // 	RTCPeerConnection = win.RTCPeerConnection || win.mozRTCPeerConnection || win.webkitRTCPeerConnection;
  // }
  //建立例項，生成連線
  let pc = new RTCPeerConnection();
  // 匹配字串中符合ip地址的欄位
  function handleCandidate(candidate) {
    let ip_regexp =
      /([0-9]{1,3}(\.[0-9]{1,3}){3}|([a-f0-9]{1,4}((:[a-f0-9]{1,4}){7}|:+[a-f0-9]{1,4}){6}))/;
    let ip_isMatch = candidate.match(ip_regexp)[1];
    if (!recode[ip_isMatch]) {
      console.log(callback)
      callback(ip_isMatch);
      recode[ip_isMatch] = true;
    }
  }
  //監聽icecandidate事件
  pc.onicecandidate = (ice) => {
    if (ice.candidate) {
      handleCandidate(ice.candidate.candidate);
    }
  };
  //建立一個偽資料的通道
  pc.createDataChannel("");
  pc.createOffer(
    (res) => {
      pc.setLocalDescription(res);
    },
    () => {}
  );
  //延遲，讓一切都能完成
  setTimeout(() => {
    let lines = pc.localDescription.sdp.split("\n");
    lines.forEach((item) => {
      if (item.indexOf("a=candidate:") === 0) {
        handleCandidate(item);
      }
    });
  }, 1000);
};

