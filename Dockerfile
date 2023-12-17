FROM node:16

WORKDIR /

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4003
ENV DB_CONNECTION=mongodb+srv://calendarapp_user:1o8fldxkPowsZXgN@cluster0.eubhx.mongodb.net/mern_calendar
ENV SECRET_JWT_SEED=c4l3nd4rAPI$2021lookdown

EXPOSE 4003

# Comando para ejecutar la aplicación
CMD ["node", "index.js"]
