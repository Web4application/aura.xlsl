import React, { useState } from "react";
import { runAuraQuery } from "../../api/bridge";

export default function AuraInput({ onResult }) {
  const [text, setText] = useState("");

  async function handleSubmit() {
    if (!text.trim()) return;

    const response = await runAuraQuery(text);
    onResult(response);
    setText("");
  }

  return (
    <div className="aura-input">
      <textarea 
        placeholder="Ask Aura anything… or start with .xlmath, .xldata, .xlcode" 
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={handleSubmit}>Run</button>
    </div>
  );
}
