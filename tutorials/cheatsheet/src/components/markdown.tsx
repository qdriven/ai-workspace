import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

interface MarkdownProps {
  content: string
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={{
        // Custom components for markdown elements
        h1: ({ children }) => (
          <h1 className="text-3xl font-bold mb-4">{children}</h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-2xl font-bold mb-3 mt-6">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-xl font-bold mb-2 mt-4">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="mb-4">{children}</p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside mb-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside mb-4">{children}</ol>
        ),
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <div className="relative">
              <div className="absolute right-2 top-2 text-xs text-gray-400">
                {match[1]}
              </div>
              <pre className={className}>
                <code className={className} {...props}>
                  {children}
                </code>
              </pre>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
