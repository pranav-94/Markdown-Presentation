import type { Meta, StoryObj } from "@storybook/react";
import SlideCard from "../components/slide-card";
import { MemoryRouter } from "react-router-dom";
import type { Slide } from "../types";

const meta: Meta<typeof SlideCard> = {
  title: "Slides/SlideCard",
  component: SlideCard,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof SlideCard>;

const createSlide = (id: number, title: string, layout: Slide["layout"]): Slide => ({
  id,
  title,
  layout,
  markdown: `# ${title}\nThis is a ${layout} layout.`,
});

export const Default: Story = {
  args: {
    slide: createSlide(1, "Default Slide", "default"),
  },
};

export const Title: Story = {
  args: {
    slide: createSlide(2, "Title Slide", "title"),
  },
};

export const TwoColumn: Story = {
  args: {
    slide: createSlide(3, "Two Column Slide", "two-column"),
  },
};

export const ImageText: Story = {
  args: {
    slide: createSlide(4, "Image & Text Slide", "image-text"),
  },
};

export const Quote: Story = {
  args: {
    slide: createSlide(5, "Quote Slide", "quote"),
  },
};

export const Center: Story = {
  args: {
    slide: createSlide(6, "Centered Slide", "center"),
  },
};

export const Section: Story = {
  args: {
    slide: createSlide(7, "Section Slide", "section"),
  },
};

export const Blank: Story = {
  args: {
    slide: createSlide(8, "Blank Slide", "blank"),
  },
};

export const Selected: Story = {
  args: {
    slide: createSlide(9, "Selected Slide", "default"),
    isSelected: true,
  },
};
