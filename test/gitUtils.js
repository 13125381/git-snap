import process from 'process';
import simpleGit, { CleanOptions } from 'simple-git';
const options = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
};

const git = simpleGit(options);

export const resultCodes = {
    NOCHANGES: '[NOCHANGES]',
    SUCCESS: '[SUCCESS]'
};

export const commitPush = async () => {
    let status = await git.status();
    if (status.isClean()) {
        return resultCodes.NOCHANGES;
    }
    const files = status.files.map((x) => x.path);
    await git.add(files);
    status = await git.status();
    const message = buildCommitMessage(status);
    await git.commit(message);
    await git.push();
    return resultCodes.SUCCESS;
};

const buildCommitMessage = (status) => {
    const date = new Date().toString();
    let commitMessage = `Changes - ${date}\n`;
    status.modified.forEach((fileName) => {
        commitMessage += `[MODIFIED] ${fileName}\n`
    });
    status.created.forEach((fileName) => {
        commitMessage += `[CREATED] ${fileName}\n`
    });
    status.deleted.forEach((fileName) => {
        commitMessage += `[DELETED] ${fileName}\n`
    });
    status.renamed.forEach((changes) => {
        commitMessage += `[RENAMED] ${changes.from} -> ${changes.to}\n`
    });
    commitMessage += '* Message autogenerated by git-snap *';
    return commitMessage;
}