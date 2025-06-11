import { remark } from "remark"
import remarkParse from "remark-parse"
//@ts-ignore
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-css"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-typescript"
import type { JSX } from "react"

type Props = {
  markdown: string
  layout?: string
  title: string
}

const SlideViewer = ({ markdown, layout = "default", title = "" }: Props) => {
  const tree = remark().use(remarkParse).parse(markdown)

  const renderNode = (node: any, key: number) => {
    switch (node.type) {
      case "heading":
        //@ts-ignore
        const HeadingTag = `h${node.depth}` as keyof JSX.IntrinsicElements
        return (
          //@ts-ignore
          <HeadingTag
            key={key}
            className={`font-bold mb-4 ${
              node.depth === 1
                ? "text-2xl sm:text-3xl lg:text-4xl"
                : node.depth === 2
                  ? "text-xl sm:text-2xl lg:text-3xl"
                  : node.depth === 3
                    ? "text-lg sm:text-xl lg:text-2xl"
                    : "text-base sm:text-lg lg:text-xl"
            }`}
          >
            {node.children[0]?.value || ""}
          </HeadingTag>
        )

      case "paragraph":
        return (
          <p key={key} className="text-sm sm:text-base lg:text-lg leading-relaxed mb-4">
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </p>
        )

      case "text":
        return <span key={key}>{node.value}</span>

      case "list":
        const ListTag = node.ordered ? "ol" : "ul"
        return (
          <ListTag
            key={key}
            className={`mb-4 text-sm sm:text-base lg:text-lg leading-relaxed ${
              node.ordered ? "list-decimal" : "list-disc"
            } list-inside space-y-2 pl-4`}
          >
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </ListTag>
        )

      case "listItem":
        return (
          <li key={key} className="mb-1">
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </li>
        )

      case "code": {
        const lang = node.lang || "javascript"
        const code = node.value
        let html = ""

        try {
          html = Prism.highlight(code, Prism.languages[lang] || Prism.languages.javascript, lang)
        } catch {
          html = code
        }

        return (
          <div key={key} className="mb-4">
            <pre className="bg-gray-50 text-gray-800 text-xs sm:text-sm rounded-md p-3 overflow-auto border border-gray-200">
              <code className="font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
          </div>
        )
      }

      case "inlineCode":
        return (
          <code key={key} className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono">
            {node.value}
          </code>
        )

      case "blockquote":
        return (
          <blockquote
            key={key}
            className="border-l-3 border-gray-300 pl-4 italic text-sm sm:text-base lg:text-lg mb-4 bg-gray-50 py-3 rounded-r-md"
          >
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </blockquote>
        )

      case "strong":
        return (
          <strong key={key} className="font-bold">
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </strong>
        )

      case "emphasis":
        return (
          <em key={key} className="italic">
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </em>
        )

      case "break":
        return <br key={key} />

      case "thematicBreak":
        return <hr key={key} className="my-6 border-gray-200" />

      default:
        return null
    }
  }

  const getFirstHeading = () => {
    //@ts-ignore
    const headingNode = tree.children.find((node: any) => node.type === "heading" && node.depth === 1)
    //@ts-ignore
    return headingNode?.children[0]?.value || "Untitled"
  }

  const getSecondHeading = () => {
    const headings = tree.children.filter((node: any) => node.type === "heading")
    if (headings.length > 1) {
      //@ts-ignore
      return headings[1]?.children[0]?.value || ""
    }
    return ""
  }

  const getFirstParagraph = () => {
    const paragraphNode = tree.children.find((node: any) => node.type === "paragraph")
    if (paragraphNode) {
      //@ts-ignore
      return paragraphNode.children.map((c: any) => c.value).join(" ")
    }
    return ""
  }

  const getFirstQuote = () => {
    const quoteNode = tree.children.find((node: any) => node.type === "blockquote")
    return quoteNode || null
  }

  const getAllContent = () => {
    return tree.children.map((node: any, i: number) => renderNode(node, i))
  }

  const splitContentInHalf = () => {
    const allNodes = tree.children
    const midpoint = Math.ceil(allNodes.length / 2)
    const firstHalf = allNodes.slice(0, midpoint)
    const secondHalf = allNodes.slice(midpoint)

    return {
      first: firstHalf.map((node: any, i: number) => renderNode(node, i)),
      second: secondHalf.map((node: any, i: number) => renderNode(node, i + midpoint)),
    }
  }

  const getImageAndText = () => {
    const imageNode = tree.children.find(
      (node: any) => node.type === "paragraph" && node.children.some((child: any) => child.type === "image"),
    )
    const textNodes = tree.children.filter(
      (node: any) => !(node.type === "paragraph" && node.children.some((child: any) => child.type === "image")),
    )

    return {
      image: imageNode,
      text: textNodes.map((node: any, i: number) => renderNode(node, i)),
    }
  }

  switch (layout) {
    case "title":
      return (
        <div className="flex flex-col items-center justify-center h-full p-8 bg-gradient-to-b from-gray-50 to-gray-100 text-center text-gray-800 rounded-md">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold tracking-tight mb-6">
            {title || getFirstHeading()}
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl font-light text-gray-600 max-w-3xl">{getFirstParagraph()}</p>
        </div>
      )

    case "two-column":
      const { first, second } = splitContentInHalf()
      return (
        <div className="p-8 bg-white text-gray-800 rounded-md h-full overflow-auto">
          {title && <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
            <div className="space-y-4">{first}</div>
            <div className="space-y-4">{second}</div>
          </div>
        </div>
      )

    case "image-text":
      const { image, text } = getImageAndText()
      return (
        <div className="p-8 overflow-auto bg-white text-gray-800 rounded-md h-full">
          {title && <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">
            <div className="flex items-center justify-center bg-gray-100 rounded-lg aspect-square">
              {image ? (
                renderNode(image, 0)
              ) : (
                <div className="text-gray-400 text-center">
                  <div className="text-4xl mb-2">🖼️</div>
                  <div className="text-sm">Add an image with ![alt](url)</div>
                </div>
              )}
            </div>
            <div className="space-y-4">{text}</div>
          </div>
        </div>
      )

    case "quote":
      const quoteNode = getFirstQuote()
      return (
        <div className="p-8 overflow-auto bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800 rounded-md h-full flex flex-col items-center justify-center">
          <div className="text-6xl text-gray-300 font-serif mb-4">"</div>
          <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light italic text-center max-w-4xl mb-8">
            {quoteNode
              ? //@ts-ignore
                quoteNode.children.map((c: any, i: number) => renderNode(c, i))
              : getFirstParagraph()}
          </blockquote>
          <div className="text-lg font-medium text-gray-600">— {getSecondHeading() || title || "Author"}</div>
        </div>
      )

    case "center":
      return (
        <div className="flex overflow-auto flex-col items-center justify-center h-full p-8 bg-white text-gray-800 rounded-md text-center">
          {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
          <div className="max-w-3xl space-y-4">{getAllContent()}</div>
        </div>
      )

    case "section":
      return (
        <div className="flex overflow-auto flex-col items-center justify-center h-full p-8 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-md text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            {title || getFirstHeading()}
          </h1>
          <div className="w-24 h-1 bg-white mb-6"></div>
          <p className="text-lg sm:text-xl lg:text-2xl font-light opacity-80 max-w-2xl">{getFirstParagraph()}</p>
        </div>
      )

    case "blank":
      return (
        <div className="p-8 overflow-auto bg-white text-gray-800 rounded-md h-full">
          {title && <h1 className="text-2xl font-bold mb-6 text-center">{title}</h1>}
          {getAllContent()}
        </div>
      )

    case "default":
    default:
      return (
        <div className="p-8  bg-white text-gray-800 rounded-md h-full overflow-auto">
          {title && <h1 className="text-2xl font-bold mb-6">{title}</h1>}
          {getAllContent()}
        </div>
      )
  }
}

export default SlideViewer
