type FunctionOption = { insertHandler: (data) => void };

interface Window {
  cloudinary: {
    openUploadWidget: (
      options: any,
      callback: (error: any, result: any) => void
    ) => { open: () => void };
    createMediaLibrary: (
      options: any,
      handler: FunctionOption
    ) => { show: () => void };
  };
}
