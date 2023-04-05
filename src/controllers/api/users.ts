import {Router, json} from 'express';
import User, { IUser } from '../../models/User';
import bcrypt from 'bcryptjs';

const router = Router();

// ** DEBUG
router.get('/:_id', async (req, res) => {
    const _id = parseInt(req.params._id);

    try {
        const user = await User.findOne({_id}).lean();
        res.json(user);
    }
    catch (err) {
        console.error(err);
        res.json(err);
    }
});

router.post('/', json(), async (req, res) => {
    const {email, username, password} = req.body;
    
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new User({email, username, passwordHash});
        await user.save();
        
        const result: any = user.toObject();
        delete result.passwordHash;
        res.json(result);
    }
    catch (err) {
        console.error(err);
        res.json(err);
    }
});

export default router;