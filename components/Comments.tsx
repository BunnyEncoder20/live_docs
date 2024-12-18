import React from 'react'

// liveblocks imports
import { useThreads } from '@liveblocks/react/suspense'
import { Composer, Thread } from '@liveblocks/react-ui';
import { useIsThreadActive } from '@liveblocks/react-lexical';

// utils imports
import { cn } from '@/lib/utils';


// custom component
const ThreadWrapper = ({ thread }: ThreadWrapperProps) => {

  // get status of thread of active or not
  const isActive = useIsThreadActive(thread.id);

  return (
    <Thread 
      thread={thread}
      data-state={isActive ? 'active' : null}
      className={cn('comment-thread border', 
                  isActive && '!border-blue-500 shadow-md',
                  thread.resolved && 'opacity-40'
      )}
    />
  )
}

// current components ⚛️
const Comments = () => {
  // import threads
  const { threads } = useThreads(); 
  return (
    <div className='comments-container'>
      <Composer className="comment-composer"/>
      {threads.map((thread) => (
        <ThreadWrapper key={thread.id} thread={thread} />
      ))}
    </div>
  )
}

export default Comments