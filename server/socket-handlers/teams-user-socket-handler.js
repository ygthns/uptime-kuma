const { checkLogin } = require("../util-server");
const { Settings } = require("../settings");
const { sendTeamsUserList } = require("../client");

/**
 * Handlers for Teams mention users
 * @param {Socket} socket Socket.io instance
 * @returns {void}
 */
module.exports.teamsUserSocketHandler = (socket) => {
    socket.on("addTeamsUser", async (user, index, callback) => {
        try {
            checkLogin(socket);

            let list = await Settings.get("teamsUsers");
            if (!Array.isArray(list)) {
                list = [];
            }

            if (index != null && index >= 0 && index < list.length) {
                list[index] = user;
            } else {
                list.push(user);
            }

            await Settings.set("teamsUsers", list);
            await sendTeamsUserList(socket);

            callback({
                ok: true,
                msg: "Saved.",
                msgi18n: true,
            });
        } catch (e) {
            callback({
                ok: false,
                msg: e.message,
            });
        }
    });

    socket.on("deleteTeamsUser", async (index, callback) => {
        try {
            checkLogin(socket);

            let list = await Settings.get("teamsUsers");
            if (!Array.isArray(list)) {
                list = [];
            }

            if (index != null && index >= 0 && index < list.length) {
                list.splice(index, 1);
                await Settings.set("teamsUsers", list);
            }

            await sendTeamsUserList(socket);

            callback({
                ok: true,
                msg: "successDeleted",
                msgi18n: true,
            });
        } catch (e) {
            callback({
                ok: false,
                msg: e.message,
            });
        }
    });
};
