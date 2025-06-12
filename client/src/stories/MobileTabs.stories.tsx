import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import MobileTabs from "../components/mobile-tabs";

const meta: Meta<typeof MobileTabs> = {
  title: "Components/MobileTabs",
  component: MobileTabs,
};

export default meta;

type Story = StoryObj<typeof MobileTabs>;

const sampleTabs = [
  { id: "home", label: "Home", icon: "🏠" },
  { id: "search", label: "Search", icon: "🔍" },
  { id: "settings", label: "Settings", icon: "⚙️" },
];

const Template = () => {
  const [active, setActive] = useState("home");

  return (
    <MobileTabs
      tabs={sampleTabs}
      activeTab={active}
      onTabChange={(id) => {
        console.log("Switched to tab:", id);
        setActive(id);
      }}
    />
  );
};

export const Default = {
  render: Template,
};

export const NoIcons: Story = {
  args: {
    tabs: [
      { id: "tab1", label: "Tab One" },
      { id: "tab2", label: "Tab Two" },
      { id: "tab3", label: "Tab Three" },
    ],
    activeTab: "tab2",
    onTabChange: (id) => console.log("Selected:", id),
  },
};
