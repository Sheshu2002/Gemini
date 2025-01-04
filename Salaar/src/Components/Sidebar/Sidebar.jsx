import React, { useContext, useState } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../Context/Context";
function Sidebar() {
  const [extend, setextend] = useState(false);
  const { onSent, prevpromts, setRecprompt ,newchat} = useContext(Context);

  const loadpro = async (prompt) => {
    setRecprompt(prompt);
    await onSent(prompt);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <img
          onClick={() => setextend(!extend)}
          className="menu"
          src={assets.menu_icon}
          alt=""
        />
        <div onClick={()=>newchat()} className="add-chat">
          <img src={assets.plus_icon} alt="" />
          {extend && <p>New Chat</p>}
        </div>
        {extend && (
          <div className="recent">
            <div  className="recent-title">
              <p>Recent</p>
              {prevpromts.map((item, index) => {
                return (
                  <div onClick={() =>loadpro(item)} className="recent-entry">
                    <img src={assets.message_icon} alt="" />
                    <p>{item.slice(0, 16)}...</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt="" />
          {extend && <p>Help</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt="" />
          {extend && <p>Activity</p>}
        </div>
        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt="" />
          {extend && <p>Settings</p>}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
