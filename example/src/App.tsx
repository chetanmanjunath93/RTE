import React, { useState } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Typography,
  Box,
  Paper,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Grid,
  Divider,
} from '@mui/material';
import { RichTextEditor } from '../../src/RichTextEditor';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

function App() {
  const [tabValue, setTabValue] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Rich Text Editor with MUI
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            A highly configurable Rich Text Editor React component using MUI themes and styles
          </Typography>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={(e) => setDarkMode(e.target.checked)}
              />
            }
            label="Dark Mode"
          />
        </Box>

        <Paper sx={{ width: '100%' }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            aria-label="editor examples"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Basic Editor" />
            <Tab label="Minimal Toolbar" />
            <Tab label="Custom Styled" />
            <Tab label="Read-Only" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h5" gutterBottom>
              Basic Editor
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Full-featured editor with all toolbar options enabled
            </Typography>
            <RichTextEditor
              config={{
                placeholder: 'Start typing your content here...',
                useMuiTheme: true,
                elevation: 2,
              }}
              value={content1}
              onChange={setContent1}
            />
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Content Length: {content1.length} characters
              </Typography>
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" gutterBottom>
              Minimal Toolbar
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Simplified editor with only basic formatting options
            </Typography>
            <RichTextEditor
              config={{
                placeholder: 'Type something...',
                useMuiTheme: true,
                toolbar: {
                  options: ['inline', 'list', 'textAlign', 'history'],
                  inline: {
                    options: ['bold', 'italic', 'underline'],
                  },
                  list: {
                    options: ['unordered', 'ordered'],
                  },
                  textAlign: {
                    options: ['left', 'center', 'right'],
                  },
                },
                elevation: 1,
              }}
              value={content2}
              onChange={setContent2}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h5" gutterBottom>
              Custom Styled Editor
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Editor with custom MUI styling using sx props
            </Typography>
            <RichTextEditor
              config={{
                placeholder: 'Custom styled editor...',
                useMuiTheme: true,
                elevation: 3,
                paperSx: {
                  borderRadius: 4,
                  border: '2px solid',
                  borderColor: 'primary.main',
                  boxShadow: 3,
                },
                sx: {
                  '& .rdw-editor-main': {
                    backgroundColor: 'background.paper',
                  },
                },
                editorStyle: {
                  minHeight: '300px',
                  fontSize: '16px',
                },
                toolbar: {
                  options: ['inline', 'blockType', 'fontSize', 'colorPicker', 'emoji'],
                },
              }}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={3}>
            <Typography variant="h5" gutterBottom>
              Read-Only Editor
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Display content in read-only mode
            </Typography>
            <RichTextEditor
              config={{
                placeholder: 'This editor is read-only',
                useMuiTheme: true,
                readOnly: true,
                elevation: 0,
                paperSx: {
                  backgroundColor: 'action.hover',
                },
                initialContent: {
                  blocks: [
                    {
                      key: '1',
                      text: 'This is a read-only editor',
                      type: 'header-three',
                      depth: 0,
                      inlineStyleRanges: [{ offset: 10, length: 9, style: 'BOLD' }],
                      entityRanges: [],
                      data: {},
                    },
                    {
                      key: '2',
                      text: 'You cannot edit this content. This is useful for displaying formatted text.',
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
          </TabPanel>
        </Paper>

        <Box sx={{ mt: 4 }}>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="h5" gutterBottom>
            Configuration Options
          </Typography>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Toolbar Options
                </Typography>
                <Typography variant="body2" component="div">
                  <ul style={{ paddingLeft: '20px' }}>
                    <li>inline (bold, italic, underline, etc.)</li>
                    <li>blockType (H1-H6, blockquote, code)</li>
                    <li>fontSize (8-96px)</li>
                    <li>fontFamily (various fonts)</li>
                    <li>list (ordered/unordered)</li>
                    <li>textAlign (left, center, right, justify)</li>
                    <li>colorPicker (text/background colors)</li>
                    <li>link (add/remove links)</li>
                    <li>emoji (emoji picker)</li>
                    <li>image (upload/insert images)</li>
                    <li>history (undo/redo)</li>
                  </ul>
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  MUI Theme Integration
                </Typography>
                <Typography variant="body2" component="div">
                  <ul style={{ paddingLeft: '20px' }}>
                    <li>Automatic theme color adaptation</li>
                    <li>Typography integration</li>
                    <li>Elevation control</li>
                    <li>Custom sx props support</li>
                    <li>Dark/Light mode support</li>
                    <li>Paper component styling</li>
                  </ul>
                </Typography>
              </Paper>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Additional Features
                </Typography>
                <Typography variant="body2" component="div">
                  <ul style={{ paddingLeft: '20px' }}>
                    <li>Read-only mode for displaying content</li>
                    <li>Custom placeholders</li>
                    <li>Spell check control</li>
                    <li>Event callbacks (onChange, onFocus, onBlur)</li>
                    <li>Initial content support</li>
                    <li>Content state export/import</li>
                    <li>Fully TypeScript typed</li>
                  </ul>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;
