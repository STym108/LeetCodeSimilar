import { useEffect, useState } from 'react';

function App() {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (chrome?.storage?.local) {
      chrome.storage.local.get(['leetcodeTitle'], (result) => {
        if (result.leetcodeTitle) {
          setTitle(result.leetcodeTitle);
        }
      });
    }
  }, []);

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <h2>LeetCode Problem:</h2>
      <p>{title || "No problem detected."}</p>

      <h3>Similar Questions:</h3>
      <ul>
        <li>GFG - Problem A</li>
        <li>CSES - Problem B</li>
        <li>Codeforces - Problem C</li>
      </ul>
    </div>
  );
}
export default App;