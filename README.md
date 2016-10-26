<div>
   <p><strong>Title:</strong> Password Manager program</br>
   <strong>Author:</strong> Evan Bechtol (ecb120030@utdallas.edu)</br>
   <strong>Last revision date:</strong> 10/26/2016</p></br>
      
</div>
<div>
   <h3>Contributing</h3><p>If you would like to add-on to this, feel free to fork!</p>
   <h3>Future functionality:</h3>
   <ul>
      <li>Hashing algorithms</li>
      <li>GUI</li>
      <li>Multiple input per run</li>
   </ul>
   <h3>Requirements:</h3><p>Requires node.js to run, along with all dependencies that can be installed through the NPM CLI.</p>
   <h3>More info on libraries used</h3><p>https://www.npmjs.com/package/crypto-js<br/>https://code.google.com/archive/p/crypto-js/<br/>https://www.npmjs.com/package/node-persist</p>
   <h3>Steps to run:</h3>
       <div>
         <ol>
            <li><span style="color: red"><strong>Special Note: </strong></span><em>The file can only have 1 encryption type at a time. In other words, you cannot create an account using AES, and then create another account using DES in the same file. If you wish to use a new cipher algorithm, then you must create a new file.</em></li>
            <li>Run <code>npm install</code>  to download and install all dependencies</li>
            <li>Run program with: <code>node app.js <command> -n [account name] -u [account user name] -p [account password] -m [encryption key] -c [cipher method]</code></li>
            <li>Exit the program by hitting <code>ctrl + c</code> in terminal</li>
         </ol>
      </div>
        
   <h3>Description:</h3> <p>This program will store encrypted accounts with their related username and password pairing, with
        AES encryption. The accounts can be retrieved by using the get command with the master password that was used
        when the account was created. If the master password does not match, the account cannot be decrypted for viewing.</p>
     
   <h3>Supported Cipher Algorithms:</h3>
   <ul>
      <li>AES</li>
      <li>DES</li>
      <li>TripleDES</li>
      <li>Rabbit</li>
      <li>RC4</li>
      <li>RC4Drop</li>
   </ul>
   <p><em><strong>The same cipher algorithm must be used for both encryption and decryption. Data cannot be unencrypted without matching algorithm.</strong></em></p>
   <h3>Commands:</h3>
      <ul>
         <li><h4>create:</h4> Facilitates account creation and storage. Must include the following arguments:
            <ul>
               <li>--name or -n</li>
               <li>--username or -u</li>
               <li>--password or -p</li>
               <li>--masterPassword or -m</li>
               <li>--cipher or -c</li>
            </ul>
            <p><code>usage example: node app.js create -n Facebook -u email@gmail.com -p pw123 -m secret123 -c aes</code></p></li>
            
       <li><h4>get:</h4> Retrieves account by the account name. Must include the following arguments:
         <ul>
            <li>--name or -n <p><em>Account name must exactly match how it was entered when encrypted (case-sensitive)</em></p></li>
            <li>--masterPassword or -m <p><em>A password that does not match the one that was used for the account on encryption will result in failure to decrypt that account</em></p></li>
            <li>--cipher or -c <p><em>Cipher algorithm must match the one that was used to encrypt account</em></p></li>
         </ul>
            <p><code>usage example: node app.js get -n Facebook  -m secret123 -c aes</code></p>
       </li>
       
       <li><h4>delete:</h4> Deletes account by the account name. Must include the following arguments:
                <ul>
                   <li>--name or -n <p><em>Account name must exactly match how it was entered when encrypted (case-sensitive)</em></p></li>
                   <li>--masterPassword or -m <p><em>A password that does not match the one that was used for the account on encryption will result in failure to decrypt that account</em></p></li>
                   <li>--cipher or -c <p><em>Cipher algorithm must match the one that was used to encrypt account</em></p></li>
                </ul>
                   <p><code>usage example: node app.js delete -n Facebook  -m secret123 -c aes</code></p>
              </li>
      </ul>
       
</div>
