import React, { useState, useEffect } from 'react';
import { Settings, Circle } from 'lucide-react';
import Grid from './components/Grid';
import MeetControls from './components/MeetControls';
import ConfigPanel from './components/ConfigPanel';
import { Participant, MeetingDetails, MOCK_IMAGES } from './types';

const App: React.FC = () => {
  const [showConfig, setShowConfig] = useState(true);
  const [uiHidden, setUiHidden] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const [details, setDetails] = useState<MeetingDetails>({
    time: "10:53 AM",
    code: "dzt-mroa-txo",
    isRecording: false,
    theme: 'gradient',
    layout: 'auto'
  });

  const [participants, setParticipants] = useState<Participant[]>([
    {
      id: '1',
      name: 'Algo Tutor',
      imageUrl: MOCK_IMAGES[0],
      presentationContent: null,
      isMuted: false,
      isVideoOff: true,
      isNetworkError: false,
      isSpeaking: true,
      isPinned: false,
      isHandRaised: false,
      isPresenting: true, // Algo Tutor presenting
    },
    {
      id: '2',
      name: 'S Yuvaraj',
      imageUrl: MOCK_IMAGES[1],
      presentationContent: null,
      isMuted: true,
      isVideoOff: true,
      isNetworkError: false,
      isSpeaking: false,
      isPinned: false,
      isHandRaised: false,
      isPresenting: false,
    },
    {
      id: '3',
      name: 'A Anandaraj',
      imageUrl: MOCK_IMAGES[2],
      presentationContent: null,
      isMuted: true,
      isVideoOff: true,
      isNetworkError: false,
      isSpeaking: false,
      isPinned: false,
      isHandRaised: false,
      isPresenting: false,
    },
    {
      id: '4',
      name: 'M Suriya',
      imageUrl: MOCK_IMAGES[3],
      presentationContent: null,
      isMuted: true,
      isVideoOff: true,
      isNetworkError: false,
      isSpeaking: false,
      isPinned: false,
      isHandRaised: false,
      isPresenting: false,
    }
  ]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setUiHidden(false);
        setShowToast(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleHideUI = () => {
    setUiHidden(true);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="relative h-screen w-screen flex flex-col bg-[#202124] text-white overflow-hidden">
      
      {/* Recording Indicator (Top Left) */}
      {details.isRecording && (
        <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-[#202124] bg-opacity-80 px-3 py-1.5 rounded text-xs font-medium text-gray-200">
           <Circle size={10} className="fill-red-500 text-red-500 animate-pulse" />
           REC
        </div>
      )}

      {/* Main Grid Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col">
        <Grid participants={participants} layout={details.layout} theme={details.theme} />
      </div>

      {/* Bottom Controls */}
      <MeetControls details={details} participantCount={participants.length} />

      {/* Configuration Toggle Button (Floating) */}
      {!uiHidden && (
        <div className="absolute top-4 right-4 z-50">
          <button 
            onClick={() => setShowConfig(!showConfig)}
            className={`p-2 rounded-full shadow-lg transition-colors ${showConfig ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            title={showConfig ? "Hide Config" : "Configure Mock"}
          >
            <Settings size={24} />
          </button>
        </div>
      )}

      {/* Config Panel */}
      {!uiHidden && showConfig && (
        <ConfigPanel 
          participants={participants}
          setParticipants={setParticipants}
          details={details}
          setDetails={setDetails}
          onClose={() => setShowConfig(false)}
          onHideUI={handleHideUI}
        />
      )}

      {/* Screenshot Mode Toast */}
      {showToast && (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-80 text-white px-6 py-3 rounded-full text-sm font-medium shadow-xl pointer-events-none transition-opacity duration-500 z-[100]">
           UI Hidden for Screenshot. Press <span className="font-bold text-blue-400">ESC</span> to restore.
        </div>
      )}
    </div>
  );
};

export default App;