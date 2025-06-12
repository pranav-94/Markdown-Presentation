import type { Meta, StoryObj } from "@storybook/react";
import SlideViewer from "../components/SlideViewer";

const meta: Meta<typeof SlideViewer> = {
  title: "Slides/SlideViewer",
  component: SlideViewer,
};

export default meta;

type Story = StoryObj<typeof SlideViewer>;

const sampleMarkdown = `# Main Heading
## Subheading
This is a paragraph with some **bold** and _italic_ text.

- Bullet one
- Bullet two
- Bullet three

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

> This is a quote block.
`;

const imageMarkdown = `![Sample Image](https://via.placeholder.com/150)
Here is some description alongside the image.
`;

export const Default: Story = {
  args: {
    title: "Default Layout",
    markdown: sampleMarkdown,
    layout: "default",
  },
};

export const Title: Story = {
  args: {
    title: "Storybook Layouts",
    markdown: sampleMarkdown,
    layout: "title",
  },
};

export const TwoColumn: Story = {
  args: {
    title: "Split View",
    markdown: sampleMarkdown,
    layout: "two-column",
  },
};

export const ImageText: Story = {
  args: {
    title: "With Image and Text",
    markdown: imageMarkdown + "\n\n" + sampleMarkdown,
    layout: "image-text",
  },
};

export const Quote: Story = {
  args: {
    title: "Quote Slide",
    markdown: sampleMarkdown,
    layout: "quote",
  },
};

export const Centered: Story = {
  args: {
    title: "Centered Content",
    markdown: sampleMarkdown,
    layout: "center",
  },
};

export const Section: Story = {
  args: {
    title: "Section Divider",
    markdown: sampleMarkdown,
    layout: "section",
  },
};

export const Blank: Story = {
  args: {
    title: "Empty Slide",
    markdown: "",
    layout: "blank",
  },
};
