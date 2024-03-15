"use server"

// This function calls Lemon Squeezy to update variant of a subscription
// It uses the LemonSqueezy API Key, and public.company_info.subscription_id and public.company_info.variant_id to update the subscription
// Explanation: https://www.supaboost.dev/guides/supabase-nextjs-lemon-squeezy/fetch-lemon-squeezy-product

const lemonSqueezyBaseUrl = 'https://api.lemonsqueezy.com/v1';
const lemonSqueezyApiKey = process.env.LEMON_SQUEEZY_API_KEY;

if (!lemonSqueezyApiKey) throw new Error("No LEMON_SQUEEZY_API_KEY environment variable set");

function createHeaders() {
    const headers = new Headers();
    headers.append('Accept', 'application/vnd.api+json');
    headers.append('Content-Type', 'application/vnd.api+json');
    headers.append('Authorization', `Bearer ${lemonSqueezyApiKey}`);
    return headers;
}

function createRequestOptions(method: string, headers: Headers, body?: string): RequestInit {
    return {
        method,
        headers,
        redirect: 'follow',
        cache: "no-store",
        body,
    };
}

export async function changeSubscription(company: any, variant_id: any) {
    const url = `${lemonSqueezyBaseUrl}/subscriptions/${company.subscription_id}`;
    const headers = createHeaders();
    const body = JSON.stringify({
        data: {
            type: 'subscriptions',
            id: company.subscription_id,
            attributes: {
                "product_id": company.product_id,
                "variant_id": variant_id,
            },
        },
    });

    const requestOptions = createRequestOptions('PATCH', headers, body);

    const response: Response = await fetch(url, requestOptions);

    if (response.status === 404) {
        // Handle the 404 error appropriately.
        throw new Error('Subscription not found. It may have been deleted or does not exist.');
    } else if (!response.ok) {
        // For other HTTP errors, throw an error with the HTTP status.
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
}