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
}

const SlideViewer = ({ markdown, layout = "default" }: Props) => {
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
                ? "text-4xl sm:text-5xl lg:text-6xl"
                : node.depth === 2
                  ? "text-3xl sm:text-4xl lg:text-5xl"
                  : node.depth === 3
                    ? "text-2xl sm:text-3xl lg:text-4xl"
                    : "text-xl sm:text-2xl lg:text-3xl"
            }`}
          >
            {node.children[0]?.value || ""}
          </HeadingTag>
        )

      case "paragraph":
        return (
          <p key={key} className="text-lg sm:text-xl lg:text-2xl leading-relaxed mb-6">
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
            className={`mb-6 text-lg sm:text-xl lg:text-2xl leading-relaxed ${
              node.ordered ? "list-decimal" : "list-disc"
            } list-inside space-y-3 pl-4`}
          >
            {node.children.map((c: any, i: number) => renderNode(c, i))}
          </ListTag>
        )

      case "listItem":
        return (
          <li key={key} className="mb-2">
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
          <div key={key} className="mb-6">
            <pre className="bg-white text-gray-900 text-sm sm:text-base rounded-lg p-4 sm:p-6 overflow-auto border border-gray-700 shadow-lg">
              <code className="font-mono leading-relaxed" dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
          </div>
        )
      }

      case "inlineCode":
        return (
          <code key={key} className="bg-gray-200 text-gray-900 px-2 py-1 rounded text-sm sm:text-base font-mono border">
            {node.value}
          </code>
        )

      case "blockquote":
        return (
          <blockquote
            key={key}
            className="border-l-4 border-gray-400 pl-6 italic text-lg sm:text-xl lg:text-2xl mb-6 bg-gray-50 py-4 rounded-r-lg"
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
        return <hr key={key} className="my-8 border-gray-300" />

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

  const getFirstCode = () => {
    const codeNode = tree.children.find((node: any) => node.type === "code")
    return codeNode || null
  }

  switch (layout) {
    case "title":
      return (
        <div className="flex flex-col items-center justify-center h-full p-12 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 text-center text-white rounded-lg shadow-xl">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-8 drop-shadow-md">
            {getFirstHeading()}
          </h1>
          <p className="text-xl sm:text-2xl lg:text-3xl font-light opacity-80 max-w-2xl">{getFirstParagraph()}</p>
        </div>
      )

    case "quote":
      const quoteNode = getFirstQuote()
      return (
        <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200 text-slate-800 rounded-lg shadow-md h-full flex flex-col items-center justify-center">
          <div className="text-6xl text-slate-300 font-serif mb-4">"</div>
          <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light italic text-center max-w-3xl mb-8">
{
            //@ts-ignore
            quoteNode ? quoteNode.children.map((c: any, i: number) => renderNode(c, i)) : getFirstParagraph()}
          </blockquote>
          <div className="text-xl font-medium text-slate-600">— {getSecondHeading() || "Author"}</div>
        </div>
      )

    case "blank":
      return (
        <div className="p-8 bg-white text-slate-800 rounded-lg shadow-md h-full">
          {tree.children.map((node: any, i: number) => renderNode(node, i))}
        </div>
      )

    case "default":
    default:
      return (
        <div className="p-8 bg-white text-slate-800 rounded-lg shadow-md h-full overflow-auto">
          {tree.children.map((node: any, i: number) => renderNode(node, i))}
        </div>
      )
  }
}

export default SlideViewer
