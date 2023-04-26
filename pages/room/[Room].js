import { useEventListener, useHuddle01 } from "@huddle01/react";
import { Video } from "@huddle01/react/components";
import {
  useLobby,
  useMeetingMachine,
  useAudio,
  useVideo,
  useRoom,
  usePeers,
} from "@huddle01/react/hooks";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import ControlButton from "@/components/elements/ControlButton";
import Modal from "@/components/elements/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Room = () => {
  const router = useRouter();
  const { Room } = router.query;
  const { address } = useAccount();
  console.log(address);
  const { initialize, isInitialized } = useHuddle01();
  const { joinLobby } = useLobby();
  const { state } = useMeetingMachine();
  const {
    fetchAudioStream,
    stopAudioStream,
    error: micError,
    produceAudio,
    stopProducingAudio,
    stream: micStream,
  } = useAudio();
  const [isMuted, setIsMuted] = useState(true);
  const {
    fetchVideoStream,
    stopVideoStream,
    error: camError,
    produceVideo,
    stopProducingVideo,
    stream: camStream,
  } = useVideo();
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const { joinRoom, leaveRoom } = useRoom();
  const { peerIds, peers } = usePeers();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // its preferable to use env vars to store projectId
    initialize("KL1r3E1yHfcrRbXsT4mcE-3mK60Yc3YR");
  }, []);

  const videoRef = useRef();
  useEventListener("lobby:cam-on", () => {
    if (state.context.camStream && videoRef.current)
      videoRef.current.srcObject = state.context.camStream;
  });

  useEffect(() => {
    if (address) {
      router.replace(`/room/${address}`);
    }
  }, [address]);

  useEffect(() => {
    return () => {
      <div className="w-[40%] border-2 border-gray-500 rounded-lg overflow-hidden my-20 relative h-[40vh]">
        <video ref={videoRef} autoPlay muted playsInline></video>
      </div>;
    };
  });

  const toggleAudio = () => {
    if (isMuted) {
      fetchAudioStream();
    } else {
      stopAudioStream();
    }
    setIsMuted(!isMuted);
  };

  const toggleWebcam = () => {
    if (isWebcamOn) {
      stopVideoStream();
    } else {
      fetchVideoStream();
    }
    setIsWebcamOn(!isWebcamOn);
  };

  return (
    <>
      <div className="container mx-auto">
        <div className="">
          <h2 className="text-xl">Room State</h2>
          <h3>{JSON.stringify(state.value)}</h3>
          {isInitialized ? "Hello World!" : "Please initialize"}
        </div>

        <div className="flex justify-around items-center">
          <div className="w-[40%] border-2 border-gray-500 rounded-lg overflow-hidden my-20 relative h-[40vh]">
            <video ref={videoRef} autoPlay muted playsInline></video>
          </div>

          <div className="w-[40%] border-2 border-gray-500 rounded-lg overflow-hidden my-20 relative h-[40vh]">
            {Object.values(peers)
              .filter((peer) => peer.cam)
              .map((peer) => {
                return (
                  <Video
                    key={peer.peerId}
                    peerId={peer.peerId}
                    track={peer.cam}
                    debug
                    autoPlay
                    playsInline
                    style={{ width: "100%" }}
                  />
                );
              })}
          </div>
        </div>
        <div className="flex justify-center items-center max-w-4xl p-3 my-10  mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg ">
          <ControlButton
            disabled={!joinLobby.isCallable}
            onClick={() => joinLobby("mql-yjpp-evn")}
            label={"Join looby"}
          />
          <ControlButton
            disabled={
              isWebcamOn
                ? !stopVideoStream.isCallable
                : !fetchVideoStream.isCallable
            }
            onClick={toggleWebcam}
            label={isWebcamOn ? "Camera Off" : "Camera On"}
          />
          <ControlButton
            disabled={
              isMuted
                ? !fetchAudioStream.isCallable
                : !stopAudioStream.isCallable
            }
            onClick={toggleAudio}
            label={isMuted ? "Mic On " : "Mic Off"}
          />

          <ControlButton
            disabled={!joinRoom.isCallable}
            onClick={joinRoom}
            label={"Join Room"}
          />
          <ControlButton
            disabled={!leaveRoom.isCallable}
            onClick={leaveRoom}
            label={"Leave Room"}
          />

          <ControlButton
            disabled={!produceVideo.isCallable}
            onClick={() => produceVideo(camStream)}
            label={"Share Video"}
          />
          <ControlButton
            disabled={!produceAudio.isCallable}
            onClick={() => produceAudio(micStream)}
            label={"Share Audio"}
          />
          <div className="hover:text-black">
            <ul className="cursor-pointer" onClick={() => setShowModal(true)}>
              <li className="mx-2 font-primary">Add Note</li>
            </ul>
          </div>
        </div>
        <ToastContainer />
      </div>
      <Modal isVisible={showModal} onClose={() => setShowModal(false)}>
        <div className="py-3 px-3 lg:px-4 text-left">
          <h3 className="font-medium font-primary">
            Add Your Task
          </h3>
          <form action="#" className="space-y-6">
            <div>
              {/* <label className="block mb-2 text-sm font-medium ">Your Mail</label> */}
              <input type="text" placeholder="Enter Note Title" />
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
};
export default Room;
