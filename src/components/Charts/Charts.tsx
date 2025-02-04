import  { useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const Charts = () => {
  const [formData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : {
      id: "",
      name: "",
      address: "",
      email: "",
      phone: "",
    };
  });

  

  const chartData = {
    labels: ["ID", "Name Length", "Address Length", "Email Length", "Phone Length"],
    datasets: [
      {
        label: "User Profile Trends",
        data: [
          formData.id.length,
          formData.name.length,
          formData.address.length,
          formData.email.length,
          formData.phone.length,
        ],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.6)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div style={{ width: "50%", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
      <h3 style={{ textAlign: "center", marginTop: "20px" }}>Profile Trends</h3>
      <Line data={chartData} />
    </div>
  );
};

export default Charts;
