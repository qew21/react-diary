FROM node:16

ADD package.json /package.json
ENV PROJECT_ENV production
ENV NODE_ENV production
ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN npm config set registry https://registry.npm.taobao.org
RUN npm install --force 
RUN yarn add @material-ui/icons
RUN npm i -g serve
WORKDIR /app
ADD build /app/build
EXPOSE 3000

ENTRYPOINT ["/usr/local/bin/serve", "-s", "/app/build"]
