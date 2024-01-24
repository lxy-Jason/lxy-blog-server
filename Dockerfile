
# Docker多阶段构建

### DEV环境 ###
FROM node:16.20.1 AS development
# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

# 定位到容器工作目录
WORKDIR /usr/src/app
# 拷贝package.json
COPY package*.json ./

RUN npm install glob rimraf
RUN npm install --only=development
COPY . .
RUN npm run build


### PROD环境 ###
FROM node:16.20.1 as production
# 设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
RUN echo 'Asia/Shanghai' >/etc/timezone

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

RUN git clone https://github.com/lxy-Jason/note.git

COPY package*.json ./

RUN \
  npm config set registry https://registry.npm.taobao.org \
  && npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/main"]
