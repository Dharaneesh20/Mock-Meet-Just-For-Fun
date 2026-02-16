import React from 'react';
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, Hand, 
  MoreVertical, Smile, Info, Users, MessageSquare, Shapes, Captions, Lock
} from 'lucide-react';
import { MeetingDetails } from '../types';

interface MeetControlsProps {
  details: MeetingDetails;
  participantCount: number;
}

const ControlButton: React.FC<{ 
  icon: React.ReactNode; 
  active?: boolean; 
  danger?: boolean; 
  secondary?: boolean;
  tooltip?: string;
}> = ({ icon, active = false, danger = false, secondary = false, tooltip }) => {
  // Google Meet Button Styles
  let bgClass = "bg-[#3c4043] hover:bg-[#4a4e51] text-white";
  let sizeClass = "h-10 w-10 md:h-[42px] md:w-[42px]";
  let roundedClass = "rounded-full";

  if (danger) {
    bgClass = "bg-[#ea4335] hover:bg-[#d93025] text-white";
    sizeClass = "h-10 w-14 md:h-[42px] md:w-[60px]"; // Pill shape for hangup
    roundedClass = "rounded-full";
  } else if (active) {
    bgClass = "bg-[#8ab4f8] hover:bg-[#aecbfa] text-[#202124]";
  } else if (secondary) {
    bgClass = "bg-transparent hover:bg-[#3c4043] text-white";
  }

  return (
    <button 
      className={`${sizeClass} ${roundedClass} flex items-center justify-center transition-colors ${bgClass} shrink-0`}
      title={tooltip}
    >
      {icon}
    </button>
  );
};

const MeetControls: React.FC<MeetControlsProps> = ({ details, participantCount }) => {
  return (
    <div className="h-20 bg-[#202124] flex items-center justify-between px-4 text-white shrink-0 z-30 select-none">
      
      {/* Left: Meeting Details */}
      <div className="hidden md:flex items-center gap-4 min-w-[200px]">
        <span className="font-medium text-[16px] tracking-wide text-gray-200">{details.time}</span>
        <div className="h-4 w-[1px] bg-gray-600"></div>
        <span className="text-[16px] font-medium tracking-normal text-gray-200 truncate max-w-[150px]">{details.code}</span>
      </div>
      
      {/* Mobile Time */}
       <div className="flex md:hidden items-center gap-2">
        <span className="font-medium text-sm">{details.time}</span>
      </div>

      {/* Center: Controls */}
      <div className="flex items-center gap-2 md:gap-3">
        <ControlButton icon={<Mic size={20} />} tooltip="Turn off microphone (ctrl + d)" />
        <ControlButton icon={<Video size={20} />} tooltip="Turn off camera (ctrl + e)" />
        
        <div className="hidden sm:flex gap-2 md:gap-3">
           {/* Captions icon (simulated) */}
          <ControlButton icon={<Captions size={20} />} tooltip="Turn on captions (c)" />
          
          <ControlButton icon={<Smile size={20} />} tooltip="Send a reaction" />
          
          {/* Present icon is a box with up arrow */}
          <ControlButton icon={
            <div className="relative flex items-center justify-center">
              <div className="border-2 border-current rounded w-5 h-4 mb-0.5"></div>
              <div className="absolute -top-0.5 border-2 border-current border-b-0 border-l-0 w-2 h-2 rotate-45 transform translate-y-0.5"></div>
            </div>
          } tooltip="Present now" />
          
          <ControlButton icon={<Hand size={20} />} tooltip="Raise hand (ctrl + alt + h)" />
          <ControlButton icon={<MoreVertical size={20} />} tooltip="More options" />
        </div>

        {/* End Call Pill */}
        <ControlButton icon={<PhoneOff size={22} fill="currentColor" />} danger tooltip="Leave call" />
      </div>

      {/* Right: Info & Sidebar toggles */}
      <div className="flex items-center justify-end gap-1 md:gap-3 min-w-[200px]">
        <ControlButton icon={<Info size={22} />} secondary tooltip="Meeting details" />
        <div className="hidden sm:flex items-center gap-1 md:gap-3">
             <ControlButton icon={<Users size={20} />} secondary tooltip="Show everyone" />
             {/* Using absolute positioning to mock the badge layout if needed, but flex row is fine */}
             
             <ControlButton icon={<MessageSquare size={20} />} secondary tooltip="Chat with everyone" />
             <ControlButton icon={<Shapes size={20} />} secondary tooltip="Activities" />
             
             {/* Host Controls Lock */}
             <div className="hidden lg:flex items-center justify-center h-[42px] w-[42px] bg-[#a8c7fa] rounded-full ml-1">
                <Lock size={18} className="text-[#001d35]" />
             </div>
        </div>
      </div>
    </div>
  );
};

export default MeetControls;