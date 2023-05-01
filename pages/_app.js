import "@/styles/globals.css";
import { WagmiConfig, createClient, mainnet } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

import { filecoinHyperspace } from "wagmi/chains";

const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

const client = createClient(
  getDefaultClient({
    appName: "Task Management App",
    infuraId,
    chains: [filecoinHyperspace, mainnet],
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
        <Component {...pageProps} />
      </ConnectKitProvider>
    </WagmiConfig>
  );
}
