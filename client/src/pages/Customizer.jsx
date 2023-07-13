import React, { useState, useEffect } from "react";
import { useSnapshot } from "valtio";
import { AnimatePresence, motion } from "framer-motion";

import state from "../store";
import config from "../config/config";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";

import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  CustomButton,
  ColorPicker,
  AiPicker,
  FilePicker,
  Tab,
} from "../components";

const Customizer = () => {
  // access from the snap
  const snap = useSnapshot(state);

  // file to upload via system
  const [file, setFile] = useState("");

  //
  const [prompt, setPrompt] = useState("");

  const [generatingImg, setGeneratingImg] = useState(false);

  // setting the activetabs
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // function for making generating the tabs
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorPicker":
        return <ColorPicker />;
      case "filePicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aiPicker":
        return (
          <AiPicker
            prompt={prompt}
            setPrompt={setPrompt}
            generatingImg={generatingImg}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return null;
    }
  };

  // function to pick from the ai
  const handleSubmit = async (type) => {
    if (!prompt) return alert("please provide the prompt");
    // call the backend to call the image
    try {
      setGeneratingImg(true);
      const response = await fetch(
        "https://threed-tshirt-55tv.onrender.com/api/v1/dalle",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt,
          }),
        }
      );

      const data = await response.json();

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (err) {
      console.log(err);
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  // handleDecal Function
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    //update the state of the local with decalType
    state[decalType.stateProperty] = result;
    // check if the active Filter tab is present or not
    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;

      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            className="absolute top-0 left-0 z-10"
            key="custom"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* button for go back */}
          <motion.div
            className="absolute right-5 top-5 z-10"
            {...fadeAnimation}
          >
            <CustomButton
              type="filled"
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              title="Go Back"
              handleClick={() => (state.intro = true)}
            />
          </motion.div>
          {/* buttons for filter tabs in bottom */}
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                handleClick={() => handleActiveFilterTab(tab.name)}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
