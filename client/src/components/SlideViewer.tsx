// import { remark } from "remark"
// import remarkParse from "remark-parse"

// type Props = {
//   markdown: string
// }

// const SlideViewer = ({ markdown }: Props) => {
//   const tree = remark().use(remarkParse).parse(markdown)

//   const renderNode = (node: any, key: number) => {
//     switch (node.type) {
//       case "heading":
//         //@ts-ignore
//         const HeadingTag = `h${node.depth}` as keyof JSX.IntrinsicElements
//         return (
//           //@ts-ignore
//           <HeadingTag
//             key={key}
//             className={`font-bold mb-4 ${
//               node.depth === 1
//                 ? "text-4xl sm:text-5xl"
//                 : node.depth === 2
//                   ? "text-3xl sm:text-4xl"
//                   : node.depth === 3
//                     ? "text-2xl sm:text-3xl"
//                     : "text-xl sm:text-2xl"
//             }`}
//           >
//             {node.children[0]?.value || ""}
//           </HeadingTag>
//         )
//       case "paragraph":
//         return (
//           <p key={key} className="text-lg sm:text-xl leading-relaxed mb-4">
//             {node.children.map((c: any, i: number) => renderNode(c, i))}
//           </p>
//         )
//       case "text":
//         return <span key={key}>{node.value}</span>
//       case "list":
//         const ListTag = node.ordered ? "ol" : "ul"
//         return (
//           <ListTag key={key} className={`mb-4 ${node.ordered ? "list-decimal" : "list-disc"} list-inside space-y-2`}>
//             {node.children.map((c: any, i: number) => renderNode(c, i))}
//           </ListTag>
//         )
//       case "listItem":
//         return (
//           <li key={key} className="text-lg sm:text-xl">
//             {node.children.map((c: any, i: number) => renderNode(c, i))}
//           </li>
//         )
//       case "code":
//         return (
//           <code key={key} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm font-mono">
//             {node.value}
//           </code>
//         )
//       case "blockquote":
//         return (
//           <blockquote key={key} className="border-l-4 border-gray-400 pl-4 italic text-lg sm:text-xl mb-4">
//             {node.children.map((c: any, i: number) => renderNode(c, i))}
//           </blockquote>
//         )
//       default:
//         return null
//     }
//   }

//   return (
//     <div className="prose prose-lg max-w-none">{tree.children.map((node: any, i: number) => renderNode(node, i))}</div>
//   )
// }

// export default SlideViewer













import { remark } from "remark"
import remarkParse from "remark-parse"
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.css" // or import it globally in index.css
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-css"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-typescript"
// Import more languages if needed

type Props = {
  markdown: string
}

const SlideViewer = ({ markdown }: Props) => {
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

  return (
    <div className="prose prose-lg max-w-none p-4 sm:p-6 lg:p-8">
      {tree.children.map((node: any, i: number) => renderNode(node, i))}
    </div>
  )
}

export default SlideViewer

