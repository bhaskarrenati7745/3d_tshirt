import React from "react";
import CustomButton from "./CustomButton";

const AiPicker = ({ generatingImg, prompt, setPrompt, handleSubmit }) => {
  return (
    <div className="aipicker-container">
      <textarea
        rows={5}
        className="aipicker-textarea"
        placeholder="Ask Ai.."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <div className="flex flex-wrap gap-3">
        {generatingImg ? (
          <CustomButton
            title="Asking Ai..."
            type="outline"
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton
              title="AI Logo"
              type="outline"
              handleClick={() => handleSubmit("logo")}
              customStyles="text-xs"
            />
            <CustomButton
              title="AI Full"
              type="filled"
              handleClick={() => handleSubmit("full")}
              customStyles="text-xs"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AiPicker;
