yarn sequelize model:create --name Country --attributes name:string,isoCode:string

yarn sequelize model:create --name City --attributes name:string,region:string

yarn sequelize model:create --name Translator \
  --attributes firstName:string,lastName:string,organisation:string,streetAddress:string,postalCode:string,phone:string,email:string,website:string,languages:string,approved:boolean,source:string

yarn sequelize model:create --name CityTranslator --attributes CityId:number,TranslatorId:number

yarn sequelize model:create --name User --attributes name:string,email:string,password:string

yarn sequelize db:migrate

yarn sequelize db:seed --seed seeders/1-Country.js
yarn sequelize db:seed --seed seeders/2-CityTranslator.js
yarn sequelize db:seed --seed seeders/3-User.js

