import * as fs from 'fs';
import * as path from 'path';
import simpleGit from 'simple-git';
import { Article } from '../types/article';

process.env.http_proxy = 'http://127.0.0.1:7890';
process.env.https_proxy = 'http://127.0.0.1:7890';
const rootPath = './src/note/';
const git = simpleGit(rootPath);

// 设置 git config,解决中文乱码问题
git.addConfig('core.quotepath', 'false', () => {
  console.log('git config 设置文件名不转义！');
});

//获取文件名数组
export async function getArticlePath(): Promise<string[]> {
  let pullResult = null;
  try {
    pullResult = await git.pull();
  } catch (err) {
    console.log('git pull 失败/n', err);
  }
  return pullResult?.files.filter((item) => item.endsWith('.md')) || [];
}

export function getArticleData(path): Article {
  const arr = path.split('\\');
  const regex = /\!\[(.*)\]\((.*)\)\r\n/g; //匹配图片正则
  const fileData = {
    title: arr.pop().replace('.md', ''),
    path: arr.join('\\'),
    content: '',
  };
  try {
    const data = fs.readFileSync(rootPath + path, 'utf8');
    const modifiedText = data.replace(
      regex,
      `![$1](https://raw.githubusercontent.com/lxy-Jason/note/master/${fileData.path}/$2)\r\n`,
    );
    fileData.content = modifiedText;
    return fileData;
  } catch (err) {
    console.error(err);
  }
}

const ignoreFiles = ['.git', 'image'];
//递归获取所有文件路径
export function getAllArticlePath(directoryPath = rootPath) {
  const res = [];
  try {
    const files = fs.readdirSync(directoryPath);
    files.forEach((file) => {
      if (ignoreFiles.includes(file)) return;
      const filePath = path.join(directoryPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        res.push(filePath.replace(/^src\\note\\/, ''));
      } else if (stats.isDirectory()) {
        const subFiles = getAllArticlePath(filePath);
        res.push(...subFiles);
      }
    });
  } catch (err) {
    console.error('Error reading directory:', err);
  }
  return res;
}
