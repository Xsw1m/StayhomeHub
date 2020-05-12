FROM node:12.8
MAINTAINER WICON.WANG
WORKDIR /www
CMD ["npm","run dev"]
ENV TZ "Asia/Shanghai"
EXPOSE 8000
