import { useState } from 'react';
import { searchFromYoutube } from '../../infrastructure/api/api';
import MyInputText from '../components/myInputText/myInputText';
import AudioItem from '../widgets/audioItem/audioItem';
import useDebounce from '../hooks/useDebounce';
import { AudioSearchQuery } from '../../domain/actions/audio.actions';

const SearchPage = () => {
	const [searchString, setSearchString] = useState('');
	const [songsData, setSongsData] = useState<Array<any>>([]);

	const search = (searchString: string) => {
		searchFromYoutube(new AudioSearchQuery(searchString))
			.then(res => setSongsData(res.items.slice(0, 6)))
			.catch(e => console.log(e));
	};

	const debouncedSearch = useDebounce(search, 500);

	const onChange = (string: string) => {
		setSearchString(string);
		if (string) {
			debouncedSearch(string);
		} else {
			setSongsData([]);
		}
	};

	return (
		<div className="py-2 px-4 h-full w-full">
			{/* <div className="pb-2"> */}
			{/* <MySelect placeholder="search fro"  options={['Youtube', 'Soundcloud']} /> */}
			{/* </div> */}
			<div className="pb-2">
				<MyInputText
					value={searchString}
					placeholder="song name or artist name"
					onChange={e => onChange(e.target.value)}
				></MyInputText>
			</div>

			{songsData.length > 0 && (
				<div className="border border-gray-600 rounded-lg">
					{songsData.map((song: any) => (
						<AudioItem
							className="py-2 px-2 w-full"
							key={song.url}
							song={song}
							canDownload={true}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default SearchPage;
