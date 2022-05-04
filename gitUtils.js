import process from 'process';
import simpleGit, { CleanOptions } from 'simple-git';

const options = {
    baseDir: process.cwd(),
    binary: 'git',
    maxConcurrentProcesses: 6,
 };
const git = simpleGit(options);


export const commit = async () => {
    const status = await git.status();
    console.log('Status: ', status)
    await new Promise((resolve) => setTimeout(resolve, 5000));
}