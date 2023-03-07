import { React } from "react";
import MessageListItem from "components/MessageListItem";

// SMS messages can only be sent after a match has been made
// Pictures:on hover -- "SEE PROFILE" -> href on click to profile
/**
 *
 * @param {Object} props: { userId: integer, name: string, message: string, photo_url: string }
 * @returns
 */
export default function MessageList(props) {
  return (
    <div>
      <header>Sent SMS Messages</header>
      <div id="messages-container">
        <div className="messages">
          {/* to be replaced with map of messageListItem */}
          <MessageListItem />
          <MessageListItem />
          <MessageListItem />
          <MessageListItem />
        </div>
      </div>
    </div>
  );
}
