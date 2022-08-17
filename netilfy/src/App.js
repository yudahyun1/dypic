import React from 'react';
import { ChatEngine } from "react-chat-engine";

const App = () => {
  return (
    <div>
    <h1>한달에 7달러 내야합니다</h1>
      <ChatEngine
        height="100vh"
        projectID=""
        userName=""
        userSecret=""
      />
    </div>
  );
};

export default App;