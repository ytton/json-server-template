FROM node
COPY ./ /proj/
WORKDIR /proj/
VOLUME [ "/src/db/" ]
RUN npm install pnpm -g && pnpm install
EXPOSE 3000
CMD [ "node","./main.js"]