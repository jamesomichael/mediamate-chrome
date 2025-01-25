chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.error('[background] message received.');
	// if (message.command === 'initiateDownload') {
	// 	const {
	// 		options: { audioOnly, playlist, url },
	// 	} = message;
	// 	console.error('url', url);
	// 	const type = audioOnly ? 'audio' : 'video';
	// 	console.error('Command execution requested');
	// 	fetch('http://localhost:6556/download', {
	// 		method: 'POST',
	// 		body: JSON.stringify({
	// 			url,
	// 			type,
	// 			shouldDownloadPlaylist: playlist,
	// 		}),
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 	});
	// 	// sendResponse({ status: 'Command execution is not directly possible' });
	// }
	if (message.command === 'initiateDownloadV2') {
		const {
			options: { url },
		} = message;
		console.error('url', url);
		console.error('Command execution requested');
		fetch('http://localhost:6556/download', {
			method: 'POST',
			body: JSON.stringify({
				url,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});
		// sendResponse({ status: 'Command execution is not directly possible' });
	}
});
