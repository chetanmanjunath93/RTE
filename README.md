# Rich Text Editor (RTE)

A highly configurable Rich Text Editor React component using MUI (Material-UI) themes and styles.

## Features

- 🎨 **MUI Theme Integration** - Seamlessly integrates with Material-UI themes, supporting both light and dark modes
- ⚙️ **Highly Configurable** - Extensive configuration options for toolbar, appearance, and behavior
- 📝 **Rich Formatting** - Full WYSIWYG editing with support for:
  - Text formatting (bold, italic, underline, strikethrough)
  - Headers (H1-H6)
  - Lists (ordered and unordered)
  - Text alignment
  - Font families and sizes
  - Text and background colors
  - Links
  - Images
  - Emojis
  - Code blocks
  - And more!
- 🎯 **TypeScript Support** - Fully typed with TypeScript
- 📦 **Lightweight** - Built on top of Draft.js
- 🎭 **Customizable Styling** - Use MUI's `sx` prop for custom styling

## Installation

```bash
npm install @chetanmanjunath93/rte react react-dom @mui/material @emotion/react @emotion/styled draft-js react-draft-wysiwyg
```

## Quick Start

```tsx
import React from 'react';
import { RichTextEditor } from '@chetanmanjunath93/rte';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme();

function App() {
  const [content, setContent] = React.useState('');

  return (
    <ThemeProvider theme={theme}>
      <RichTextEditor
        config={{
          placeholder: 'Start typing...',
          useMuiTheme: true,
        }}
        value={content}
        onChange={setContent}
      />
    </ThemeProvider>
  );
}
```

## Configuration Options

The `RichTextEditor` component accepts a `config` prop with extensive configuration options:

### Toolbar Configuration

```tsx
<RichTextEditor
  config={{
    toolbar: {
      options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'emoji'],
      inline: {
        options: ['bold', 'italic', 'underline', 'strikethrough'],
      },
      blockType: {
        inDropdown: true,
        options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote'],
      },
      fontSize: {
        options: [8, 10, 12, 14, 16, 18, 24, 30],
      },
      fontFamily: {
        options: ['Arial', 'Georgia', 'Times New Roman', 'Verdana'],
      },
    },
  }}
/>
```

### MUI Theme Integration

```tsx
<RichTextEditor
  config={{
    useMuiTheme: true,  // Enable MUI theme integration (default: true)
    elevation: 2,        // Paper elevation (0-24)
    paperSx: {           // Custom Paper styling
      borderRadius: 4,
      border: '2px solid',
      borderColor: 'primary.main',
    },
    sx: {                // Custom container styling
      maxWidth: 800,
      margin: 'auto',
    },
  }}
/>
```

### Appearance Customization

```tsx
<RichTextEditor
  config={{
    placeholder: 'Enter your text here...',
    editorStyle: {
      minHeight: '300px',
      fontSize: '16px',
      padding: '20px',
    },
    toolbarStyle: {
      backgroundColor: '#f5f5f5',
    },
  }}
/>
```

### Read-Only Mode

```tsx
<RichTextEditor
  config={{
    readOnly: true,
    initialContent: {
      blocks: [
        {
          key: '1',
          text: 'This is read-only content',
          type: 'unstyled',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {},
        },
      ],
      entityMap: {},
    },
  }}
/>
```

### Event Callbacks

```tsx
<RichTextEditor
  config={{
    onChange: (editorState) => {
      console.log('Editor state changed:', editorState);
    },
    onFocus: (event) => {
      console.log('Editor focused');
    },
    onBlur: (event) => {
      console.log('Editor blurred');
    },
  }}
/>
```

## Props

| Prop | Type | Description |
|------|------|-------------|
| `config` | `RichTextEditorConfig` | Configuration object for the editor |
| `value` | `string` | JSON string of content state (controlled component) |
| `onChange` | `(value: string) => void` | Callback when content changes |
| `className` | `string` | CSS class name for the container |

## Configuration Interface

```typescript
interface RichTextEditorConfig {
  // Toolbar configuration
  toolbar?: {
    options?: string[];
    inline?: { options?: string[] };
    blockType?: { options?: string[] };
    fontSize?: { options?: number[] };
    fontFamily?: { options?: string[] };
    // ... and more
  };
  
  // Appearance
  placeholder?: string;
  editorStyle?: React.CSSProperties;
  toolbarStyle?: React.CSSProperties;
  
  // MUI theming
  useMuiTheme?: boolean;
  elevation?: number;
  sx?: SxProps<Theme>;
  paperSx?: SxProps<Theme>;
  
  // Behavior
  readOnly?: boolean;
  spellCheck?: boolean;
  stripPastedStyles?: boolean;
  
  // Callbacks
  onChange?: (state: EditorState) => void;
  onEditorStateChange?: (state: EditorState) => void;
  onContentStateChange?: (state: any) => void;
  onFocus?: (event: React.FocusEvent) => void;
  onBlur?: (event: React.FocusEvent) => void;
  
  // Initial content
  initialContent?: any;
  defaultEditorState?: EditorState;
}
```

## Examples

Check out the `example` directory for a complete demo application showcasing:

- Basic editor with full toolbar
- Minimal toolbar configuration
- Custom styled editor
- Read-only mode
- Dark mode support
- And more!

### Running the Example

```bash
cd example
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

## Development

```bash
# Install dependencies
npm install

# Build the component
npm run build

# Watch mode for development
npm run dev

# Run the example app
npm run example
```

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
