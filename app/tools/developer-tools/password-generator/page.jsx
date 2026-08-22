"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export const meta = {
  tags: ["Developer Tools"],
};

const CHARSETS = {
  upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lower: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  symbols: "!@#$%^&*()_+-=[]{}|;:,.<>?~",
};

function secureRandom(max) {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
}

export default function Page() {
  const [length, setLength] = useState(16);
  const [upper, setUpper] = useState(true);
  const [lower, setLower] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState({ label: "Strong", color: "#84cc16" });
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeout = useRef(null);

  const generatePassword = useCallback(() => {
    let pool = "";
    if (upper) pool += CHARSETS.upper;
    if (lower) pool += CHARSETS.lower;
    if (numbers) pool += CHARSETS.numbers;
    if (symbols) pool += CHARSETS.symbols;

    if (!pool) return;

    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += pool[secureRandom(pool.length)];
    }
    setPassword(pwd);

    const entropy = length * Math.log2(pool.length);
    if (entropy < 40) setStrength({ label: "Weak", color: "#ef4444" });
    else if (entropy < 60) setStrength({ label: "Fair", color: "#f59e0b" });
    else if (entropy < 80) setStrength({ label: "Strong", color: "#84cc16" });
    else setStrength({ label: "Very Strong", color: "#22c55e" });
  }, [length, upper, lower, numbers, symbols]);

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    generatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [length, upper, lower, numbers, symbols]);

  const handleCheckboxChange = (setter, currentValue) => {
    const others = [
      upper, lower, numbers, symbols,
    ].filter((_, i) => i !== ["upper", "lower", "numbers", "symbols"].indexOf(
      setter === setUpper ? "upper" : setter === setLower ? "lower" : setter === setNumbers ? "numbers" : "symbols"
    ));
    const willAllBeUnchecked = currentValue && !others.some(Boolean);
    if (willAllBeUnchecked) return; // keep at least one checked
    setter(!currentValue);
  };

  const changeLength = (delta) => {
    setLength((prev) => {
      let next = prev + delta;
      if (next < 6) next = 6;
      if (next > 64) next = 64;
      return next;
    });
  };

  const copyPassword = async () => {
    await navigator.clipboard.writeText(password);
    setToastVisible(true);
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => setToastVisible(false), 2500);
  };

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: Arial, sans-serif;
        }

        .pg-body {
          min-height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          background: #f4f6fb;
          padding: 20px;
        }

        .container {
          width: 100%;
          max-width: 600px;
          background: #fff;
          padding: 35px;
          border-radius: 25px;
          box-shadow: 0 15px 40px rgba(0, 0, 0, .1);
        }

        .container h1 {
          margin-bottom: 10px;
              color: black;
        }

        .subtitle {
          color: #666;
          margin-bottom: 30px;
        }

        .password-box {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
          flex-wrap: wrap;
          width: 100%;
        }

        .password {
          flex: 1;
          width: 100%;
          min-width: 0;
          height: 55px;
          border: 2px solid black;
          border-radius: 50px;
          padding: 15px 20px;
          font-family: monospace;
          font-size: 18px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
        }

        .btn {
          border: none;
          cursor: pointer;
          border-radius: 50px;
          font-weight: bold;
        }

        .copy-btn {
          background: black;
          color: white;
          padding: 0px 10px;
        }

        .icon-btn {
          background: white;
          border: 2px solid black;
          padding: 0px 10px;
        }

        .icon-btn img {
          width: 1rem;
        }

        .row {
          margin: 25px 0;
        }

        .range-box {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .range-box button {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid black;
          background: white;
          cursor: pointer;
          font-size: 20px;
        }

        input[type=range] {
          flex: 1;
        }

        .options {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .options label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: bold;
        }

        .strength {
          display: inline-block;
          margin-top: 10px;
          padding: 8px 15px;
          border-radius: 30px;
          font-weight: bold;
          color: #fff;
        }

        .slider,
        .checkbox {
          width: 100%;
          accent-color: black;
        }

        #toast {
          position: fixed;
          bottom: 30px;
          right: 30px;
          padding: 15px 30px;
          border-radius: 50px;
          font-weight: bold;
          color: white;
          background: linear-gradient(90deg, #ff0080, #ff8c00, #40c057, #3b82f6, #8b5cf6);
          background-size: 300%;
          animation: gradient 3s linear infinite;
          opacity: 0;
          transform: translateY(100px) scale(.8);
          transition: .4s;
          pointer-events: none;
        }

        #toast.show {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        @keyframes gradient {
          0% { background-position: 0%; }
          100% { background-position: 300%; }
        }

        @media (max-width: 500px) {
          .password-box {
            flex-direction: column;
          }

          .copy-btn,
          .icon-btn {
            width: 100%;
            padding: 20px;
          }

          #toast {
            right: unset;
          }
        }
      `}</style>

      <div className="pg-body">
        <div className="container">
          <h1>Free Random Password Generator</h1>

          <p className="subtitle">Create a strong random password.</p>

          <div className="password-box">
            <div className="password" id="password">
              {password}
            </div>

            <button className="btn icon-btn" onClick={generatePassword} aria-label="Regenerate password">
              <img src="/gassets/refresh.png" alt="Refresh Generate Password" />
            </button>

            <button className="btn copy-btn" onClick={copyPassword}>
              Copy
            </button>
          </div>

          <div className="row">
            <p>
              Password Length: <strong id="lengthValue">{length}</strong>
            </p>

            <br />

            <div className="range-box">
              <button onClick={() => changeLength(-1)}>−</button>

              <input
                className="slider"
                type="range"
                min="6"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
              />

              <button onClick={() => changeLength(1)}>+</button>
            </div>
          </div>

          <div className="row">
            <p>Characters Used:</p>

            <br />

            <div className="options">
              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={upper}
                  onChange={() => handleCheckboxChange(setUpper, upper)}
                />
                ABC
              </label>

              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={lower}
                  onChange={() => handleCheckboxChange(setLower, lower)}
                />
                abc
              </label>

              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={numbers}
                  onChange={() => handleCheckboxChange(setNumbers, numbers)}
                />
                123
              </label>

              <label>
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={symbols}
                  onChange={() => handleCheckboxChange(setSymbols, symbols)}
                />
                #$&amp;
              </label>
            </div>
          </div>

          <div className="strength" id="strength" style={{ background: strength.color }}>
            {strength.label}
          </div>
        </div>

        <div id="toast" className={toastVisible ? "show" : ""}>
          🎉 Password copied successfully!
        </div>
      </div>
    </>
  );
}