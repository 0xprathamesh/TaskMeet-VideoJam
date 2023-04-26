import { HuddleIframe } from "@huddle01/huddle01-iframe";
import React from "react";

const iframeConfig = {
  roomUrl: "https://iframe.huddle01.com/jcl-gnxm-qqe",
  height: "800px",
  width: "100%",
  noBorder: false, // false by default
};
const meet = () => {
  return (
    <>
      <div className="flex justify-center items-center mx-auto ">
        <HuddleIframe config={iframeConfig} />
      </div>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
            <div
              className="block w-full rounded px-12 py-3 text-md font-medium font-secondary text-white sm:w-auto bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-125">
              Add Tasks
            </div>
          </div>
    </>
  );
};

export default meet;
