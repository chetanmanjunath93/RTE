# Getting Started with RTE

This guide will help you get started with the Rich Text Editor component.

## Installation

```bash
npm install @chetanmanjunath93/rte react react-dom @mui/material @emotion/react @emotion/styled draft-js react-draft-wysiwyg
```

## Basic Usage

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

## Running the Example

To see the component in action:

```bash
# Navigate to the example directory
cd example

# Install dependencies
npm install

# Start the development server
npm run dev
```

Then open http://localhost:3000 in your browser.

## Key Features

1. **MUI Theme Integration** - Automatically adapts to your Material-UI theme
2. **Highly Configurable** - Customize toolbar, appearance, and behavior
3. **TypeScript Support** - Fully typed for better developer experience
4. **Rich Formatting** - Support for text formatting, lists, links, images, and more

## Configuration Examples

### Minimal Toolbar

```tsx
<RichTextEditor
  config={{
    toolbar: {
      options: ['inline', 'list', 'textAlign'],
      inline: {
        options: ['bold', 'italic', 'underline'],
      },
    },
  }}
/>
```

### Custom Styling

```tsx
<RichTextEditor
  config={{
    elevation: 3,
    paperSx: {
      borderRadius: 4,
      border: '2px solid',
      borderColor: 'primary.main',
    },
    editorStyle: {
      minHeight: '300px',
    },
  }}
/>
```

### Read-Only Mode

```tsx
<RichTextEditor
  config={{
    readOnly: true,
    initialContent: yourContentState,
  }}
/>
```

## Development

```bash
# Build the component
npm run build

# Watch mode for development
npm run dev

# Run the example app
npm run example
```

For more details, see the [README.md](../README.md).
