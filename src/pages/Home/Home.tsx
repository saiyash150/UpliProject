import Charts from "../../components/Charts/Charts";
import Counter from "../../components/Counter/Counter";
import Dashboard from "../../components/Dashboard/Dashboard";
import RichTextEditor from "../../components/RichTextEditor/RichTextEditor";
import UserForm from "../../components/UserForm/UserForm";
import { useEffect, useRef } from "react";
import "./Home.css";

const Home = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = containerRef.current?.querySelectorAll(".counter-text-content");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div className="home-container" ref={containerRef}>
        <div className="counter-text-content">
          <Counter />
          <RichTextEditor />
        </div>
        <div className="counter-text-content">
          <Dashboard />
          <UserForm />
        </div>
        <Charts/>
      </div>
    </div>
  );
};

export default Home;
