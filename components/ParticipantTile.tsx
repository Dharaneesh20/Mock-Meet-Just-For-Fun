import React, { useMemo } from 'react';
import { MicOff, MoreVertical, Pin } from 'lucide-react';
import { Participant, MeetingTheme } from '../types';

interface ParticipantTileProps {
  participant: Participant;
  className?: string;
  isSelf?: boolean;
  theme?: MeetingTheme;
}

// Map characters to colors (Simple hashing or fixed map)
// We define pairs: [Avatar Color Class, Gradient Style]
const COLOR_PALETTE = [
  { avatar: 'bg-red-600', gradient: 'radial-gradient(circle at center, #7f1d1d 0%, #202124 100%)' }, // Red
  { avatar: 'bg-orange-600', gradient: 'radial-gradient(circle at center, #7c2d12 0%, #202124 100%)' }, // Orange
  { avatar: 'bg-amber-600', gradient: 'radial-gradient(circle at center, #78350f 0%, #202124 100%)' }, // Amber
  { avatar: 'bg-yellow-600', gradient: 'radial-gradient(circle at center, #713f12 0%, #202124 100%)' }, // Yellow
  { avatar: 'bg-lime-600', gradient: 'radial-gradient(circle at center, #3f6212 0%, #202124 100%)' }, // Lime
  { avatar: 'bg-green-600', gradient: 'radial-gradient(circle at center, #14532d 0%, #202124 100%)' }, // Green
  { avatar: 'bg-emerald-600', gradient: 'radial-gradient(circle at center, #064e3b 0%, #202124 100%)' }, // Emerald
  { avatar: 'bg-teal-600', gradient: 'radial-gradient(circle at center, #134e4a 0%, #202124 100%)' }, // Teal
  { avatar: 'bg-cyan-600', gradient: 'radial-gradient(circle at center, #164e63 0%, #202124 100%)' }, // Cyan
  { avatar: 'bg-sky-600', gradient: 'radial-gradient(circle at center, #0c4a6e 0%, #202124 100%)' }, // Sky
  { avatar: 'bg-blue-600', gradient: 'radial-gradient(circle at center, #1e3a8a 0%, #202124 100%)' }, // Blue
  { avatar: 'bg-indigo-600', gradient: 'radial-gradient(circle at center, #312e81 0%, #202124 100%)' }, // Indigo
  { avatar: 'bg-violet-600', gradient: 'radial-gradient(circle at center, #4c1d95 0%, #202124 100%)' }, // Violet
  { avatar: 'bg-purple-600', gradient: 'radial-gradient(circle at center, #581c87 0%, #202124 100%)' }, // Purple
  { avatar: 'bg-fuchsia-600', gradient: 'radial-gradient(circle at center, #701a75 0%, #202124 100%)' }, // Fuchsia
  { avatar: 'bg-pink-600', gradient: 'radial-gradient(circle at center, #831843 0%, #202124 100%)' }, // Pink
  { avatar: 'bg-rose-600', gradient: 'radial-gradient(circle at center, #881337 0%, #202124 100%)' }, // Rose
  { avatar: 'bg-slate-600', gradient: 'radial-gradient(circle at center, #334155 0%, #202124 100%)' }, // Slate
];

const getColorForName = (name: string) => {
  if (!name) return COLOR_PALETTE[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % COLOR_PALETTE.length;
  return COLOR_PALETTE[index];
};

const ParticipantTile: React.FC<ParticipantTileProps> = ({ participant, className = '', isSelf = false, theme = 'gradient' }) => {
  const showPresentation = participant.isPresenting;
  const hasPresentationContent = !!participant.presentationContent;
  
  // Determine Styles based on name
  const { avatar: avatarClass, gradient: gradientStyle } = useMemo(() => {
    return getColorForName(participant.name);
  }, [participant.name]);

  // Determine container background style
  const containerStyle = useMemo(() => {
    // If showing video/presentation or if theme is classic, we don't use the gradient
    if (showPresentation) return {};
    if (!participant.isVideoOff && participant.imageUrl && !participant.isNetworkError) return {};
    
    if (theme === 'classic') {
      return { backgroundColor: '#3c4043' };
    }
    return { background: gradientStyle };
  }, [theme, participant, showPresentation, gradientStyle]);

  // Check if we should show the "Video Off/Network Error" view
  const showPlaceholder = !showPresentation && (participant.isVideoOff || participant.isNetworkError || !participant.imageUrl);

  return (
    <div 
      className={`relative rounded-xl overflow-hidden flex items-center justify-center group transition-all duration-300 ${className} ${participant.isSpeaking ? 'ring-2 ring-[#8ab4f8]' : ''} ${!participant.isSpeaking && !showPlaceholder && !showPresentation ? 'border border-[#3c4043]' : ''}`}
      style={containerStyle}
    >
      
      {/* Content Layer */}
      {showPresentation ? (
        hasPresentationContent ? (
           <img 
            src={participant.presentationContent!} 
            alt="Presentation" 
            className="w-full h-full object-contain bg-[#202124]"
          />
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full bg-[#202124] text-gray-400">
             <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-12 border-2 border-gray-600 rounded mb-2 border-t-4"></div>
                <span className="text-sm font-medium">{participant.name} is presenting</span>
             </div>
          </div>
        )
      ) : showPlaceholder ? (
        // Avatar View
        <div className="flex flex-col items-center justify-center w-full h-full p-4 relative">
          <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full ${avatarClass} flex items-center justify-center text-3xl md:text-5xl text-white font-medium shadow-sm z-10`}>
            {participant.name.charAt(0).toUpperCase()}
          </div>
          
          {/* Network Error Overlay Message - Centered Pill */}
          {participant.isNetworkError && (
             <div className="absolute inset-0 flex items-center justify-center z-20">
               <div className="bg-[#202124] text-white text-[12px] px-6 py-3 rounded-full shadow-2xl flex flex-col items-center text-center max-w-[90%] md:max-w-[80%]">
                  <span className="font-medium tracking-wide">This video is paused due to problems with your network</span>
               </div>
             </div>
          )}
        </div>
      ) : (
        // Video View
        <img 
          src={participant.imageUrl!} 
          alt={participant.name} 
          className="w-full h-full object-cover"
        />
      )}

      {/* Hover Overlays */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2 z-30">
         {participant.isPinned && (
           <div className="bg-[#202124] bg-opacity-60 p-2 rounded-full text-white backdrop-blur-sm">
             <Pin size={18} fill="currentColor" />
           </div>
         )}
         <div className="bg-[#202124] bg-opacity-60 p-2 rounded-full text-white cursor-pointer backdrop-blur-sm hover:bg-opacity-80">
            <MoreVertical size={18} />
         </div>
      </div>

      {/* Name Label */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2 max-w-[85%] z-30">
        <div className="bg-[#202124] bg-opacity-60 px-2.5 py-1.5 rounded-md text-white text-[13px] font-medium truncate flex items-center gap-2 backdrop-blur-sm select-none">
           {participant.isPinned && <Pin size={12} className="shrink-0" fill="currentColor" />}
           <span className="truncate tracking-wide leading-none">
             {participant.name} 
             {isSelf && " (You)"}
             {showPresentation && " (Presenting)"}
           </span>
        </div>
      </div>

      {/* Mute Indicator */}
      {participant.isMuted && !showPresentation && (
        <div className="absolute top-3 right-3 bg-[#202124] bg-opacity-60 p-1.5 rounded-full text-white z-30 backdrop-blur-sm">
          <MicOff size={16} />
        </div>
      )}
      
      {/* Hand Raise Indicator */}
      {participant.isHandRaised && (
        <div className="absolute top-3 left-3 bg-[#202124] bg-opacity-60 p-2 rounded-full text-yellow-200 z-30 backdrop-blur-sm">
           <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0"/><path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>
        </div>
      )}
      
      {/* Presenting Active Border */}
      {participant.isPresenting && (
        <div className="absolute inset-0 border-2 border-[#8ab4f8] pointer-events-none rounded-xl z-20"></div>
      )}
    </div>
  );
};

export default ParticipantTile;