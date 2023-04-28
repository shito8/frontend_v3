import { WalletConnectProps, AppConfig } from "@/types/types";
import React, {
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import { AppContext } from "@/pages/_app";
import Image from "next/image";
import { BLOCKCHAIN } from "@/utils/blockchain";
import Link from "next/link";

declare const ergo: any;
declare const ergoConnector: any;

export default function WalletConnect(propsConnect: WalletConnectProps) {
  const { openWallet, setOpenWallet } = propsConnect;

  const appContext = useContext(AppContext);
  const { state, dispatch } = appContext ?? { state: null, dispatch: () => {} };

  const [isConnected, setIsConnected] = useState(state?.walletConnected);
  const [walletName, setWalletName] = useState<string | undefined>(
    state?.walletName
  );

  const [nautilusWallet, setNautilusWallet] = useState<boolean>(true);

  const appConfigRef = useRef<AppConfig | null>(null);

  useEffect(() => {
    if (window !== undefined) {
      appConfigRef.current = JSON.parse(sessionStorage.getItem("appConfig")!);
    }
  }, []);

  const handleConnect = () => {
    setOpenWallet(!openWallet);
  };

  const handleConnectWallet = async (item: string) => {
    if (item === "Nautilus") {
      if (nautilusWallet) {
        console.log("connect ergo");
        connectNautilus();
        setWalletName(item);
      }
    }
    if (item === "Eternl") {
      console.log("connect cardano");
      /*       setWalletName(item);
      setIsConnected(true); */
    }
    if (item === "Metamask") {
      console.log("connect ethereum");
    }
  };

  const connectNautilus = async () => {
    const connect = await ergoConnector.nautilus.connect();
    setIsConnected(connect);
    if (connect) {
      const addressErg = await ergo.get_change_address();
      dispatch({ type: "walletAddressErg", payload: addressErg });
      const balanceErg = await ergo.get_balance();
      dispatch({
        type: "walletBalanceErg",
        payload: (parseFloat(balanceErg) / 1000000000)
          .toFixed(2)
          .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
      });
    }
  };

  const checkWalletErg = () => {
    try {
      ergoConnector;
    } catch (e) {
      setNautilusWallet(false);
    }
  };

  useEffect(() => {
    checkWalletErg();
    if (isConnected) {
      if (state?.blockchain === "ERGO") {
        setOpenWallet(!openWallet);
        dispatch({ type: "walletName", payload: walletName || "" });
        dispatch({ type: "walletConnected", payload: true });
        if (appConfigRef.current && appConfigRef.current.ergo) {
          appConfigRef.current.ergo.status.connect = true;
          appConfigRef.current.ergo.status.wallet = walletName || "";
        }
        sessionStorage.setItem(
          "appConfig",
          JSON.stringify(appConfigRef.current)
        );
      }
    }
  }, [
    isConnected,
    dispatch,
    openWallet,
    setOpenWallet,
    state?.blockchain,
    walletName,
  ]);

  return (
    <div className="walletConnect">
      {BLOCKCHAIN.map((item, index) => {
        return (
          <section key={index}>
            {state?.blockchain === item.name ? (
              <div className="popUp" key={index}>
                <div className="title__pop">
                  <p>Connect wallet</p>
                  <svg width="20" height="20" id="icon" onClick={handleConnect}>
                    <use href="/img/assets/x.svg#icon"></use>
                  </svg>
                </div>
                <div className="wallets__list">
                  {item.wallets.map((item, index) => {
                    return (
                      <div
                        className="wallet__item"
                        key={index}
                        onClick={() => handleConnectWallet(item.name)}
                      >
                        <div className="wallet__name">
                          <h2>{item.name}</h2>
                          {item.name === "Nautilus" && !nautilusWallet ? (
                            <Link
                              href="https://chrome.google.com/webstore/detail/nautilus-wallet/gjlmehlldlphhljhpnlddaodbjjcchai"
                              target="_blank"
                            >
                              {" "}
                              Install
                            </Link>
                          ) : (
                            ""
                          )}
                          {item.name !== "Nautilus" ? <p>Not available</p> : ""}
                        </div>
                        <Image
                          src={item.img}
                          alt="wallet"
                          width={40}
                          height={40}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <></>
            )}
          </section>
        );
      })}
    </div>
  );
}
