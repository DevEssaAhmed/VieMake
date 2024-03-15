"use server"

// This function retrieves the invoices for a specific month
// It uses the API key and the Subscription ID

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


export async function getInvoices(subscription_id: any) {
    const url = `${lemonSqueezyBaseUrl}/subscription-invoices?filter[subscription_id]=${subscription_id}`;
    const headers = createHeaders();
    const requestOptions = createRequestOptions('GET', headers);

    const response: Response = await fetch(url, requestOptions);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}4