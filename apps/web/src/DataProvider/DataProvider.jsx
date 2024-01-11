import {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo,
  createContext,
} from "react";
import { connectionStatus } from "./constants";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const connection = useRef(null);
  const [status, setStatus] = useState(connectionStatus.DISCONNECTED);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    connection.current = new WebSocket(`ws://localhost:6969`);
    connection.current.onopen = () => {
      setStatus(connectionStatus.CONNECTED);
    };
    connection.current.onclose = () => {
      setStatus(connectionStatus.DISCONNECTED);
      setIsRunning(false);
    };
    connection.current.onerror = (err) => {
      setError(err);
    };
    connection.current.onmessage = (msg) => {
      try {
        setData(JSON.parse(msg?.data || {}));
      } catch {
        return;
      }
    };

    return () => {
      connection.current.close();
      setStatus(connectionStatus.DISCONNECTED);
      setIsRunning(false);
    };
  }, []);

  const sendMessage = useCallback(
    (msg) => {
      connection.current.send(msg);
    },
    [connection]
  );

  const sendData = useCallback(
    (data) => {
      sendMessage(JSON.stringify({ type: "DATA", data }));
    },
    [sendMessage]
  );

  const startSimulation = useCallback(() => {
    sendMessage(JSON.stringify({ type: "START", data: {} }));
    setIsRunning(true);
  }, [sendMessage]);

  const pauseSimulation = useCallback(() => {
    sendMessage(JSON.stringify({ type: "PAUSE", data: {} }));
    setIsRunning(false);
  }, [sendMessage]);

  const contextValue = useMemo(
    () => ({
      isRunning,
      status,
      error,
      data,
      sendData,
      startSimulation,
      pauseSimulation,
    }),
    [isRunning, status, error, data, startSimulation, pauseSimulation, sendData]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
