import React, { useCallback, useEffect, useState } from "react";
import fortImg from "./assets/fort.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(15);
  const [capLetters, setCapLetters] = useState(true);
  const [smallLetters, setSmallLetters] = useState(true);
  const [nums, setNums] = useState(true);
  const [specialChars, setspecialChars] = useState(false);
  const [passStrength, setPassStrength] = useState("very strong");
  const [passColor, setPassColor] = useState("");
  const [copyText, setCopyText] = useState("Copy");
  const [animationInProgress, setAnimationInProgress] = useState(false);

  function handleRefreshClick() {
    if (!animationInProgress) {
      setAnimationInProgress(true);
      randomPasswordGenerator();
      setTimeout(() => {
        setAnimationInProgress(false);
      }, 450);
    }
  }

  function findStrength() {
    if (length >= 12) {
      setPassStrength("very Strong");
      setPassColor("#0070F6");
    } else if (length > 9 && length < 12) {
      setPassStrength("Strong");
      setPassColor("#43ED9C");
    } else if (length > 7 && length <= 9) {
      setPassStrength("Good");
      setPassColor("#F1C80B");
    } else if (length >= 5 && length <= 7) {
      setPassStrength("Weak");
      setPassColor("#F5203E");
    } else if (length < 5) {
      setPassStrength("very weak");
      setPassColor("#F5203E");
    }
  }

  function copyToClipboard() {
    window.navigator.clipboard.writeText(password);
    setCopyText("copied");
  }
  const randomPasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "";
    if (capLetters) str += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (smallLetters) str += "abcdefghijklmnopqrstuvwxyz";
    if (nums) str += "0123456789";
    if (specialChars) str += `#$@&%!?;:,.{}[]|*`;
    for (let i = 1; i <= length; i++) {
      let randIndex = Math.floor(Math.random() * str.length);
      pass += str[randIndex];
    }
    setPassword(pass);
    findStrength();
    if (copyText == "copied") setCopyText("copy");
  });

  useEffect(() => {
    randomPasswordGenerator();
  }, [length, capLetters, nums, specialChars, smallLetters]);

  function handleLengthIncrease() {
    length < 50 && setLength(length + 1);
  }
  function handleLengthDecrease() {
    length > 0 && setLength(length - 1);
  }

  function countSelectedCheckboxes() {
    let count = 0;
    if (capLetters) count++;
    if (smallLetters) count++;
    if (nums) count++;
    if (specialChars) count++;
    return count;
  }
  return (
    <>
      <div className="outerContainer">
        <div className="headingDetail">
          <h1>Random Password Generator</h1>
          <p>
            Create strong and secure passwords to keep your account safe online.
          </p>
        </div>
        <div className="contentDetail">
          <div className="passImage">
            <img src={fortImg} />
          </div>
          <div className="passDetail">
            <div className="inputWrapper">
              <div className="inputDetail">
                <input type="text" disabled value={password} />
                <div>
                  <button
                    className="passPower"
                    style={{ backgroundColor: passColor }}
                  >
                    {passStrength}
                  </button>
                  <button className="refreshBtn">
                    <FontAwesomeIcon
                      icon={faRotateLeft}
                      size="lg"
                      style={{
                        color: "#414141",
                        transition: animationInProgress
                          ? "transform 0.45s ease"
                          : "none",
                        transform: animationInProgress
                          ? "rotate(-360deg)"
                          : "none",
                      }}
                      onClick={handleRefreshClick}
                    />
                  </button>
                </div>
              </div>
              <button className="cpyBtn" onClick={copyToClipboard}>
                {copyText}
              </button>
            </div>
            <div className="passLengthWrapper">
              <p>
                Password length: <span className="passLengthVal">{length}</span>
              </p>
              <div className="rangeWrapper">
                <button className="lessBtn" onClick={handleLengthDecrease}>
                  -
                </button>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={length}
                  onChange={(e) => {
                    setLength(Number(e.target.value));
                  }}
                />
                <button className="moreBtn" onClick={handleLengthIncrease}>
                  +
                </button>
              </div>
            </div>
            <div className="charsUsed">
              <p>Characters used:</p>
              <div className="charInputWrap">
                <div>
                  <input
                    type="checkbox"
                    id="ABC"
                    checked={capLetters}
                    onChange={() => setCapLetters((prev) => !prev)}
                    disabled={countSelectedCheckboxes() === 1 && capLetters}
                  />
                  <label htmlFor="ABC">ABC</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="abc"
                    checked={smallLetters}
                    onChange={() => setSmallLetters((prev) => !prev)}
                    disabled={countSelectedCheckboxes() === 1 && smallLetters}
                  />
                  <label htmlFor="abc">abc</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="123"
                    checked={nums}
                    onChange={() => setNums((prev) => !prev)}
                    disabled={countSelectedCheckboxes() === 1 && nums}
                  />
                  <label htmlFor="123">123</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="specialChar"
                    checked={specialChars}
                    onChange={() => setspecialChars((prev) => !prev)}
                    disabled={countSelectedCheckboxes() === 1 && specialChars}
                  />
                  <label htmlFor="specialChar">#$&</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
