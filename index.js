const core = require('@actions/core');
const github = require('@actions/github');

// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);
// } catch (error) {
//   core.setFailed(error.message);
// }
try {
  const core = require('@actions/core');
  const github = require('@actions/github');

  // const context = JSON.parse(process.env.GITHUB_CONTEXT)
  const axios = require('axios').default;

  const username = 'AlexMihov'
  const password = '7e70d3538bd5c491dfd9dac96a7f7b4456fff717'

  const token = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')

  // const url = context.event.pull_requests.commits.href
  const url = "https://api.github.com/repos/AlexMihov/timer-app-backend/pulls/65/commits"
  axios.get(url, {
    headers: {
      'Authorization': `Basic ${token}`
    }
  }).then(resp => {
    // console.log(resp.data)
    let pattern = /\[.*\].*/
    let messages_ok = true;

    resp.data.map(com => {
      const message = com.commit.message
      const sha = com.sha.substring(0,8)
      if(!pattern.test(message)) {
        console.log("Commit message invalid:", message, `(${sha})`)
        messages_ok = false;
      }
    })
  })

}
