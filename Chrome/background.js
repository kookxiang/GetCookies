chrome.runtime.onMessageExternal.addListener((options, sender, callback) => {
    try {
        if (options.action === 'ping') callback(true);
        const { site } = options;
        if (!site.match(/^(http|https):/)) {
            throw new Error('Illegal site url');
        }
        let filter = { url: site };
        if (name in options) {
            filter.name = options.name;
        }
        chrome.cookies.getAll(filter, cookies => {
            callback({
                succeed: true,
                cookie: cookies.map(x => `${x.name}=${x.value}`).join('; ')
            });
        });
        callback({ succeed: true, message: e.message });
    } catch (e) {
        callback({ succeed: false, message: e.message });
    }
});