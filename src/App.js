import Space from "./Space";
import { useState, useEffect } from "react";

// Socket
import { connectWithAgentSocket, closeSocket } from "./utils/socketConnection";
import {
  connectWithEgm,
  closeEgmConnect,
  sendDenominationText,
} from "./utils/webSocketConnection";

// Redux
import { useSelector } from "react-redux";

// Hooks
import useHttp from "./hook/useHttp";

// Utils
import { spin, serviceCall, egmCashInOut } from "./utils/api";
import { formatThousands } from "./utils/helpers";

import styles from "./App.module.css";

const App = () => {
  const { memberData } = useSelector((state) => state.member);

  const { name, gender } = memberData || {};

  const [isMale, setIsMale] = useState(true);
  const [isAutoGame, setIsAutoGame] = useState(false);

  // Redux
  const { egmStatus, agentStatus } = useSelector(
    (state) => state.connectionStatus
  );

  const { bonus, cashPoint, promotion, denomination } = useSelector(
    (state) => state.egmData
  );

  // Http
  // 自動遊戲
  const { sendRequest, error } = useHttp(spin);

  // 服務鈴
  const {
    sendRequest: serviceCallReq,
    data: serviceCallData,
    status: serviceCallStatus,
    error: serviceCallError,
  } = useHttp(serviceCall);

  // 紅利領取
  const {
    sendRequest: egmCashInOutReq,
    // data: egmCashInOutData,
    // status: egmCashInOutStatus,
    // error: egmCashInOutError,
  } = useHttp(egmCashInOut);

  useEffect(() => {
    if (gender === "female") {
      setIsMale(false);
    } else {
      setIsMale(true);
    }
  }, [gender]);

  useEffect(() => {
    if (denomination) return;

    const getDenominationLoop = setInterval(() => {
      sendDenominationText();
    }, 1000);

    return () => {
      clearInterval(getDenominationLoop);
    };
  }, [denomination]);

  useEffect(() => {
    connectWithAgentSocket();
    connectWithEgm();

    return () => {
      closeSocket();
      closeEgmConnect();
    };
  }, []);

  useEffect(() => {
    let autoGameLoop;

    if (isAutoGame) {
      autoGameLoop = setInterval(() => {
        sendRequest();
      }, 3000);
    }

    if (!isAutoGame) {
      clearInterval(autoGameLoop);
    }

    if (error && isAutoGame) {
      // clearInterval(autoGameLoop);
      // setIsAutoGame(false);
      console.log(error);
    }

    return () => {
      clearInterval(autoGameLoop);
    };
  }, [isAutoGame, sendRequest, error]);

  useEffect(() => {
    console.log(serviceCallData, serviceCallStatus);

    if (
      !serviceCallError &&
      serviceCallStatus === "completed" &&
      serviceCallData?.action === "action"
    ) {
      // alert('請稍候,服務人員馬上到,請點擊確定回到畫面');
      console.log("call service");
    }
  }, [serviceCallData, serviceCallStatus, serviceCallError]);

  const egmStatusStyle = (type) => {
    if (type === "egm") {
      if (egmStatus === "success") return styles.success;
      if (egmStatus === "error") return styles.error;
    }

    if (type === "agent") {
      if (agentStatus === "success") return styles.success;
      if (agentStatus === "error") return styles.error;
    }

    return styles.secondary;
  };

  const egmStatusText = (type) => {
    if (type === "egm") {
      if (egmStatus === "closed") return "程式等待中";
      if (egmStatus === "success") return "程式正常";
      if (egmStatus === "error") return "程式錯誤";
    }

    if (type === "agent") {
      if (agentStatus === "closed") return "連線中";
      if (agentStatus === "success") return "連線正常";
      if (agentStatus === "error") return "連線錯誤";
    }

    return "連線中";
  };

  return (
    <main className={styles.main}>
      <section
        className={`${styles.container} ${
          isMale ? styles.male : styles.female
        }`}
      >
        <div
          onClick={() => window.location.reload()}
          style={{
            width: "16%",
            height: "17%",
            position: "absolute",
            top: "8%",
            left: "2%",
          }}
        />

        <div className={styles.conStatusBox}>
          <div style={{ marginBottom: ".5em" }}>
            <Space>
              <span className={`${styles.dot} ${egmStatusStyle("egm")}`} />
              <span>{egmStatusText("egm")}</span>
            </Space>
          </div>

          <div>
            <Space>
              <span className={`${styles.dot} ${egmStatusStyle("agent")}`} />
              <span>{egmStatusText("agent")}</span>
            </Space>
          </div>
        </div>

        <div className={styles.contentBox}>
          <div className={styles.name}>{name || "-"}</div>

          <div className={styles.bonus}>
            {bonus ? formatThousands(bonus) : "-"}
          </div>

          <div className={styles.campaign}>
            {promotion ? formatThousands(promotion) : "Loading..."}
          </div>

          <div className={styles.cash}>
            {cashPoint ? formatThousands(cashPoint) : "Loading..."}
          </div>
        </div>

        <div className={styles.actionBox}>
          <div
            onClick={() => {
              setIsAutoGame(false);
              // alert("take win");
              egmCashInOutReq();
            }}
            className={styles.takeWin}
            style={{ cursor: "pointer" }}
          />
          <div
            onClick={() => {
              setIsAutoGame((pre) => !pre);
              sendRequest();
              // closeEgmConnect();
            }}
            className={`${styles.autoGame} ${
              !isAutoGame ? styles.startAutoGame : styles.stopAutoGame
            }`}
          />

          {!serviceCallError &&
          serviceCallStatus === "completed" &&
          serviceCallData?.action === "action" ? (
            <div
              style={{
                position: "fixed",
                bottom: "15%",
                fontWeight: "bold",
                width: "15%",
                height: "15%",
              }}
            >
              <button
                style={{
                  backgroundColor: "green",
                  color: "#fff",
                  borderRadius: "100%",
                  padding: "1em",
                  width: "100%",
                  height: "100%",
                }}
                onClick={() => serviceCallReq("cancel")}
              >
                取消
              </button>
            </div>
          ) : (
            <div
              style={{
                position: "fixed",
                bottom: "15%",
                fontWeight: "bold",
                width: "15%",
                height: "15%",
              }}
            >
              <button
                style={{
                  backgroundColor: "red",
                  color: "#fff",
                  borderRadius: "100%",
                  padding: "1em",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                }}
                onClick={() => serviceCallReq("action")}
              >
                {serviceCallStatus === "pending" ? "Loading..." : "服務"}
              </button>
            </div>
          )}
        </div>

        <div className={styles.marqueeBox}>
          <div>
            <p style={{ marginRight: "5em" }}>眾家遊戲 🔥 火熱上線</p>

            <p style={{ marginRight: "5em" }}>更多遊戲 🔥 等你來玩</p>

            <p style={{ marginRight: "5em" }}>押的越多 🔥 送得越多</p>

            <p>12/1 ~ 12/31 歡慶開幕大放送.</p>
          </div>
        </div>
      </section>

      {/* <button
        style={{ position: "fixed", bottom: 0, left: 0, display: "none" }}
        onClick={() => setIsMale((pre) => !pre)}
      >
        toggle
      </button> */}
    </main>
  );
};

export default App;
