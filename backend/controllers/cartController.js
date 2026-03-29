import userModel from '../models/userModel.js'

//import routes


//Add products to user Card
const addToCart =async(req,res)=>{
    try{

    const{userId,itemId,size}=req.body
    const variantKey = size || 'default'

    const userData =await userModel.findById(userId)
    let cartData =await userData.cartData;

    if (cartData[itemId]) {
        
        if (cartData[itemId][variantKey]) {
            cartData[itemId][variantKey] += 1;
        } else {
            cartData[itemId][variantKey] = 1;
        }
        
    } else {
        cartData[itemId] = {}
        cartData[itemId][variantKey] = 1;
    }

    await userModel.findByIdAndUpdate(userId,{cartData});

    res.json({success:true,message:'Item added to cart'})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

const updateCart =async(req,res)=>{
    try{
        const {userId,itemId,size,quantity}=req.body
        const variantKey = size || 'default'
        const userData =await userModel.findById(userId)
        let cartData =await userData.cartData;

        if (!cartData[itemId]) {
            cartData[itemId] = {}
        }

        cartData[itemId][variantKey] =quantity
        await userModel.findByIdAndUpdate(userId,{cartData});
        res.json({success:true,message:'Cart Updated'})

    }catch(error){
        console.log(error)
        res.json({success:false,message:error.message})
    }
    
}

const getUserCart =async(req,res)=>{
    try{
        const {userId} =req.body
        const userData =await userModel.findById(userId)
        let cartData = await userData.cartData;
        res.json({success:true,cartData})

    }catch(error){

        console.log(error)
        res.json({success:false,message:error.message})

    }
    
}

export{addToCart,updateCart,getUserCart}
