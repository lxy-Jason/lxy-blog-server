import * as fs from 'fs';
import { sep, join, normalize } from 'path';
import simpleGit from 'simple-git';
import { Article } from '../types/article';
import tryAgain from './tryAgain';

const rootPath = 'note/';

// git.clone方法封装
const cloneRepo = async (repoUrl, destPath) => {
  const git = simpleGit();
  await git.clone(repoUrl, destPath);
};

//判断note文件夹是否存在
async function cloneRepository(rootPath) {
  try {
    fs.statSync(rootPath);
  } catch (err) {
    console.log('note文件夹不存在');
    await tryAgain(
      cloneRepo,
      'git clone',
      5,
      'https://gitclone.com/github.com/lxy-Jason/note.git',
      './note',
    );
    console.log('note clone finish');
  }
}
cloneRepository(rootPath);

// git.pull方法封装
const gitPull = async () => {
  const git = simpleGit(rootPath);
  // 设置 git config,解决中文乱码问题
  git.addConfig('core.quotepath', 'false', () => {
    console.log('git config 设置文件名不转义！');
  });
  await git.pull();
};
//获取文件名数组
export async function getArticlePath(): Promise<string[]> {
  const pullResult = await tryAgain(gitPull, 'git pull', 5);
  return pullResult?.files.filter((item) => item.endsWith('.md')) || [];
}

export function getArticleData(path): Article {
  const arr = normalize(path).split(sep);
  const regex = /!\[(.*)]\((.*)\)\r\n/g; //匹配图片正则
  const regexImg = /<img src="(.*)" alt="(.*)"(.*)>/g; //第二种图片正则
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
    let modifiedText = data.replace(
      regex,
      `![$1](https://raw.githubusercontent.com/lxy-Jason/note/master/${arr.join(
        '/',
      )}/$2)\r\n`,
    );
    modifiedText = modifiedText.replace(
      regexImg,
      `![$2](https://raw.githubusercontent.com/lxy-Jason/note/master/${arr.join(
        '/',
      )}/$1)\r\n`,
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
