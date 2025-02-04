import  { useState } from "react";
import { useSpring, animated } from "react-spring";
import "chart.js/auto";

const Dashboard = () => {
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

  

  const dashboardAnimation = useSpring({
    from: { opacity: 0, transform: 'scale(0.9)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: {
      tension: 280,
      friction: 60,
      mass: 1,
      easing: t => t * (2 - t) // Smooth easing
    }
  });

  return (
    <animated.div style={{ ...dashboardAnimation, width: "50%", margin: "auto", padding: "20px", border: "1px solid #ccc", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", height: 450 }}>
      <h2 style={{ textAlign: "center" }}>User Data</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>Data</label>
        <input type="text" name="data" value={JSON.stringify(formData)} disabled style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "#f5f5f5" }} />
        
        <label>Name</label>
        <input type="text" name="name" value={formData.name} disabled style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "#f5f5f5" }} />
        
        <label>Id</label>
        <input type="text" name="id" value={formData.id} disabled style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "#f5f5f5" }} />
      </div>
    </animated.div>
  );
};

export default Dashboard;