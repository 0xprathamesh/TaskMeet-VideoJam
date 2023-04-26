import "@/styles/globals.css";
import { WagmiConfig, createClient } from "wagmi";
import {
  ConnectKitProvider,
  getDefaultClient,
} from "connectkit";

import {

  polygonMumbai,
  goerli,
} from "wagmi/chains";
import Navbar from "@/components/Navbar";

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const client = createClient(
  getDefaultClient({
    appName: "Task Management App",
    infuraId,
    chains: [ polygonMumbai, goerli],
  })
);
export default function App({ Component, pageProps }) {
  return (
    
    <WagmiConfig client={client}>
      <ConnectKitProvider
        debugMode
        theme="midnight"
        customTheme={{
          "--ck-connectbutton-border-radius": "0.3rem",
          "--ck-font-family": '"Comic Sans MS", "Comic Sans", cursive',
        }}
      >
        <Navbar></Navbar>
        <Component {...pageProps} />
       
      </ConnectKitProvider>
      </WagmiConfig>
      
  );
}
