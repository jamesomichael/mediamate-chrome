import React, { useEffect, useState } from 'react';
// import {
// 	Button,
// 	Container,
// 	Typography,
// 	FormControlLabel,
// 	Switch,
// } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
import './App.css';

// const theme = createTheme({
// 	palette: {
// 		primary: {
// 			main: '#1976d2',
// 		},
// 		secondary: {
// 			main: '#dc004e',
// 		},
// 	},
// });

function App() {
	const [currentUrl, setCurrentUrl] = useState('');
	// const [audioOnly, setAudioOnly] = useState(false);
	// const [playlist, setPlaylist] = useState(false);

	useEffect(() => {
		// Query the active tab to get its URL
		window.chrome.tabs.query(
			{ active: true, currentWindow: true },
			(tabs) => {
				if (tabs.length > 0) {
					setCurrentUrl(tabs[0].url);
				}
			}
		);
	}, []);

	// const sendMessage = () => {
	// 	const message = {
	// 		command: 'initiateDownload',
	// 		options: {
	// 			audioOnly,
	// 			playlist,
	// 			url: currentUrl,
	// 		},
	// 	};

	// 	console.error(
	// 		'sending message to background: ',
	// 		JSON.stringify(message)
	// 	);
	// 	window.chrome.runtime.sendMessage(message, (response) => {
	// 		console.log(response);
	// 	});
	// };

	const sendMessage = () => {
		const message = {
			command: 'initiateDownloadV2',
			options: {
				url: currentUrl,
			},
		};

		console.error(
			'sending message to background: ',
			JSON.stringify(message)
		);
		window.chrome.runtime.sendMessage(message, (response) => {
			console.log(response);
		});
	};

	return (
		<div className="select-none p-8 h-fit w-fit bg-gradient-to-br from-neutral-800 to-neutral-950">
			<div className="flex flex-col gap-1 items-center mb-6">
				<span className="text-4xl text-white font-light">
					<span className="font-black text-yellow-500">media</span>
					mate
				</span>
				<span className="text-sm text-gray-300">Chrome Downloader</span>
			</div>
			<div className="flex flex-col gap-4 items-center">
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
		// <ThemeProvider theme={theme}>
		// 	<Container
		// 		style={{
		// 			display: 'flex',
		// 			flexDirection: 'column',
		// 			alignItems: 'center',
		// 			justifyContent: 'center',
		// 			// height: '100vh',
		// 			// padding: '100px',
		// 		}}
		// 	>
		// 		<Typography variant="h3" component="div" gutterBottom>
		// 			mediamate
		// 		</Typography>
		// 		<Typography variant="h5" component="div" gutterBottom>
		// 			Downloader
		// 		</Typography>
		// 		{/* <Typography variant="body1" gutterBottom>
		// 			Current URL: {currentUrl}
		// 		</Typography> */}
		// 		<FormControlLabel
		// 			control={
		// 				<Switch
		// 					checked={audioOnly}
		// 					onChange={() => setAudioOnly(!audioOnly)}
		// 				/>
		// 			}
		// 			label="Audio Only"
		// 		/>
		// 		<FormControlLabel
		// 			control={
		// 				<Switch
		// 					checked={playlist}
		// 					onChange={() => setPlaylist(!playlist)}
		// 				/>
		// 			}
		// 			label="Playlist"
		// 		/>
		// 		<Button
		// 			variant="contained"
		// 			color="primary"
		// 			onClick={sendMessage}
		// 			style={{ marginTop: '20px' }}
		// 		>
		// 			Download
		// 		</Button>
		// 	</Container>
		// </ThemeProvider>
	);
}

export default App;
