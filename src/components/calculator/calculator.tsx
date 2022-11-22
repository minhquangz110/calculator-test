import React, { useCallback, useRef } from "react";
import { useState } from "react";
import { EKeyItemType, IKeyItem } from "../../types/keyItem";
import { EOperator } from "../../types/operator";
import "./styles.scss";
import { FaBackspace, FaHistory } from "react-icons/fa";
import { formatNumber } from "../../utils/formatNumber";
import { IHistory } from "../../types/history";
import { useFadeAnimation } from "../../hooks/useFadeAnimation";
import useSound from "use-sound";
import clickSound from "../../assets/sounds/click.mp3";
var stringMath = require("string-math");
export const Calculator = () => {
  const resultRef = useRef("");
  const [display, setDisplay] = useState("");

  const [histories, setHistories] = useState<IHistory[]>([]);

  const fontSizeDisplay = display.length > 14 ? "fontSize20" : "";

  const [fadeClass, { toggle }] = useFadeAnimation();

  const [play] = useSound(clickSound);

  const updateDisplay = (value: string) => {
    try {
      if (value === "") {
        resultRef.current = "";
      } else {
        resultRef.current = stringMath(value);
      }
    } catch (e) {
      resultRef.current = "Err";
    }
    setDisplay(value);
  };

  const clearHistory = () => {
    setHistories([]);
  };
  const backSpace = () => {
    const value = display.slice(0, -1);
    updateDisplay(value);
  };

  const inputHandler = (keyItem: IKeyItem) => {
    switch (keyItem.type) {
      case EKeyItemType.OPERATOR: {
        switch (keyItem.key) {
          case EOperator.CLEAR: {
            updateDisplay("");
            break;
          }
          case EOperator.EQUAL: {
            setHistories([
              ...histories,
              {
                display: display,
                result: resultRef.current,
              },
            ]);
            setDisplay(resultRef.current.toString());

            resultRef.current = "";

            break;
          }
          default: {
            updateDisplay(display + keyItem.key);
          }
        }
        break;
      }
      default: {
        updateDisplay(display + keyItem.key);
      }
    }
  };
  const keyItems: IKeyItem[] = [
    {
      key: EOperator.CLEAR,
      label: "C",
      type: EKeyItemType.OPERATOR,
    },
    {
      key: EOperator.OPEN_PARENTHESIS,
      label: "(",
      type: EKeyItemType.OPERATOR,
    },
    {
      key: EOperator.CLOSE_PARENTHESIS,
      label: ")",
      type: EKeyItemType.OPERATOR,
    },
    {
      key: EOperator.DIVIDE,
      label: "/",
      type: EKeyItemType.OPERATOR,
    },
    { key: "7", label: "7", type: EKeyItemType.VALUE },
    { key: "8", label: "8", type: EKeyItemType.VALUE },
    { key: "9", label: "9", type: EKeyItemType.VALUE },
    {
      key: EOperator.MULTI,
      label: "x",
      type: EKeyItemType.OPERATOR,
    },
    { key: "4", label: "4", type: EKeyItemType.VALUE },
    { key: "5", label: "5", type: EKeyItemType.VALUE },
    { key: "6", label: "6", type: EKeyItemType.VALUE },
    {
      key: EOperator.MINUS,
      label: "-",
      type: EKeyItemType.OPERATOR,
    },
    { key: "1", label: "1", type: EKeyItemType.VALUE },
    { key: "2", label: "2", type: EKeyItemType.VALUE },
    { key: "3", label: "3", type: EKeyItemType.VALUE },
    {
      key: EOperator.PLUS,
      label: "+",
      type: EKeyItemType.OPERATOR,
    },
    {
      key: "00",
      label: "00",
      type: EKeyItemType.VALUE,
    },
    { key: "0", label: "0", type: EKeyItemType.VALUE },
    { key: ".", label: ".", type: EKeyItemType.VALUE },
    {
      key: EOperator.EQUAL,
      label: "=",
      type: EKeyItemType.OPERATOR,
    },
  ];

  return (
    <div className="calculator-wrapper">
      <div className="container">
        <div className="result">
          <div className={"display display-current " + fontSizeDisplay}>
            {display}
          </div>
          <div className="display display-result">
            {formatNumber(resultRef.current)}
          </div>
          <div className="toolkit-container">
            <button
              className="btn toolkit btn-history"
              onClick={() => {
                toggle();
              }}
            >
              <FaHistory />
            </button>
            <button className="btn toolkit btn-back-space">
              <FaBackspace onClick={backSpace} />
            </button>
          </div>
        </div>

        <div className="keyboard">
          <div className={"history-container " + fadeClass}>
            <div className="history-content-container">
              {histories.map((history) => {
                return (
                  <div className="history-content">
                    <div className="history-display">{history.display}</div>
                    <div className="history-result">={history.result}</div>
                  </div>
                );
              })}
            </div>

            <button className="btn btn-clear-history" onClick={clearHistory}>
              Clear history
            </button>
          </div>

          {keyItems.map((keyItem) => {
            return (
              <button
                key={keyItem.key}
                onClick={() => {
                  play()
                  inputHandler(keyItem);
                }}
                className={"btn item " + keyItem.type}
              >
                {keyItem.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
