import Web3 from 'web3';
import { useState, useEffect } from 'react';
import Product from '../contracts/Product.json'; // Contract ABI
import { toast } from 'react-toastify';

const ContractInit = () => {
  const [state, setState] = useState({ web3: null, contract: null });
  const [walletAddress, setWalletAddress] = useState(null);
  const correctNetworkId = "84532"; // Network ID for Base Sepolia testnet

  useEffect(() => {
    const initializeContract = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Create web3 instance with MetaMask provider
          const web3 = new Web3(window.ethereum);

          const accounts = await web3.eth.getAccounts();
          setWalletAddress(accounts[0]);

          // Get network ID
          const networkId = await web3.eth.net.getId();
          const networkID = networkId.toString();

          if (networkID !== correctNetworkId) {
            toast.warn("Network is incorrect. Please connect to the Base Sepolia testnet.", {
              position: "top-center",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "dark",
            });
            console.error("Network is not correct. Please connect to the Base Sepolia testnet.");
            return; // Exit if the network is not correct
          }

          const deployedNetwork = Product.networks[networkId];
          if (deployedNetwork) {
            const contract = new web3.eth.Contract(Product.abi, deployedNetwork.address);
            setState({ web3, contract });
          } else {
            console.error("Contract not deployed on the current network");
          }
        } catch (error) {
          console.error("Failed to load web3 or contract.", error);
        }
      } else {
        console.error("MetaMask not detected. Please install MetaMask.");
      }
    };

    initializeContract();

    // Clean up the effect
    return () => {
      setState({ contract: null, web3: null });
    };
  }, [walletAddress]);

  return [state, walletAddress];
};

export default ContractInit;



//let contractInstance;

// async function initContract() {
//   const provider = new Web3.providers.HttpProvider("http://localhost:7545");
//   const web3 = new Web3(provider);
//   const networkId = await web3.eth.net.getId();
//   const deployedNetwork = Product.networks[networkId];
//   contractInstance = new web3.eth.Contract(
//     Product.abi,
//     deployedNetwork.address
//   );
// }
// initContract();
// export { contractInstance };

// export const ContractInit = () => {

// const [state, setState] = useState({web3:null, contract: null});

//     useEffect(() => {
//     const provider = new Web3.providers.HttpProvider("http://localhost:7545");
//     async function contractInstance() {
//         const web3 = new Web3(provider);
//         const networkId = await web3.eth.net.getId();
//         const deployedNetwork = Product.networks[networkId];
//         const contract = new web3.eth.Contract(
//             Product.abi, 
//             deployedNetwork.address);
//             console.log(contract);
//         setState({web3:web3, contract:contract});
//     }
//     provider && contractInstance();
//   }, []);
// }



// export const ContractInit = () => {


//   const [state, setState] = useState({ web3: null, contract: null });

//   useEffect(() => {
//     // const provider = new Web3.providers.HttpProvider("http://localhost:7545");
//     const providerUrl = process.env.REACT_APP_ENDPOINT_URL; 

//     if (!providerUrl) {
//       console.error("Provider URL is undefined. Check your .env file.");
//       return; // Exit if provider URL is not set
//     }

//     const provider = new Web3.providers.HttpProvider(providerUrl);   
//     const contractInstance = async () => {
//       try {
//         const web3 = new Web3(provider);
//         const networkId = await web3.eth.net.getId();
//         const deployedNetwork = Product.networks[networkId];
//         if (deployedNetwork) {
//           const contract = new web3.eth.Contract(Product.abi, deployedNetwork.address);
//           console.log(contract);
//           setState({ web3, contract });
//         } else {
//           console.error("Contract not deployed on the current network");
//         }
//       } catch (error) {
//         console.error("Failed to load web3 or contract.", error);
//       }
//     };

//     if (provider) {
//       contractInstance();
//     }

//     // Clean up the effect
//     return () => {
//       setState({ web3: null, contract: null });
//     };
//   }, []);

//   return state;
// };
/*
export const ContractInit = () => {
  const [state, setState] = useState({ web3: null, contract: null });
  const [walletAddress, setWalletAddress] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [hasBeenConnected, setHasBeenConnected] = useState(false);

  useEffect(() => {
    connectWallet();
  }, []); // Only run once on mount

  useEffect(() => {
    walletListener();
  }, [walletAddress]); // Re-run if walletAddress changes

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum && walletAddress) {
        const provider = window.ethereum;
        try {
          const web3 = new Web3(provider);
          const networkId = await web3.eth.net.getId();
          if (networkId !== 84532) { // Replace with your desired network ID
            console.error("Incorrect network. Please switch to the Base Sepolia testnet.");
            return;
          }
          const deployedNetwork = Product.networks[networkId];
          if (deployedNetwork) {
            const contract = new web3.eth.Contract(Product.abi, deployedNetwork.address);
            setState({ web3, contract });
            console.log('Web3 and contract initialized:', { web3, contract });
          } else {
            console.error("Contract not deployed on the current network.");
          }
        } catch (error) {
          console.error("Error accessing MetaMask account:", error);
        }
      } else {
        console.error("MetaMask not found. Please install MetaMask.");
      }
    };

    if (walletAddress) {
      initWeb3();
    }
  },); // Re-run if walletAddress changes

  const connectWallet = async () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        if (accounts.length > 0 && accounts[0] !== walletAddress) {
          setWalletAddress(accounts[0]);
          setIsWalletConnected(true);
          setHasBeenConnected(true);
          console.log("Wallet Connected Successfully");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log("Please install MetaMask!");
    }
  };

  const walletListener = () => {
    if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length === 0 && hasBeenConnected) {
          console.log("Wallet disconnected!");
          setIsWalletConnected(false);
          setWalletAddress(null);
        } else if (isWalletConnected && accounts[0] !== walletAddress) {
          setWalletAddress(accounts[0]);
          console.log(`Wallet changed to ${accounts[0]}`);
        }
      });
    } else {
      setWalletAddress(null);
      console.log("Please install MetaMask");
    }
  };

  return [state, walletAddress];
};
*/

// export const ContractInit = () => {
//   const [state, setState] = useState({ web3: null, contract: null, walletAddress: null });
//   const [isConnecting, setIsConnecting] = useState(false); // State to track connection status

//   useEffect(() => {
//     const initializeContract = async () => {
//       if (window.ethereum) {
//         if (isConnecting) {
//           console.log("Already processing eth_requestAccounts. Please wait.");
//           return;
//         }

//         setIsConnecting(true); // Setting the connecting state to true

//         try {
//           // Request account access if needed
//           await window.ethereum.request({ method: 'eth_requestAccounts' });

//           // Create web3 instance with MetaMask provider
//           const web3 = new Web3(window.ethereum);

//           // Get network ID
//           const networkId = await web3.eth.net.getId();
//           const correctNetworkId = 84532; // Sepolia Testnet

//           if (networkId !== correctNetworkId) {
//             console.error("Network is not correct. Please connect to the Base Sepolia testnet.");
//             return; // Exit if the network is not correct
//           }

//           // Get the user's accounts
//           const accounts = await web3.eth.getAccounts();
//           const walletAddress = accounts[0];

//           const deployedNetwork = Product.networks[networkId];

//           if (deployedNetwork) {
//             const contract = new web3.eth.Contract(Product.abi, deployedNetwork.address);
//             console.log(contract);
//             setState({ web3, contract, walletAddress });
//           } else {
//             console.error("Contract not deployed on the current network");
//           }
//         } catch (error) {
//           console.error("Failed to load web3 or contract.", error);
//         } finally {
//           setIsConnecting(false); // Reset the connecting state
//         }
//       } else {
//         console.error("MetaMask not detected. Please install MetaMask.");
//       }
//     };

//     // Initialize contract
//     initializeContract();

//     // Clean up the effect
//     return () => {
//       setState({ web3: null, contract: null, walletAddress: null });
//     };
//   }, [isConnecting]);

//   return state;
// };