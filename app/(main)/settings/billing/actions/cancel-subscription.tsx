"use server"

// This function calls Lemon Squeezy to cancel the Subscription on the end date
// It uses the LemonSqueezy API Key, and public.company_info.subscription_id to cancel the correct subscription
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

function createRequestOptions(method: string, headers: Headers): RequestInit {
    return {
        method,
        headers,
        redirect: 'follow',
        cache: "no-store"
    };
}


export async function cancelSubscription(subscription_id: string) {
    const url = `${lemonSqueezyBaseUrl}/subscriptions/${subscription_id}`;
    const headers = createHeaders();
    const requestOptions = createRequestOptions('DELETE', headers);

    const response: Response = await fetch(url, requestOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data;
}