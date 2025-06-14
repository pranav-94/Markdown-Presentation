import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import LayoutSelector from "../components/layout-selector";

const meta: Meta<typeof LayoutSelector> = {
  title: "Slides/LayoutSelector",
  component: LayoutSelector,
};

export default meta;

type Story = StoryObj<typeof LayoutSelector>;

// const allLayouts = [
//   "default",
//   "title",
//   "two-column",
//   "image-text",
//   "quote",
//   "center",
//   "section",
//   "blank",
// ];

const DesktopTemplate = () => {
  const [selected, setSelected] = useState("default");

  return (
    <div className="max-w-md">
      <LayoutSelector
        selectedLayout={selected}
        onChange={(layoutId) => {
          console.log("Selected layout:", layoutId);
          setSelected(layoutId);
        }}
        isMobile={false}
      />
    </div>
  );
};

const MobileTemplate = () => {
  const [selected, setSelected] = useState("default");

  return (
    <div className="max-w-md">
      <LayoutSelector
        selectedLayout={selected}
        onChange={(layoutId) => {
          console.log("Selected mobile layout:", layoutId);
          setSelected(layoutId);
        }}
        isMobile={true}
      />
    </div>
  );
};

export const Desktop: Story = {
  render: DesktopTemplate,
};

export const Mobile: Story = {
  render: MobileTemplate,
};
