// // import React, { useState } from "react";
// // import AddBusForm from "./AddBusForm";
// // import PetrolPumpBills from "./PetrolPumpBills";
// // import AddPumpForm from "./AddPumpForm";
// // import RegisteredBuses from "./RegisteredBuses";
// // import RegisteredPetrolPumps from "./registeredPetrolPumps";
// // import TripFormData from "./TripFormData";

// // const Navbar = () => {
// //   const [activeSection, setActiveSection] = useState("dashboard");

// //   const renderSection = () => {
// //     switch (activeSection) {
// //       case "addBus":
// //         return <AddBusForm />;
// //       case "addPetrolPump":
// //         return <AddPumpForm />;
// //       case "petrolPumpBills":
// //         return <PetrolPumpBills />;
// //       case "registeredBuses":
// //         return <RegisteredBuses />;
// //       case "registeredPetrolPumps":
// //         return <RegisteredPetrolPumps />;
// //       case "tripFormData":
// //         return <TripFormData />;
// //       default:
// //         return (
// //           <div className="text-center text-gray-700 text-lg mt-10">
// //             Welcome to Admin Dashboard
// //           </div>
// //         );
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100 flex">
// //       {/* Sidebar Navbar */}
// //       <div className="w-64 bg-blue-700 text-white flex flex-col p-5">
// //         <h2 className="text-2xl font-bold mb-6 border-b border-blue-400 pb-2">
// //           Admin Dashboard
// //         </h2>

// //         <button
// //           onClick={() => setActiveSection("addBus")}
// //           className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
// //             activeSection === "addBus" ? "bg-blue-600" : ""
// //           }`}
// //         >
// //           Add New Bus
// //         </button>

// //         <button
// //           onClick={() => setActiveSection("addPetrolPump")}
// //           className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
// //             activeSection === "addPetrolPump" ? "bg-blue-600" : ""
// //           }`}
// //         >
// //           Add Petrol Pump
// //         </button>

// //         <button
// //           onClick={() => setActiveSection("petrolPumpBills")}
// //           className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
// //             activeSection === "petrolPumpBills" ? "bg-blue-600" : ""
// //           }`}
// //         >
// //           Petrol Pump Bills
// //         </button>

// //         <button
// //           onClick={() => setActiveSection("registeredBuses")}
// //           className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
// //             activeSection === "registeredBuses" ? "bg-blue-600" : ""
// //           }`}
// //         >
// //           Registered Buses
// //         </button>

// //         <button
// //           onClick={() => setActiveSection("registeredPetrolPumps")}
// //           className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
// //             activeSection === "registeredPetrolPumps" ? "bg-blue-600" : ""
// //           }`}
// //         >
// //           Registered Petrol Pumps
// //         </button>

// //         <button
// //           onClick={() => setActiveSection("tripFormData")}
// //           className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
// //             activeSection === "tripFormData" ? "bg-blue-600" : ""
// //           }`}
// //         >
// //           Trip Form Data
// //         </button>
// //       </div>

// //       {/* Main Content Area */}
// //       <div className="flex-1 p-6">{renderSection()}</div>
// //     </div>
// //   );
// // };

// // export default Navbar;





// import React, { useState } from "react";
// import AddBusForm from "./AddBusForm";
// import PetrolPumpBills from "./PetrolPumpBills";
// import AddPumpForm from "./AddPumpForm";
// import RegisteredBuses from "./RegisteredBuses";
// import RegisteredPetrolPumps from "./registeredPetrolPumps";
// import TripFormData from "./TripFormData";

// const Navbar = () => {
//   const [activeSection, setActiveSection] = useState("dashboard");

//   const renderSection = () => {
//     switch (activeSection) {
//       case "addBus":
//         return <AddBusForm />;
//       case "addPetrolPump":
//         return <AddPumpForm />;
//       case "petrolPumpBills":
//         return <PetrolPumpBills />;
//       case "registeredBuses":
//         return <RegisteredBuses />;
//       case "registeredPetrolPumps":
//         return <RegisteredPetrolPumps />;
//       case "tripFormData":
//         return <TripFormData />;
//       default:
//         return (
//           <div className="text-center text-gray-400 text-lg mt-10">
//             Welcome to Admin Dashboard
//           </div>
//         );
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Sidebar Navbar */}
//       <div className="w-64 bg-black/50 backdrop-blur-sm border-r border-yellow-500/20 flex flex-col p-5">
//         <h2 className="text-2xl font-bold text-yellow-400 mb-6 border-b border-yellow-500/30 pb-2">
//           Admin Panel
//         </h2>

//         <button
//           onClick={() => setActiveSection("addBus")}
//           className={`text-left py-2 px-3 rounded mb-2 transition-colors ${
//             activeSection === "addBus" 
//               ? "bg-yellow-400 text-black font-medium" 
//               : "text-gray-300 hover:bg-gray-800/50"
//           }`}
//         >
//           Add New Bus
//         </button>

//         <button
//           onClick={() => setActiveSection("addPetrolPump")}
//           className={`text-left py-2 px-3 rounded mb-2 transition-colors ${
//             activeSection === "addPetrolPump" 
//               ? "bg-yellow-400 text-black font-medium" 
//               : "text-gray-300 hover:bg-gray-800/50"
//           }`}
//         >
//           Add Petrol Pump
//         </button>

//         <button
//           onClick={() => setActiveSection("petrolPumpBills")}
//           className={`text-left py-2 px-3 rounded mb-2 transition-colors ${
//             activeSection === "petrolPumpBills" 
//               ? "bg-yellow-400 text-black font-medium" 
//               : "text-gray-300 hover:bg-gray-800/50"
//           }`}
//         >
//           Petrol Pump Bills
//         </button>

//         <button
//           onClick={() => setActiveSection("registeredBuses")}
//           className={`text-left py-2 px-3 rounded mb-2 transition-colors ${
//             activeSection === "registeredBuses" 
//               ? "bg-yellow-400 text-black font-medium" 
//               : "text-gray-300 hover:bg-gray-800/50"
//           }`}
//         >
//           Registered Buses
//         </button>

//         <button
//           onClick={() => setActiveSection("registeredPetrolPumps")}
//           className={`text-left py-2 px-3 rounded mb-2 transition-colors ${
//             activeSection === "registeredPetrolPumps" 
//               ? "bg-yellow-400 text-black font-medium" 
//               : "text-gray-300 hover:bg-gray-800/50"
//           }`}
//         >
//           Registered Petrol Pumps
//         </button>

//         <button
//           onClick={() => setActiveSection("tripFormData")}
//           className={`text-left py-2 px-3 rounded mb-2 transition-colors ${
//             activeSection === "tripFormData" 
//               ? "bg-yellow-400 text-black font-medium" 
//               : "text-gray-300 hover:bg-gray-800/50"
//           }`}
//         >
//           Trip Form Data
//         </button>
//       </div>

//       {/* Main Content Area */}
//       <div className="flex-1 bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
//         {renderSection()}
//       </div>
//     </div>
//   );
// };

// export default Navbar;





import React, { useState } from "react";
import AddBusForm from "./AddBusForm";
import PetrolPumpBills from "./PetrolPumpBills";
import AddPumpForm from "./AddPumpForm";
import RegisteredBuses from "./RegisteredBuses";
import RegisteredPetrolPumps from "./registeredPetrolPumps";
import TripFormData from "./TripFormData";

const Navbar = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderSection = () => {
    switch (activeSection) {
      case "addBus":
        return <AddBusForm />;
      case "addPetrolPump":
        return <AddPumpForm />;
      case "petrolPumpBills":
        return <PetrolPumpBills />;
      case "registeredBuses":
        return <RegisteredBuses />;
      case "registeredPetrolPumps":
        return <RegisteredPetrolPumps />;
      case "tripFormData":
        return <TripFormData />;
      default:
        return (
          <div className="text-center text-gray-400 text-lg mt-10">
            Welcome to Admin Dashboard
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
            Admin Panel
          </h2>
        </div>

        <div className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveSection("addBus")}
            className={`w-full text-left py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeSection === "addBus"
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-gray-50 hover:translate-x-1"
            }`}
          >
            Add New Bus
          </button>

          <button
            onClick={() => setActiveSection("addPetrolPump")}
            className={`w-full text-left py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeSection === "addPetrolPump"
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-gray-50 hover:translate-x-1"
            }`}
          >
            Add Petrol Pump
          </button>

          <button
            onClick={() => setActiveSection("petrolPumpBills")}
            className={`w-full text-left py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeSection === "petrolPumpBills"
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-gray-50 hover:translate-x-1"
            }`}
          >
            Petrol Pump Bills
          </button>

          <button
            onClick={() => setActiveSection("registeredBuses")}
            className={`w-full text-left py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeSection === "registeredBuses"
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-gray-50 hover:translate-x-1"
            }`}
          >
            Registered Buses
          </button>

          <button
            onClick={() => setActiveSection("registeredPetrolPumps")}
            className={`w-full text-left py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeSection === "registeredPetrolPumps"
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-gray-50 hover:translate-x-1"
            }`}
          >
            Registered Petrol Pumps
          </button>

          <button
            onClick={() => setActiveSection("tripFormData")}
            className={`w-full text-left py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
              activeSection === "tripFormData"
                ? "bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-lg transform scale-105"
                : "text-gray-700 hover:bg-gray-50 hover:translate-x-1"
            }`}
          >
            Trip Form Data
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 min-h-full">
          {renderSection()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;