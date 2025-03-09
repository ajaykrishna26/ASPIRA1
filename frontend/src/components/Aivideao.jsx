// import { useEffect, useState, useRef } from "react";
// import axios from "axios";

// function App() {
//     const [message, setMessage] = useState("");
//     const videoRef = useRef(null);

//     useEffect(() => {
//         const interval = setInterval(async () => {
//             try {
//                 const response = await axios.get("http://127.0.0.1:5000/run-function");
//                 setMessage(response.data.result);

//                 if (response.data.result === "stop") {
//                     videoRef.current.play(); // Play the video
//                 }
//             } catch (error) {
//                 console.error("Error:", error);
//             }
//         }, 3000); // Calls the function every 3 seconds

//         return () => clearInterval(interval); // Cleanup on unmount
//     }, []);

//     return (
//         <div>
//             <h2>Status: {message}</h2>
//             <video ref={videoRef} width="600" controls>
//                 <source src="/videos/sample.mp4" type="video/mp4" />
//                 Your browser does not support the video tag.
//             </video>
//         </div>
//     );
// }

// export default App;