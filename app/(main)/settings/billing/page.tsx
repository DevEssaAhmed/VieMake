import { redirect } from "next/navigation";
import Billing from "./components/billing";
import Seperator from "@/components/seperator";
import NoSubscription from "./components/no-subscription";
import { DataTable } from "./components/invoice-table";
import { columns } from "./components/invoice-columns";
import { getInvoices } from "./actions/get-invoices";
import readUserSession from "@/lib/lib";
import formatDate from "./components/format-date";
import { useUserInfo } from "@/hooks/useUserInfo";
import { useCompanyInfo } from "@/hooks/useCompanyInfo";
import { useCompany } from "@/hooks/useCompany";

export default async function Home() {
  const { data } = await readUserSession()

  // If a user enters this page without a Supabase session, redirect the user to login
  if (!data.session) {
    redirect("/login");
  }

  // Receive the company id, based on the user that is logged in
  const { userInfo } = await useUserInfo()
  const { companyInfo } = await useCompanyInfo()
  const { company } = await useCompany()

  // Invoice variable, which uses the invoices component from ./actions/get-invoices.tsx
  const invoices = await getInvoices(companyInfo?.subscription_id);

  // Map the invoices information to a data object. This object will be used to display the rows in invoice-table.
  // If you update this, make sure you update this field, the invoice columns and the invoice table
  const invoice_data = invoices?.data.map((invoice: any) => ({
    id: invoice.id,
    amount_incl: invoice.attributes.total_formatted,
    tax: invoice.attributes.tax_formatted,
    amount_excl: invoice.attributes.subtotal_formatted,
    invoice_date: formatDate(invoice.attributes.created_at),
    generate_pdf: invoice.attributes.urls.invoice_url,
  }));

  return (
    <>
      {/* Part one. Check if there is a subscription */}

      {companyInfo?.status === null ? (
        // Option one, no subscription
        <>
          <h3 className="text-xl font-bold tracking-tight mb-2">
            Add subscription
          </h3>
          <NoSubscription
            company={company}
            company_info={companyInfo}
            user={data.session}
          />
        </>
      ) : (
        // Option two, subscription available
        <>
          <h3 className="text-xl font-bold tracking-tight mb-2">Billing</h3>
          <Billing company={companyInfo} />
        </>
      )}
      <div className="my-4">
        <Seperator />
      </div>

      <h3 className="text-xl font-bold tracking-tight mb-2">Invoices</h3>
      <DataTable columns={columns} data={invoice_data} />
    </>
  );
}
