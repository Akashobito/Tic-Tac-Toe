import { useEffect, useRef, useState } from "react";
import "@fontsource-variable/montserrat/wght.css";
import "./App.css";
import { checkWin } from "./logic";
import { AnimatePresence, motion } from "framer-motion";

let intervalCode;

function App() {
  const [yourMove, setYourMove] = useState("x");
  const [aiMove, setAiMove] = useState("o");
  const [pvp, setPvp] = useState(true);
  const [clickCount, setClickCount] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [moveCount, setMoveCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);
  const [result, setResult] = useState("");
  const [swap, setSwap] = useState(false);
  const [start, setStart] = useState(true);
  const [alert, setAlert] = useState(false);
  const [array, setArray] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);

  useEffect(() => {
    let intervalCode = setTimeout(() => {
      setAlert(false);
    }, 1000);
    return () => {
      clearInterval(intervalCode);
    };
  }, [alert]);

  useEffect(() => {
    if (swap) {
      setYourMove("o");
      setAiMove("x");
    } else {
      setYourMove("x");
      setAiMove("o");
    }
  }, [swap]);

  useEffect(() => {
    let intervalCode = setTimeout(() => {
      setStart(false);
    }, 100);

    return () => {
      clearInterval(intervalCode);
    };
  }, []);

  const handleClick = (event, first, second) => {
    // console.log(event.currentTarget)
    // console.log(first,second)
    // const xoIcon = event.currentTarget.lastChild;
    // const index = event.target.innerText;
    clickCount[first][second] = 1;
    setClickCount([...clickCount]);

    setMoveCount((prev) => prev + 1);

    if (yourMove === "x") {
      array[first][second] = "x";
      setArray([...array]);
      // xoIcon.classList.add(`fa-${array[first][second]}`);
      // xoIcon.classList.remove("fa-o");
      if(pvp){
        setYourMove("o");
      }
    } else {
      array[first][second] = "o";
      setArray([...array]);
      // xoIcon.classList.remove("fa-x");
      // xoIcon.classList.add("fa-o");
      if(pvp){
        setYourMove("x");
      }
    }
  };

  const handleCPUMove = () => {
    const { first } = randomNumbers();
    const { second } = randomNumbers();

    function randomNumbers() {
      let first;
      let second;
      const randomNumber1 = Number(Math.random().toFixed(1));
      if (randomNumber1 > 0 && randomNumber1 <= 0.3) {
        first = 0;
      } else if (randomNumber1 > 0.3 && randomNumber1 <= 0.6) {
        first = 1;
      } else {
        first = 2;
      }

      const randomNumber2 = Number(Math.random().toFixed(1));
      if (randomNumber2 > 0 && randomNumber2 <= 0.3) {
        second = 0;
      } else if (randomNumber2 > 0.3 && randomNumber2 <= 0.6) {
        second = 1;
      } else {
        second = 2;
      }
      return { first, second };
    }
    return { first, second };
  };

  useEffect(() => {
    const PcMove = () => {
      let intervalCode;
      const findOMove = () => {
        const { first } = handleCPUMove();
        const { second } = handleCPUMove();
        if (array[first][second] != "x" && array[first][second] != "o") {
          array[first][second] = aiMove;
          clickCount[first][second] = 1;
          setClickCount([...clickCount]);
          setArray([...array]);
        } else {
          findOMove();
        }
      };
      if (moveCount > 0 && moveCount < 5) {
        intervalCode = setTimeout(() => {
          findOMove();
        }, 300);
      }

      return () => {
        clearInterval(intervalCode);
      };
    };

    if(!pvp){
      PcMove();
    }
  }, [moveCount]);

  const handleReset = () => {
    const empty = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
    setArray(empty);
    setIsEnd(false);
    setClickCount([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setMoveCount(0);
    // setYourMove(yourMove)
    if(pvp && !swap){
      setYourMove('x')
    }else if(pvp && swap){
      setYourMove('o')
    }
  };

  useEffect(() => {
    if (moveCount >= 2 && !pvp) {
      clearInterval(intervalCode); //to terminate the interval
      const result = checkWin(array, moveCount);
      // console.log(result);
      if (result === "x win") {
        setClickCount([
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ]);
        if (yourMove === "x") {
          setResult("You Win");
        } else if (yourMove === "o") {
          setResult("You Lose");
        }
        setMoveCount(0);
        intervalCode = setTimeout(() => {
          setIsEnd(true);
        }, 200);
      } else if (result === "o win") {
        setClickCount([
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ]);
        if (yourMove === "o") {
          setResult("You Win");
        } else if (yourMove === "x") {
          setResult("You Lose");
        }
        setMoveCount(0);
        intervalCode = setTimeout(() => {
          setIsEnd(true);
        }, 200);
      } else if (result === "draw") {
        setClickCount([
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ]);
        setResult("Draw");
        setMoveCount(0);
        // setYourMove("x");
        intervalCode = setTimeout(() => {
          setIsEnd(true);
        }, 200);
      }
    }else if(moveCount >=2 && pvp){
      clearInterval(intervalCode); //to terminate the interval for setInterval in setEnd
      const result = checkWin(array, moveCount,pvp);
      // console.log(result);
      if (result === "x win") {
        setClickCount([
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ]);
        
        if(pvp && !swap){
          setResult("Player 1 Wins")
        } else if(pvp && swap){
          setResult('Player 2 Wins')
        }
        setMoveCount(0);
        intervalCode = setTimeout(() => {
          setIsEnd(true);
        }, 200);
      } else if (result === "o win") {
        setClickCount([
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ]);
        
        if(pvp && !swap){
          setResult("Player 2 wins")
        } else if(pvp && swap){
          setResult("Player 1 Wins")
        }
        setMoveCount(0);
        intervalCode = setTimeout(() => {
          setIsEnd(true);
        }, 200);
      } else if (result === "draw") {
        setClickCount([
          [0, 0, 0],
          [0, 0, 0],
          [0, 0, 0],
        ]);
        setResult("Draw");
        setMoveCount(0);
        // setYourMove("x");
        intervalCode = setTimeout(() => {
          setIsEnd(true);
        }, 200);
      }
    }
  }, [array]);

  return (
    <>
      <AnimatePresence>
        {isEnd && ( //modal to retry
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed flex justify-center items-center top-0 left-0 right-0 w-full h-[100vh] backdrop-blur-xs"
          >
            <motion.div
              initial={{
                y: -600,
              }}
              animate={{
                y: 0,
                transition: {
                  duration: 0.5,
                  type: "spring",
                },
              }}
              exit={{
                y: -600,
                transition: {
                  duration: 0.5,
                },
              }}
              className="bg-gray-600 w-60 h-50 rounded-2xl text-white flex flex-col justify-center items-center space-y-3 font-Roboto font-semibold tracking-wider"
            >
              <p className="text-xl">Match Ended!!</p>
              <p>{result}</p>
              <button
                onClick={handleReset}
                className="bg-orange-300 text-gray-600 mt-3 px-5 py-1 rounded-sm cursor-pointer"
              >
                Retry
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {start && (
          <motion.div
            exit={{
              opacity: 0,
              y: 100,
              transition: {
                duration: 0.5,
              },
            }}
            className="fixed w-full h-[100vh] flex justify-center items-center"
          >
            <p className="font-mono text-2xl mt-23 bg-white font-bold px-4 py-1 border-2 rounded-xl">
              Start
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{
              y: -100,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.5,
                type: "spring",
              },
            }}
            exit={{
              y: -100,
              transition: {
                duration: 0.5,
                type: "spring",
              },
            }}
            className="absolute w-full top-10 flex justify-center items-center"
          >
            <p className="font-Roboto shadow-lg inset-shadow-2xs font-semibold px-5 py-2 text-black bg-gray-400 rounded-2xl text-center">
              You cannot Change it <br></br> right now
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col justify-center items-center w-full h-[100vh]">
        <p className="text-black font-Roboto text-3xl font-semibold mb-10">
          TIC-TAC-TOE
        </p>
        <div
          className="cursor-pointer"
          onClick={() => {
            setPvp(!pvp);
          }}
        >
          {!pvp ?<div className="border-2 font-Roboto font-semibold px-5 py-1 rounded-sm">
            <i  className="fa-solid fa-user mr-1"></i> Vs 
            <i  className="fa-solid fa-user ml-2 "></i>
          </div> 
          : 
          <div className="border-2 font-Roboto font-semibold px-5 py-1 rounded-sm">
            <i  className="fa-solid fa-user mr-1"></i> Vs 
            <i  className="fa-solid fa-robot ml-2"></i>
          </div>}
        </div>
        <div className="flex space-x-10 mb-8 mt-8">
          <p className="border-2 text-black font-Roboto font-semibold mt-3 px-5 py-1 rounded-sm cursor-pointer">
           {pvp?  (<i className="fa-solid fa-user mr-4"><span className="ml-0.5 text-lg font-medium font-Roboto">1</span></i>) : (<i className="fa-solid fa-user mr-1"></i>) }
            <span className={!swap ? "text-red-400" : "text-green-500"}>
              {swap ? "O" : "X"}
            </span>
          </p>
          <div>
            <motion.i
              whileTap={{
                rotate: 180,
              }}
              onClick={() => {
                if (moveCount <= 0) {
                  setSwap(!swap);
                } else {
                  setAlert(true);
                }
              }}
              className="cursor-pointer mt-5 text-xl fa-solid fa-arrows-rotate"
            ></motion.i>
          </div>
          <p className="border-2 text-black font-Roboto font-semibold mt-3 px-5 py-1 rounded-sm cursor-pointer">
            {pvp? (<i className="fa-solid fa-user mr-4 "><span className="ml-0.5 text-lg font-medium font-Roboto text-black">2</span></i>):  <i  className="fa-solid fa-robot ml-2 mr-2"></i> }
            <span className={swap ? "text-red-400" : "text-green-500"}>
              {swap ? "X" : "O"}
            </span>
          </p>
        </div>
        <div className="grid grid-cols-3 w-80 h-70 [&_div]:cursor-pointer [&_div]:border-1 overflow-hidden border-2 rounded-2xl">
          <div
            onClick={
              clickCount[0][0] < 1
                ? (event) => {
                    handleClick(event, 0, 0);
                  }
                : null
            }
            className="box flex justify-center items-center"
          >
            <span className="opacity-0">0</span>
            <i
              className={
                array[0][0] === "x"
                  ? "fa-solid text-red-400"
                  : "fa-solid text-green-400"
              }
            >
              {array[0][0]}
            </i>
          </div>
          <div
            onClick={
              clickCount[0][1] < 1
                ? (event) => {
                    handleClick(event, 0, 1);
                  }
                : null
            }
            className="box flex justify-center items-center"
          >
            <span className="opacity-0">1</span>
            <i
              className={
                array[0][1] === "x"
                  ? "fa-solid text-red-400"
                  : "fa-solid text-green-400"
              }
            >
              {array[0][1]}
            </i>
          </div>
          <div
            onClick={
              clickCount[0][2] < 1
                ? (event) => {
                    handleClick(event, 0, 2);
                  }
                : null
            }
            className="box flex justify-center items-center"
          >
            <span className="opacity-0">2</span>
            <i
              className={
                array[0][2] === "x"
                  ? "fa-solid text-red-400"
                  : "fa-solid text-green-400"
              }
            >
              {array[0][2]}
            </i>
          </div>
          <div
            onClick={
              clickCount[1][0] < 1
                ? (event) => {
                    handleClick(event, 1, 0);
                  }
                : null
            }
            className="box flex justify-center items-center"
          >
            <span className="opacity-0">3</span>
            <i
              className={
                array[1][0] === "x"
                  ? "fa-solid text-red-400"
                  : "fa-solid text-green-400"
              }
            >
              {array[1][0]}
            </i>
          </div>
          <div
            onClick={
              clickCount[1][1] < 1
                ? (event) => {
                    handleClick(event, 1, 1);
                  }
                : null
            }
            className="box flex justify-center items-center"
          >
            <span className="opacity-0">4</span>
            <i
              className={
                array[1][1] === "x"
                  ? "fa-solid text-red-400"
                  : "fa-solid text-green-400"
              }
            >
              {array[1][1]}
            </i>
          </div>
          <div
            onClick={
              clickCount[1][2] < 1
                ? (event) => {
                    handleClick(event, 1, 2);
                  }
                : null
            }
            className="box flex justify-center items-center"
          >
            <span className="opacity-0">5</span>
            <i
              className={
                array[1][2] === "x"
                  ? "fa-solid text-red-400"
                  : "fa-solid text-green-400"
              }
            >
              {array[1][2]}
            </i>
          </div>
          <div
            onClick={
              clickCount[2][0] < 1
                ? (event) => {
                    handleClick(event, 2, 0);
                  }
                : null
            }
            className="box flex justify-center items-center"
          >
            <span className="opacity-0">6</span>
            <i
              className={
                array[2][0] === "x"
                  ? "fa-solid text-red-400"
                  : "fa-solid text-green-400"
              }
            >
              {array[2][0]}
            </i>
          </div>
          <div
            onClick={
              clickCount[2][1] < 1
                ? (event) => {
                    handleClick(event, 2, 1);
                  }
                : null
            }
            className="box flex justify-center items-center"
          >
            <span className="opacity-0">7</span>
            <i
              className={
                array[2][1] === "x"
                  ? "fa-solid text-red-400"
                  : "fa-solid text-green-400"
              }
            >
              {array[2][1]}
            </i>
          </div>

          <div
            onClick={
              clickCount[2][2] < 1
                ? (event) => {
                    handleClick(event, 2, 2);
                  }
                : null
            }
            className="box flex justify-center items-center"
          >
            <span className="opacity-0">8</span>
            <i
              className={
                array[2][2] === "x"
                  ? "fa-solid text-red-400"
                  : "fa-solid text-green-400"
              }
            >
              {array[2][2]}
            </i>
          </div>
        </div>
        <button
          onClick={handleReset}
          className="bg-orange-300 text-xl text-black font-Roboto font-semibold mt-5 px-5 py-2 rounded-sm cursor-pointer"
        >
          Reset
        </button>
      </div>
    </>
  );
}

export default App;
