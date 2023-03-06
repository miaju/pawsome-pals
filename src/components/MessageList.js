import { useState, React } from "react";

// SMS messages can only be sent after a match has been made
// Pictures:on hover -- "SEE PROFILE" -> href on click to profile
export default function MessageList()
 {
  return (
    <div>
      Pawtential Matches
      <header>Sent SMS Messages</header>
      <div id="messages-container">
        <div className="messages">
          Picture Here: Sent message here. <br />
          Picture Here: Sent message here. <br />
          Picture Here: Sent message here. <br />
          Picture Here: Sent message here. <br />
        </div>

      </div>
    </div>
  );
 }
