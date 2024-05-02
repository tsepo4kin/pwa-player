import { FC, useEffect, useRef, useState } from 'react';
import MyIconBtn from '../../components/myIconBtn/myIconBtn';
import AudioItem from '../audioItem/audioItem';
import { useDispatch, useSelector } from 'react-redux';
import MySlider from '../../components/mySlider/mySlider';
import Timeline from './timeline';
import { arrayBufferToBlob } from '../../../utils/indexedDb';
import { SET_SELECTED_AUDIO_ID } from '../../../redux';

const Player: FC = () => {
	const audioId = useSelector(
		(state: any) => state.currentAudio?.selectedAudioId
	);
	const songs = useSelector((state: any) => state.songs);
	const [isPlayed, setIsPlayed] = useState(false);
	const [audioRange, setAudioRange] = useState(0);
	const [volumeRange, setVolumeRange] = useState(0.5);
	const [currentAudio, setCurrentAudio] = useState<null | {
		file: Blob;
		name: string;
	}>(null);
	const [loopState, setLoopState] = useState(0);
	const dispatch = useDispatch();

	const audioRef = useRef<HTMLAudioElement | null>(new Audio());

	const playPause = async () => {
		try {
			if (isPlayed) {
				await audioRef.current?.pause();
				setIsPlayed(false);
			} else {
				await audioRef.current?.play();
				setIsPlayed(true);
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		if (audioRef.current!.src) {
			URL.revokeObjectURL(audioRef.current!.src);
		}
		if (audioId >= 0) {
			const blob = arrayBufferToBlob(songs[audioId].file, 'audio/mp3');
			const audio = { file: blob, name: songs[audioId].name };
			setCurrentAudio(audio);
		}
	}, [audioId]);

	useEffect(() => {
		if (audioRef.current!.src) {
			URL.revokeObjectURL(audioRef.current!.src);
		}
		if (currentAudio) {
			audioRef.current!.src = URL.createObjectURL(currentAudio.file);
			setIsPlayed(true);
			audioRef.current!.play();
		}
	}, [currentAudio]);

	const updateTime = () => {
		const currentTime =
			(100 * audioRef.current!.currentTime) / audioRef.current!.duration || 0;

		setAudioRange(Math.round(currentTime));
	};

	const rewind = (timeString: string) => {
		setAudioRange(parseFloat(timeString));
		const range = (audioRef.current!.duration / 100) * parseFloat(timeString);
		if (!isNaN(range)) {
			audioRef.current!.currentTime = range;
		}
	};

	const onVolumeChange = (volumeString: string) => {
		const volume = parseFloat(volumeString) / 100;
		setVolumeRange(volume);
		audioRef.current!.volume = volume;
	};

	const onNext = () => {
		if (audioId < songs.length - 1) {
			dispatch(SET_SELECTED_AUDIO_ID(audioId + 1));
		} else if (audioId === songs.length - 1 && loopState === 1) {
			dispatch(SET_SELECTED_AUDIO_ID(0));
		}
	};

	const onPrev = () => {
		if (audioId > 0) {
			dispatch(SET_SELECTED_AUDIO_ID(audioId - 1));
		}
	};

	const onSongEnd = () => {
		if (loopState === 2) {
			audioRef.current?.play();
		} else {
			onNext();
		}
	};

	const changeRepeat = () => {
		if (audioRef.current) {
			const newLoopState = loopState === 2 ? 0 : loopState + 1;
			setLoopState(newLoopState);
			audioRef.current.loop = newLoopState === 2;
		}
	};

	return (
		<div className="border border-gray-400 rounded py-2 px-2">
			{Boolean(currentAudio) && <AudioItem song={currentAudio} />}

			<Timeline
				duration={audioRef.current!.duration}
				currenttime={audioRef.current!.currentTime}
				disabled={!currentAudio}
				value={audioRange}
				onChange={e => rewind(e.target.value)}
			/>

			<div className="flex justify-center">
				<div className="mr-auto w-1/3">
					<MyIconBtn
						size="sm"
						variant={loopState !== 0 ? 'filled' : 'outlined'}
						onClick={changeRepeat}
					>
						<i className="fa-solid fa-repeat">{loopState === 2 && 1}</i>
					</MyIconBtn>
				</div>

				<MyIconBtn size="sm" variant="outlined" onClick={onPrev}>
					<i className="fa-solid fa-backward" />
				</MyIconBtn>

				<MyIconBtn
					className="mx-2"
					size="sm"
					variant="outlined"
					onClick={playPause}
				>
					{isPlayed ? (
						<i className="fa-solid fa-pause" />
					) : (
						<i className="fa-solid fa-play" />
					)}
				</MyIconBtn>

				<MyIconBtn size="sm" variant="outlined" onClick={onNext}>
					<i className="fa-solid fa-forward" />
				</MyIconBtn>

				<MySlider
					disabled={!currentAudio}
					className="ml-auto w-1/3 cursor-pointer"
					value={volumeRange * 100}
					onChange={e => onVolumeChange(e.target.value)}
				/>
			</div>

			<audio
				hidden
				controls
				ref={audioRef}
				onEnded={() => onSongEnd()}
				onTimeUpdate={() => updateTime()}
			></audio>
		</div>
	);
};

export default Player;
