 # 指定基础镜像是node，版本是v10.6.0
 FROM node:10.6.0-alpine
 # 镜像创建者
 MAINTAINER chao

 # 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
 ADD . /app/
 # cd到app文件夹下
 WORKDIR /app
 RUN rm -rf node_modules
 # 安装项目依赖包
 RUN npm install yarn -g
 RUN yarn
 # 配置环境变量
 ENV HOST 0.0.0.0
 ENV PORT 8000

 # 容器对外暴露的端口号
 EXPOSE 8000

 # 容器启动时执行的命令，类似npm run start
 CMD ["yarn", "start"]
