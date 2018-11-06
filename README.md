###  停止所有的container

```docker

docker stop $(docker ps -a -q)
```

### 删除所有container的话再加一个指令

```docker

docker rm $(docker ps -a -q)
```

### 删除untagged images

```docker

docker rmi $(docker images | grep "^<none>" | awk "{print $3}")
```
### 删除全部image的话

```docker

docker rmi $(docker images -q)
```

### 强制删除全部image的话

```docker

docker rmi -f $(docker images -q)
```



### docker容器部署实现

1. 安装docker
2. 创建dockerfile文件
3. dockerfile文件配置
```docker
 # 指定基础镜像是node，版本是v10.6.0
 FROM node:10.6.0-alpine
 # 镜像创建者
 MAINTAINER chao

 # 将根目录下的文件都copy到container（运行此镜像的容器）文件系统的app文件夹下
 ADD . /app/
 # cd到app文件夹下
 WORKDIR /app

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

```

4. docker pull mongo 

5. docker run -it --name mongodb mongo  进入终端

6. docker build -t koa-server ./　

7. docker run -it -p 8000:8000 --name koa-server --link=mongodb:mongodb koa-server



### code

 1. 200 成功
 2. 500 失败 