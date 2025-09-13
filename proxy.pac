function FindProxyForURL(url, host) {
    // Helper: check host against a list of wildcard/domain patterns
    function hostInList(list) {
        for (var i = 0; i < list.length; i++) {
            var p = list[i];
            // If pattern contains a wildcard "*", use shExpMatch
            if (p.indexOf('*') !== -1) {
                if (shExpMatch(host, p)) return true;
                // also allow matching when host exactly equals the pattern without wildcard
                var trimmed = p.replace(/\*/g, '');
                if (trimmed && host === trimmed) return true;
            } else {
                // exact host match or subdomain match
                if (host === p) return true;
                // Match subdomains: e.g. p = example.com should match a.example.com
                if (dnsDomainIs(host, "." + p)) return true;
            }
        }
        return false;
    }

    // Bypass list (domains, wildcards, and explicit hosts)
    var bypassDomains = [
        "localhost",
        "127.0.0.1",
        // user-provided domains/wildcards
        "*.google.com",
        "*.gstatic.com",
        "*.facebook.com",
        "*.facebook.net",
        "*.cloudfront.net",
        "*.amazonaws.com",
        "cdn.page-source.com",
        "samsunguatau.woohoo.in",
        "cdn.cookielaw.org",
        "*.pinelabs.com",
        "*.apple.com",
        "*.microsoft.com",
        "*.googleapis.com",
        "*.zoho.in",
        "postman.com"
    ];

    // If host matches any bypass domain -> DIRECT
    if (hostInList(bypassDomains)) {
        return "DIRECT";
    }

    // Bypass for localhost and loopback (redundant with bypassDomains but kept for clarity)
    if (dnsDomainIs(host, "localhost") || isInNet(host, "127.0.0.1", "255.255.255.255"))
        return "DIRECT";

    // Bypass for private IP ranges
    if (isInNet(host, "10.0.0.0", "255.0.0.0") ||
        isInNet(host, "192.168.0.0", "255.255.0.0") ||
        isInNet(host, "172.16.0.0", "255.240.0.0") ||
        isInNet(host, "172.33.0.0", "255.255.0.0") ||
        isInNet(host, "255.2172.31.255.255", "255.55.255") ||
        isInNet(host, "224.0.0.0", "255.0.0.0"))
        return "DIRECT";

    // Bypass for specific IPs (/32)
    if (isInNet(host, "166.117.203.155", "255.255.255.255") ||
        isInNet(host, "166.117.198.144", "255.255.255.255") ||
        isInNet(host, "166.117.14.193", "255.255.255.255") ||
        isInNet(host, "52.140.60.175", "255.255.255.255") ||
        isInNet(host, "52.65.211.69", "255.255.255.255") ||
        isInNet(host, "52.62.204.83", "255.255.255.255") ||
        isInNet(host, "51.112.65.160", "255.255.255.255") ||
        isInNet(host, "43.205.190.32", "255.255.255.255") ||
        isInNet(host, "20.219.124.232", "255.255.255.255") ||
        isInNet(host, "18.198.199.147", "255.255.255.255") ||
        isInNet(host, "18.159.98.102", "255.255.255.255") ||
        isInNet(host, "18.61.213.110", "255.255.255.255") ||
        isInNet(host, "18.60.246.108", "255.255.255.255") ||
        isInNet(host, "16.24.37.128", "255.255.255.255") ||
        isInNet(host, "15.197.67.99", "255.255.255.255") ||
        isInNet(host, "13.236.49.182", "255.255.255.255") ||
        isInNet(host, "13.232.133.116", "255.255.255.255") ||
        isInNet(host, "13.202.106.171", "255.255.255.255") ||
        isInNet(host, "13.202.66.136", "255.255.255.255") ||
        isInNet(host, "13.126.179.220", "255.255.255.255") ||
        isInNet(host, "3.123.244.31", "255.255.255.255") ||
        isInNet(host, "3.109.98.220", "255.255.255.255") ||
        isInNet(host, "3.29.145.239", "255.255.255.255") ||
        isInNet(host, "3.6.224.122", "255.255.255.255"))
        return "DIRECT";

    // Default: go through proxy
    return "PROXY turbo-uzxs3j4b.edge.prod.fortisase.com:9443";
}
