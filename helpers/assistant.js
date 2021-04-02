require('colors');
const inquirer = require('inquirer');
const fs = require('fs');


const menu_settings = [
  {
    type:'list',
    name:'option',
    message:'Select option',
    choices:[
      {
          value:1,
          name:`${'1.'.yellow} Search city`
      },
      {
          value:2,
          name:`${'2.'.yellow} History`
      },
      {
          value:0,
          name:`${'3.'.yellow} Exit`
      }
    ]
  }
];


const inquirerMenu = async() => {

  console.clear();
  console.log(' ===================='.yellow);
  console.log(`${'['.yellow}   Select option    ${']'.yellow}`);
  console.log(' ====================\n'.yellow);

  const { option } = await inquirer.prompt(menu_settings);
  
  return option;

}


const next = async() => {

    const question = [
      {
          type:'input',
          name:'enter',
          message:`Press ${'enter'.blue} for continue...`
      }
    ];

    console.log('\n');
    
    await inquirer.prompt(question);

}


const readInput = async( message ) => {

    const question = [
      {
          type:'input',
          name:'desc',
          message,
          validate ( value ){

              if(value.length === 0){
                  return 'Please enter description!';
              }

              return true;
          }
      }
    ];

    const { desc }  = await inquirer.prompt(question);

    return desc;

}


const saveData = ( data ) => {

    const file = './db/data.json';

    fs.writeFileSync(file,JSON.stringify(data));

}


const readData = () => {

    const file = './db/data.json';

    if(!fs.existsSync(file)){
       return null;
    }

    let info = fs.readFileSync(file,{encoding:'utf-8'});
    
    let parsedData = JSON.parse(info);
    
    return parsedData;
}



const listPlaces = async(places = []) => {

   const choices =  Object.keys(places).map(function(key, index) {

        let obj_tmp = places[key];

        const idx = index + 1;
        
        return{
            value: obj_tmp.id,
            name:`${idx} - ${obj_tmp.name}`
        }
    });

    choices.unshift({
         value:'0',
         name:'0 - Cancelar'
    });

    const questions_tmp = [
        {
            type:'list',
            name:'id',
            message:'Select place',
            choices

        }
    ];

    const  { id } = await inquirer.prompt(questions_tmp);

    return id;
  
}


const confirm = async (message) => {

    const question = [
        {
            type:'confirm',
            name :'ok',
            message:message
        }
    ];

    const  { ok } = await inquirer.prompt(question);

    return ok;

}




const checklistMenu = async(tasks = []) => {

    const choices =  Object.keys(tasks).map(function(key, index) {
 
         let obj_tmp = tasks[key];
 
         const idx = index + 1;
         
         return{
             value: obj_tmp.id,
             name:`${idx} - ${obj_tmp.desc}`,
             checked: (obj_tmp.completedIn) ? true : false
         }

     });

 
     const question = [
         {
             type:'checkbox',
             name:'ids',
             message:'Select',
             choices
 
         }
     ];
 
     const  { ids } = await inquirer.prompt(question);
 
     return ids;
   
 }


module.exports = {
  inquirerMenu,
  next,
  readInput,
  saveData,
  readData,
  listPlaces,
  confirm,
  checklistMenu
}
