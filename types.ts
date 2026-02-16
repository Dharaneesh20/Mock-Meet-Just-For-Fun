export interface Participant {
  id: string;
  name: string;
  imageUrl: string | null;
  presentationContent?: string | null; // Image to show when presenting
  isMuted: boolean;
  isVideoOff: boolean;
  isNetworkError?: boolean; // New field to simulate the network error message
  isSpeaking: boolean;
  isPinned: boolean;
  isHandRaised: boolean;
  isPresenting: boolean; // If true, this participant takes up the main stage
}

export type MeetingTheme = 'classic' | 'gradient';
export type MeetingLayout = 'auto' | 'tiled' | 'spotlight' | 'sidebar';

export interface MeetingDetails {
  time: string;
  code: string;
  isRecording: boolean;
  theme: MeetingTheme;
  layout: MeetingLayout;
}

export const MOCK_IMAGES = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&h=400",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&h=400",
];