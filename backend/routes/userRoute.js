

const {Router}= require("express");
const { connection } = require("../db/db");
const mysql= require("mysql");

const userRoute= Router();

userRoute.post("/register", (req,res)=>{
    const {email,password}= req.body;
    connection.getConnection(async(err,conn)=>{
        if(err){
            console.log(err)
        }
        const search= "Select * from userTable where email = ?";
        const user= mysql.format(search,[email]);
        await conn.query(user, async(err,result)=>{
            if(err){
                console.log(err)
            }
            if(result.length==0){
                let attempt=0;
                let blockFor=0;
                const data= {email,password,attempt,blockFor}
                await conn.query(`INSERT INTO userTable SET ?`, data,(err,resl)=>{
                 if(err){
                    console.log(err)
                 }else{
                    res.status(200).send(` Registration successfull!!`)
                 }   
                })
            }else{
                conn.release();
                res.status(400).send("user already exist")
            }
        })
    })
})

userRoute.post("/login",(req,res)=>{
    const {email,password}= req.body;
    connection.getConnection(async(err,conn)=>{
        if(err){
            console.log(err)
        }
        const search= "Select * FROM userTable WHERE email = ?";
        const user= mysql.format(search,[email]);
        await conn.query(user, async(err,result)=>{
            conn.release();
            if(err){
                console.log(err)
            }
            if(result.length==0){
                res.status(404).send("No user found")
            }else{
                let currentDate= new Date();
                if(result[0].password == password && result[0].blockFor<= currentDate){
                    res.status(200).send("Login successfull")
                }else{
                    if(result[0].password !== password){
                        let attempt= result[0].attempt;
                        if(attempt>5){
                            let currentDate= new Date();
                            const lastAttemp= new Date(currentDate);
                            const blockFor=lastAttemp.setHours(lastAttemp.getHours()+24);
                            conn.query(`UPDATE userTable SET blockFor = ? WHERE email= ?`,[blockFor,email],(err,reslt)=>{
                                if(err){
                                    console.log(err)
                                }else{
                                    console.log(reslt)
                                }
                            })

                        }
                        attempt++;
                        conn.query(`UPDATE userTable SET attempt = ? WHERE email= ?`,[attempt,email],(err,reslt)=>{
                            if(err){
                                console.log(err)
                            }else{
                                console.log(reslt)
                            }
                        })
                        res.status(400).send("password didn't match");

                    }
                    
                    
                }
            }
        })
    })
})

module.exports= userRoute;