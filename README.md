serve -s build -l 3000

            uri: mongodb+srv://doadmin:2658kXKF7GtD309M@db-mongodb-fra1-68366-638f76d0.mongo.ondigitalocean.com/bahlCollection?tls=true&authSource=admin
  mail:
    host: mail.privateemail.com
    port: 587
    username: info@kronenbrunnen.de
    password: Kronen123
    protocol: smtp
    properties:
      mail:
        smtp:
          auth: true
          starttls:
            enable: true
    default-encoding: UTF-8