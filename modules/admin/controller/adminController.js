const UsersModel = require('../../users/model/users');
const GroupsModel = require('../../group/model/group');

exports.getAllGroups = async (req, res) => {
    try {
        const ITEMS_PER_PAGE = 10;
        const currentPage = req.params.pageNum - 1;
        GroupsModel.countDocuments(async function (err, c) {
            let groups = await GroupsModel
                .find({})
                .skip(ITEMS_PER_PAGE * currentPage)
                .limit(ITEMS_PER_PAGE)
                .populate("members")
                .lean();

            if (groups) {
                return res.status(200).json({
                    groups: groups,
                    count: groups.length,
                    total_groups: c
                })
            }
            else {
                return res.send({
                    error: "Something goes wrong"
                })
            }
        });

    } catch (err) {
        return res.json({ error: err })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const ITEMS_PER_PAGE = 30;
        const currentPage = req.params.pageNum - 1;
        UsersModel.countDocuments(async function (err, c) {

            let users = await UsersModel
                .find({})
                .skip(ITEMS_PER_PAGE * currentPage)
                .limit(ITEMS_PER_PAGE)
                .lean();

            if (users) {
                return res.status(200).json({
                    users: users,
                    count: users.length,
                    total_users: c
                })
            }
            else {
                return res.send({
                    error: "Something goes wrong"
                })
            }

        });
    } catch (err) {
        return res.json({ error: err })
    }
}