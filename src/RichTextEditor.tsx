import React, { useState, useEffect } from 'react';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Box, Paper, useTheme } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

export interface RichTextEditorConfig {
  // Toolbar configuration
  toolbar?: {
    options?: string[];
    inline?: {
      inDropdown?: boolean;
      options?: string[];
    };
    blockType?: {
      inDropdown?: boolean;
      options?: string[];
    };
    fontSize?: {
      options?: number[];
    };
    fontFamily?: {
      options?: string[];
    };
    list?: {
      inDropdown?: boolean;
      options?: string[];
    };
    textAlign?: {
      inDropdown?: boolean;
      options?: string[];
    };
    colorPicker?: {
      colors?: string[];
    };
    link?: {
      inDropdown?: boolean;
      showOpenOptionOnHover?: boolean;
      defaultTargetOption?: string;
      options?: string[];
    };
    emoji?: {
      emojis?: string[];
    };
    embedded?: {
      defaultSize?: {
        height?: string;
        width?: string;
      };
    };
    image?: {
      uploadEnabled?: boolean;
      previewImage?: boolean;
      alignmentEnabled?: boolean;
      defaultSize?: {
        height?: string;
        width?: string;
      };
    };
    remove?: object;
    history?: {
      inDropdown?: boolean;
      options?: string[];
    };
  };
  
  // Editor appearance
  placeholder?: string;
  editorStyle?: React.CSSProperties;
  toolbarStyle?: React.CSSProperties;
  wrapperStyle?: React.CSSProperties;
  
  // MUI theming
  useMuiTheme?: boolean;
  elevation?: number;
  
  // Custom styling with MUI sx prop
  sx?: SxProps<Theme>;
  paperSx?: SxProps<Theme>;
  
  // Editor behavior
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

export interface RichTextEditorProps {
  config?: RichTextEditorConfig;
  value?: string; // JSON string of content state
  onChange?: (value: string) => void;
  className?: string;
}

const defaultToolbarConfig = {
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'],
  inline: {
    inDropdown: false,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
  },
  fontSize: {
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
  },
  fontFamily: {
    options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana', 'Roboto'],
  },
  list: {
    inDropdown: false,
    options: ['unordered', 'ordered', 'indent', 'outdent'],
  },
  textAlign: {
    inDropdown: false,
    options: ['left', 'center', 'right', 'justify'],
  },
  colorPicker: {
    colors: [
      'rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
      'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)',
      'rgb(0,168,133)', 'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)',
      'rgb(40,50,78)', 'rgb(0,0,0)', 'rgb(247,218,100)', 'rgb(251,160,38)',
      'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)', 'rgb(239,239,239)',
      'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
      'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)',
    ],
  },
  link: {
    inDropdown: false,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
  },
  emoji: {
    emojis: [
      '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌',
      '🤓', '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
      '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
      '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
      '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
      '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
      '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
      '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
      '✅', '❎', '💯',
    ],
  },
  embedded: {
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  image: {
    uploadEnabled: true,
    previewImage: true,
    alignmentEnabled: true,
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
  },
  remove: {},
  history: {
    inDropdown: false,
    options: ['undo', 'redo'],
  },
};

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  config = {},
  value,
  onChange,
  className,
}) => {
  const theme = useTheme();
  const [editorState, setEditorState] = useState<EditorState>(
    config.defaultEditorState || EditorState.createEmpty()
  );

  // Initialize editor with value or initial content
  useEffect(() => {
    if (value) {
      try {
        const contentState = convertFromRaw(JSON.parse(value));
        setEditorState(EditorState.createWithContent(contentState));
      } catch (e) {
        console.error('Failed to parse initial value:', e);
      }
    } else if (config.initialContent) {
      try {
        const contentState = convertFromRaw(config.initialContent);
        setEditorState(EditorState.createWithContent(contentState));
      } catch (e) {
        console.error('Failed to parse initial content:', e);
      }
    }
  }, []);

  const handleEditorStateChange = (state: EditorState) => {
    setEditorState(state);
    
    // Call custom callback if provided
    if (config.onEditorStateChange) {
      config.onEditorStateChange(state);
    }
    
    // Convert to JSON and call onChange if provided
    if (onChange) {
      const contentState = state.getCurrentContent();
      const raw = convertToRaw(contentState);
      onChange(JSON.stringify(raw));
    }
    
    // Call onContentStateChange if provided
    if (config.onContentStateChange) {
      const contentState = state.getCurrentContent();
      const raw = convertToRaw(contentState);
      config.onContentStateChange(raw);
    }
    
    // Call onChange callback if provided
    if (config.onChange) {
      config.onChange(state);
    }
  };

  // Merge toolbar config with defaults
  const toolbarConfig = {
    ...defaultToolbarConfig,
    ...config.toolbar,
  };

  // Apply MUI theme to editor if enabled
  const muiThemedStyle = config.useMuiTheme !== false ? {
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.body1.fontSize,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.paper,
  } : {};

  const editorStyle = {
    minHeight: '200px',
    padding: theme.spacing(2),
    ...muiThemedStyle,
    ...config.editorStyle,
  };

  const toolbarStyle = {
    marginBottom: 0,
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.default,
    ...config.toolbarStyle,
  };

  const wrapperStyle = {
    ...config.wrapperStyle,
  };

  return (
    <Box
      className={className}
      sx={{
        width: '100%',
        ...config.sx,
      }}
    >
      <Paper
        elevation={config.elevation !== undefined ? config.elevation : 1}
        sx={{
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 1,
          overflow: 'hidden',
          ...config.paperSx,
        }}
      >
        <Editor
          editorState={editorState}
          onEditorStateChange={handleEditorStateChange}
          toolbar={toolbarConfig}
          placeholder={config.placeholder || 'Start typing...'}
          editorStyle={editorStyle}
          toolbarStyle={toolbarStyle}
          wrapperStyle={wrapperStyle}
          readOnly={config.readOnly}
          spellCheck={config.spellCheck !== false}
          stripPastedStyles={config.stripPastedStyles}
          onFocus={config.onFocus}
          onBlur={config.onBlur}
        />
      </Paper>
    </Box>
  );
};

export default RichTextEditor;
