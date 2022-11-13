FROM node
COPY ./* /proj/
WORKDIR /proj/
VOLUME [ "/src/db/" ]
RUN npm install pnpm -g && pnpm install
CMD [ "node" "./main.js"]