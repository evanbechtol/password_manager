    Title: Password Manager program
    Author: Evan Bechtol (ecb120030@utdallas.edu)
    Last revision date: 10/24/2016

    Steps to run:
        1) run 'npm install'  to download and install all dependencies
        2) run the program with: node app.js <command> -n <account name> -u <account user name> -p <account password> -m <encryption key>
        3) exit the program by hitting ctrl + c in terminal
        
    Description: This program will store encrypted accounts with their related username and password pairing, with
        AES encryption. The accounts can be retrieved by using the get command with the master password that was used
        when the account was created. If the master password does not match, the account cannot be decrypted for viewing.
     
    Commands:
        create: Facilitates account creation and storage. Must include the following arguments: 
            --name or -n
            --username or -u
            --password or -p
            --masterPassword or -m
            
            usage example: node app.js create -n Facebook -u email@gmail.com -p pw123 -m secret123
            
        get   : Retrieves account by the account name. Must include the following arguments:
            --name or -n
            --masterPassword or -m

            usage example: node app.js get -n Facebook  -m secret123
