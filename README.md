# Grunt overview
### What is Grunt?
Grunt will separate out project concerns. It improves workflow by automating tasks. For example, Grunt can minify our js files automatically. Another example is that we can move our client code into the root folder to help avoid breaking the server code as the client code is developed.  

The three plugins we'll be covering today:

- Grunt will `uglify` files
- Grunt will `copy` files
- Grunt will `watch` files

[Full list of plugins](https://gruntjs.com/plugins)

> Entire `server/public/` directory should be in `.gitignore`.

### How do I set it up?
**First time:**
- `npm install -g grunt-cli`

 > `-g` is a global install (across the entire computer)
 >
 > _Might_ need sudo here

**For each project:**
- Setup node server, if not done already
  - `npm install`
  - `npm install jquery express body-parser --save`
  - Create file structure

- `npm install grunt --save`
- Create `Gruntfile.js` in your **root** directory

### How do I install plugins?

**COPY PLUGIN**

- Will copy files from a source folder to a destination folder
- In terminal `npm install grunt-contrib-copy --save`

 ```JavaScript
 // Setup grunt and add the copy module to the project
 module.exports = function(grunt) {
   // Tell grunt how the project is configured
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     // MUST LOAD & REGISTER COPY PLUGIN (see below)
     copy: {
       // name of the task e.g. jquery
       jquery: {
         // Required but not getting into at this point
         expand: true,
         // Current working directory, where are the files?
         cwd: 'node_modules/jquery/dist/',
         // List of files to copy
         src: ['jquery.js'],
         // Destination, where should we put them?
         dest: "server/public/vendors/"
       },
       html: {
         // Required but not getting into at this point
         expand: true,
         // Current working directory, where are the files?
         cwd: "client/views/",
         // List of files to copy
         src: ["index.html"], // Could use ["*.html"] or ["*.*"]
         // Destination, where should we put them?
         dest: "server/public/views/"         
       }
     }
   });
   // LOAD PLUGIN: Bring the plugin into the project
   grunt.loadNpmTasks('grunt-contrib-copy');

   // REGISTER TASK: Actually use the plugin
   grunt.registerTask('default', ['copy']);
 };
 ```

- Finally, type `grunt` in terminal to run
- Now that we are using Grunt, **don't modify files in the server/public folder!**

**UGLIFY PLUGIN**

- Will minify code
- In terminal `npm install grunt-contrib-uglify --save`

```JavaScript
 // Setup grunt and add the uglify module to the project
 module.exports = function(grunt) {
   // Tell grunt how the project is configured
   grunt.initConfig({
     pkg: grunt.file.readJSON('package.json'),
     // MUST LOAD & REGISTER UGLIFY PLUGIN (see below)
     uglify: {
       client: {
         // src can be an array [] or wildcard '*.js'
         src: 'clients/script/client.js',
         dest: 'server/public/scripts/client.min.js'
       }
     },
     // MUST LOAD & REGISTER COPY PLUGIN (see below)
     copy: {
       // name of the task e.g. jquery
       jquery: {
         // Required but not getting into at this point
         expand: true,
         // Current working directory, where are the files?
         cwd: 'node_modules/jquery/dist/',
         // List of files to copy
         src: ['jquery.js'],
         // Destination, where should we put them?
         dest: 'server/public/vendors/'
       },
       html: {
         // Required but not getting into at this point
         expand: true,
         // Current working directory, where are the files?
         cwd: 'client/views/',
         // List of files to copy
         src: ['index.html'], // Could use ['*.html'] or ['*.*']
         // Destination, where should we put them?
         dest: 'server/public/views/'         
       }
     }
   });
   // LOAD PLUGIN: Bring the plugin into the project
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-contrib-copy');

   // REGISTER TASK: Actually use the plugin
   grunt.registerTask('default', ['uglify','copy']);
 };
 ```

**WATCH PLUGIN**

- Will watch for changes and run other commands
- In terminal `npm install grunt-contrib-watch --save`
- **NOTE:** Watch runs in the background

```JavaScript
// Setup grunt and add the uglify module to the project
module.exports = function(grunt) {
  // Tell grunt how the project is configured
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // MUST LOAD & REGISTER UGLIFY PLUGIN (see below)
    uglify: {
      client: {
        // src can be an array [] or wildcard '*.js'
        src: 'client/scripts/client.js',
        dest: 'server/public/scripts/client.min.js'
      }
    },
    // MUST LOAD & REGISTER COPY PLUGIN (see below)
    copy: {
      // name of the task e.g. jquery
      jquery: {
        // Required but not getting into at this point
        expand: true,
        // Current working directory, where are the files?
        cwd: 'node_modules/jquery/dist/',
        // List of files to copy
        src: ['jquery.js'],
        // Destination, where should we put them?
        dest: 'server/public/vendors/'
      },
      html: {
        // Required but not getting into at this point
        expand: true,
        // Current working directory, where are the files?
        cwd: 'client/views/',
        // List of files to copy
        src: ['index.html'], // Could use ['*.html'] or ['*.*']
        // Destination, where should we put them?
        dest: 'server/public/views/'
      },
    },
    // No sub tasks for watch
    watch: {
      // What files am I looking at
      files: ['client/scripts/*.js', 'client/views/*.html'],
      // What tasks should I complete
      tasks: ['uglify', 'copy']
    }
  });
  // LOAD PLUGIN: Bring the plugin into the project
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch')

  // REGISTER TASK: Actually use the plugin
  grunt.registerTask('default', ['uglify','copy','watch']);
};
```

- Open a new terminal window, `cd` to your project directory and run `grunt`
- `control-c` to stop watching
