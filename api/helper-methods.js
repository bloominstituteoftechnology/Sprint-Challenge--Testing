// const knex = require('knex');

// const knexConfig = require('../knexfile.js');
// const db = knex(knexConfig.development);

let memoryArray = [
    {name: "Evelyn",
    lastName: "Huang"}
];

const getData =()=>{
    return memoryArray;
};

// const getActions =()=>{
//   return db("action");
// }

// const getProject = (id) =>{
//   if(id) {
//     return db('project')
//         .where({id})
//         .first();
//   } else {
//       return db('project');
//   }
// }

// const getAction = (id) =>{
//     if(id) {
//       return db('action')
//           .where({id})
//           .first();
//     } else {
//         return db('action');
//     }
//   }

// const getActionsOfProject = (projectId) =>{
//   if(projectId) {
//     //   console.log(projectId)
//     // const projectObject = db('action')
//     //                 .join('project', 'action.project_id', '=', 'project.id')
//     //                 .where('project.id', projectId)
//     //                 .select ('project');
//     // const actionsObject = db('action')
//     //                 .join('project', 'action.project_id', '=', 'project.id')
//     //                 .where('project.id', projectId)
//     //                 .select ('action');
//     // console.log(projectObject);
//     return db('action')
//         .join('project', 'action.project_id', '=', 'project.id')
//         .where('project.id', projectId)
//         .select ( 'action'
//             // {   
//             //     id: 'project.id',
//             //     name: 'project.name',
//             //     description: 'project.description',
//             //     completed: 'project.completed',
//             //     //actions: 'action.description'
//             // }
//             );

//         //projectObject,
//         // actions: actionsObject};
      
//   } else {
//       return db('project');
//   }
// }

// const addProject = (project) =>{
//     return db
//           .insert(project)
//           .into('project');
// }

// const addAction = (action) =>{
//   return db.insert(action)
//             .into('action');
// }

module.exports = {
  getData
//   getProject,
//   addProject,
//   getActions,
//   getAction,
//   addAction,
//   getActionsOfProject
};