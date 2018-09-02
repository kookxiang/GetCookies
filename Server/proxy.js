(function () {
    "use scrict";

    var extensionId = 'pjoalcjgehonpmceajfmnkfpgjehnfak';
    var isChrome = false;
    var isAvailable = false;

    if (!chrome || !chrome.runtime || !chrome.runtime.sendMessage) {
        isChrome = false; // Not a chrome browser
    } else {
        isChrome = true;
        chrome.runtime.sendMessage(extensionId, { action: 'ping' }, {}, function (result) {
            if (result === true) {
                isAvailable = true;
            }
            parent.postMessage({ type: 'cookie-proxy-loaded' }, '*');
        });
    }

    function getDomain(url) {
        var a = document.createElement('a');
        a.href = url;
        return a.hostname;
    }

    window.addEventListener('message', function (event) {
        switch (event.data.action) {
            case 'reload':
                location.reload();
                break;
            case 'getStatus':
                event.source.postMessage({
                    id: event.data.id,
                    succeed: true,
                    isChrome: isChrome,
                    isAvailable: isAvailable
                }, '*');
                break;
            case 'getCookie':
                var options = { site: event.data.site };
                if (!options.site) {
                    event.source.postMessage({ id: event.data.id, succeed: false, message: 'site url is not provided' });
                }
                if (!confirm('是否允许 ' + getDomain(event.origin) + ' 获取你在网站 ' + getDomain(options.site) + ' 上的 Cookie？')) return;
                chrome.runtime.sendMessage(extensionId, options, {}, function (result) {
                    result.id = event.data.id
                    event.source.postMessage(result, '*');
                });
                break;
        }
    }, false);
})();

