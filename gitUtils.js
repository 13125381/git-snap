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

export const commit = async () => {
    let status = await git.status();
    if (status.isClean()) {
        return resultCodes.NOCHANGES;
    }
    const files = status.files.map((x) => x.path);
    await stageFiles(files);
    status = await git.status();
    const message = buildCommitMessage(status);
    await git.commit(message);
    // await new Promise((resolve) => setTimeout(resolve, 5000));
    return resultCodes.SUCCESS;
};

const stageFiles = async (files) => {
    await git.add(files);
}

const buildCommitMessage = (status) => {
    let commitMessage = '';
    status.modified.forEach((fileName) => {
        commitMessage += `[MODIFIED] ${fileName}\n`
    });
    status.created.forEach((fileName) => {
        commitMessage += `[CREATED] ${fileName}\n`
    });
    status.deleted.forEach((fileName) => {
        commitMessage += `[DELETED] ${fileName}\n`
    });
    status.renamed.forEach((fileName) => {
        commitMessage += `[RENAMED] ${fileName}\n`
    });
    commitMessage += '* Message autogenerated by git-snap *';
    console.log(commitMessage)
    return commitMessage;
}