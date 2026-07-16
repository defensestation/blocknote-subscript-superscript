import { BlockNoteSchema, defaultStyleSpecs } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/mantine";
import {
  BasicTextStyleButton,
  FormattingToolbar,
  FormattingToolbarController,
  useCreateBlockNote,
} from "@blocknote/react";
import {
  SubscriptButton,
  SuperscriptButton,
  createSubscriptSuperscriptShortcuts,
  subscriptSuperscriptStyleSpecs,
} from "@defensestation/blocknote-subscript-superscript";

const schema = BlockNoteSchema.create({
  styleSpecs: {
    ...defaultStyleSpecs,
    ...subscriptSuperscriptStyleSpecs,
  },
});

export function App() {
  const editor = useCreateBlockNote({
    schema,
    extensions: [
      createSubscriptSuperscriptShortcuts({
        subscript: "Mod-Alt-,",
        superscript: "Mod-Alt-.",
      }),
    ],
    initialContent: [
      {
        type: "heading",
        props: { level: 2 },
        content: "Subscript and superscript",
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "H", styles: {} },
          { type: "text", text: "2", styles: { subscript: true } },
          { type: "text", text: "O and E = mc", styles: {} },
          { type: "text", text: "2", styles: { superscript: true } },
          { type: "text", text: ".", styles: {} },
        ],
      },
      {
        type: "paragraph",
        content:
          "Select text and use X₂ / X², or Ctrl+Alt+, / Ctrl+Alt+. (⌘Option on macOS). Applying one removes the other.",
      },
    ],
  });

  return (
    <main>
      <header>
        <p className="eyebrow">BlockNote plugin example</p>
        <h1>Subscript &amp; superscript</h1>
        <p>Select text below and apply either vertical-alignment style.</p>
      </header>
      <section className="editor-card" aria-label="BlockNote editor example">
        <BlockNoteView editor={editor} formattingToolbar={false}>
          <FormattingToolbarController
            formattingToolbar={() => (
              <FormattingToolbar>
                <BasicTextStyleButton basicTextStyle="bold" />
                <BasicTextStyleButton basicTextStyle="italic" />
                <BasicTextStyleButton basicTextStyle="underline" />
                <BasicTextStyleButton basicTextStyle="strike" />
                <SubscriptButton editor={editor} />
                <SuperscriptButton editor={editor} />
              </FormattingToolbar>
            )}
          />
        </BlockNoteView>
      </section>
    </main>
  );
}
