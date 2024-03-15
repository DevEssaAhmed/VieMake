import { getServiceSupabase } from "@/utils/supabase";
import crypto from "crypto";
import { NextRequest } from "next/server";

export interface LemonsqueezySubscription {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: any;
}

export interface Attributes {
  store_id: number;
  customer_id: number;
  order_id: number;
  order_item_id: number;
  product_id: number;
  variant_id: number;
  product_name: string;
  variant_name: string;
  user_name: string;
  user_email: string;
  status: string;
  status_formatted: string;
  card_brand: string;
  card_last_four: string;
  pause: string | null;
  cancelled: boolean;
  trial_ends_at: string | null;
  billing_anchor: number;
  urls: {
    update_payment_method: string;
  };
  renews_at: string;
  ends_at: string | null;
  created_at: string;
  updated_at: string;
  test_mode: boolean;
}

const isError = (error: unknown): error is Error => {
  return error instanceof Error;
};

// Add more events here if you want
// https://docs.lemonsqueezy.com/api/webhooks#event-types
type EventName =
  | "order_created"
  | "order_refunded"
  | "subscription_created"
  | "subscription_updated"
  | "subscription_cancelled"
  | "subscription_resumed"
  | "subscription_expired"
  | "subscription_paused"
  | "subscription_unpaused"
  | "subscription_payment_failed"
  | "subscription_payment_success"
  | "subscription_payment_recovered";

type Payload = {
  meta: {
    test_mode: boolean;
    event_name: EventName;
    custom_data: {
      teamId: string;
    };
  };
  data: LemonsqueezySubscription;
};

export const POST = async (req: NextRequest) => {
  const supabase = getServiceSupabase()

  try {
    const rawBody = await req.text();
    const hmac = crypto.createHmac("sha256", process.env.LEMON_SQUEEZY_WEBHOOK_SECRET || "");
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signature = Buffer.from(req.headers.get("x-signature") as string, "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      return new Response("Invalid signature.", {
        status: 400,
      });
    }

    const payload = JSON.parse(rawBody);

    const {
      meta: {
        event_name: eventName,
      },
      data: subscription,
    } = payload as Payload;

    switch (eventName) {
      case "order_created":
      case "order_refunded":
      case "subscription_created":
        const companyId = payload.meta.custom_data.company_id
        await supabase
          .from('company_info')
          .update({
            customer_id: payload.data.attributes.customer_id,
            status: payload.data.attributes.status,
            product_id: payload.data.attributes.product_id,
            variant_id: payload.data.attributes.variant_id,
            ends_at: payload.data.attributes.ends_at,
            renews_at: payload.data.attributes.renews_at,
            subscription_id: payload.data.id,
            update_payment_method: payload.data.attributes.urls.update_payment_method,
          })
          .eq('company_id', companyId)
        break;
      case "subscription_updated":
        let customerId = payload.data.attributes.customer_id
        await supabase
          .from('company_info')
          .update({
            customer_id: payload.data.attributes.customer_id,
            status: payload.data.attributes.status,
            product_id: payload.data.attributes.product_id,
            variant_id: payload.data.attributes.variant_id,
            ends_at: payload.data.attributes.ends_at,
            renews_at: payload.data.attributes.renews_at,
            subscription_id: payload.data.id,
            update_payment_method: payload.data.attributes.urls.update_payment_method,
          })
          .eq('customer_id', customerId)
        break;
      case "subscription_cancelled":
        let customerId2 = payload.data.attributes.customer_id
        await supabase
          .from('company_info')
          .update({
            customer_id: payload.data.attributes.customer_id,
            status: payload.data.attributes.status,
            product_id: payload.data.attributes.product_id,
            variant_id: payload.data.attributes.variant_id,
            ends_at: payload.data.attributes.ends_at,
            renews_at: null,
            subscription_id: payload.data.id,
            update_payment_method: payload.data.attributes.urls.update_payment_method,
          })
          .eq('customer_id', customerId2)
        break;
      case "subscription_resumed":
      case "subscription_expired":
        let customerId3 = payload.data.attributes.customer_id
        await supabase
          .from('company_info')
          .update({
            customer_id: payload.data.attributes.customer_id,
            status: null,
            product_id: null,
            variant_id: null,
            ends_at: null,
            renews_at: null,
            subscription_id: payload.data.id,
            update_payment_method: null,
          })
          .eq('customer_id', customerId3)
        break;
      case "subscription_paused":
      case "subscription_unpaused":
      case "subscription_payment_failed":
      case "subscription_payment_success":
      case "subscription_payment_recovered":

        break;
      default:
        throw new Error(`🤷‍♀️ Unhandled event: ${eventName}`);
    }
  } catch (error: unknown) {
    if (isError(error)) {
      console.error(error.message);
      return new Response(`Webhook error: ${error.message}`, {
        status: 400,
      });
    }

    console.error(error);

    return new Response("Webhook error", {
      status: 400,
    });
  }

  return new Response(null, {
    status: 200,
  });
};