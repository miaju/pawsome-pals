import { React } from "react";
import "./styling/MessageListItem.scss";

/**
 *
 * @returns Each message to be rendered in MessageList
 */
export default function MessageListItem() {
  return (
    <div id="message-container">
      <div className="receiver">
      <span id="name"> Baxter</span>
      <img src="https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_4x3.jpg" />
      </div>
      <div id="sent-message-container">
        <span id="you">You:</span>
        Sent message here.
        Adding some filler for a really long message. Probably with
        a max character limit of 140 so nothing too outrageous. <br />
      </div>
    </div>
  );
}
