lista nvm a instalar:
nvm ls-remote  
# no es necesario usar el sudo  
nvm install v16.14.2  

sudo npm install -g --force nodemon  
  

#descargamos el docker-compose
https://sawtooth.hyperledger.org/docs/1.2/app_developers_guide/installing_sawtooth.html#step-1-download-the-sawtooth-docker-compose-file

#download
https://github.com/hyperledger/sawtooth-core/blob/1-2/docker/compose/sawtooth-default.yaml

#ejecutamos cd sawtooth-1.2
docker-compose up

#ingresamos al cliente
docker exec -it sawtooth-shell-default bash

#probamos el servicio
curl http://rest-api:8008/blocks

#instalamos sdk js
https://www.npmjs.com/package/sawtooth-sdk-js

#creamos un proyecto
npm init

#agregamos para reinicio automatico
npm i -D nodemon


