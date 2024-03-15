"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function RecentActivity({ data }: { data: any }) {
  const topUsers = data.slice(0, 4);

  return (
    <>
      <div className="space-y-8">
        {topUsers.map((item: any) => (
          <div
            className="flex flex-col md:flex-row md:items-center"
            key={item.user.id}
          >
            <div className="flex justify-start">
              <Avatar className="h-9 w-9">
                <AvatarFallback>
                  {item.user.email[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1 my-auto">
                <p className="text-sm font-medium leading-none">
                  {item.user.email}
                </p>
              </div>
            </div>
            <div className="flex md:flex-col gap-x-4 md:ml-auto text-sm pl-12 ml-1">
              <div className="md:ml-auto">
                Content: <span className="font-medium">{item.content}</span>
              </div>
              <div className="md:ml-auto">
                Keywords: <span className="font-medium">{item.keyword}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
