const fs = require('fs');

async function createFiles() {
    // fs.mkdirSync('./annualimport/korbible');
    const lines = fs.readFileSync('./annualimport/2024.kor_bible.txt', 'utf-8').split('\n');
    const chapters = {};

    for (let line of lines) {
        const ref = line.split(' ')[0];
        const content = line.replace(ref, '').trim();
        const chapter = ref.split(':')[0] * 1;
        const verse = ref.split(':')[1];

        // fs.appendFileSync(`./annualimport/korbible/${chapter}.json`, verse);
        chapters[chapter] = chapters[chapter] || [];
        chapters[chapter].push({
            verse_id: verse,
            verse_text: content,
        });
    }
    // console.log('All done', chapters);
    for (let i of Object.keys(chapters)) {
        console.log(i);
        fs.writeFileSync(`./annualimport/korbible/${i}.json`, JSON.stringify(chapters[i], null, 2));
    }
}

createFiles();