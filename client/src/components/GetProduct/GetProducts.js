import React, { useEffect, useState, useRef } from "react";
import QrScanner from 'qr-scanner';
import WebcamCapture from "../Webcam";
import jsQR from 'jsqr';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import gif5 from "../images/gif5.gif"
import Product from "../../contracts/Product.json";// Contract ABI 
import Web3 from "web3";



const GetProduct = () => {  


  //use effect hooks
  const [result, setResult] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const [txHashArray, setTxHashArray] = useState([]);
  const [qrArray, setQrArray] = useState([]);
  const scanElementRef = useRef(null);
  const [state, setState] = useState({ web3: null, contract: null });
  const viewDetailsRef = useRef(null);
  const [productInf, setProductInf] = useState({ name: null, productId: null, manufacturedDate: null, expiryDate: null, manufacturer: null });


  const handleScrollToScan = () => { 
    scanElementRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const viewProductDetails = () => {
    viewDetailsRef.current?.scrollIntoView({ behavior: 'smooth'})
  };

 
// //function to connect wallet
//   const connectWallet = async (event) => {
//     event.preventDefault();
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       try {
//         /* MetaMask is installed */
//         const accounts = await window.ethereum.request({
//           method: "eth_requestAccounts",
//         });
//         setWalletAddress(accounts[0]);
//         toast.success('Wallet connected Successfully', {
//           position: "top-right",
//           autoClose: 5000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "colored",
//           });
//         console.log(accounts[0]);
//       } catch (err) {
//         console.error(err.message);

//       }
//     } else {
//       /* MetaMask is not installed */
//       //console.log("Please install MetaMask");
//       toast.error('Please install MeataMask', {
//         position: "bottom-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//         });
//     }
//   };

//   //get current wallet address that is connected to the website
//   const getCurrentWalletConnected = async () => {
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       try {
//         const accounts = await window.ethereum.request({
//           method: "eth_accounts",
//         });
//         if (accounts.length > 0) {
//           setWalletAddress(accounts[0]);
//           console.log(accounts[0]);
//         } else {
//           toast.warn('Connect your wallet using the connect button!', {
//             position: "bottom-right",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//             });
//           console.log("Connect to MetaMask using the Connect button");
//         }
//       } catch (err) {
//         console.error(err.message);
//       }
//     } else {
//       /* MetaMask is not installed */
//       console.log("Please install MetaMask");
//       toast.error('Please install MetaMask!', {
//         position: "bottom-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//         });
//     }
//   };

//   const addWalletListener = async () => {
//     if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
//       window.ethereum.on("accountsChanged", (accounts) => {
//         setWalletAddress(accounts[0]);
//         console.log(accounts[0]);
//       });
//     } else {
//       /* MetaMask is not installed */
//       setWalletAddress("");
//       console.log("Please install MetaMask");
//       toast.warn('Please install MetaMask', {
//         position: "bottom-right",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "dark",
//         });
//     }
//   };

//   useEffect(() => {
//     addWalletListener();
//   }, [walletAddress]);

//   useEffect(() => {
//     getCurrentWalletConnected();
//   }, []);

  //search the smart contract for a certain product

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
          toast.infor('Wallet Connected Successfully', {
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
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: true,
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
          toast.warn("An error has occured please check your internet connection.", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      } else {
        console.error("MetaMask not detected. Please install MetaMask.");
        toast.warn("MetaMask not detected. Please install a web3 or crypto wallet.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
  
    };
  
    // Initialize contract
    initializeContract();
  
    // Clean up the effect
    return () => {
      setState({ contract: null, web3: null });
    };
  }, []);
  
  const { contract, web3 } = state;


    async function handleGetData (event){
    event.preventDefault();
    
    const productId = document.getElementById("productIDInput").value;

    if (contract && web3) {
      try {
        const productInf = await contract.methods.getProductInfo(productId).call();
        console.log(productInf);

        if (productInf.productId === "" || productInf.name === "") {
          //toast("Product does not exist");
          toast.warn('Product does not exist', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
          //alert("Product does not exist!");
        } else {
          console.log(productInf.manufacturedDate);
          console.log(productInf.expiryDate);

          setProductInf({
            name: productInf.name,
            productId: productInf.productId,
            manufacturedDate: productInf.manufacturedDate.toString(),
            expiryDate: productInf.expiryDate.toString(),
            manufacturer: productInf.manufacturer,
          });

        viewProductDetails();

         toast.success(`Product retrieved successfully!.`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error('internal server Error!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    };
  };

  //automatically search the smart contract for a product when a qr code image is read
  useEffect(()=>{
  const readQRCode = async () => {
    if (txHashArray[0]!== null && txHashArray[0]!== undefined) {
    if (contract && web3) {
      try {
        const productInf = await contract.methods.getProductByHash(result).call();
        if (productInf.productId === "" || productInf.name === "") {
          //alert("Product does not exist!");
          toast.warn('Product does not exist in the system', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        } else {
          setProductInf({
            name: productInf.name,
            productId: productInf.productId,
            manufacturedDate: productInf.manufacturedDate,
            expiryDate: productInf.expiryDate,
            manufacturer: productInf.manufacturer,
          });
        viewProductDetails(); 

        //notify the user
        toast.success(`Product retrieved successfully!.`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
       
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error('internal server Error!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
    }
    };
  }
  };
  readQRCode();
}, [txHashArray[0] === undefined? null : txHashArray[0]]);

//automatically search the smart contract with the transaction hash retrieved from the scanned QR code by cameta
useEffect(()=>{
  const scanQRCode = async () => {
    if (qrArray[0]!== null && qrArray[0]!== undefined) {

   // if (qrCode) {

    if (contract && web3) {
      try {
        const productInf = await contract.methods.getProductByHash(qrCode).call();

        if (productInf.productId === "" || productInf.name === "") {
          //alert("Product does not exist!");
          toast.warn('Product does not exist', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
        } else {
          setProductInf({
            name: productInf.name,
            productId: productInf.productId,
            manufacturedDate: productInf.manufacturedDate,
            expiryDate: productInf.expiryDate,
            manufacturer: productInf.manufacturer,
          });
          viewProductDetails(); 

          toast.success(`Product retrieved successfully!.`,
        {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error('internal server Error!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      }
    };
  }
  };
scanQRCode();
}, [qrArray[0] === undefined? null : qrArray[0]]);
  

//read a QR code image file
  const readCode = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    QrScanner.scanImage(file, { returnDetailedScanResult:
      true })
      .then(result => setResult(result.data))
      .catch(e => console.log(e));
      const updatedTxHashArray = [result, ...txHashArray];
       setTxHashArray(updatedTxHashArray);
      localStorage.setItem('transactionHashArray', JSON.stringify(updatedTxHashArray));
  }


  const refresh = (e) => {
      window.location.reload();
  }

  //scan a QR code image picture with camera
    const handleScan = (imageSrc) => {
      if (imageSrc) {
          const image = new Image();
          image.src = imageSrc;
          image.onload = () => {
              const canvas = document.createElement("canvas");
              canvas.width = image.width;
              canvas.height = image.height;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
              const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              const code = jsQR(imageData.data, imageData.width, imageData.height, { inversionAttempts: "dontInvert"});
              if (code) {
                  setQrCode(code.data);
                  console.log("transactionHash: ", code.data);
                  const updatedTxHashArray = [code.data, ...qrArray];
                  setQrArray(updatedTxHashArray);
                  localStorage.setItem('qrArray', JSON.stringify(updatedTxHashArray));
              }
          }
      }
  }


  return(
		<div className="flex flex-col w-full min-h-screen justify-center items-center relative scroll-smooth overflow-auto">
      <div className="flex flex-col justify-center items-center rounded-xl h-2/3 w-96 sm:w-1/2 eth-card-m white-glassmorphism absolute top-10 left-80">
      <div className="w-12 h-12 rounded-full  flex justify-center items-center absolute top-10 left-10">
              <img
                src={gif5}  
                alt="img"
                className="rounded-xl bg-transparent" 
                fontSize={40} 
              />
          </div>
      <div className="flex flex-col justify-center items-center rounded-xl h-3/4 w-auto sm:w-1/2 white-glassmorphism absolute py-20">
      <h1 className="px-20 py-5 font-semibold text-lg absolute top-3">Search Product</h1>
         <label htmlFor="productIDInput" className="px-20 py-5 font-base text-md absolute top-16">Product ID</label>
           <input 
             type="text"
             id="productIDInput"
             className="my-1 w-80 rounded-md p-2 outline-none bg-transparent border-none text-black blue-glassmorphism absolute top-28"
             placeholder="ProductID"
            />
        <button
          onClick={handleGetData} 
          className="relative top-5 white-glassmor font-base text-md text-center text-sm h-9 w-36 hover:bg-cyan-200" 
          type="button"> 
          Get Product Details 
        </button>
        <button 
           className="absolute left-20 bottom-16 white-glassmor font-base text-md text-center h-9 w-60 hover:bg-cyan-200" 
           type="button"
            onClick={ handleScrollToScan }>
           Click to Scan Using the Camera
        </button>
      </div>
    </div>


      			<div className="m-32 flex flex-col justify-center items-center rounded-xl h-2/3 w-96 sm:w-1/2 my-5 eth-card-m white-glassmorphism absolute top-3/4 left-48" ref={viewDetailsRef}>
            <div className="w-12 h-12 rounded-full  flex justify-center items-center absolute top-10 left-10">
                    <img
                      src={gif5}  
                      alt="img"
                      className="rounded-xl" 
                      fontSize={40} 
                    />
                </div>
               <div className="flex flex-col justify-col items-center rounded-xl h-5/6 w-auto sm:w-1/2 white-glassmorphism absolute py-20">
                  <h2 className="px-20 font-semibold text-lg absolute top-3">Product Information</h2>
                   < h5 className="px-20 py-5 font-base text-md absolute top-10"> 
                      Product Name
                   </h5>
                     <p id="productName" className="w-64 h-8 rounded-md outline-none border-none bg-transparent absolute top-20 left-16 blue-glassmorphism">
                     {productInf.name}
                      </p>
                      <h5 className="px-20 pt-4 font-base text-md absolute top-28">
                        Product ID 
                        </h5>
                       <p id="productId" className="w-64 h-8 my-1 rounded-md outline-none border-none bg-transparent absolute top-36 left-16 blue-glassmorphism">{productInf.productId}</p> 
                        <h5 className="px-20 py-2 mt-4 font-base text-md absolute top-44">Manufactured Date</h5>
                         <p id="manufacturedDate" className="w-64 h-8 rounded-md outline-none border-none bg-transparent absolute bottom-40 left-16 blue-glassmorphism">{productInf.manufacturedDate}</p>
                          <h5 className="px-20 py-2 mt-5 mb-1 font-base text-md absolute bottom-28"> Expiery Date </h5>
                       <p id="expiryDate" className="w-64 h-8 rounded-md p-2 outline-none border-none bg-transparent absolute bottom-24 left-16 blue-glassmorphism">{productInf.expiryDate}</p>
                      <h5 className="px-20 py-6 font-base text-md absolute bottom-5"> Brand Name</h5>
                    <p id="manufacturer" className="w-64 h-8 rounded-md p-2 outline-none border-none bg-transparent absolute bottom-4 left-16 blue-glassmorphism">{productInf.manufacturer}</p>
                </div>
             </div>
            
          <div className="mt-96 flex flex-col justify-center items-center rounded-xl h-full mb-5 w-96 sm:w-1/2 eth-card-m white-glassmorphism absolute top-full left-80 overflow-auto" ref={scanElementRef}>
          <div className="w-12 h-12 rounded-full  flex justify-center items-center absolute top-10 left-10">
                  <img
                    src={gif5}  
                    alt="img"
                    className="rounded-xl" 
                    fontSize={40} 
                  />
              </div>
            <div  className="flex flex-col justify-col items-center rounded-xl h-5/6 w-auto sm:w-1/2 white-glassmorphism absolute py-20">
              <h2 className="font-semibold text-lg absolute top-5">Scan QRCode by uploading an image file </h2>
                <input type="file" 
                onChange={(e) => readCode(e)}
                className=" w-80 rounded-sm p-2 outline-none bg-transparent border-none text-black blue-glassmorphism absolute top-16 left-8"
                >
                </input>
                <p className="w-80 h-8 rounded-md p-2 outline-none border-none bg-transparent absolute top-28 left-8 blue-glassmorphism font-base text-md">QR Code Value:</p>
                 <div className="w-80 h-24 justify-center items-center flex absolute top-52">
                     { scanResult
                     ? <p>Success: 
                      <a href={"Product ID"+ scanResult }>{ scanResult }</a>
                     </p>
                     : <div id="reader" className=""></div>
                     }
                  </div>
                      <div className="flex flex-col justify-center items-center relative top-28 px-2">
                       <WebcamCapture onScan={handleScan} />
                       </div>
                       <button 
                           className="font-base text-md text-center h-9 w-60 rounded-full hover:bg-cyan-200 relative top-52 white-glassmor" 
                           type="button"
                           onClick={ refresh }>
                           Click to scan another Qr code
                       </button>
                      </div>
               </div>
      <ToastContainer />
  </div>
     );
    }
    export default GetProduct;


        