import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Overview } from "./admin/overview";
import { RecentActivity } from "./recent-activity";
import { Separator } from "./separator";
import readUserSession from "@/lib/lib";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";
import monthInfo from "./actions/month-info";

export const metadata = {
  title: "Supaboost - Home",
  description: `Supaboost - Where ideas become reality -- "quick"`,
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const { data } = await readUserSession();

  if (!data.session) {
    redirect("/login");
  }

  const { activeUsers } = await useUserInfo()
  const { companyInfo } = await useCompanyInfo()
  const month = monthInfo()

  const combinedData = activeUsers?.map((user: any) => {
    return {
      user,
      content: Math.floor(Math.random() * 10),
      keyword: Math.floor(Math.random() * 100),
    };
  });

  combinedData?.sort((a: any, b: any) => b.keywords - a.keywords);

  let subsciption_users: number;
  switch (companyInfo?.variant_id) {
    case 95435:
      subsciption_users = 1;
      break;
    case 95436:
      subsciption_users = 2;
      break;
    case 95437:
      subsciption_users = 3;
      break;
    case 95438:
      subsciption_users = 4;
      break;
    default:
      subsciption_users = 0;
  }

  return (
    <>
      <div className="space-y-6 pb-16 block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Insights into your month-to-month usage.
          </p>
        </div>
        <Separator />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Subscription
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 text-muted-foreground"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              {/* Add numbers of maximum users */}
              <div className="text-4xl font-bold">{subsciption_users}</div>
              <p className="text-xs text-muted-foreground">
                Number of users you will be billed for this month.
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="block md:grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview of keywords per month</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview />
            </CardContent>
          </Card>
          <Card className="col-span-3 mt-4 md:mt-0">
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
              <CardDescription>
                Your team has created {Math.floor(Math.random() * 30)} pieces of
                content with {Math.floor(Math.random() * 300)} keywords in{" "}
                {month}.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity data={combinedData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
