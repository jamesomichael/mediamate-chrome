import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [currentUrl, setCurrentUrl] = useState('');

	useEffect(() => {
		window.chrome.tabs.query(
			{ active: true, currentWindow: true },
			(tabs) => {
				if (tabs.length > 0) {
					setCurrentUrl(tabs[0].url);
				}
			}
		);
	}, []);

	const sendMessage = () => {
		const message = {
			command: 'initiateDownloadV2',
			options: {
				url: currentUrl,
			},
		};
		window.chrome.runtime.sendMessage(message, (response) => {
			console.log(response);
		});
	};

	return (
		<div className="select-none p-8 h-fit w-fit bg-gradient-to-br from-neutral-800 to-neutral-950">
			<div className="flex flex-col gap-1 items-center mb-6">
				<span className="font-heading text-3xl text-white font-light">
					<span className="font-black text-yellow-500">media</span>
					mate
				</span>
				<span className="font-heading text-sm text-gray-300">
					Chrome Downloader
				</span>
			</div>
			<div className="font-copy flex flex-col gap-4 items-center">
				<input
					value={currentUrl}
					disabled
					className="rounded-full cursor-not-allowed bg-neutral-700 py-3 w-60 px-3 text-gray-400"
				></input>
				<button
					onClick={sendMessage}
					className="rounded bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-2 text-white text-sm hover:from-blue-700 hover:to-blue-800"
				>
					Download
				</button>
			</div>
		</div>
	);
}

export default App;
