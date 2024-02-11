const express=require("express");
const multer=require("multer");
const {execute}=require("./Code_execution")
const app=express();
app.use(express.json());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/') // Upload files to the "uploads" directory
    },
    filename: function (req, file, cb) {
      cb(null,file.originalname) // Append timestamp to file name
    }
  });//rename

const upload=multer({storage:storage}).single('photos');//field name , max count 

app.get("/",(req,res)=>{
    res.json({
        "message":"<h1> i know i will not complete this also</h1>"
    })
})




app.post("/",async (req,res)=>{


    upload(req, res, async (err) => {
        if (err) {
          // Handle errors
          return res.status(400).json({ error: err.message });
        }

        console.log(req.file.path);
        // File uploaded successfully

        const obj={
            language:"python",
            path:req.file.path,
        }

        const Code_result=await execute(obj)

        res.json(Code_result);
       
        

      });



});





app.listen(6969,()=>{

    console.log("Yeah i know i typed 69 twice")

})