'use client'

import React from 'react'
import Image from 'next/image'

// ui imports
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// liveblocks imports
import { useInboxNotifications, useUnreadInboxNotificationsCount } from '@liveblocks/react/suspense'
import { InboxNotification, InboxNotificationList, LiveblocksUIConfig } from '@liveblocks/react-ui'


const Notifications = () => {

  // notification count from liveblocks
  const { inboxNotifications } = useInboxNotifications();
  const { count } = useUnreadInboxNotificationsCount();

  // filter out the ones we have already read
  const unreadNotifications = inboxNotifications.filter((notification) => !notification.readAt)

  return (
    <Popover>
      <PopoverTrigger className="relative flex size-10 items-center justify-center rounded-lg">
        <Image 
          src="/assets/icons/bell.svg"
          alt="inbox"
          height={24}
          width={24}
        />
        { count > 0 && (
          <div className="absolute right-2 top-2 z-20 size-2 rounded-full bg-blue-500">

          </div>
        ) }
      </PopoverTrigger>
      <PopoverContent align="end" className="shad-popover">
        <LiveblocksUIConfig
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: React.ReactNode) => (
              <>
                {user} metioned you.
              </>
            )
          }}
        >
          <InboxNotificationList>
            { unreadNotifications.length <= 0 && (
              <p className="py-2 text-center text-dark-500">
                No new notifications
              </p>
            )}

            {unreadNotifications.length > 0 && unreadNotifications.map((notification) => (
              <InboxNotification 
                key={notification.id}
                inboxNotification={notification}
                href={`/document/${notification.roomId}`}
                showActions={false}
                kinds={{
                  thread: (props) => (
                    <InboxNotification.Thread {...props} 
                      showActions={false}
                      showRoomName={false}
                    />
                  ),
                  textMention: (props) => (
                    <InboxNotification.TextMention {...props} 
                      showRoomName={false}
                    />
                  ),
                  $documentAccess: (props) => (
                    // custom notification
                    <InboxNotification.Custom {...props} 
                      title={props.inboxNotification.activities[0].data.title}
                      aside={
                        <InboxNotification.Icon className="bg-transparent">
                          <Image 
                            src={props.inboxNotification.activities[0].data.avatar as string || ""}
                            alt="Avatar"
                            height={36}
                            width={36}
                            className="rounded-full"
                          />
                        </InboxNotification.Icon>
                      }
                    >
                      {props.children}
                    </InboxNotification.Custom>
                  )
                }}
                className="bg-dark-200 text-white"
              />
            ))}
          </InboxNotificationList>
        </LiveblocksUIConfig>
      </PopoverContent>
    </Popover>

  )
}

export default Notifications