const router = require ("express").Router();
const Song = require ("../models/Song");
const verify = require ("../routes/verifyToken")


//CREATE
router.post("/", verify ,async (req,res)=>{
    if(req.user.isAdmin){
        const newSong = new Song(req.body);

        try{

            const savedSong = await newSong.save()
            res.status(201).json(savedSong)

        }catch(err){
            res.status(500).json(err)
        }
        
    }else{
        res.status(403).json("You are not allowed");
    }
});

//update

router.put("/", verify ,async (req,res)=>{
    if(req.user.isAdmin){
        try{

            const updatedSong = await Song.findByIdAndUpdate(req.params.id,{
                $set:req.body,
            },{new:true});

            res.status(200).json(updatedSong)


        }catch(err){
            res.status(500).json(err)
        }
        
    }else{
        res.status(403).json("You are not allowed");
    }
});

//delete
router.delete("/:id", verify ,async (req,res)=>{
    if(req.user.isAdmin){

        try{

            await Song.findByIdAndDelete(req.params.id);
            res.status(200).json("La canción ha sido eliminada");

        }catch(err){
            res.status(500).json(err)
        }
        
    }else{
        res.status(403).json("You are not allowed");
    }
});

//GET
router.post("/", verify ,async (req,res)=>{

        try{

            const Song = await Song.findbyId(req.params.id);
            res.status(201).json(Song);

        }catch(err){
            res.status(500).json(err)
        }
        
});

//GET RANDOM
router.delete("/random", verify ,async (req,res)=>{

    const type = req.query.type;
    let song;

    try{
        if(type === "canciones"){
            song = await Song.aggregate([
            {$match :{isSongs :true} },
            {$sample :{size: 1}},
        ]);
        }else{
            song = await Song.aggregate([
                {$match :{isSongs :false} },
                {$sample :{size: 1}},
            ]);
        }
        res.status(200).json(song);

    } catch(err){
        res.status(500).json(err)
    }
    
});

//GET ALL
router.get("/", verify ,async (req,res)=>{

    if(req.user.isAdmin){

    try{
        const songs= await Song.find();
        res.status(200).json(songs.reverse());
    } catch (err){
        res.status(500).json(err);
    }
        }else{
           res.status(403).json
           ("You are not allowed");
        }
    });
        
module.exports = router