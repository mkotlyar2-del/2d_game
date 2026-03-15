const fs = require('fs');
const path = require('path');
const git = require('isomorphic-git');
const http = require('isomorphic-git/http/node');

async function init() {
    const dir = '.';
    console.log('Initializing git repo...');
    await git.init({ fs, dir });

    console.log('Adding files...');
    const files = fs.readdirSync(dir).filter(f => !f.startsWith('.') && f !== 'node_modules');
    for (const filepath of files) {
        await git.add({ fs, dir, filepath });
    }

    console.log('Committing changes...');
    await git.commit({
        fs,
        dir,
        message: 'Initial commit from Antigravity',
        author: {
            name: 'Antigravity',
            email: 'antigravity@example.com'
        }
    });

    console.log('Adding remote...');
    await git.addRemote({
        fs,
        dir,
        remote: 'origin',
        url: 'https://github.com/mkotlyar2-del/2d_game.git'
    });

    console.log('Local git repository initialized and changes committed.');
}

init().catch(err => {
    console.error('Error during git initialization:', err);
    process.exit(1);
});
