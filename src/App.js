import Space from "./Space";
import { useState, useEffect } from "react";

// Socket
import { connectWithAgentSocket, closeSocket } from "./utils/socketConnection";
import { connectWithEgm, closeEgmConnect } from "./utils/webSocketConnection";

// Redux
import { useSelector } from "react-redux";

// Hooks
import useHttp from "./hook/useHttp";

// Utils
import { spin, serviceCall } from "./utils/api";

import styles from "./App.module.css";

const App = () => {
  const [isMale, setIsMale] = useState(true);
  const [isAutoGame, setIsAutoGame] = useState(false);

  // Redux
  const { egmStatus, agentStatus } = useSelector(
    (state) => state.connectionStatus
  );

  const { cashPoint, promotion } = useSelector((state) => state.egmData);

  // Http
  const { sendRequest, error } = useHttp(spin);

  const {
    sendRequest: serviceCallReq,
    data: serviceCallData,
    status: serviceCallStatus,
    error: serviceCallError,
  } = useHttp(serviceCall);

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
              <span
                className={`${styles.dot} ${
                  egmStatus === "success"
                    ? styles.success
                    : egmStatus === "error"
                    ? styles.error
                    : styles.secondary
                }`}
              />
              <span>
                {egmStatus === "closed"
                  ? "程式等待中"
                  : egmStatus === "success"
                  ? "程式正常"
                  : egmStatus === "error"
                  ? "程式錯誤"
                  : "程式等待中"}
              </span>
            </Space>
          </div>

          <div>
            <Space>
              <span
                className={`${styles.dot} ${
                  agentStatus === "success"
                    ? styles.success
                    : agentStatus === "error"
                    ? styles.error
                    : styles.secondary
                }`}
              />
              <span>
                {agentStatus === "closed"
                  ? "連線中"
                  : agentStatus === "success"
                  ? "連線正常"
                  : agentStatus === "error"
                  ? "連線錯誤"
                  : "連線中"}
              </span>
            </Space>
          </div>
        </div>

        <div className={styles.contentBox}>
          <div className={styles.name}>-</div>
          <div className={styles.bonus}>-</div>

          <div className={styles.campaign}>
            {promotion ? promotion : promotion === 0 ? 0 : "Loading..."}
          </div>

          <div className={styles.cash}>
            {cashPoint ? cashPoint : cashPoint === 0 ? 0 : "Loading..."}
          </div>
        </div>

        <div className={styles.actionBox}>
          <div
            onClick={() => {
              alert("take win");
              setIsAutoGame(false);
            }}
            className={styles.takeWin}
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
                fontSize: "10em",
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
                backgroundColor: "blue",
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

      <button
        style={{ position: "fixed", bottom: 0, left: 0, display: "none" }}
        onClick={() => setIsMale((pre) => !pre)}
      >
        toggle
      </button>
    </main>
  );
};

export default App;
