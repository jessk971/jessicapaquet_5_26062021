console.log("test")
fetch("http://localhost:3000/api/teddies").then((r) => r.json()).then((r) => console.log(r))