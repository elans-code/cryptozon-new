const Sequelize = require('sequelize');
const db = require('../db');

const Notifications = db.define('Notifications', {
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    delivered: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
})

module.exports = Notifications;
