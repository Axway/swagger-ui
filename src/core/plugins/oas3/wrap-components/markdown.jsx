import React from "react"
import PropTypes from "prop-types"
import cx from "classnames"
import MarkdownIt from "markdown-it"
import { OAS3ComponentWrapFactory } from "../helpers"
import { sanitizer } from "core/components/providers/markdown"

const parser = new MarkdownIt({ linkTarget: "_blank" })
// parser.block.ruler.enable(["table"])
// parser.set({ linkTarget: "_blank" })

export const Markdown = ({ source, className = "" }) => {
  if(typeof source !== "string") {
    return null
  }
  
  if ( source ) {
    const html = parser.render(source)
    const sanitized = sanitizer(html)

    let trimmed

    if(typeof sanitized === "string") {
      trimmed = sanitized.trim()
    }

    return (
      <div
        dangerouslySetInnerHTML={{
          __html: trimmed
        }}
        className={cx(className, "renderedMarkdown")}
      />
    )
  }
  return null
}
Markdown.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
}

export default OAS3ComponentWrapFactory(Markdown)
