import { useComponentsContext } from "@blocknote/react";
import type { ReactNode } from "react";

export type SubscriptSuperscriptStyle = "subscript" | "superscript";

/** The part of a BlockNote editor used by the toolbar controls. */
export type SubscriptSuperscriptEditor = {
  getActiveStyles: () => Partial<Record<SubscriptSuperscriptStyle, boolean>>;
  removeStyles: (
    styles: Partial<Record<SubscriptSuperscriptStyle, true>>,
  ) => void;
  toggleStyles: (
    styles: Partial<Record<SubscriptSuperscriptStyle, true>>,
  ) => void;
};

const oppositeStyle: Record<
  SubscriptSuperscriptStyle,
  SubscriptSuperscriptStyle
> = {
  subscript: "superscript",
  superscript: "subscript",
};

/**
 * Toggles one vertical-alignment style and removes its opposite first.
 * This keeps document content semantically unambiguous.
 */
export function toggleSubscriptSuperscript(
  editor: SubscriptSuperscriptEditor,
  style: SubscriptSuperscriptStyle,
) {
  editor.removeStyles({ [oppositeStyle[style]]: true });
  editor.toggleStyles({ [style]: true });
}

type ToolbarButtonProps = {
  editor: SubscriptSuperscriptEditor;
  icon: ReactNode;
  label: string;
  style: SubscriptSuperscriptStyle;
};

function ToolbarButton({ editor, icon, label, style }: ToolbarButtonProps) {
  const Components = useComponentsContext();

  if (!Components) {
    throw new Error(
      "Subscript/superscript toolbar buttons must be rendered inside BlockNoteView.",
    );
  }

  return (
    <Components.FormattingToolbar.Button
      label={label}
      mainTooltip={label}
      icon={icon}
      onClick={() => toggleSubscriptSuperscript(editor, style)}
    />
  );
}

/** A button that toggles the `subscript` BlockNote style. */
export function SubscriptButton({ editor }: { editor: SubscriptSuperscriptEditor }) {
  return (
    <ToolbarButton
      editor={editor}
      icon={<span aria-hidden="true">X₂</span>}
      label="Subscript"
      style="subscript"
    />
  );
}

/** A button that toggles the `superscript` BlockNote style. */
export function SuperscriptButton({
  editor,
}: {
  editor: SubscriptSuperscriptEditor;
}) {
  return (
    <ToolbarButton
      editor={editor}
      icon={<span aria-hidden="true">X²</span>}
      label="Superscript"
      style="superscript"
    />
  );
}
