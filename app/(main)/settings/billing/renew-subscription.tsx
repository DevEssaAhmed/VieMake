"use server"

// Function to set the subscription back to active

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

export async function renewSubscription(company: any) {
    const url = `${lemonSqueezyBaseUrl}/subscriptions/${company.subscription_id}`;
    const headers = createHeaders();
    const body = JSON.stringify({
        data: {
            type: 'subscriptions',
            id: company.subscription_id,
            attributes: {
                cancelled: false,
            },
        },
    });
    const requestOptions = createRequestOptions('PATCH', headers, body);

    const response: Response = await fetch(url, requestOptions);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    return data;
}