import { createStyleSpec } from "@blocknote/core";

function isTag(element: HTMLElement, tagName: "sub" | "sup") {
  return element.tagName.toLowerCase() === tagName;
}

function styleElement(tagName: "sub" | "sup") {
  const element = document.createElement(tagName);

  return { dom: element, contentDOM: element };
}

/** Renders as a lowered inline span and exports as a semantic `<sub>` element. */
export const Subscript = createStyleSpec(
  {
    type: "subscript",
    propSchema: "boolean",
  },
  {
    render: () => styleElement("sub"),
    toExternalHTML: () => styleElement("sub"),
    parse: (element) => (isTag(element, "sub") ? true : undefined),
  },
);

/** Renders as a raised inline span and exports as a semantic `<sup>` element. */
export const Superscript = createStyleSpec(
  {
    type: "superscript",
    propSchema: "boolean",
  },
  {
    render: () => styleElement("sup"),
    toExternalHTML: () => styleElement("sup"),
    parse: (element) => (isTag(element, "sup") ? true : undefined),
  },
);

/** Spread this into `styleSpecs` when creating a BlockNote schema. */
export const subscriptSuperscriptStyleSpecs = {
  subscript: Subscript,
  superscript: Superscript,
};
