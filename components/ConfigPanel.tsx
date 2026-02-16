import React, { useState } from 'react';
import { Participant, MeetingDetails, MOCK_IMAGES, MeetingTheme, MeetingLayout } from '../types';
import { X, Plus, Upload, Trash2, Mic, MicOff, Video, VideoOff, Pin, Layout, Monitor, WifiOff, Camera } from 'lucide-react';

interface ConfigPanelProps {
  participants: Participant[];
  setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
  details: MeetingDetails;
  setDetails: React.Dispatch<React.SetStateAction<MeetingDetails>>;
  onClose: () => void;
  onHideUI: () => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({ 
  participants, 
  setParticipants, 
  details, 
  setDetails, 
  onClose,
  onHideUI
}) => {
  
  const handleAddParticipant = () => {
    const newId = Date.now().toString();
    const randomImage = MOCK_IMAGES[Math.floor(Math.random() * MOCK_IMAGES.length)];
    setParticipants([...participants, {
      id: newId,
      name: `User ${participants.length + 1}`,
      imageUrl: randomImage,
      presentationContent: null,
      isMuted: true,
      isVideoOff: true, // Default to video off to show gradient
      isNetworkError: false,
      isSpeaking: false,
      isPinned: false,
      isHandRaised: false,
      isPresenting: false
    }]);
  };

  const updateParticipant = (id: string, updates: Partial<Participant>) => {
    // If setting isPresenting to true, ensure others are set to false (exclusive presenting for mock simplicity)
    if (updates.isPresenting === true) {
      setParticipants(prev => prev.map(p => 
        p.id === id ? { ...p, ...updates } : { ...p, isPresenting: false }
      ));
    } else {
      setParticipants(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
    }
  };

  const removeParticipant = (id: string) => {
    setParticipants(prev => prev.filter(p => p.id !== id));
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>, field: 'imageUrl' | 'presentationContent') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateParticipant(id, { [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="absolute top-0 right-0 h-[calc(100vh-80px)] w-full sm:w-96 bg-white dark:bg-zinc-900 shadow-2xl z-50 overflow-y-auto border-l border-zinc-700 text-zinc-800 dark:text-zinc-200">
      <div className="sticky top-0 bg-white dark:bg-zinc-900 p-4 border-b border-zinc-700 flex justify-between items-center z-10">
        <h2 className="text-xl font-bold">Mock Configuration</h2>
        <div className="flex items-center gap-1">
          <button 
            onClick={onHideUI} 
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full mr-1"
            title="Hide UI for Screenshot (Press ESC to restore)"
          >
            <Camera size={16} />
          </button>
          <button onClick={onClose} className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full">
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Meeting Details Section */}
        <section className="space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-500">Meeting Info</h3>
          <div className="grid grid-cols-2 gap-4">
             <div>
                <label className="text-xs mb-1 block">Time</label>
                <input 
                  type="text" 
                  value={details.time}
                  onChange={(e) => setDetails({...details, time: e.target.value})}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 rounded p-2 text-sm border border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none"
                />
             </div>
             <div>
                <label className="text-xs mb-1 block">Meeting Code</label>
                <input 
                  type="text" 
                  value={details.code}
                  onChange={(e) => setDetails({...details, code: e.target.value})}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 rounded p-2 text-sm border border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none"
                />
             </div>
          </div>
          <div className="flex items-center gap-2">
             <input 
              type="checkbox" 
              id="recording"
              checked={details.isRecording}
              onChange={(e) => setDetails({...details, isRecording: e.target.checked})}
              className="rounded text-blue-500 focus:ring-blue-500 bg-zinc-800"
             />
             <label htmlFor="recording" className="text-sm">Show Recording Indicator</label>
          </div>
        </section>

        <hr className="border-zinc-700" />
        
        {/* Layout & Theme Section */}
        <section className="space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-500">View Settings</h3>
          <div className="space-y-3">
             <div>
                <label className="text-xs mb-1 block">Tile Theme</label>
                <select 
                  value={details.theme}
                  onChange={(e) => setDetails({...details, theme: e.target.value as MeetingTheme})}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 rounded p-2 text-sm border border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none"
                >
                  <option value="gradient">Modern Gradient (Colorful)</option>
                  <option value="classic">Classic (Dark Grey)</option>
                </select>
             </div>
             <div>
                <label className="text-xs mb-1 block">Grid Layout</label>
                <select 
                  value={details.layout}
                  onChange={(e) => setDetails({...details, layout: e.target.value as MeetingLayout})}
                  className="w-full bg-zinc-100 dark:bg-zinc-800 rounded p-2 text-sm border border-zinc-300 dark:border-zinc-700 focus:border-blue-500 focus:outline-none"
                >
                  <option value="auto">Auto (Responsive)</option>
                  <option value="tiled">Tiled Grid</option>
                  <option value="sidebar">Sidebar (Presentation Mode)</option>
                  <option value="spotlight">Spotlight (One Tile)</option>
                </select>
             </div>
          </div>
        </section>

        <hr className="border-zinc-700" />

        {/* Participants Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
             <h3 className="font-semibold text-sm uppercase tracking-wider text-zinc-500">Participants ({participants.length})</h3>
             <button 
               onClick={handleAddParticipant}
               className="flex items-center gap-1 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-full font-medium"
             >
               <Plus size={14} /> Add User
             </button>
          </div>

          <div className="space-y-3">
            {participants.map((p) => (
              <div key={p.id} className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-lg border border-zinc-200 dark:border-zinc-700">
                <div className="flex gap-3 mb-3">
                  {/* Image Preview / Upload */}
                  <div className="flex flex-col gap-2">
                    {/* Avatar Upload */}
                    <div className="relative group w-12 h-12 shrink-0" title="Change Avatar">
                      <img 
                        src={p.imageUrl || ''} 
                        alt="" 
                        className="w-12 h-12 rounded-full object-cover bg-zinc-700"
                      />
                      <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 rounded-full cursor-pointer transition-opacity">
                        <Upload size={14} className="text-white" />
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(p.id, e, 'imageUrl')} />
                      </label>
                    </div>

                    {/* Presentation Upload (Only if presenting) */}
                    {p.isPresenting && (
                      <div className="relative group w-12 h-12 shrink-0 border border-blue-500 rounded bg-zinc-900 flex items-center justify-center overflow-hidden" title="Change Screen Share Image">
                         {p.presentationContent ? (
                           <img src={p.presentationContent} className="w-full h-full object-cover" />
                         ) : (
                           <Monitor size={16} className="text-blue-500" />
                         )}
                         <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                            <Upload size={14} className="text-white" />
                            <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(p.id, e, 'presentationContent')} />
                        </label>
                      </div>
                    )}
                  </div>
                  
                  {/* Name Input */}
                  <div className="flex-1">
                     <input 
                        type="text" 
                        value={p.name}
                        onChange={(e) => updateParticipant(p.id, { name: e.target.value })}
                        className="w-full bg-transparent border-b border-zinc-600 focus:border-blue-500 outline-none text-sm py-1"
                        placeholder="Name"
                     />
                     <div className="flex flex-wrap items-center gap-1 mt-2">
                        <button 
                          onClick={() => updateParticipant(p.id, { isMuted: !p.isMuted })}
                          className={`p-1.5 rounded ${p.isMuted ? 'text-red-500 bg-red-900/20' : 'text-zinc-400 hover:bg-zinc-700'}`}
                          title="Toggle Mute"
                        >
                          {p.isMuted ? <MicOff size={14} /> : <Mic size={14} />}
                        </button>
                        <button 
                          onClick={() => updateParticipant(p.id, { isVideoOff: !p.isVideoOff })}
                          className={`p-1.5 rounded ${p.isVideoOff ? 'text-red-500 bg-red-900/20' : 'text-zinc-400 hover:bg-zinc-700'}`}
                          title="Toggle Video"
                        >
                           {p.isVideoOff ? <VideoOff size={14} /> : <Video size={14} />}
                        </button>
                        <button 
                          onClick={() => updateParticipant(p.id, { isNetworkError: !p.isNetworkError })}
                          className={`p-1.5 rounded ${p.isNetworkError ? 'text-orange-500 bg-orange-900/20' : 'text-zinc-400 hover:bg-zinc-700'}`}
                          title="Simulate Network Error"
                        >
                           <WifiOff size={14} />
                        </button>
                        <button 
                          onClick={() => updateParticipant(p.id, { isPinned: !p.isPinned })}
                          className={`p-1.5 rounded ${p.isPinned ? 'text-blue-500 bg-blue-900/20' : 'text-zinc-400 hover:bg-zinc-700'}`}
                          title="Pin"
                        >
                           <Pin size={14} className={p.isPinned ? 'fill-current' : ''} />
                        </button>
                        <button 
                          onClick={() => updateParticipant(p.id, { isSpeaking: !p.isSpeaking })}
                          className={`p-1.5 rounded ${p.isSpeaking ? 'text-green-500 bg-green-900/20' : 'text-zinc-400 hover:bg-zinc-700'}`}
                          title="Is Speaking"
                        >
                           <div className="w-3.5 h-3.5 border-2 border-current rounded-full" />
                        </button>
                         <button 
                          onClick={() => updateParticipant(p.id, { isPresenting: !p.isPresenting })}
                          className={`p-1.5 rounded ${p.isPresenting ? 'text-blue-400 bg-blue-900/20 ring-1 ring-blue-500' : 'text-zinc-400 hover:bg-zinc-700'}`}
                          title={p.isPresenting ? "Stop Presenting" : "Present Window"}
                        >
                           <Layout size={14} />
                        </button>
                     </div>
                     {p.isPresenting && (
                       <p className="text-[10px] text-zinc-500 mt-1">
                         *Upload image on left to set screen content
                       </p>
                     )}
                  </div>

                  <button 
                    onClick={() => removeParticipant(p.id)}
                    className="text-zinc-500 hover:text-red-500 self-start"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default ConfigPanel;