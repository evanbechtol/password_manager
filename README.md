<div>
   <p><strong>Title:</strong> Password Manager program</br>
   <strong>Author:</strong> Evan Bechtol (ecb120030@utdallas.edu)</br>
   <strong>Last revision date:</strong> 10/24/2016</p></br>
      
</div>
<div>
   <h3>Requirements:</h3><p>Requires node.js to run, along with all dependencies that can be installed through the NPM CLI.</p>
   <h3>More info on crypto-js library</h3><p>https://www.npmjs.com/package/crypto-js</p>
   <h3>Steps to run:</h3>
       <div>
         <ol>
            <li>Run <code>npm install</code>  to download and install all dependencies</li>
            <li>Run the program with: <code>node app.js <command> -n [account name] -u [account user name] -p [account password] -m [encryption key]</code></li>
            <li>Exit the program by hitting <code>ctrl + c</code> in terminal</li>
         </ol>
      </div>
        
   <h3>Description:</h3> <p>This program will store encrypted accounts with their related username and password pairing, with
        AES encryption. The accounts can be retrieved by using the get command with the master password that was used
        when the account was created. If the master password does not match, the account cannot be decrypted for viewing.</p>
     
   <h3>Commands:</h3>
      <ul>
         <li><h4>create:</h4> Facilitates account creation and storage. Must include the following arguments:
            <ul>
               <li>--name or -n</li>
               <li>--username or -u</li>
               <li>--password or -p</li>
               <li>--masterPassword or -m</li>
            </ul>
            <p><code>usage example: node app.js create -n Facebook -u email@gmail.com -p pw123 -m secret123</code></p></li>
            
       <li><h4>get   :</h4> Retrieves account by the account name. Must include the following arguments:
         <ul>
            <li>--name or -n</li>
            <li>--masterPassword or -m</li>
         </ul>
            <p><code>usage example: node app.js get -n Facebook  -m secret123</code></p></li>
      </ul>
       
</div>
