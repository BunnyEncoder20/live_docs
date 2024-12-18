'use client';

import React from 'react';

// Editor imports
import Theme from './plugins/Theme';
import ToolbarPlugin from './plugins/ToolbarPlugin';
import { HeadingNode } from '@lexical/rich-text';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';

// liveblocks plugin
import { FloatingComposer, FloatingThreads, liveblocksConfig, LiveblocksPlugin, useEditorStatus  } from '@liveblocks/react-lexical'
import { useSyncStatus } from "@liveblocks/react";
import { useThreads } from '@liveblocks/react/suspense';


// ui imports
import Loader from '../Loader';

// plugin imports
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import FloatingToolbarPlugin from './plugins/FloatingToolbarPlugin';

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.

function Placeholder() {
  return <div className="editor-placeholder">Hello World</div>;
}

export function Editor({
  roomId,
  currentUserType
}: {
  roomId: string,
  currentUserType: string
}) {
  const initialConfig = liveblocksConfig({
    namespace: 'Editor',
    nodes: [HeadingNode],
    onError: (error: Error) => {
      console.error(error);
      throw error;
    },
    theme: Theme,
    editable: currentUserType === 'editor',
  });

  const status = useEditorStatus();
  const { threads } = useThreads();

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <div className="editor-container size-full">
        <div className="toolbar-wrapper flex min-w-full justify-between">
          <ToolbarPlugin />
          
          {/* if editor, show delete modal */}
          {/* {currentUserType === 'editor' && 
            <DeleteModal roomId={roomId} />
          } */}
        </div>

        <div className="editor-wrapper flex flex-col items-center justify-start">
          {status === "not-loaded" || status === "loading" ? (
            <Loader />
          ) : (
            <div className="editor-inner min-h-[1100px] relative mb-5 h-fit w-full max-w-[800px] shadow-md lg:mb-10">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="editor-input h-full" />
                }
                placeholder={<Placeholder />}
                ErrorBoundary={LexicalErrorBoundary}
              />
              {/* liveblocks plugin when current user is editor */}
              {currentUserType === 'editor' && 
                <FloatingToolbarPlugin />
              }
              <HistoryPlugin />
              <AutoFocusPlugin />
            </div>
          )}

          <LiveblocksPlugin>
            <FloatingComposer className="w-[350px]"/>
            <FloatingThreads threads={threads} />
          </LiveblocksPlugin>
        </div>

        
      </div>
    </LexicalComposer>
  );
}
