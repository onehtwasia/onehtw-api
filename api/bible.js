const express = require('express');
const axios = require('axios');

const dbtKey = process.env.DBT_KEY;

const router = express.Router();
module.exports = router;

const languages = {
	KOR: 'KORKRVN2',
	IND: 'INZNTVN2',
	YUH: 'YUHUNVN2',
	CHN: 'CHNUN1N2',
	ENG: 'ENGESVN2',
	TGL: 'TGLPBSN2',
	VIE: 'VIEVOVN2', // VIEVOVN2?
	MAY: 'ZLMAVBN2',
	TAM: 'TCVWTCN2',
}

const languageAudio = {
	KOR: 'KORKRVN2DA',
	IND: 'INZNTVN2DA',
	YUH: 'YUHUNVN2DA',
	CHN: 'CHNUN1N2DA',
	ENG: 'ENGESVN2DA',
	TGL: 'TGLPBSN2DA',
	VIE: 'VIEVOVN2DA',
	MAY: 'ZLMAVBN2DA',
	TAM: 'TCVWTCN2DA',
}

router.get('/text/:id', async (req, res, next) => {
	console.log(req.language);
	const language = req.query.language || req.language;
	try {
		console.log('Id', req.params.id);
		const passage = parsePassage(req.params.id);
		console.log('Passage', passage);
		const book = passage.book;
		const chapter = passage.chapter;
		const startVerse = passage.startVerse;
		const endVerse = passage.endVerse;
		const damId = languages[language] + 'ET';

		if (language == 'KOR') {
			let kurl = `https://cdn.onehtw.com/2022/KOR/bible_text/${book.toLowerCase()}/${chapter}.json`;
			if (['Mark', 'Rom'].includes('book')) {
				kurl = `https://cdn.onehtw.com/2020/text/KO1SKVN2ET/${book}/${chapter}.json`;
			}
			if (book == 'Luke') {
				kurl = `https://cdn.onehtw.com/2023/KOR/bible_text/${chapter}.json`;
			}
			if (book == 'Matt') {
				kurl = `https://cdn.onehtw.com/2024/kor_bible_text/${chapter}.json`;
			}
			const { data } = await axios.get(kurl);
			res.json({
				verses: data.filter(function(v) {
					const verseId = v.verse_id * 1;
					return (verseId >= (startVerse * 1)) && (verseId <= (endVerse * 1));
				}),
				copyright: '',
				name: ''
			});
		} else {
			console.log('N');
			const headers = {
				'User-Agent': 'onehtw-api'
			}
			const params = {
				dam_id: damId,
				book_id: book,
				chapter_id: chapter,
				verse_start: startVerse,
				verse_end: endVerse,
				key: dbtKey,
				v: 2
			};
			const [metadata, verses, volume] = await Promise.all([
				axios.get("https://dbt.io/library/metadata", {
					params: {
						dam_id: damId,
						key: dbtKey,
						v: 2
					},
					headers,
				}),
				axios.get("https://dbt.io/text/verse", {
					params,
					headers,
				}).catch((err) => {
					console.log('ERROR', err);
					return err.response.body;
				}),
				axios.get("https://dbt.io/text/volume", {
					params: {
						dam_id: damId,
						key: dbtKey,
						v: 2
					},
					headers,
				})
			]);
			// console.log('Verses', verses);
			console.log()
			res.json({
				copyright: metadata.data[0].mark,
				name: volume.data[0] && volume.data[0].version_name || '',
				verses: verses.data
			});
		}
	} catch (err) {
		console.log('Bible Reading Failure', err.message);
		res.status(500).json('Failed: ' + language);
	}
});

const koreanBibleMap = {
	"Mark": {
		book: "02",
		"name": "Mark________"
	},
	"Luke": {
		book: "03",
		"name": "Luke________"
	},
	"John": {
		book: "04",
		"name": "John________"
	},
	"Acts": {
		book: "05",
		"name": "Acts________"
	},
	"Rom": {
		book: "06",
		"name": "Romans______"
	},
	"1 Cor": {
		book: "07",
		"name": "1Corinthians"
	},
	"2 Cor": {
		book: "08",
		"name": "2Corinthians"
	},
	"1Cor": {
		book: "07",
		"name": "1Corinthians"
	},
	"2Cor": {
		book: "08",
		"name": "2Corinthians"
	},
	"Gal": {
		book: "09",
		"name": "Galatians___"
	},
	"Eph": {
		book: "10",
		"name": "Ephesians___"
	},
	"Phil": {
		book: "11",
		"name": "Philippians_"
	},
	"Col": {
		book: "12",
		"name": "Colossians__"
	},
	"1 Thess": {
		book: "13",
		"name": "1Thess______"
	},
	"2 Thess": {
		book: "14",
		"name": "2Thess______"
	},
	"1 Tim": {
		book: "15",
		"name": "1Timothy____"
	},
	"2 Tim": {
		book: "16",
		"name": "2Timothy____"
	},
	"Titus": {
		book: "17",
		"name": "Titus_______"
	},
	"Phlm": {
		book: "18",
		"name": "Philemon____"
	},
	"Heb": {
		book: "19",
		"name": "Hebrews_____"
	},
	"Jas": {
		book: "20",
		"name": "James_______"
	},
	"1 Pet": {
		book: "21",
		"name": "1Peter______"
	},
	"2 Pet": {
		book: "22",
		"name": "2Peter______"
	},
	"1 John": {
		book: "23",
		"name": "1John_______"
	},
	"2 John": {
		book: "24",
		"name": "2John_______"
	},
	"3 John": {
		book: "25",
		"name": "3John_______"
	},
	"Jude": {
		book: "26",
		"name": "Jude________"
	},
	"Rev": {
		book: "27",
		"name": "Revelation__"
	},
	"Matt": {
		book: "01",
		"name": "Matthew_____"
	}
}

async function getAudioSrc(id, language) {
	const passage = parsePassage(id);
	const damId = languageAudio[language];
	let url;
	if (damId == 'KORKRVN2DA') {
		const info = koreanBibleMap[passage.book];
		const bookName = info.name;
		const bookId = info.book;
		if (passage.chapter.length == 1) {
			passage.chapter = '0' + passage.chapter;
		}
		url = `https://cdn.onehtw.com/2020/audio/KO1SKVN2DA/B${bookId}___${passage.chapter}_${bookName}KO1SKVN2DA.mp3`;
	} else {
		const resp = await axios.get('https://dbt.io/audio/path', {
			params: {
				key: dbtKey,
				dam_id: damId,
				book_id: passage.book,
				chapter_id: passage.chapter,
				v: 2
			},
		});
		url = `https://cloud.faithcomesbyhearing.com/mp3audiobibles2/${resp.data[0].path}`;
	}
	return url;
}

router.get('/audio/:id', async (req, res) => {
	try {
		const url = await getAudioSrc(req.params.id, req.query.language);
		res.redirect(url)
	} catch (err) {
		res.status(500).json('AudioFail: ' + err.message);
	}
})

function parsePassage(ref){
	let parts = ref.split(' ');
	let range = parts.pop();
	let output = {
		book: parts.join(''),
		chapter: range.split(':')[0],
		startVerse: range.split(':')[1].split('-')[0],
		endVerse: range.split(':')[1].split('-')[1]
	}
	output.endVerse = output.endVerse || output.startVerse;
	return output;
}
