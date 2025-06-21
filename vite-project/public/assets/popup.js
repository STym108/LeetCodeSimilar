import { r as c, j as r, c as d } from "./client-CCDZIsXF.js";
(function () {
  const o = document.createElement("link").relList;
  if (o && o.supports && o.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) n(e);
  new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList")
        for (const s of t.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && n(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function i(e) {
    const t = {};
    return (
      e.integrity && (t.integrity = e.integrity),
      e.referrerPolicy && (t.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (t.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (t.credentials = "omit")
        : (t.credentials = "same-origin"),
      t
    );
  }
  function n(e) {
    if (e.ep) return;
    e.ep = !0;
    const t = i(e);
    fetch(e.href, t);
  }
})();
function f() {
  const [l, o] = c.useState("");
  return (
    c.useEffect(() => {
      chrome.storage.local.get(["leetcodeTitle"], (i) => {
        i.leetcodeTitle && o(i.leetcodeTitle);
      });
    }, []),
    r.jsxs("div", {
      style: { padding: "1rem", fontFamily: "sans-serif" },
      children: [
        r.jsx("h2", { children: "LeetCode Problem:" }),
        r.jsx("p", { children: l || "No problem detected." }),
        r.jsx("h3", { children: "Similar Questions:" }),
        r.jsxs("ul", {
          children: [
            r.jsx("li", { children: "GFG - Problem A" }),
            r.jsx("li", { children: "CSES - Problem B" }),
            r.jsx("li", { children: "Codeforces - Problem C" }),
          ],
        }),
      ],
    })
  );
}
d.createRoot(document.getElementById("root")).render(
  r.jsx(c.StrictMode, { children: r.jsx(f, {}) })
);
