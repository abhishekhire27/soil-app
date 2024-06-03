const db = require("../config").default;
const argon2 = require("argon2");

exports.register = async(req, res) => {
    try{
        const updatedUserData = {...req.body};
        let hashedPassword = await argon2.hash(updatedUserData.password, { type: argon2.argon2id });

        const cart = await db.cart.create();

        const newUser = {
            ...updatedUserData,
            password_hashed: hashedPassword,
            joiningDate: new Date(),
            cartId: cart.cartId,
            userStatus: "ACTIVE"
        };
        delete newUser.password;

        const user = await db.user.create(newUser);
        res.status(200).json(user);
    }
    catch(error){
        res.status(500).json({error: "Error for registering the user", details: error.message })
    }
}

exports.login = async(req, res) => {
    try{
        const user = await db.user.findOne({ where: { emailId: req.body.emailId } });
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }

        if (user.userStatus !== "ACTIVE") {
            return res.status(403).json({ error: "User account is not active" });
        }

        const validPassword = await argon2.verify(user.password_hashed, req.body.password);
        if (!validPassword) {
            return res.status(401).json({ error: "Wrong password" });
        }

        const { password_hashed, ...userData } = user.get({ plain: true });
        res.status(200).json(userData);

    }
    catch(error){
        res.status(500).json({error: "Login error", details: error.message })
    }
}

exports.updateProfile = async(req, res) => {
    try {
        const user = await db.user.findOne({ where: { emailId: req.body.emailId } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
    
        const updatedUserData = req.body;
    
        const { password_hashed, ...existingUserData } = user.get({ plain: true });
        const mergedUserData = { ...existingUserData, ...updatedUserData };
    
        await db.user.update(mergedUserData, { where: { emailId: req.body.emailId } });
    
        res.status(200).json(mergedUserData);
    } catch (error) {
        res.status(500).json({ error: "Profile Update error", details: error.message });
    }
};

exports.deleteProfile = async(req, res) => {
    try{
        const userId = req.body.userId;

        await db.cart.destroy({
            where: {
                cartId: req.body.cartId
            }
        });

        await db.cartItems.destroy({
            where: {
                cartId: req.body.cartId
            }
        });

        await db.review.destroy({
            where: {
                userId: userId
            }
        });

        await db.user.destroy({
            where: {
                userId: userId
            }
        });

        res.status(200).json({})
    }
    catch(error){
        res.status(500).json({ error: "Error deleting user", details: error.message });
    }
};

exports.changePassword = async(req, res) => {
    try {
        const { userId, newPassword } = req.body;

        const user = await db.user.findOne({ where: { userId: userId } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const hashedPassword = await argon2.hash(newPassword);
        await db.user.update({ password_hashed: hashedPassword }, { where: { userId: userId } });

        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ error: "Password change error", details: error.message });
    }
};

exports.checkEmailId = async(req, res) => {

    try{
        if (!db || !db.user) {
            throw new Error("User model is not defined in db object");
        }
        const user = await db.user.findOne({
            where: {
                emailId: req.body.emailId
            }
        });
        if (user) {
            return res.status(200).json({ exists: true });
        } else {
            return res.status(200).json({ exists: false });
        }
    }
    catch(error){
        res.status(500).json({ error: "Email Id fetching error", details: error.message });   
    }
};