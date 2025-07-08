import { useState } from "react";

export default function ListBox({ children }) {
  const [isOpen1, setIsopen1] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsopen1((open) => !open)}
      >
        {isOpen1 ? "-" : "+"}
      </button>

      {isOpen1 && children}
    </div>
  );
}