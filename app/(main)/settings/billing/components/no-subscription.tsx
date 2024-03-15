import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Pricing from "./pricing";

// Component to render information for users, that if there is no subscription that they should add one

export default function NoSubscription({ company, company_info, user }: { company: any, company_info: any, user: any }) {
    return (
        <Card className='w-full relative mb-2'>
            <CardHeader className='-mb-4'>
                <CardTitle>No Active Subscription</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="mb-6">No subscription found for {company.name}.</CardDescription>
                <Pricing company_id={company_info.company_id} user={user} />
            </CardContent>
        </Card>
    );
}