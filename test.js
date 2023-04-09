const { exec } = require('child_process');
require('dotenv').config()
console.log("USING USE_GPT_4")
const { Configuration, OpenAIApi } = require("openai");
let OPENAI_API_KEY = process.env.OPENAI_API_KEY_4
if(!OPENAI_API_KEY) throw Error("missing OPENAI_API_KEY")
let configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
let fs = require('fs')
// command to execute
const cmd = 'ls';

let todo = "opens steam on macos"
let command = "Write a bash script that "+todo

let run_text = async function(){
    try{
        let messages = [
            {
                role:"system",
                content:"write only bash commands and have no extra strings or creatures, do not comment, do not write anything you do not intent to wrote out into the file. it will be passed directly into fs.writeFile"
            },
            {
                role:"user",
                content:command
            },
        ]
        //
        let body = {
            model: "gpt-4",
            messages,
        }
        let response = await openai.createChatCompletion(body);

        // console.log("response: ",response.data)
        console.log("response: ",response.data.choices[0])
        console.log("response: ",response.data.choices[0].content)

        fs.writeFileSync("test.sh",response.data.choices[0].message.content)

        let cmd = "sh test.sh"
        // execute command using process.exec
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
        });
    }catch(e){
        console.error(e)
    }
}

run_text()