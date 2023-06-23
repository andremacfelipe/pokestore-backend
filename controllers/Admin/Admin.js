import User from "../../models/User/User.js";
import Case from "../../models/Case/Case.js";
import Pokemon from "../../models/Pokemon/Pokemon.js";






//Admin User Controllers

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




// Admin Case Controllers

const getAvailablePokemonSpecies = async (req,res) => {

    try {
        const availablePokes = await Pokemon.find()
        res.status(200).json(availablePokes)
    } catch (error) {
        res.status(404).json({message:"Not found!"})
    }


}

const createNewGenericCase = async (req,res) => {

    const {
        name,
        price,
        content,
        image
    } = req.body

    try {
        const genericCase = new Case({
            name,
            price,
            content,
            image
        })

        const newGenericCase = await genericCase.save()

        res.status(201).json({message:"Case successfully created!",newGenericCase})


    } catch (err) {
        res.status(400).json({message:"Bad request"})
    }

}

export { getAllUsers,getAvailablePokemonSpecies, createNewGenericCase }
