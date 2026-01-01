/**
 * Submit sitemaps to Google Search Console
 * 
 * Usage: GOOGLE_SERVICE_ACCOUNT_JSON='...' node scripts/submit-sitemap.mjs
 */

// Domain property format for Search Console
const SITE_URL = 'sc-domain:slawomir-wozniak.pl';
const SITEMAPS = [
    'https://slawomir-wozniak.pl/__sitemap__/en.xml',
    'https://slawomir-wozniak.pl/__sitemap__/pl.xml',
];

async function getAccessToken(credentials) {
    const header = {
        alg: 'RS256',
        typ: 'JWT',
    };

    const now = Math.floor(Date.now() / 1000);
    const claim = {
        iss: credentials.client_email,
        scope: 'https://www.googleapis.com/auth/webmasters',
        aud: 'https://oauth2.googleapis.com/token',
        exp: now + 3600,
        iat: now,
    };

    const base64url = (obj) =>
        Buffer.from(JSON.stringify(obj))
            .toString('base64')
            .replace(/=/g, '')
            .replace(/\+/g, '-')
            .replace(/\//g, '_');

    const unsignedToken = `${base64url(header)}.${base64url(claim)}`;

    // Sign the JWT using the private key
    const crypto = await import('crypto');
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(unsignedToken);
    const signature = sign
        .sign(credentials.private_key, 'base64')
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    const jwt = `${unsignedToken}.${signature}`;

    // Exchange JWT for access token
    const response = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
            assertion: jwt,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to get access token: ${error}`);
    }

    const data = await response.json();
    return data.access_token;
}

async function submitSitemap(accessToken, siteUrl, sitemapUrl) {
    const encodedSiteUrl = encodeURIComponent(siteUrl);
    const encodedSitemapUrl = encodeURIComponent(sitemapUrl);

    const url = `https://www.googleapis.com/webmasters/v3/sites/${encodedSiteUrl}/sitemaps/${encodedSitemapUrl}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        },
    });

    let errorBody = null;
    if (!response.ok) {
        try {
            errorBody = await response.text();
        } catch (e) {
            // ignore
        }
    }

    return {
        sitemap: sitemapUrl,
        status: response.status,
        ok: response.ok,
        errorBody,
    };
}

async function main() {
    const credentialsJson = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;

    if (!credentialsJson) {
        console.error('❌ GOOGLE_SERVICE_ACCOUNT_JSON environment variable is not set');
        process.exit(1);
    }

    let credentials;
    try {
        credentials = JSON.parse(credentialsJson);
    } catch (e) {
        console.error('❌ Failed to parse GOOGLE_SERVICE_ACCOUNT_JSON:', e.message);
        process.exit(1);
    }

    console.log(`🔑 Service account: ${credentials.client_email}`);
    console.log('🔑 Obtaining access token...');
    const accessToken = await getAccessToken(credentials);
    console.log('✅ Access token obtained');

    console.log(`\n📤 Submitting ${SITEMAPS.length} sitemaps to Google Search Console...\n`);

    let hasError = false;

    for (const sitemap of SITEMAPS) {
        const result = await submitSitemap(accessToken, SITE_URL, sitemap);

        if (result.ok) {
            console.log(`✅ ${result.sitemap} - Status: ${result.status}`);
        } else {
            console.error(`❌ ${result.sitemap} - Status: ${result.status}`);
            if (result.errorBody) {
                console.error(`   Error: ${result.errorBody}`);
            }
            hasError = true;
        }
    }

    console.log('\n' + (hasError ? '⚠️ Some sitemaps failed to submit' : '🎉 All sitemaps submitted successfully!'));

    if (hasError) {
        process.exit(1);
    }
}

main().catch((error) => {
    console.error('❌ Error:', error.message);
    process.exit(1);
});
