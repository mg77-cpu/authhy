import { useEffect, useState, createContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export const walletAddressContext = createContext();


function Walletwallet({children}) {
  const [walletAddress, setWalletAddress] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false); // Flag for wallet connection
  const [hasBeenConnected, setHasBeenConnected] = useState(false);

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        /* MetaMask is installed */
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        // Check if wallet address is already set to avoid duplicate toasts
        if (accounts.length > 0 && accounts[0] !== walletAddress) {
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
          setHasBeenConnected(true);
          toast.success('Wallet Connected Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      /* MetaMask is not installed */
      console.log("Please install MetaMask!");
      toast.error('Please install a web3 wallet.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  const walletListener = () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      // Add the accountsChanged listener
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0 && hasBeenConnected) {
          // Wallet address removed
          toast.warn('Wallet disconnected.', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });

          setIsWalletConnected(false); // Reset flag
          setWalletAddress(null); // Clear wallet address
          console.log("Wallet disconnected");
        } else if (isWalletConnected && accounts[0] !== walletAddress) {
          // Wallet address changed
          //setWalletAddress(accounts[0]); // Update wallet address
          toast.info('Wallet changed successfully!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          console.log(`Wallet changed to ${accounts[0]}`);
        }
      });
    } else {
      // MetaMask is not installed
      setWalletAddress(null);
      console.log("Please install MetaMask");
      toast.warn('Please install MetaMask', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    walletListener();
  }, [walletAddress])


  // const getCurrentWalletConnected = async () => {
  //   if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
  //     try {
  //       const accounts = await window.ethereum.request({
  //         method: "eth_accounts",
  //       });
  //       if (accounts.length > 0) {
  //         setWalletAddress(accounts[0]);
  //         setIsWalletConnected(true); // Set flag to true if a wallet is already connected
  //         console.log(accounts[0]);
  //       } else {
  //         toast.warn('Connect to your Wallet using the connect button', {
  //           position: "bottom-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });
  //         console.log("Connect to MetaMask using the Connect button");
  //       }
  //     } catch (err) {
  //       console.error(err.message);
  //     }
  //   } else {
  //     /* MetaMask is not installed */
  //     console.log("Please install MetaMask");
  //     toast.error('Please install MetaMask!', {
  //       position: "bottom-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "colored",
  //     });
  //   }
  // };

  // const walletListener = () => {
  //   if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  //     window.ethereum.on("accountsChanged", (accounts) => {
  //       if (accounts.length === 0 && hasBeenConnected) {
  //         // Wallet address removed
  //         toast.warn('Wallet disconnected.', {
  //           position: "bottom-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "dark",
  //         });

  //         setIsWalletConnected(false); // Reset flag
  //         console.log("Wallet disconnected");
  //       } else if (isWalletConnected && accounts[0] !== walletAddress) {
  //         // Wallet address changed
  //         toast.info('Wallet changed successfully!', {
  //           position: "bottom-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //         });
  //         setWalletAddress(accounts[0]); // Update wallet address
  //         console.log(`Wallet changed to ${accounts[0]}`);
  //       } else if (!isWalletConnected && !hasBeenConnected) {
  //         // Wallet connected for the first time
  //         setWalletAddress(accounts[0]);
  //         setIsWalletConnected(true);
  //         setHasBeenConnected(true);
  //         toast.success('Wallet Connected Successfully', {
  //           position: "top-right",
  //           autoClose: 5000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           progress: undefined,
  //           theme: "colored",
  //         });
  //         console.log(`Wallet connected: ${accounts[0]}`);
  //       }
  //     });
  //   } else {
  //     // MetaMask is not installed
  //     setWalletAddress(null);
  //     console.log("Please install MetaMask");
  //     toast.warn('Please install MetaMask', {
  //       position: "bottom-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "dark",
  //     });
  //   }
  // };

  

  // useEffect(() => {
  //   getCurrentWalletConnected();
  // }, []);

  return (
    <div>
      <button
        className="font-medium text-center h-8 w-32 rounded-full hover:bg-cyan-200 white-glassmor absolute right-12 top-10"
        onClick={connectWallet}
      >
        <span>
          {walletAddress && walletAddress.length > 0
            ? ` ${walletAddress.substring(
                0,
                6
              )}...${walletAddress.substring(38)}`
            : "Connect Wallet"}
        </span>
      </button>
              
    </div>
  );
}

export default Walletwallet;
