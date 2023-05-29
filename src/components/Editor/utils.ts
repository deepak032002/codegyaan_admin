import { Editor } from "@ckeditor/ckeditor5-core";

const CustomPlugin = {
  requires: ["toolbar"],
  icons: "customButton",
  init: function (editor: any) {
    editor.ui
      .getEditableElement()
      .parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
      );

    editor.ui.registry.addButton("CustomButton", {
      label: "Custom Button",
      command: "customCommand",
      icon: "customButton",
    });

    editor.commands.add("customCommand", {
      execute: () => {
        // Do something when the button is clicked
        editor.editing.view.focus();
        editor.execute("bold");
      },
      refresh: () => {
        // Update the button's state based on the current selection
        const selection = editor.model.document.selection;
        const allowedIn = editor.model.schema.getAllowedParent(
          selection.getFirstPosition(),
          "bold"
        );

        CustomPlugin.isEnabled = allowedIn !== null;
      },
    });
  },
  isEnabled: false, // Add a default value for isEnabled
};

export default CustomPlugin;
