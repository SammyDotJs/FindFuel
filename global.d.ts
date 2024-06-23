// src/global.d.ts

interface RuntimeAction {
  // Define properties for RuntimeAction based on your application requirements
}

interface Configuration {
  verify: {
    projectID: string;
  };
  userID?: string;
  user?: {
    name?: string;
    image?: string;
  };
  versionID?: string;
  url?: string;
  assistant?: {
    title?: string;
    image?: string;
    color?: string;
    description?: string;
    stylesheet?: string;
  };
  launch?: {
    event?: RuntimeAction;
  };
}

interface VoiceflowAPI {
  load: (config: Configuration) => void;
  open: () => void;
  close: () => void;
  hide: () => void;
  show: () => void;
  interact: (action: RuntimeAction) => void;
  proactive: {
    push: (...messages: Trace[]) => void;
    clear: () => void;
  };
}

interface Window {
  voiceflow: {
    chat: VoiceflowAPI;
  };
}
