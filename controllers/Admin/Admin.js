import User from "../../models/User/User.js";




const getAllUsers = async (req, res) => {

    try {
        const rawData = await User.find()
        const allUsers = rawData.map(handleUsersInfo)
        return res.status(200).json(allUsers)
    } catch (err) {
        return res.status(404).json({ message: "Not found!" })
    }





}

const handleUsersInfo = (user) => {
    const handledData = 	{
		id: user._id,
		username: user.username,
		email: user.email,
		purchases: [],
		credits: 0,
		roles: user.roles,
	}
    return handledData
}

export { getAllUsers }
