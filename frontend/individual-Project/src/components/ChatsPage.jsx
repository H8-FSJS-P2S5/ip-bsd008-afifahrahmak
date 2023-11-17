import { PrettyChatWindow } from "react-chat-engine-pretty";

const ChatsPage = (props) => {
  return (
    <>
      <div style={{ height: "100vh" }}>
        <PrettyChatWindow
          projectId="
          
28777bd5-5c7b-4659-9634-5dbf74b3f227"
          username={props.user.username}
          secret={props.user.secret}
          style={{ height: "100%" }}
        />
      </div>
    </>
  );
};

export default ChatsPage;
