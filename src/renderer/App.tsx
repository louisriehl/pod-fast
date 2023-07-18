import { createRoot } from "react-dom/client";
import { ReactElement, useState } from "react";
import React from "react";

export function App(): ReactElement {
  const [players, setPlayers] = useState([]);

  return (
    <div>
      <p>Hello react!</p>
      <label style={{ height: "80%", width: "80%" }}>
        Text input: <input name="myInput" />
      </label>
    </div>
  );
}

function render() {
  const domNode = document.getElementById("root");
  const root = createRoot(domNode);
  root.render(<App />);
}

render();
