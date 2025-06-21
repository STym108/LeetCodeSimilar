import React from "react";
import ReactDOM from "react-dom/client";

const App = () => {
  const [title, setTitle] = React.useState("Loading...");

  React.useEffect(() => {
    chrome.storage.local.get("leetcodeTitle", (result) => {
      setTitle(result.leetcodeTitle || "Title not found");
    });
  }, []);

  return (
    <div>
      <h3>🔍 Similar Questions</h3>
      <p><strong>Problem:</strong> {title}</p>
      <ul>
        <li>GFG: Related Problem 1</li>
        <li>Codeforces: Related Problem 2</li>
        <li>CSES: Related Problem 3</li>
      </ul>
    </div>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("leetcode-similar-extension")
);
root.render(<App />);