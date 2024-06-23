// src/config.ts

interface RuntimeAction {
  // define RuntimeAction properties based on your application requirements
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

const appConfig: Configuration = {
  verify: {
    projectID: "6667d1f2a7b6dc228b2386a9",
  },
  userID: "optional_user_id",
  user: {
    name: "Optional User Name",
    image: "Optional User Image URL",
  },
  versionID: "production",
  url: "https://general-runtime.voiceflow.com",
  assistant: {
    title: "My Assistant",
    image: "Assistant Image URL",
    color: "#FFFFFF",
    description: "Assistant Description",
    stylesheet: "Stylesheet URL",
  },
  launch: {
    event: {
      // define your RuntimeAction here
    },
  },
};

export default appConfig;
