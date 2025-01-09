import dt from "../images/dt.gif";
import li from "../images/li.gif";


const Main = () => {
const handleLogout = () => {
localStorage.removeItem("token");
window.location.reload();
};

return (
	<div className="flex w-full h-screen justify-center items-center relative overflow-auto">

		 <h1 className="txt-1xl w-1/6 font-semibold font-base sm:text-5xl text-[#d7e6e8] absolute left-1/3 top-20 text-gradient">
			 Welcome
			 </h1>
			 <h4 className=" mt-2 md:w-9/12 w-11/12 text-xl text-white text-gradient font-base text-md absolute top-20 left-1/3 py-10">
	            Use Authyy to scan your food products and verify if they are original.
	        </h4>


			<div className="flex flex-row justify-center items-center rounded-xl h-2/3 w-96 sm:w-1/2 eth-card-m white-glassmorphism relative mt-40">
	          <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4 w-full h-auto ">
	           <div className="flex flex-1 justify-start flex-col mf:mr-10 w-auto h-full ">

			<div className="flex flex-col flex-1 items-center justify-start w-1/4 mf:mt-0 mt-10 absolute right-1/4 bottom-1/3 ">
			<div className="p-3 flex justify-center items-center flex-col rounded-xl h-80 sm:w-80 w-full my-5 white-glassmorphism relative left-20 top-16">
			<div className="flex justify-between flex-col w-full h-full">
			<div className="flex justify-between items-start">
			<div className="w-10 h-10 border-2 border-none flex justify-center items-center">
			<img
			src={li}  
			alt="img" 
			 fontSize={40} 
			 className="rounded-full"
			 />
              </div>
			  </div>
					</div>
                   <h2 className="font-semibold text-sm relative bottom-32 left-3">Use your device's Camera to scan your QR code.</h2>
					<div className="font-base text-md relative bottom-24 right-3">
                   <h2>Click the button below to begin.</h2>
				   <a href="/get">                      <button
					   className="h-8 w-32 mt-2 hover:bg-cyan-200 white-glassmor cursor-pointer relative top-8 left-16 font-base text-md"
					   >
		               Start scanning
		             </button>
                    </a>
					</div>
					</div>
					</div>
					

		<div className="flex flex-col flex-1 items-center justify-start w-1/4 mf:mt-0 mt-10 absolute left-80 bottom-1/3 ">
          <div className="p-3 flex justify-normal items-center flex-col rounded-xl h-80 sm:w-80 w-full my-5 white-glassmorphism relative right-52 top-16">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 border-2 border-none flex justify-center items-center">
				<img
			      src={dt}  
			       alt="img" 
			        fontSize={40}
			         className="rounded-full" 
			        />
                </div>
				
              </div>
                    <div>
                        <div className="font-semibold text-sm relative bottom-36 left-4">
						<h2> Login or Signup if you are a Manufacturer.</h2>
                        </div>
                        <div className="font-base text-md relative bottom-24 left-4">
						<h2> Click the button below to Login.</h2>
						<a href="/get">	                       <button
                              className=" w-1/2 mt-2 border-[1px] py-1  hover:bg-cyan-200 rounded-full cursor-pointer relative top-10 left-12 white-glassmor"
						   >
							Login
						   </button>
	                     </a>
                        </div>
                        </div>
                    </div>
                </div>
		    </div>
			</div>
	</div>
	<button 
	        onClick={ handleLogout } 
	        className="bg-sky-300 white-glassmorphism absolute top-3/4 left- w-20 h-8 hover:cyan-400 hover:bg-[#d46a5e] cursor-pointer mt-16"
	        >
	        Logout
            </button>
	</div>
	</div>
       );
};

export default Main;