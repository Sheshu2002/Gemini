import { createContext } from "react";
import run from "../config/gemini";
import { useState } from "react";

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recprompt, setRecprompt] = useState(" ");
  const [prevpromts, setPrevprompts] = useState([]);
  const [showresult, setShowresult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultdata, setResultData] = useState("");

  const delayit = (index, nextword) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextword);
    }, 75 * index);
  };

  const newchat = () =>{
    setLoading(false);
    setShowresult(false);
  }
  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowresult(true);
    let response;
    if (prompt !== undefined) {
      response = await run(prompt);
      setRecprompt(prompt);
    } else {
      setPrevprompts(prev => [...prev, input]);
      setRecprompt(input);
      response = await run(input);
    }
    // const response = await run(input);
    let responsearray = response.split("**");
    let newres = "";
    for (let i = 0; i < responsearray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newres += responsearray[i];
      } else {
        newres += "<b>" + responsearray[i] + "</b>";
      }
    }
    let newres2 = newres.split("*").join("</br>");
    // setResultData(newres2);
    let newres2arr = newres2.split(" ");
    for (let i = 0; i < newres2arr.length; i++) {
      const nextword = newres2arr[i];
      delayit(i, nextword + " ");
    }
    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevpromts,
    setPrevprompts,
    onSent,
    setRecprompt,
    recprompt,
    showresult,
    loading,
    resultdata,
    input,
    setInput,
    newchat
  };
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
