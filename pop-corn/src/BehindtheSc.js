import { useState } from "react";
import "./App.css";

const content = [
  {
    summary: "React is a library for building UIs",
    details:
      "Dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "State management is like giving state a home",
    details:
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    summary: "We can think of props as the component API",
    details:
      "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
];

export default function BehindtheSc() {
  return (
    <div>
      <Tabbed content={content} />
    </div>
  );
}




function Tabbed({ content }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="container">
      <div className="tabs">
        <Tab num={0} activeTab={activeTab} handleClick={setActiveTab} />
        <Tab num={1} activeTab={activeTab} handleClick={setActiveTab} />
        <Tab num={2} activeTab={activeTab} handleClick={setActiveTab} />
        <Tab num={3} activeTab={activeTab} handleClick={setActiveTab} />
      </div>
      {activeTab <= 2 ? (
      <TabContent item={content[activeTab]} 
       key={content[activeTab].summary
       }
      />
      ) : (
        <DiffrentContent/>
      )
       }
     
    </div>
  );
}

function Tab({ num, activeTab, handleClick }) {
  return (
    <button
      className={activeTab === num ? "active" : "tab"}
      onClick={() => handleClick(num)}
    >
      Tab {num + 1}
    </button>
  );
}

function TabContent({ item }) {
    const [showDetails , setShowDetails] = useState(true)
    const [likes , setLikes] = useState(0)

    function handleLike (){
        setLikes(likes+1)
    }
  return (
    <div className="tab-content">
      <h4>{item.summary}</h4>
      {showDetails && <p>{item.details}</p> }
      <div className="tab-actions">
        <button className="details-btn" onClick={()=> setShowDetails((cur)=> !cur)}>
            {showDetails ? "hide" : "show"} details
        </button>
        <div className="hearts-container">
       <span> {likes}  ❤️</span>
       <button onClick={handleLike}>+</button>
       <button>+++</button>
        </div>
      </div>
    </div>
  );
}

function DiffrentContent() {
    return <div className="tab-content">
   <h4>I'm Different tab , so i reset state 💣 💥</h4>
    </div>
}
