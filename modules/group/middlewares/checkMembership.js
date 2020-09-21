const checkMembership =  (req, res, next) => {
    let userID = req.params.userID;
    let groupID = req.params.groupID;

    const data =  Group.find({ _id: req.params.id });
    console.log("DATA:>>>> ", data);
    let membersArray = Object.values(data.members);
    for (const member of membersArray) {
        if (req.body.userID === member.toString()) {
            return next();
        }
        else{
            return res.status(403).json('Not Allowed');
        }
    }
};