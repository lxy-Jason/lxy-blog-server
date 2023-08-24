import * as fs from 'fs';
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
  const arr = path.split('/');
  const fileData = {
    title: arr.pop().replace('.md', ''),
    path,
    content: '',
  };
  try {
    const data = fs.readFileSync(rootPath + path, 'utf8');
    fileData.content = data;
    return fileData;
  } catch (err) {
    console.error(err);
  }
}
