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
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    connection.current = new WebSocket(`ws://localhost:6969`);
    connection.current.onopen = () => {
      setStatus(connectionStatus.CONNECTED);
    };
    connection.current.onclose = () => {
      setStatus(connectionStatus.DISCONNECTED);
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
    };
  }, []);

  const sendMessage = useCallback(
    (msg) => {
      connection.current.send(msg);
    },
    [connection]
  );

  const contextValue = useMemo(
    () => ({
      status,
      error,
      data,
      sendMessage,
    }),
    [status, error, data, sendMessage]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};
