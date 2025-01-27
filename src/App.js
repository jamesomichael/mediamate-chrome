import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [currentUrl, setCurrentUrl] = useState('');
	const [isAudioOnly, setIsAudioOnly] = useState(false);
	const [isPlaylist, setIsPlaylist] = useState(false);

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
				type: isAudioOnly ? 'audio' : 'video',
				playlist: isPlaylist,
			},
		};
		window.chrome.runtime.sendMessage(message, (response) => {
			console.log(response);
		});
	};

	const isPlaylistAllowed =
		/youtube\.com/.test(currentUrl) && /list=/.test(currentUrl);

	return (
		<div className="select-none p-8 h-fit w-fit bg-gradient-to-br from-neutral-800 to-neutral-950">
			<div className="flex flex-col gap-0.5 items-center mb-6">
				<span className="font-heading text-3xl text-white font-extralight">
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
					title={currentUrl}
					disabled
					className="rounded-full cursor-not-allowed bg-neutral-700 py-3 w-60 px-3 text-gray-400"
				></input>

				<div className="grid grid-cols-2 justify-center items-center">
					<label className="flex gap-1.5 justify-start items-center cursor-pointer">
						<input
							type="checkbox"
							checked={isAudioOnly}
							onChange={() => setIsAudioOnly((prev) => !prev)}
							className="sr-only peer"
						/>
						<div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-yellow-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
						<span className="leading-none font-copy text-xs text-gray-300">
							Audio Only
						</span>
					</label>

					<label
						className={`flex gap-1.5 justify-end items-center ${
							isPlaylistAllowed
								? 'cursor-pointer'
								: 'cursor-not-allowed opacity-50'
						}`}
					>
						<input
							type="checkbox"
							checked={isPlaylist}
							disabled={!isPlaylistAllowed}
							onChange={() => setIsPlaylist((prev) => !prev)}
							className="sr-only peer"
						/>
						<div className="relative w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-1 peer-focus:ring-yellow-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
						<span className="leading-none font-copy text-xs text-gray-300">
							Playlist
						</span>
					</label>
				</div>

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
