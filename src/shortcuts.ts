import { createExtension } from "@blocknote/core";

import {
  toggleSubscriptSuperscript,
  type SubscriptSuperscriptEditor,
} from "./toolbar";

export type SubscriptSuperscriptShortcutOptions = {
  /** Keyboard shortcut for subscript, or `false` to leave it unbound. */
  subscript?: string | false;
  /** Keyboard shortcut for superscript, or `false` to leave it unbound. */
  superscript?: string | false;
};

/**
 * Defaults that avoid `⌘,`, which commonly opens application settings on
 * macOS. `Mod` is Command on macOS and Control elsewhere.
 */
export const defaultSubscriptSuperscriptShortcuts = {
  subscript: "Mod-Alt-,",
  superscript: "Mod-Alt-.",
} as const;

/**
 * Creates configurable shortcut bindings for a schema with
 * `subscriptSuperscriptStyleSpecs`. Pass `false` for either shortcut to omit
 * it, which is useful when a host application reserves that key combination.
 */
export function createSubscriptSuperscriptShortcuts(
  options: SubscriptSuperscriptShortcutOptions = {},
) {
  const subscript =
    options.subscript ?? defaultSubscriptSuperscriptShortcuts.subscript;
  const superscript =
    options.superscript ?? defaultSubscriptSuperscriptShortcuts.superscript;

  if (subscript && superscript && subscript === superscript) {
    throw new Error(
      "Subscript and superscript shortcuts must use different key combinations.",
    );
  }

  return createExtension({
    key: "subscript-superscript-shortcuts",
    keyboardShortcuts: {
      ...(subscript
        ? {
            [subscript]: ({ editor }: { editor: unknown }) => {
              toggleSubscriptSuperscript(
                editor as SubscriptSuperscriptEditor,
                "subscript",
              );
              return true;
            },
          }
        : {}),
      ...(superscript
        ? {
            [superscript]: ({ editor }: { editor: unknown }) => {
              toggleSubscriptSuperscript(
                editor as SubscriptSuperscriptEditor,
                "superscript",
              );
              return true;
            },
          }
        : {}),
    },
  });
}

/** Shortcut extension using the macOS-safe default bindings. */
export const subscriptSuperscriptShortcuts =
  createSubscriptSuperscriptShortcuts();
