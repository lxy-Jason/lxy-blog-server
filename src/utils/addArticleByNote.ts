import * as fs from 'fs';
import { sep, join, normalize } from 'path';
import simpleGit from 'simple-git';
import { Article } from '../types/article';

process.env.http_proxy = 'http://127.0.0.1:7890';
process.env.https_proxy = 'http://127.0.0.1:7890';
const rootPath = 'note/';
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
  const arr = normalize(path).split(sep);
  const regex = /\!\[(.*)\]\((.*)\)\r\n/g; //匹配图片正则
  const fileData = {
    title: arr.pop().replace('.md', ''),
    path: path,
    category: arr[0],
    content: '',
    star: false,
    contentLength: 0,
  };
  try {
    const data = fs.readFileSync(rootPath + path, 'utf8');
    const modifiedText = data.replace(
      regex,
      `![$1](https://raw.githubusercontent.com/lxy-Jason/note/master/${arr.join(
        '/',
      )}/$2)\r\n`,
    );
    fileData.content = modifiedText;
    fileData.contentLength = modifiedText.length;
    if (modifiedText.length > 1000) {
      //当文本内容超过1000个字符时,默认精选
      fileData.star = true;
    }
    return fileData;
  } catch (err) {
    console.error(err);
  }
}

const ignoreFiles = ['.git', 'image', 'commit.bat'];

//递归获取所有文件路径
export function getAllArticlePath(directoryPath = rootPath) {
  const res = [];
  try {
    const files = fs.readdirSync(directoryPath);
    files.forEach((file) => {
      if (ignoreFiles.includes(file)) return;
      const filePath = join(directoryPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        if (!filePath.endsWith('.md')) return; //只获取md文件
        res.push(filePath.replace(/^note[\\/]/, '')); //兼容note/ 和 note\ 两种路径情况
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

//获取note文件夹下所有子目录(分类名)
export function getArticleCategory() {
  const files = fs.readdirSync(rootPath);
  console.log(files);
  return files.filter((item) => !ignoreFiles.includes(item));
}
