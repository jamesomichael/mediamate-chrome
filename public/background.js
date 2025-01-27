chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.error('[background] message received.');
	if (message.command === 'initiateDownloadV2') {
		const {
			options: { url, type, playlist },
		} = message;
		console.error('url', url);
		console.error('Command execution requested');
		fetch('http://localhost:6556/jobs', {
			method: 'POST',
			body: JSON.stringify({
				url,
				type,
				playlist,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// sendResponse({ status: 'Command execution is not directly possible' });
	}
});
