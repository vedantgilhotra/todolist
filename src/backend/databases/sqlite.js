const Sequelize = require("sequelize");
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./src/backend/databases/database.sqlite"
});

const User = sequelize.define('users', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log("The table users has been created if it didn't exist already");
}).catch( (error) => {
    console.log("The table Users could not be created due to an error: ",error);
});

const Lists = sequelize.define('lists',{
    item: {
        type: Sequelize.STRING,
        allowNull: false
    },
    edit: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        default: false
    },
    done: {
        type: Sequelize.STRING,
        allowNull: false,
        default: "no"
    },
    user_id: {
        type: Sequelize.NUMBER,
        allowNull: false
    }
});

sequelize.sync().then(() => {
    console.log("The table lists has been created if it didn't exist already");
}).catch( (error) => {
    console.log("The table Lists could not be created due to an error: ",error);
});

module.exports = {
    User: User,
    Lists: Lists
};