import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";
function Main() {
  const {
    onSent,
    recprompt,
    showresult,
    loading,
    resultdata,
    input,
    setInput,
  } = useContext(Context);

  return (
    <div className="main">
      <div className="nav">
        <p>Salaar.AI</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {!showresult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello,Shashank</span>
              </p>
              <p>How can I help you today ?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept : urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstrom team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="result">
              <div className="result-title">
                <img src={assets.user_icon} alt="" />
                <p>{recprompt}</p>
              </div>
              <div className="result-data">
                {/* <img src={assets.gemini_icon} alt="" /> */}
                <img src={assets.aiicon} alt="" />
                {loading ? (
                  <div className="loader">
                    <hr />
                    <hr />
                    <hr />
                  </div>
                ) : (
                  <p dangerouslySetInnerHTML={{ __html: resultdata }}></p>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="main-bottom">
        <div className="search-box">
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Enter a prompt here"
          />
          <div>
            <img src={assets.gallery_icon} alt="" />
            <img src={assets.mic_icon} alt="" />
            {input && <img onClick={() => onSent()} src={assets.send_icon} alt="" /> }
          </div>
        </div>
        <p className="bottom-info">
          Gemini may display inaccurate info,including about people,so
          double-check its responses.Your Privay and Gemini Apps
        </p>
      </div>
    </div>
  );
}

export default Main;