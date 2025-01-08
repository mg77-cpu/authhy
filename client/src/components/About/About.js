import React, { useEffect, useState } from 'react';
import yn from "../images/yn.gif";
import ContractInit from '../contract';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const apiUrl = process.env.REACT_APP_API_URL;

function About() {
  
  const [{ contract, web3 }] = ContractInit();
  console.log("contract:", contract);
  console.log("web3:", web3);

  const [numberOfCompanies, setNumberOfCompanies] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        if (error) {
          toast.warn('Failed to fetch the number of companies. Maybe check your internet connectivity and reload page.', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        };
        const { data } = await axios.get(`${apiUrl}/api/companyCount/companies/count`);
        setNumberOfCompanies(data.count);
        console.log(data.count); 
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch the number of companies. Maybe check your internet connectivity!");
      }
    };
    fetchCount();
  }, [error]);  
  
  useEffect(() => {
    async function getTotalProducts() {
      if (contract && web3) {
        try {
          const product = await contract.methods.getTotalProducts().call();
          const products = product.toString();
          setTotalProducts(products);
          console.log(totalProducts);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    }

    getTotalProducts();
  }, [contract, web3]);

  return (
    <div className="flex w-full h-screen justify-center items-center relative">
      <div className="flex flex-initial justify-center items-center rounded-xl h-3/4 w-96 sm:w-3/4 eth-card-m white-glassmorphism">
        <div className="w-12 h-12 rounded-full flex justify-center items-center absolute top-10 left-10">
          <img
            src={yn}
            alt="img"
            className="rounded-full"
            fontSize={40}
          />
        </div>
        <h1 className="px-20 py-5 font-semibold text-lg absolute top-6">About Authy</h1>
        <p className="h-2/4 rounded-md outline-none border-none absolute top-20 left-36 bg-transparent blue-glassmorphism w-3/4 p-5">
          A blockchain QR code product authentication system is a cutting-edge solution for combating counterfeit products. 
          By leveraging the immutable nature of blockchain technology, this system creates a tamper-proof record of a product's originality.  
          The system incorporates features such as duplicate QR code detection and incentives for authenticity to discourage unauthorized retailers from duplicating QR codes. 
          The technical implementation includes blockchain technology which helps with user-friendly client-side application experience. 
          This innovative approach ensures enhanced transparency and security throughout the supply chain, providing a solid foundation for product authentication and consumer trust. 
          We believe that blockchain technology has the potential to revolutionize the way that products are authenticated. 
          Authyy is just the beginning. We are committed to developing new and innovative solutions to help businesses and consumers fight counterfeiting. 
        </p>
        <h2 className="px-20 py-5 font-semibold text-lg absolute bottom-36 left-16">Statistics</h2>
        <h3>
          <p className="w-72 h-8 rounded-md outline-none border-none bg-transparent absolute bottom-32 left-36 blue-glassmorphism">Total Companies Registered: {numberOfCompanies}</p>
          <p className="w-96 h-8 rounded-md justify-start outline-none border-none bg-transparent absolute bottom-20 left-36 blue-glassmorphism">Total Number of products stored in the App: {totalProducts}</p>
        </h3>
        <h3 className="px-20 py-5 font-semibold text-lg absolute bottom-16 right-40">
          <p className="mt-5 mb-2">Contact us</p>
          <p className="mt-">Email: autthy@email.org</p>
          <p className="mt-3">Phone: +000000000</p>
        </h3>
      </div>
            <ToastContainer />
    </div>
  );
}

export default About;