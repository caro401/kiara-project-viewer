import type { Plugin } from 'unified'
import { visit } from 'unist-util-visit'

interface Admonition {
  svg: string
}

const note = {
  svg: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">\n' +
      '  <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />\n' +
      '</svg>',
}

const warning = {
  svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 11 11"><path d="M6.62 8.5l3.11 1.55l-.45.89L5.5 9.06l-3.78 1.89l-.45-.89L4.38 8.5l-3.1-1.55l.45-.89L5.5 7.94l3.78-1.89l.44.9l-3.1 1.55zM8.5 3.21v.29l-1 1v1l-2 1l-2-1v-1l-1-1V3a2.9 2.9 0 0 1 3-3a3.09 3.09 0 0 1 3 3.21zm-3.79-.5a.79.79 0 1 0-.79.79a.79.79 0 0 0 .79-.79zM5 4.5h-.5v1H5v-1zm1.5 0H6v1h.5v-1zm1.36-1.79a.79.79 0 1 0-.79.79a.79.79 0 0 0 .79-.79z" fill="currentColor"/></svg>',
}

const success = {
  svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M14.5 9.5C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5z" opacity=".3"/><path fill="currentColor" d="M7 20h4c0 1.1-.9 2-2 2s-2-.9-2-2zm-2-1h8v-2H5v2zm11.5-9.5c0 3.82-2.66 5.86-3.77 6.5H5.27c-1.11-.64-3.77-2.68-3.77-6.5C1.5 5.36 4.86 2 9 2s7.5 3.36 7.5 7.5zm-2 0C14.5 6.47 12.03 4 9 4S3.5 6.47 3.5 9.5c0 2.47 1.49 3.89 2.35 4.5h6.3c.86-.61 2.35-2.03 2.35-4.5zm6.87-2.13L20 8l1.37.63L22 10l.63-1.37L24 8l-1.37-.63L22 6l-.63 1.37zM19 6l.94-2.06L22 3l-2.06-.94L19 0l-.94 2.06L16 3l2.06.94L19 6z"/></svg>',
}

const info = {
  svg: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 8 8"><path fill="currentColor" d="M5 0c-.55 0-1 .45-1 1s.45 1 1 1s1-.45 1-1s-.45-1-1-1zM3.5 2.5C2.67 2.5 2 3.17 2 4h1c0-.28.22-.5.5-.5s.5.22.5.5s-1 1.64-1 2.5C3 7.36 3.67 8 4.5 8S6 7.33 6 6.5H5c0 .28-.22.5-.5.5S4 6.78 4 6.5C4 6.14 5 4.66 5 4c0-.81-.67-1.5-1.5-1.5z"/></svg>',
}
const important = {
  svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12"><path fill="currentColor" d="M4.283 2.98a1.735 1.735 0 1 1 3.434 0l-.576 4.03a1.153 1.153 0 0 1-2.282 0l-.576-4.03Zm2.444-.142a.735.735 0 1 0-1.454 0l.576 4.03a.153.153 0 0 0 .303 0l.575-4.03ZM6 11a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"></path></svg>',
}

const caution = {
  svg: '<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 28 28"><path fill="currentColor" d="M15 20a1 1 0 1 1-2 0a1 1 0 0 1 2 0Zm-1.75-3.25a.75.75 0 0 0 1.5 0v-6.5a.75.75 0 0 0-1.5 0v6.5ZM11.592 4.17c1.046-1.894 3.77-1.895 4.816 0l9.25 16.75c1.012 1.833-.314 4.08-2.407 4.08H4.757c-2.093 0-3.42-2.246-2.408-4.079l9.243-16.75Zm3.502.725a1.25 1.25 0 0 0-2.188 0L3.662 21.646A1.25 1.25 0 0 0 4.757 23.5H23.25a1.25 1.25 0 0 0 1.094-1.854l-9.25-16.751Z"></path></svg>',
}
export const customTypes: Record<string, Admonition> = {
  note,
  success,
  danger: warning,
  tip: success,
  warning,
  info,
  important,
  caution,
}

const admonitions: Plugin<any[], any> = () => {
  return tree => {
    visit(tree, (node, idx, parent) => {
      if (node.type === 'containerDirective') {
        const type = node.name
        const ad = customTypes[type]
        if (ad) {
          const [mayBeLabel, ...restChildren] = node.children
          const { icon } = node.attributes || {}

          const [collection, name] = (icon || '').split(':')

          let title = type
          let hasLabel = false
          if (mayBeLabel && mayBeLabel.data?.directiveLabel) {
            title = mayBeLabel.children[0].value
            hasLabel = true
          }

          parent.children.splice(idx, 1, {
            type: 'SvpAdmonition',
            data: {
              hName: 'div',
              hProperties: {
                className: `admonition admonition-${type}`,
              },
            },
            children: [
              {
                type: 'SvpAdmonition',
                data: {
                  hName: 'div',
                  hProperties: {
                    className: 'admonition-heading',
                  },
                },
                children: [
                  {
                    type: 'SvpAdmonition',
                    data: {
                      hName: 'span',
                      hProperties: {
                        className: 'admonition-icon',
                      },
                    },
                    children: [{
                      type: 'html',
                      value: icon ? `<IconifyIcon collection="${collection}" name="${name}" />` : ad.svg,
                    }],
                  },
                  {
                    type: 'text',
                    value: title,
                  },
                ],
              },
              {
                type: 'SvpAdmonition',
                data: {
                  hName: 'div',
                  hProperties: {
                    className: 'admonition-content',
                  },
                },
                children: hasLabel ? restChildren : node.children,
              },
            ],
          })
        }
      }
    })
  }
}

export default admonitions