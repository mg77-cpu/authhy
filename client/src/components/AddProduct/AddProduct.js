import Web3 from "web3";
import React, { useEffect, useState, useRef, } from "react";
import QRCode from "react-qr-code";
import { toPng }  from "html-to-image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gif4 from "../images/gif4.gif";
import Product from "../../contracts/Product.json";// Contract ABI 

const AddProduct = () => {

    const [transactionHash, setTransactionHash] = useState(null);
    const [txHashArray, setTxHashArray] = useState([]);
    const qrRef = useRef("");
    const [showQRCode, setShowQRCode] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [isWalletConnected, setIsWalletConnected] = useState(false); // Flag for wallet connection
    const [hasBeenConnected, setHasBeenConnected] = useState(false);
    const [state, setState] = useState({ web3: null, contract: null });
    const [walletAddress, setWalletAddress] = useState(null);

    const connectWallet = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
          try {
            /* MetaMask is installed */
            const accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
    
            // Check if wallet address is already set to avoid duplicate toasts
            if (accounts.length > 0 && accounts[0] !== walletAddress) {
              //setWalletAddress(accounts[0]);
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
          //setWalletAddress(null);
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
    
     
  
    // //Get wallet address connected to the webiste
    // useEffect(() => {
    //   getCurrentWalletConnected();
    //   addWalletListener();
    // }, [walletAddress]);
  
    // //connect wallet function
    // const connectWallet = async () => {
    //   if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    //     try {
    //       /* MetaMask is installed */
    //       const accounts = await window.ethereum.request({
    //         method: "eth_requestAccounts",
    //       });
    //       setWalletAddress(accounts[0]);
    //       console.log(accounts[0]);
    //       toast.success('Wallet Connected Successfully', {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "colored",
    //         });
    //     } catch (err) {
    //       console.error(err.message);
    //     }
    //   } else {
    //     /* MetaMask is not installed */
    //     console.log("Please install MetaMask");
    //     toast.error('Please install MeataMask', {
    //       position: "bottom-right",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "colored",
    //       });
    //   }
    // };
  
    // //async function for getting wallet address
    // const getCurrentWalletConnected = async () => {
    //   if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    //     try {
    //       const accounts = await window.ethereum.request({
    //         method: "eth_accounts",
    //       });
    //       if (accounts.length > 0) {
    //         setWalletAddress(accounts[0]);
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
    //           });
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
    //       });
    //   }
    // };
  
    // //check if web3 wallet is installed in the browser
    // const addWalletListener = async () => {
    //   if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
    //     window.ethereum.on("accountsChanged", (accounts) => {
    //       setWalletAddress(accounts[0]);
    //       console.log(accounts[0]);
    //     });
    //   } else {
    //     /* MetaMask is not installed */
    //     setWalletAddress("");
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
    //       });
    //   }
    // };
    
    useEffect(() => {
      const initializeContract = async () => {
        if (window.ethereum) {
          try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });
    
            // Create web3 instance with MetaMask provider
            const web3 = new Web3(window.ethereum);

            const accounts = await web3.eth.getAccounts();
            if (accounts.length != 0) {
              setWalletAddress(accounts[0]);
            toast.success('Wallet Connected Successfully', {
                      position: "top-right",
                      autoClose: 3000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: "colored",
                      });
                      return; // Exit if the network is not correct
            } 
            // Get network ID
            const networkId = await web3.eth.net.getId();
            console.log("Network Id:", networkId);
            const networkID = networkId.toString();
            const correctNetworkId = "84532";  // Network ID for Base Sepolia testnet
            console.log("Network ID:", networkID);
          
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
          }
    
            const deployedNetwork = Product.networks[networkId];
            if (deployedNetwork) {
              const contract = new web3.eth.Contract(Product.abi, deployedNetwork.address);
              console.log(contract);
              setState({ web3, contract });
              console.log(web3);
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
    
      // Initialize contract
      initializeContract();
    
      // Clean up the effect
      return () => {
        setState({ contract: null, web3: null });
      };
    }, []); // Run only once on mount
    

    
    const { contract, web3 } = state;

    
  //add product details to the smart contract function 
  async function addProducts(event){
    event.preventDefault();
    const productName = document.getElementById("productNameInput").value;
    const  productID = document.getElementById("productIDInput").value;
    const manDate = document.getElementById("manufacturedDateInput").value;
    const expDate = document.getElementById("expiryDateInput").value;
    const brand = document.getElementById("brandNameInput").value;

    // Validate date format (YYYY-MM-DD)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(manDate)) {
    toast.warn('Invalid manufactured date format. Please use YYYY-MM-DD.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return;
  }

  if (!dateRegex.test(expDate)) {
    toast.warn('Invalid expiry date format. Please use YYYY-MM-DD.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return;
  }

  // Ensure manufactured date is earlier than expiry date
  const manufacturedDate = new Date(manDate);
  const expiryDate = new Date(expDate);

  if (manufacturedDate >= expiryDate) {
    toast.warn('Manufactured date must be earlier than expiry date.', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    return;
  }

    if (!walletAddress) {
      toast.warn('Wallet not connected please connect your wallet first!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        return;
    }
  
    if (contract && web3) {
    try { 
        const gas = await contract.methods.addProductWithCheck(
            productName, 
            productID,
            manDate,
            expDate,
            brand
      ).estimateGas({ walletAddress });

      const gasPrice = await web3.eth.getGasPrice();

            const receipt = await contract.methods.addProductWithCheck(
            productName, 
            productID,
            manDate,
            expDate,
            brand
        ).send({
          from: walletAddress,
            gas: gas,  // Set the estimated gas value
            gasPrice: gasPrice, // Optional: Set a reasonable gas price
        });
  
       const result = await contract.getPastEvents(
        ['ProductAdded', 'ProductNotAdded'],
        {}
       );
  
       const eventsArray = [];
       const transactionHash = receipt.transactionHash;
       setTransactionHash(transactionHash);
       console.log(transactionHash);
       const updatedTxHashArray = [transactionHash, ...txHashArray];
       setTxHashArray(updatedTxHashArray);
       localStorage.setItem('transactionHashArray', JSON.stringify(updatedTxHashArray));

       //listen for smart contract events
       result.forEach(event => {
        if (event.event === 'ProductAdded') {
          const events1 = result[0];
          const events2 = events1.returnValues;
          eventsArray.push(events2);
          console.log(eventsArray[0]);
         
         //alert user
         toast.info(`
          PRODUCT
  
         Product Name: ${events2.name}, 
         Product ID: ${events2.productId}, 
         Manufactured Date: ${events2.manufacturedDate}, 
         Expiry Date: ${events2.expiryDate}, 
         Brand: ${events2.manufacturer},
         Was  successfully added!`,
        {
          position: "top-center",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
          //setEventt(events2);
  
        } else if (event.event === 'ProductNotAdded') {
          const events1 = result[0];
          const events2 = events1.returnValues;
          //alert(events2[1]);
          toast.warn(`${events2[1]}`, {
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
      });

      //catch product addition errors
    } catch (error) {
        console.error("Error:", error);
        if (error.message.includes("insufficient funds for gas * price + value")) {
          toast.error(`Insufficient gas in your wallet. Please top up your account.`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });

        } else if (error.message.includes("gas required exceeds allowance")) {
          toast.error(`Gas limit exceeded. Please increase your gas limit.`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        } else {
          console.log(`${error.message}`);
          toast.error(`Oops! It looks like ther are some product details missing.`, {
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
    }
   }
  };
  
  //automatically exercute a function to add products into a struct in smart contract
  useEffect(()=>{
    const mapProduct = async () => {
      if (txHashArray[0]!== null && txHashArray[0]!== undefined) {
      const productName = document.getElementById("productNameInput").value;
      const  productId = document.getElementById("productIDInput").value;
      const manDate = document.getElementById("manufacturedDateInput").value;
      const expDate = document.getElementById("expiryDateInput").value;
      const brand = document.getElementById("brandNameInput").value;


      if (!walletAddress) {
        toast.warn('Wallet not connected please connect your wallet first!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          });
        return;
      }

      if (contract && web3) {
      try { 
          const gas = await contract.methods.mapTransactionToProduct(
           transactionHash,
           productName,
            productId,
            manDate,
            expDate,
            brand
          ).estimateGas({ walletAddress });

          const gasPrice = await web3.eth.getGasPrice();

          await contract.methods.mapTransactionToProduct(
                transactionHash,
                productName,
                 productId,
                 manDate,
                 expDate,
                 brand
          ).send({
            from: walletAddress,
            gas: gas,  // Set the estimated gas value
              gasPrice: gasPrice, // Optional: Set a reasonable gas price
          });
         
      } catch (error) {
          console.log("Error:", error);
          }
       }
    }
  }
    mapProduct();
  }, [txHashArray[0] === undefined? null : txHashArray[0]]);
   
//download QR code
  const downloadQRCode = (event) => {
    event.preventDefault();
    toPng(qrRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "qr-code.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => console.error(err));
      toast.info('QR code downloaded Successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        });
  };

  //generate QR code image using transaction  hash
  const handleGenerateQRCode = (event) => {
    event.preventDefault();
    setShowQRCode(true); // Set showQRCode to true when the button is clicked
  };

//hide or show button
  useEffect(() => {
    if (transactionHash !== null) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [transactionHash]);


  //reload the page 
  const refresh = () => {
    window.location.reload(); // Refresh the page after 1 second
  };

   useEffect(() => {
    walletListener();
   }, [walletAddress])
   
  //jsx for rendering on the website
    return (
    	<div className="flex flex-col w-full min-h-screen justify-center items-center relative scroll-smooth overflow-auto">
         <button
        className="font-base text-md text-center h-8 w-32 rounded-full hover:bg-cyan-200 white-glassmor absolute right-20 top-10"
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
      			<div className="flex flex-col justify-center items-center rounded-xl h-screen mb-10 mt-10 w-96 sm:w-1/2 eth-card-m white-glassmorphism relative">
            <div className="w-12 h-12 rounded-full  flex justify-center items-center absolute top-10 left-10">
                    <img
                      src={gif4}  
                      alt="img"
                      className="rounded-full" 
                      fontSize={40} 
                    />
                </div>
            <div className="flex flex-col justify-center items-center rounded-xl h-full mt-5 mb-5 w-3/4 sm:w-1/2 white-glassmorphism">
            
            <h1 className="mb-3 text-md font-semibold relative bottom-4">Add Products </h1>

        <div className="flex flex-col justify-center items-center relative">
      <label htmlFor="productNameInput" className="font-base text-md">Product Name</label>
               <input
                     type="text"
                     id="productNameInput"
                     required
                     className="w-80 rounded-md p-2 outline-none bg-transparent border-none blue-glassmorphism relative"
                     placeholder="Product name"
                     />
    <label htmlFor="productIDInput" className="font-base text-md mt-4">Product ID</label>
       <input 
         type="text"
         id="productIDInput"
         required
         className="w-80 rounded-md p-2 outline-none bg-transparent border-none blue-glassmorphism relative"
         placeholder="Product ID"
       />
    <label htmlFor="manufacturedDateInput" className="font-base text-md mt-4">Manufactured Date</label>
    <input 
      type="ext"
      id="manufacturedDateInput"
      required
      className="w-80 rounded-md p-2 outline-none bg-transparent border-none blue-glassmorphism relative"
      placeholder="Manufactured Date"
      />
    <label htmlFor="expiryDateInput" className="font-base text-md mt-4">Expiry Date</label>
    <input 
      type="text"
      id="expiryDateInput"
      required
      className="w-80 rounded-md p-2 outline-none bg-transparent border-none blue-glassmorphism relative"
      placeholder="Expiring Date"
      />
    <label htmlFor="brandNameInput" className="font-base text-md mt-4">Brand Name</label>
    <input 
      type="text"
      id="brandNameInput"
      required
      className="w-80 rounded-md p-2 outline-none bg-transparent border-none blue-glassmorphism relative"
      placeholder="Brand name"
    />

      <button onClick={ addProducts }  
             className="white-glassmor h-8 w-52 font-base text-md hover:bg-cyan-200 mt-3"> 
             Add Product 
      </button>

        {showButton && <button onClick={downloadQRCode} className="white-glassmor h-8 w-52 font-base text-md hover:bg-cyan-200 mt-3" type="button" >Download your QR Code</button>}

        <button onClick={ refresh } 
           className="white-glassmor h-8 w-52 font-base text-md hover:bg-cyan-200 mt-3"> 
           Reload
        </button>
        {showButton && <button onClick={handleGenerateQRCode} className="white-glassmor h-8 w-52 font-base text-md hover:bg-cyan-200 mt-3" type="button" >Show QR Code</button>}
         {showQRCode && 
         <QRCode value={ transactionHash }
          size={150}
          bgColor="white"
           ref={qrRef}/>} 
             </div>
         </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
  
  export default AddProduct;
  
