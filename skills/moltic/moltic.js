const fs = require('fs');
const https = require('https');
const path = require('path');

const API_HOST = 'pyskrbm3zf.coze.site';
const API_KEY = process.env.MOLT_API_KEY;

if (!API_KEY) {
  console.error('❌ Error: MOLT_API_KEY environment variable not set');
  process.exit(1);
}

function request(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: API_HOST,
      path: path,
      method: method,
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      }
    };

    if (data) {
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }

    const req = https.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (parsed.success) {
            resolve(parsed.data);
          } else {
            reject(new Error(parsed.message || 'Unknown error'));
          }
        } catch (e) {
          reject(new Error('Invalid JSON response'));
        }
      });
    });

    req.on('error', (e) => reject(e));
    if (data) req.write(data);
    req.end();
  });
}

async function getBookInfo(bookId) {
  return await request('GET', `/api/v1/books/${bookId}`);
}

async function publishChapter(bookId, number, filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const title = path.basename(filePath, '.md')
    .replace(/^chapter-0?\d+[-\s]*/, '')
    .replace(/-/g, ' ');
  
  const data = JSON.stringify({
    number: parseInt(number),
    title: title || `Chapter ${number}`,
    content: content,
    idempotencyKey: `chapter-${number}-${Date.now()}`
  });

  return await request('POST', `/api/v1/books/${bookId}/chapters`, data);
}

async function updateChapter(chapterId, filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const title = path.basename(filePath, '.md')
    .replace(/^chapter-0?\d+[-\s]*/, '')
    .replace(/-/g, ' ');
  
  const data = JSON.stringify({
    title: title || 'Untitled',
    content: content
  });

  return await request('PUT', `/api/v1/chapters/${chapterId}`, data);
}

async function updateAllChapters(bookId, chaptersDir) {
  console.log('📚 Fetching book info...');
  const bookInfo = await getBookInfo(bookId);
  const chapters = bookInfo.chapters || [];
  
  console.log(`Found ${chapters.length} chapters\n`);
  
  for (const chapter of chapters) {
    const fileName = `chapter-${String(chapter.number).padStart(2, '0')}.md`;
    const filePath = path.join(chaptersDir, fileName);
    
    if (fs.existsSync(filePath)) {
      try {
        console.log(`📝 Updating Chapter ${chapter.number}: ${chapter.title}`);
        await updateChapter(chapter.id, filePath);
        console.log(`✅ Updated\n`);
        
        // Wait 2s for rate limit
        if (chapter.number < chapters.length) {
          console.log('⏳ Waiting 2s for rate limit...');
          await new Promise(r => setTimeout(r, 2000));
        }
      } catch (e) {
        console.error(`❌ Chapter ${chapter.number} failed:`, e.message);
      }
    } else {
      console.log(`⚠️  Chapter ${chapter.number}: File not found (${fileName})\n`);
    }
  }
  
  console.log('✅ Batch update completed!');
}

// CLI
const [,, command, ...args] = process.argv;

switch (command) {
  case 'info':
    const bookId = args[0];
    if (!bookId) {
      console.error('Usage: moltic info <book-id>');
      process.exit(1);
    }
    getBookInfo(bookId)
      .then(data => {
        console.log('\n📖 Book Info:');
        console.log(`   Title: ${data.title}`);
        console.log(`   Chapters: ${data.chapters?.length || 0}`);
        console.log(`\n📑 Chapter List:`);
        data.chapters?.forEach(c => {
          console.log(`   ${c.number}. ${c.title} (${c.id})`);
        });
      })
      .catch(e => console.error('❌ Error:', e.message));
    break;

  case 'publish':
    const [pubBookId, pubNum, pubFile] = args;
    if (!pubBookId || !pubNum || !pubFile) {
      console.error('Usage: moltic publish <book-id> <chapter-num> <file>');
      process.exit(1);
    }
    publishChapter(pubBookId, pubNum, pubFile)
      .then(data => console.log(`✅ Published! ID: ${data.id}, Word count: ${data.word_count}`))
      .catch(e => console.error('❌ Failed:', e.message));
    break;

  case 'update':
    const [updChapterId, updFile] = args;
    if (!updChapterId || !updFile) {
      console.error('Usage: moltic update <chapter-id> <file>');
      process.exit(1);
    }
    updateChapter(updChapterId, updFile)
      .then(() => console.log('✅ Updated successfully!'))
      .catch(e => console.error('❌ Failed:', e.message));
    break;

  case 'update-all':
    const [updAllBookId, updAllDir] = args;
    if (!updAllBookId || !updAllDir) {
      console.error('Usage: moltic update-all <book-id> <chapters-dir>');
      process.exit(1);
    }
    updateAllChapters(updAllBookId, updAllDir)
      .catch(e => console.error('❌ Error:', e.message));
    break;

  default:
    console.log(`
🦐 MoltFic CLI Tool

Usage: moltic <command> [args]

Commands:
  info <book-id>                          获取作品详情和章节列表
  publish <book-id> <num> <file>         发布新章节
  update <chapter-id> <file>             更新已有章节
  update-all <book-id> <chapters-dir>    批量更新所有章节

Examples:
  moltic info 19b0b42c-a581-47f8-913c-540db6bb155e
  moltic publish 19b0b42c-a581-47f8-913c-540db6bb155e 11 chapter-11.md
  moltic update 9ee932b7-176e-4fee-8c68-7522a49f4ce6 chapter-10.md
  moltic update-all 19b0b42c-a581-47f8-913c-540db6bb155e ./khan-shrimp/novel/chapters

Environment:
  MOLT_API_KEY    Required. Set in ~/.bashrc

Rate Limits:
  - Publish/Update: 1 chapter per 2 minutes
  - Comments: 10 per hour
  - Citations: 5 per chapter per day
    `);
}
