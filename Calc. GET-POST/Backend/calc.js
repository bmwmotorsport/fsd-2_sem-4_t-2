const express = require("express");
const path = require("path");
const app = express();

const frontendPath = path.join(__dirname, "../Frontend");
app.use(express.static(frontendPath, { index: "index.html" }));

app.get("/calc", (req, res) => {
  res.set("Content-Type", "text/html");

  const n1 = parseFloat(req.query.n1);
  const n2 = parseFloat(req.query.n2);
  const formula = req.query.formula;

  // Validate input numbers
  if (!(n1 > 0) || !(n2 > 0)) {
    res.send(`
      <h1 style="color: red; text-align: center; margin-top: 2rem;">
        Please enter valid numbers greater than zero.
      </h1>
    `);
    return;
  }

  // Validate formula selection
  if (!formula) {
    res.send(`
      <h1 style="color: red; text-align: center; margin-top: 2rem;">
        You have not selected any formula.
      </h1>
    `);
    return;
  }

  let result;
  let operationText;

  switch (formula) {
    case "addition":
      result = n1 + n2;
      operationText = `${n1} + ${n2} = ${result}`;
      break;
    case "subtraction":
      result = n1 - n2;
      operationText = `${n1} - ${n2} = ${result}`;
      break;
    case "multi":
      result = n1 * n2;
      operationText = `${n1} * ${n2} = ${result}`;
      break;
    case "div":
      if (n2 === 0) {
        res.send(`
          <h1 style="color: red; text-align: center; margin-top: 2rem;">
            Division by zero is not allowed.
          </h1>
        `);
        return;
      } else {
        result = n1 / n2;
        operationText = `${n1} ÷ ${n2} = ${result}`;
      }
      break;
    default:
      res.send(`
        <h1 style="color: red; text-align: center; margin-top: 2rem;">
          You have not selected any formula.
        </h1>
      `);
      return;
  }

  const textLength = operationText.length;

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Calculation Result</title>
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: linear-gradient(135deg, #4caf50, #81c784);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: white;
          overflow: hidden;
        }
        .result-container {
          font-size: 2.5rem;
          border: 3px solid white;
          padding: 2rem 3rem;
          border-radius: 15px;
          background: rgba(0,0,0,0.2);
          box-shadow: 0 0 20px rgba(255,255,255,0.3);
          white-space: nowrap;
          overflow: hidden;
          max-width: 0;
          border-right: 4px solid white;
          animation: typing 3s steps(${textLength}), blink 0.75s step-end infinite;
          --text-length: ${textLength};
          opacity: 0;
          animation-fill-mode: forwards;
          animation-delay: 0s, 3s;
        }

        @keyframes typing {
          from { max-width: 0; opacity: 1; }
          to { max-width: calc(var(--text-length) * 1ch + 1ch); opacity: 1; }
        }

        @keyframes blink {
          from, to { border-color: transparent; }
          50% { border-color: white; }
        }
      </style>
    </head>
    <body>
      <div class="result-container">${operationText}</div>
    </body>
    </html>
  `);
});

const PORT = 6012;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
