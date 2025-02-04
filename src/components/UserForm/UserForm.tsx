import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSpring, animated, config } from "react-spring";


const UserDataForm = () => {
  const [formData, setFormData] = useState(() => {

    const storedData = localStorage.getItem("userData");
    return storedData ? JSON.parse(storedData) : {
      id: uuidv4(),
      name: "",
      address: "",
      email: "",
      phone: "",
    };
  });
  const [isDirty, setIsDirty] = useState(false);
  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      tension: 280,
      friction: 60,
      mass: 1
    }
  });
  const inputAnimation = useSpring({
    from: { width: '90%', scale: 0.9 },
    to: { width: '100%', scale: 1 },
    config: config.gentle
  });

  useEffect(() => {
    const handleBeforeUnload = (event: { preventDefault: () => void; returnValue: string; }) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsDirty(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("userData", JSON.stringify(formData));
    setIsDirty(false); // This will prevent the popup after saving
    alert("Data saved successfully!");
    
  };

  return (
    <animated.div style={{ ...formAnimation, width: "48%", margin: "auto", padding: "20px" }}>
     
      <h2 style={{ textAlign: "center" }}>User Data Form</h2>
      <animated.form onSubmit={handleSubmit} className="form" style={{ ...inputAnimation, display: "flex", flexDirection: "column", gap: "10px" }}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        
        <label>Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter your address" required style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        
        <label>Email</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        
        <label>Phone</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }} />
        
        <button type="submit" style={{ padding: "10px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Save</button>
      
      </animated.form>
      </animated.div>
  );
};

export default UserDataForm;
