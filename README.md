# Atlan Task

## API's

1.) http://127.0.0.1:3000/baseline-upload  //Example 1

2.) http://127.0.0.1:3000/export-request  // Example 2

3.) http://127.0.0.1:3000/bulk-create  //Example 3

The API's don't perform the task specified in the examples but they resolve the issue stated.
Each of the API's performs some long-running tasks that require time and resources on the servers.
The scrips `routes/baseline_upload.js`, `routes/bulk-create.js`, `routes/export-request.js`
simulate the 3 examples.

I have used redis queue , redis cache and child-processes to complete this task.
A simple approach has been followed where once a request arrives we send a message to redis on a particular channel. If that particular request is already processing we kill the process by using the process id we stored in redisCache at time of creation of process.At the same time we spin up a new process with the new request object.
