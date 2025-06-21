import { R as r, j as e, a as t } from "../assets/client-CCDZIsXF.js";
const i = () => {
    const [l, s] = t.useState("Loading...");
    return (
      t.useEffect(() => {
        chrome.storage.local.get("leetcodeTitle", (o) => {
          s(o.leetcodeTitle || "Title not found");
        });
      }, []),
      e.jsxs("div", {
        children: [
          e.jsx("h3", { children: "🔍 Similar Questions" }),
          e.jsxs("p", {
            children: [e.jsx("strong", { children: "Problem:" }), " ", l],
          }),
          e.jsxs("ul", {
            children: [
              e.jsx("li", { children: "GFG: Related Problem 1" }),
              e.jsx("li", { children: "Codeforces: Related Problem 2" }),
              e.jsx("li", { children: "CSES: Related Problem 3" }),
            ],
          }),
        ],
      })
    );
  },
  n = r.createRoot(document.getElementById("leetcode-similar-extension"));
n.render(e.jsx(i, {}));
