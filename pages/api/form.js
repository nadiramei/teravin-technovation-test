import executeQuery from "../../lib/db";

export default async function formHandler(req, res){
    var {method} = req;

    if (method === "POST"){
        var {name, email, phoneNumber, address} = req.body;
        
        const result = await executeQuery({
            query: "INSERT INTO user_form (name, phone, email, address) VALUES (?,?,?,?)",
            values: [
                name, phoneNumber, email, JSON.stringify(address)
            ]
        });

        if (result.affectedRows > 0){
            res.status(200).send({status: "ok"});
        } else res.send({status: "failed"});

    }
    if (method === "GET"){
        const result = await executeQuery({
            query: "SELECT * FROM user_form",
            values: []
        });
        res.json({result})
    }
}