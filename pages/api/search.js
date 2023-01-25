import executeQuery from "../../lib/db";

export default async function searchHandler(req, res){
    var {method} = req;

    if (method === "POST"){
        var {searchTerm} = req.body;

        var result = await executeQuery({
            query: "SELECT * FROM user_form WHERE name LIKE ?",
            values: `%${searchTerm}%`
        });
        res.send(result);
    }
    if (method === "GET"){
        res.send("tt");
    }   
}