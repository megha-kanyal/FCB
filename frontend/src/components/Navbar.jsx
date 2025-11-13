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
          <div className="text-center text-gray-700 text-lg mt-10">
            Welcome to Admin Dashboard
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar Navbar */}
      <div className="w-64 bg-blue-700 text-white flex flex-col p-5">
        <h2 className="text-2xl font-bold mb-6 border-b border-blue-400 pb-2">
          Admin Dashboard
        </h2>

        <button
          onClick={() => setActiveSection("addBus")}
          className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
            activeSection === "addBus" ? "bg-blue-600" : ""
          }`}
        >
          Add New Bus
        </button>

        <button
          onClick={() => setActiveSection("addPetrolPump")}
          className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
            activeSection === "addPetrolPump" ? "bg-blue-600" : ""
          }`}
        >
          Add Petrol Pump
        </button>

        <button
          onClick={() => setActiveSection("petrolPumpBills")}
          className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
            activeSection === "petrolPumpBills" ? "bg-blue-600" : ""
          }`}
        >
          Petrol Pump Bills
        </button>

        <button
          onClick={() => setActiveSection("registeredBuses")}
          className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
            activeSection === "registeredBuses" ? "bg-blue-600" : ""
          }`}
        >
          Registered Buses
        </button>

        <button
          onClick={() => setActiveSection("registeredPetrolPumps")}
          className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
            activeSection === "registeredPetrolPumps" ? "bg-blue-600" : ""
          }`}
        >
          Registered Petrol Pumps
        </button>

        <button
          onClick={() => setActiveSection("tripFormData")}
          className={`text-left py-2 px-3 rounded mb-2 hover:bg-blue-600 ${
            activeSection === "tripFormData" ? "bg-blue-600" : ""
          }`}
        >
          Trip Form Data
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6">{renderSection()}</div>
    </div>
  );
};

export default Navbar;
