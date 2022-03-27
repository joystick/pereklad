yarn sequelize model:create --name Country --attributes name:string,isoCode:string

yarn sequelize model:create --name City --attributes name:string,region:string

yarn sequelize model:create --name Translator \
  --attributes firstName:string,lastName:string,organisation:string,streetAddress:string,postalCode:string,phone:string,email:string,website:string,languages:string,approved:boolean,source:string

yarn sequelize model:create --name CityTranslator --attributes CityId:number,TranslatorId:number

yarn sequelize db:migrate
