// Récupérer la librairie de Sequelize
const {DataTypes, Sequelize} = require('sequelize');

const sequelize = new Sequelize(
   // Dans le cas de mysql
   'mysql://todolist_usr:root1234@localhost/todolist'
)

const Task = sequelize.define('Task', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    completed: {
        type: DataTypes.BOOLEAN, // TINYINT(1)
        allowNull: false,
        defaultValue: false
    }
}, {
    tableName: 'task',
    underscored: true
})

const User = sequelize.define('User', {
    firstname: {
        type: DataTypes.STRING(60),
        allowNull: true
   },
   lastname: {
    type: DataTypes.STRING(60),
    allowNull: true
    },
    email: {
        type: DataTypes.STRING(90),
        allowNull: false
   }
}, {
    tableName: 'user',
    underscored: true
})

const Tag = sequelize.define('Tag', {
    name: {
        type: DataTypes.STRING(50),
        allowNull: false
   }
}, {
    tableName: 'tag',
    underscored: true
})

// Un utilisateur peut avoir plusieurs tâches
User.hasMany(Task);
// Une tâche peut appartenir qu'à un seul utilisateur
Task.belongsTo(User);


// Un tag peut être dans plusieurs tâches
Tag.belongsToMany(Task, {through: 'tag_task'});
// une tâche peut avoir plusieurs tags
Task.belongsToMany(Tag, {through: 'tag_task'});


console.log('Checking Database connection...');

sequelize.authenticate()
// Si il arrive à s'authentifier à la BDD
.then(() => {
    console.log("Database connection OK!");

    // Synchroniser les modèles avec la BDD
    sequelize.sync({force: true});
})
// Si il n'arrive pas à se co à la BDD
.catch((err) => {
    console.log(err);
})