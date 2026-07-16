# React example

Install and run the example from this directory:

```sh
cd examples/react
npm install
npm run dev
```

Open the URL printed by Vite, select text in the editor, and use the `X₂` or
`X²` formatting toolbar button. It uses `Ctrl+Alt+,` / `Ctrl+Alt+.` on Windows
and Linux, or `⌘Option+,` / `⌘Option+.` on macOS. The example imports this
package by its public name, so it exercises the same API a consumer uses.

The Vite config includes `resolve.dedupe` for React, BlockNote, and Yjs. Keep
that setting when consuming the plugin through `npm link` or a `file:`
dependency; it ensures the editor and plugin share one copy of each runtime.
